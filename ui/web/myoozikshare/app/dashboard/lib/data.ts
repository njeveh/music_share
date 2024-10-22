import { Inputs } from "@/app/lib/definitions";

const initialInputs: Inputs = {
  title: '',
  description: '',
  composer: '',
  score: {
    file: null,
    previewUrl: ''
  },
  audioFile: {
    file: null,
    previewUrl: ''
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
        previewUrl: ''
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
  }
}

export {initialInputs};