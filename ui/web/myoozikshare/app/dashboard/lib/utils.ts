
import {
  Inputs,
} from "@/app/lib/definitions";
type Setter = React.Dispatch < React.SetStateAction < Inputs >>

  // add a segment
  const AddSegment = (data: Inputs, setter: Setter) => {
    if (data.segments[0].initial) {
      setter((values) => ({
        ...values,
        segments: [{
          initial: false,
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
        }, ]
      }));
    } else {
      setter((values) => ({
        ...values,
        segments: [
          ...values.segments,
          {
            initial: false,
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
          },
        ]
      }));
    }
  }

// add a segment component
const AddSegmentComponent = (data: Inputs, setter: Setter, index: any) => {
  if (data.segments[index].segmentComponents[0].initial) {
    data.segments[index].segmentComponents = [{
      initial: false,
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
    }, ];
  } else {
    data.segments[index].segmentComponents = [
      ...data.segments[index].segmentComponents,
      {
        initial: false,
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
      }, ]
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
    const newSegmentComponents = [{
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
    }, ];
    newSegments[index].segmentComponents = newSegmentComponents;
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