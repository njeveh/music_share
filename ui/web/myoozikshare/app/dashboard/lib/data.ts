import { Inputs, MusicPostData } from "@/app/lib/definitions";

const initialInputs: Inputs = {
  title: '',
  description: '',
  composer: '',
  score: {
    file: null,
    url: '',
    previewUrl: '',
    uploadUrl: '',
    publicId: '',
  },
  audioFile: {
    file: null,
    url: '',
    previewUrl: '',
    uploadUrl: '',
    publicId: '',
  },
  lyrics: '',
  segments: [],
  inputErrors: {
    title: '',
    description: '',
    composer: '',
    score: '',
    audioFile: '',
    lyrics: '',
  },
  publish: false,
  visible: false,
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
    id: '',
    title: '',
    music_segment_components: [{
      id: '',
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