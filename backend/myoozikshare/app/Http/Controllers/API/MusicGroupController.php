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
        // $groups =  MusicGroup::whereLike('name', $request->query)->get();
        $my_groups_ids = $request->user()->musicGroups()->get()?->modelKeys();
        $groups = MusicGroup::whereLike('group_name', '%'.$request->query('query').'%')
        // ->whereNotIn('id', $my_groups_ids)
        ->paginate(20);
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
        //
    }

    /**
     * get authenticated user groups.
     */
    public function getUserMusicGroups(Request $request)
    {
        $groups =  $request->user()->musicGroups;
        $data = [
            'groups' => $groups
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
    public function update(Request $request, MusicGroup $musicGroup)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MusicGroup $musicGroup)
    {
        //
    }
}
