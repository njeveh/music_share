import { Inputs, MusicPostData } from "@/app/lib/definitions";

const initialInputs: Inputs = {
  title: '',
  description: '',
  composer: '',
  score: {
    file: null,
    previewUrl: '',
    uploadUrl: '',
  },
  audioFile: {
    file: null,
    previewUrl: '',
    uploadUrl: '',
  },
  lyrics: '',
  segments: [{
    initial: true,
    segmentTitle: '',
    segmentComponents: [{
      initial: true,
      segmentComponentTitle: '',
      audioFile: {
        file: null,
        previewUrl: '',
        uploadUrl: '',
      },
      inputErrors: {
        segmentComponentTitle: '',
        audioFile: '',
      }
    }, ],
    inputError: '',
  }, ],
  inputErrors: {
    title: '',
    description: '',
    composer: '',
    score: '',
    audioFile: '',
    lyrics: '',
  },
  publish: false,
  musicGroupsToShareWith: [],
}

const initialMusicPostData: MusicPostData = {
  title: '',
  description: '',
  composer: '',
  score: '',
  audio: '',
  lyrics: '',
  segments: [{
    title: '',
    segment_components: [{
      title: '',
      audio: '',
    }],
  }],
  publish: false,
  music_groups_to_share_with: [],
}

export {initialInputs, initialMusicPostData};