<?php

namespace App\Http\Controllers\API;

use App\Models\Music;
use App\Models\MusicGroupMusic;
use App\Models\MusicSegment;
use App\Models\MusicSegmentComponent;
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
        //Log::info($request);

        $validator = Validator::make($request->all(), [
        'title' => ['required', 'string', 'min:2', 'max:60'],
        'description' => ['required', 'string'],
        'composer' => ['required', 'string', 'min:2', 'max:60'],
        'score.url' => ['required', 'url'],
        'score.public_id' => ['required', 'string'],
        'audio.url' => ['required', 'url'],
        'audio.public_id' => ['required', 'string'],
        'lyrics' => ['required', 'string'],
        'is_visible' => ['required', 'boolean'],
        'is_published' => ['required', 'boolean'],
        'segments.*.title' => ['required', 'string',],
        'segments.*.segment_component.*.title' => ['required', 'string',],
        'segments.*.segment_component.*.audio.url' => ['required', 'url',],
        'segments.*.segment_component.*.audio.public_id' => ['required', 'url',],
        ]);

        if ($validator->fails()) {
            $error_messages = $validator->errors()->all();
            return $this->respondWithValidationErrors($error_messages, BaseApiCodes::EX_VALIDATION_EXCEPTION(), 403);
        }
        try {
            DB::beginTransaction();
            $user = $request->user();
            $music = Music::create([
                'user_id' => $user->id,
                'title' => $request->title,
                'description' => $request->description,
                'composer' => $request->composer,
                'score' => $request->score['url'],
                'score_public_id' => $request->score['public_id'],
                'audio' => $request->audio['url'],
                'audio_public_id' => $request->audio['public_id'],
                'lyrics' => $request->lyrics,
                'is_visible' => $request->is_visible,
                'is_published' => $request->is_published,
            ]);
            $music_segments = $request->music_segments;

            foreach ($music_segments as $key => $music_segment) {
                if($music_segment['title']) {
                    $new_music_segment = MusicSegment::create([
                        'music_id' => $music->id,
                        'title' => $music_segment['title']
                    ]);
                    $music_segment_components = $music_segment['music_segment_components'];
                    foreach ($music_segment_components as $key => $music_segment_component) {
                        if($music_segment_component['title']) {
                            $new_music_segment_component = MusicSegmentComponent::create([
                                'music_segment_id' => $new_music_segment->id,
                                'title' => $music_segment_component['title'],
                                'audio' => $music_segment_component['audio']['url'],
                                'audio_public_id' => $music_segment_component['audio']['public_id'],
                            ]);
                        }
                    }
                }
            }
            $music_groups_to_share_with = $request->music_groups_to_share_with;
            if (count($music_groups_to_share_with)){
                foreach ($music_groups_to_share_with as $key => $music_group_to_share_with) {
                    MusicGroupMusic::create([
                        'music_id' => $music->id,
                        'music_group_id' => $music_group_to_share_with,
                    ]);
                }
            }
            DB::commit();
            $data = [
                'music' => $music,
            ];
            //Log::info($data);
            return $this->respond($data, 'music added successfully.');
        } catch (\Throwable $th) {
            //Log::info($th);
            DB::rollBack();
            return $this->respondWithErrorMessage('Sorry something went wrong, please try again.', BaseApiCodes::EX_UNCAUGHT_EXCEPTION(), 500);
            //throw $th;
        }
    }

    /**
     * show on instance of user music.
     */
    public function getMymusic(Request $request, $id)
    {
        $user = $request->user();
        $music = $user->music()->where('id', $id)->first();
        $music->author = $music->user->user_name? $music->user->user_name : $music->user->first_name.$music->user->last_name;
        $music->user = null;
        $music_segments = $music->musicSegments;
        foreach ($music_segments as $key => $music_segment) {
            $music_segment->music_segment_components = $music_segment->musicSegmentComponents;
        }
        $music->music_segments = $music_segments;
        $data = [
            'music' => $music,
        ];
        Log::info($data);
        return $this->respond($data, '');
    }

    /**
     * get filtered music groups.
     */
    public function getFilteredPublicMusic(Request $request)
    {
        $music_data = Music::whereLike(['title', 'description', 'composer', 'lyrics'], $request->query('query') ?? '')
        ->where('is_published', true)
        ->where('is_visible', true)
        ->paginate(50);
        //Log::info($music_data);
        foreach ($music_data as $key => $music) {
            $music->author = $music->user->user_name? $music->user->user_name : $music->user->first_name.$music->user->last_name;
        }
        $data = [
            'music' => $music_data
        ];
        return $this->respond($data);
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
