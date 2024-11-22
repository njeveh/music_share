<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MusicGroup;
use App\Models\MusicGroupAdmin;
use App\Models\MusicGroupMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use MarcinOrlowski\ResponseBuilder\BaseApiCodes;

class MusicGroupController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups =  MusicGroup::all();
        $data = [
            'groups' => $groups
        ];
        return $this->respond($data);
    }

    /**
     * get filtered music groups.
     */
    public function getFilteredMusicGroups(Request $request)
    {
        $my_groups_ids = [];
        $my_groups_ids = $request->user()->musicGroups()->get()?->modelKeys();
        $groups = MusicGroup::whereLike(['group_name', 'group_description'], $request->query('query') ?? '')
        ->paginate(50);
        foreach ($groups as $key => $group) {
            $membership_request_status = '---------';
            $is_a_member =  in_array($group->id, $my_groups_ids);
            if (!$is_a_member){
                $my_membership_pending_groups_ids = $request->user()->requestedMembershipMusicGroups()?->where('status', 'pending')->get()?->modelKeys();
                $my_membership_denied_groups_ids = $request->user()->requestedMembershipMusicGroups()?->where('status', 'denied')->get()?->modelKeys();
                $membership_request_denied = in_array($group->id, $my_membership_denied_groups_ids);
                $membership_request_pending = in_array($group->id, $my_membership_pending_groups_ids) && !$membership_request_denied;
                if ($membership_request_denied) {
                    $membership_request_status =  'denied';
                }elseif ($membership_request_pending) {
                    $membership_request_status =  'pending';
                }
            }
            $group->is_a_member = $is_a_member;
            $group->membership_request_status = $membership_request_status;
        }
        $data = [
            'groups' => $groups
        ];
        return $this->respond($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        //Log::info($request);
        $validator = Validator::make($request->all(), [
            'group_name' => ['required', 'string', 'min:2', 'max:255', 'unique:music_groups,group_name'],
            'group_description' => ['nullable', 'string'],
            'group_contact' => ['nullable', 'string'],
        ]);

        if ($validator->fails()) {
            $error_messages = $validator->errors()->all();
            return $this->respondWithValidationErrors($error_messages, BaseApiCodes::EX_VALIDATION_EXCEPTION(), 403);
        }
        try {
            DB::beginTransaction();
            $user = $request->user();
            $music_group = MusicGroup::create([
                'group_name' => $request->group_name,
                'group_description' => $request->group_description,
                'creator_name' => $user->first_name. ' '. $user->last_name,
                'group_contact' => $request->group_contact,
            ]);
            $music_group_member = MusicGroupMember::create([
                'user_id' => $user->id,
                'music_group_id' => $music_group->id,
                'is_creator' => true,
            ]);
            $music_group_admin = MusicGroupAdmin::create([
                'music_group_member_id' => $music_group_member->id,
                'is_super_admin' => true,
                'roles' => json_encode([
                    'manage_members', 'manage_music'
                ]),
            ]);
            DB::commit();
            $data = [
                'music_group' => $music_group,
            ];
            //Log::info($data);
            return $this->respond($data, 'group created successfully.');
        } catch (\Throwable $th) {
            //Log::info($th);
            DB::rollBack();
            return $this->respondWithErrorMessage('Sorry something went wrong, please try again.', BaseApiCodes::EX_UNCAUGHT_EXCEPTION(), 500);
            //throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(MusicGroup $musicGroup)
    {
        // $groups =  $request->user()->musicGroups;
        // $data = [
        //     'groups' => $groups
        // ];
        // return $this->respond($data);
    }

    /**
     * Display the specified group belonging to the requesting user.
     */
    public function showMymusicGroup(Request $request, $id)
    {
        $user = $request->user();
        $group =  MusicGroup::find($id);
        $member = $group->musicGroupMembers()->where('user_id', $user->id)->first();
        $admin = $member->musicGroupAdmin;
        $group->member_id = $member->id;
        $group->is_creator = $group->musicGroupMembers()?->where('is_creator', true)->where('user_id', $user->id)->exists();
        $group->is_admin = $admin? true : false;
        $group->is_super_admin = $admin?->is_super_admin? true : false;
        $data = [
            'group' => $group
        ];
        return $this->respond($data);
    }

    /**
     * get authenticated user groups.
     */
    public function getUserMusicGroups(Request $request)
    {
        $user = $request->user();
        $groups =  $user->musicGroups;
        foreach ($groups as $key => $group) {
            $member = $group->musicGroupMembers()->where('user_id', $user->id)->first();
            $admin = $member->musicGroupAdmin;
            $group->member_id = $member->id;
            $group->is_creator = $group->musicGroupMembers()?->where('is_creator', true)->where('user_id', $user->id)->exists();
            $group->is_admin = $admin? true : false;
            $group->is_super_admin = $admin?->is_super_admin? true : false;
        }
        $data = [
            'groups' => $groups
        ];
        return $this->respond($data);
    }

    /**
     * get filtered music group members.
     */
    public function getFilteredMusicGroupMembers(Request $request, $id)
    {
        $music_group = MusicGroup::find($id);
        $filtered_music_group_members = $music_group->musicGroupMembers()
        ->whereLike(['user.first_name', 'user.last_name', 'user.user_name'], $request->query('query') ?? '')
        ->where('user_id', '!=' , $request->user()->id)
        ->paginate(50);
        foreach ($filtered_music_group_members as $key => $member) {
            $is_admin = false;
            $is_super_admin = false;
            $is_admin = $member->musicGroupAdmin? true: false;
            if ($is_admin) {
                $is_super_admin = $member->musicGroupAdmin?->is_super_admin? true: false;
            }
            $member->name = $member->user->user_name? $member->user->user_name:  $member->user->first_name.' '.$member->user->last_name;
            $member->is_admin = $is_admin;
            $member->is_super_admin = $is_super_admin;
        }
        $data = [
            'members' => $filtered_music_group_members
        ];
        return $this->respond($data);
    }
    
   /**
     * get filtered music group members.
     */
    public function getFilteredMusicGroupMembershipRequests(Request $request, $id)
    {
        $music_group = MusicGroup::find($id);
        $filtered_music_group_membership_requests = $music_group->musicGroupMembershipRequests()
        ->whereLike(['user.first_name', 'user.last_name', 'user.user_name'], $request->query('query') ?? '')
        ->paginate(50);
        foreach ($filtered_music_group_membership_requests as $key => $request) {
            $request->name = $request->user->user_name? $request->user->user_name:  $request->user->first_name.' '.$request->user->last_name;
        }
        $data = [
            'requests' => $filtered_music_group_membership_requests
        ];
        return $this->respond($data);
    }    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MusicGroup $musicGroup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $music_group = MusicGroup::find($id);
        //Log::info($request);
        $validator = Validator::make($request->all(), [
            'group_name' => ['required', 'string', 'min:2', 'max:255', Rule::unique('music_groups', 'group_name')->ignore($id)],
            'group_description' => ['nullable', 'string'],
            'group_contact' => ['nullable', 'string'],
        ]);

        if ($validator->fails()) {
            $error_messages = $validator->errors()->all();
            return $this->respondWithValidationErrors($error_messages, BaseApiCodes::EX_VALIDATION_EXCEPTION(), 403);
        }
        try {
            // $music_group = MusicGroup::find($id);
            $music_group->update([
                'group_name' => $request->group_name,
                'group_description' => $request->group_description,
                'group_contact' => $request->group_contact,
            ]);

            $data = [
                'music_group' => $music_group,
            ];
            //Log::info($data);
            return $this->respond($data, 'group updated successfully.');
        } catch (\Throwable $th) {
            //Log::info($th);
            return $this->respondWithErrorMessage('Sorry something went wrong, please try again.', BaseApiCodes::EX_UNCAUGHT_EXCEPTION(), 500);
            //throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'password' => ['required', 'current_password'],
            ]);

            if ($validator->fails()) {
                return $this->respondWithValidationErrors('Invalid password.', BaseApiCodes::EX_VALIDATION_EXCEPTION(), 403);
            }
            MusicGroup::destroy($id);
            return $this->respondWithMessage('Music group deleted successfully.');
        } catch (\Throwable $th) {
            //Log::info($th);
            return $this->respondWithError(BaseApiCodes::EX_UNCAUGHT_EXCEPTION(), 500);
        }
    }
}
