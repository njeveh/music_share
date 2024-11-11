<?php

namespace App\Http\Controllers\API;

use App\Models\MusicGroupMember;
use App\Models\MusicGroupMembershipRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use MarcinOrlowski\ResponseBuilder\BaseApiCodes;

class MusicGroupMembershipRequestController extends BaseController
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
    public function store(Request $request, $id)
    {
        try {
            MusicGroupMembershipRequest::create([
                'user_id' => $request->user()->id,
                'music_group_id' => $id,
            ]);
            return $this->respondWithMessage('Membership requested successfully');
        } catch (\Throwable $th) {
            return $this->respondWithErrorMessage('Membership request unsuccessful', BaseApiCodes::EX_UNCAUGHT_EXCEPTION(), 500);
            //throw $th;
        }
    }

    /**
     * Reply to a membership request.
     */
    public function reply(Request $request, $group_id, $request_id)
    {
        try {
            $feedback =  $request->feedback;
            $membership_request = MusicGroupMembershipRequest::find($request_id);
            DB::beginTransaction();
            switch ($feedback) {
                case 'accepted':
                    MusicGroupMember::create([
                        'user_id' => $membership_request->user_id,
                        'music_group_id' => $membership_request->music_group_id,                        
                    ]);
                    MusicGroupMembershipRequest::destroy($request_id);
                    break;
                case 'rejected':
                    $membership_request->status = 'rejected';
                    $membership_request->save();
                    break;
                
                default:
                    break;
            }
            DB::commit();
            return $this->respondWithMessage('Membership request feedback successfull');
        } catch (\Throwable $th) {
            DB::rollBack();
            return $this->respondWithErrorMessage('Membership request feedback failed', BaseApiCodes::EX_UNCAUGHT_EXCEPTION(), 500);
            //throw $th;
        }
    }    

    /**
     * Display the specified resource.
     */
    public function show(MusicGroupMembershipRequest $musicGroupMembershipRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MusicGroupMembershipRequest $musicGroupMembershipRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MusicGroupMembershipRequest $musicGroupMembershipRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MusicGroupMembershipRequest $musicGroupMembershipRequest)
    {
        //
    }
}
