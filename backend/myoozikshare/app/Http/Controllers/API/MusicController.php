<?php

namespace App\Http\Controllers\API;

use App\Models\Music;
use App\Models\MusicGroupMusic;
use App\Models\MusicSegment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use MarcinOrlowski\ResponseBuilder\BaseApiCodes;

class MusicController extends BaseController
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
        return $this->respond([], 'some message');
        $validator = Validator::make($request->all(), [
        'title' => ['required', 'string', 'min:2', 'max:60'],
        'description' => ['sometimes', 'nullable', 'string'],
        'composer' => ['required', 'string', 'min:2', 'max:60'],
        'score' => ['required', 'url'],
        'audio' => ['required', 'url'],
        'lyrics' => ['sometimes', 'nullable', 'string'],
        'is_visible' => ['required', 'boolean'],
        'is_published' => ['required', 'boolean'],
        'segment.*.title' => ['required', 'string',],
        'segment.*.component.*.title' => ['required', 'string',],
        'segment.*.component.*.audio' => ['required', 'url',],
        ]);

        if ($validator->fails()) {
            $error_messages = $validator->errors()->all();
            return $this->respondWithValidationErrors($error_messages, BaseApiCodes::EX_VALIDATION_EXCEPTION(), 403);
        }
        try {
            DB::beginTransaction();
            $user = $request->user();
            $music_group = Music::create([
                'group_name' => $request->group_name,
                'group_description' => $request->group_description,
                'creator_name' => $user->first_name. ' '. $user->last_name,
                'group_contact' => $request->group_contact,
            ]);
            $music_group_member = MusicGroupMusic::create([
                'user_id' => $user->id,
                'music_group_id' => $music_group->id,
                'is_creator' => true,
            ]);
            $music_group_admin = MusicSegment::create([
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
    public function show(Music $music)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Music $music)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Music $music)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Music $music)
    {
        //
    }
}
