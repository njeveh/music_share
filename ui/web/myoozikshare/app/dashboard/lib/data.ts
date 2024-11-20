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
  visibleAfterUpload: false,
  musicGroupsToShareWith: [],
}

const initialMusicPostData: MusicPostData = {
  title: '',
  description: '',
  composer: '',
  score: {
    url: '',
    public_id: ''
  },
  audio: {
    url: '',
    public_id: ''
  },
  lyrics: '',
  music_segments: [{
    title: '',
    music_segment_components: [{
      title: '',
      audio: {
        url: '',
        public_id: ''
      },
    }],
  }],
  is_published: false,
  is_visible: false,
  music_groups_to_share_with: [],
}

export {initialInputs, initialMusicPostData};