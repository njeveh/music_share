
import {
  Inputs,
} from "@/app/lib/definitions";
type Setter = React.Dispatch < React.SetStateAction < Inputs >>

  // add a segment
  const AddSegment = (data: Inputs, setter: Setter) => {
    if (data.segments.length == 0) {
      setter((values) => ({
        ...values,
        segments: [{
          status: null,
          segmentTitle: '',
          segmentComponents: [{
            status: null,
            segmentComponentTitle: '',
            audioFile: {
              file: null,
              url: '',
              previewUrl: '',
              uploadUrl: '',
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
            segmentTitle: '',
            segmentComponents: [{
              status: null,
              segmentComponentTitle: '',
              audioFile: {
                file: null,
                url: '',
                previewUrl: '',
                uploadUrl: '',
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
      segmentComponentTitle: '',
      audioFile: {
        file: null,
        url: '',
        previewUrl: '',
        uploadUrl: '',
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
        segmentComponentTitle: '',
        audioFile: {
          file: null,
          url: '',
          previewUrl: '',
          uploadUrl: '',
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

export {
  AddSegment,
  AddSegmentComponent,
  RemoveSegment,
  RemoveSegmentComponent
}