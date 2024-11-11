<?php

namespace App\Http\Controllers\API;

use App\Models\MusicGroupMembershipRequest;
use Illuminate\Http\Request;
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
