<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MusicGroup;
use App\Models\MusicGroupAdmin;
use App\Models\MusicGroupMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use MarcinOrlowski\ResponseBuilder\BaseApiCodes;

class MusicGroupMemberController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(MusicGroupMember $musicGroupMember)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MusicGroupMember $musicGroupMember)
    {
        //
    }
    /**
     * act on members according to the requested action.
     */
    public function act(Request $request, $group_id, $member_id)
    {
        try {
            $action =  $request->action;
            $member = MusicGroupMember::find($member_id);
            switch ($action) {
                case 'make_admin':
                    MusicGroupAdmin::create([
                        'music_group_member_id' => $member->id,                     
                    ]);
                    break;
                case 'make_super_admin':
                    MusicGroupAdmin::where('music_group_member_id', $member_id)->update(['is_super_admin' => true]);
                    break;
                case 'remove_admin':
                    MusicGroupAdmin::where('music_group_member_id', $member_id)->delete();
                    break;
                case 'remove_super_admin':
                    MusicGroupAdmin::where('music_group_member_id', $member_id)->update(['is_super_admin' => false]);
                    break;
                case 'remove':
                    MusicGroupMember::destroy($member_id);
                    break;                                      
                case 'leave':
                    if($member->musicGroup->musicGroupMembers->count() > 1){
                        MusicGroupMember::destroy($member_id);
                    }
                    else{
                        MusicGroup::destroy($group_id);
                    }
                    break;
                
                default:
                    break;
            }
            return $this->respondWithMessage('Action successful');
        } catch (\Throwable $th) {
            return $this->respondWithErrorMessage('Action failed', BaseApiCodes::EX_UNCAUGHT_EXCEPTION(), 500);
            //throw $th;
        }
    } 
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MusicGroupMember $musicGroupMember)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MusicGroupMember $musicGroupMember)
    {
        //
    }
}
