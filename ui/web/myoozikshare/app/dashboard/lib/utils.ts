
import {
  Inputs,
} from "@/app/lib/definitions";
import { RefObject } from "react";
type Setter = React.Dispatch < React.SetStateAction < Inputs >>;
type PreviewUrlSetter = React.Dispatch < React.SetStateAction < string >>;

  // add a segment
  const AddSegment = (data: Inputs, setter: Setter) => {
    if (data.segments.length == 0) {
      setter((values) => ({
        ...values,
        segments: [{
          status: null,
          id: '',
          segmentTitle: '',
          segmentComponents: [{
            status: null,
            id: '',
            segmentComponentTitle: '',
            audioFile: {
              file: null,
              url: '',
              previewUrl: '',
              uploadUrl: '',
              publicId: '',
            },
            inputErrors: {
              segmentComponentTitle: '',
              audioFile: '',
            }
          }, ],
          inputError: '',
        }, ]
      }));
    } else {
      setter((values) => ({
        ...values,
        segments: [
          ...values.segments,
          {
            status: null,
            id: '',
            segmentTitle: '',
            segmentComponents: [{
              status: null,
              id: '',
              segmentComponentTitle: '',
              audioFile: {
                file: null,
                url: '',
                previewUrl: '',
                uploadUrl: '',
                publicId: '',
              },
              inputErrors: {
                segmentComponentTitle: '',
                audioFile: '',
              }
            }, ],
            inputError: '',
          },
        ]
      }));
    }
  }

// add a segment component
const AddSegmentComponent = (data: Inputs, setter: Setter, index: any) => {
  if (data.segments[index].segmentComponents.length == 0) {
    data.segments[index].segmentComponents = [{
      status: null,
      id: '',
      segmentComponentTitle: '',
      audioFile: {
        file: null,
        url: '',
        previewUrl: '',
        uploadUrl: '',
        publicId: '',
      },
      inputErrors: {
        segmentComponentTitle: '',
        audioFile: '',
      }
    }, ];
  } else {
    data.segments[index].segmentComponents = [
      ...data.segments[index].segmentComponents,
      {
        status: null,
        id: '',
        segmentComponentTitle: '',
        audioFile: {
          file: null,
          url: '',
          previewUrl: '',
          uploadUrl: '',
          publicId: '',
        },
        inputErrors: {
          segmentComponentTitle: '',
          audioFile: '',
        }
      },
    ];
  }
  // initiate a rerender.
  setter((values) => ({
    ...values,
  }));

}

// remove a segment
const RemoveSegment = (data: Inputs, setter: Setter, index: any) => {
  if (data.segments.length === 1) {
    setter((values) => ({
      ...values,
      segments: []
    }));
  } else {
    const newSegments = [...data.segments];
    newSegments.splice(index, 1);
    setter((values) => ({
      ...values,
      segments: newSegments
    }));
  }
}

// remove a segment component
const RemoveSegmentComponent = (data: Inputs, setter: Setter, index: any, componentIndex: any) => {
  const newSegments = [...data.segments];
  if (data.segments[index].segmentComponents.length === 1) {
    newSegments[index].segmentComponents = [];
    setter((values) => ({
      ...values,
      segments: newSegments
    }));
  } else {
    const newSegmentComponents = [...data.segments[index].segmentComponents];
    newSegmentComponents.splice(componentIndex, 1);
    newSegments[index].segmentComponents = newSegmentComponents;
    setter((values) => ({
      ...values,
      segments: newSegments
    }));
  }
}


// remove the audio file selected for upload
const RemoveAudioFileSelectedForUpload = (setter: Setter, inputRef: RefObject<HTMLInputElement | null>, previewUrlSetter: PreviewUrlSetter ) => {
    setter((values) => ({
      ...values,
      audioFile: {
        ...values.score,
        file: null,
        previewUrl: '',
        uploadUrl: '',
      }
    }));

    // reset file input element
    if (inputRef && inputRef.current){
      inputRef.current.value = "";
      inputRef.current.type = "text";
      inputRef.current.type = "file";
    }

    // reset the preview url
    previewUrlSetter('');   
}

// remove the score file selected for upload
const RemoveScoreSelectedForUpload = (setter: Setter, inputRef: RefObject<HTMLInputElement | null>) => {
    setter((values) => ({
      ...values,
      score: {
        ...values.score,
        file: null,
        previewUrl: '',
        uploadUrl: '',
      }
    }));

    // reset file input element
    if (inputRef && inputRef.current){
      inputRef.current.value = "";
      inputRef.current.type = "text";
      inputRef.current.type = "file";
    }    
}

// remove a segment component audio file selected for upload
const RemoveSegmentComponentUploadAudioFile = (data: Inputs, setter: Setter, index: any, componentIndex: any,  inputRef: RefObject<HTMLInputElement | null>, previewUrlSetter: PreviewUrlSetter ) => {
  const newData = data;
  let newAudioFile = newData.segments[index].segmentComponents[componentIndex].audioFile;
  newAudioFile = {
    ...newAudioFile,
    file: null,
    previewUrl: '',
    uploadUrl: '',    
  }
  newData.segments[index].segmentComponents[componentIndex].audioFile = {
    ...newAudioFile
  }

    setter((values) => ({
      ...newData
    }));
    // reset file input element
    if (inputRef && inputRef.current){
      inputRef.current.value = "";
      inputRef.current.type = "text";
      inputRef.current.type = "file";
    }
    // reset the preview url
    previewUrlSetter('');       
}

export {
  AddSegment,
  AddSegmentComponent,
  RemoveSegment,
  RemoveSegmentComponent,
  RemoveScoreSelectedForUpload,
  RemoveAudioFileSelectedForUpload,
  RemoveSegmentComponentUploadAudioFile,
}