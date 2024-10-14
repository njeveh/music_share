'use client'

import React, { useRef, useState } from 'react';
import { register } from '@/app/lib/actions';
import { ValidateField } from '@/app/lib/form-validation/auth-forms-validation';
import TextInput from '@/app/ui/components/input-fields/text-input';
import { lusitana } from '@/app/ui/fonts';
import ActionButton from '@/app/ui/components/action-button';
import { useRouter } from 'next/navigation';

import {
AlertDialog,
AlertDialogAction,
AlertDialogCancel,
AlertDialogContent,
AlertDialogDescription,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogTitle,
AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import FileInput from '@/app/ui/components/input-fields/file-input';
import { Button } from '@/components/ui/button';
import { MdAddCircleOutline, MdClose } from 'react-icons/md';
import TextArea from '@/app/ui/components/input-fields/text-area';
import { TrashIcon } from '@heroicons/react/24/outline';

const Page = () => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const alertDialogTrigger = useRef(null);
    const router = useRouter();
    const [apiErrorMessages, setApiErrorMessages] = useState(['']);
    const [inputs, setInputs] = useState({
      title: '',
      description: '',
      composer: '',
      score: '',
      audioFile: '',
      lyrics: '',
      segments: [{
        initial: true,
        segmentTitle: '',
        segmentComponents: [{
          initial: true,
          segmentComponentTitle: '',
          audioFile: '',
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
    });

    // add a segment
    const AddSegment = () => {
      if (inputs.segments[0].initial) {
        setInputs((values) => ({
          ...values,
          segments: [{
            initial: false,
            segmentTitle: '',
            segmentComponents: [{
              initial: true,
              segmentComponentTitle: '',
              audioFile: '',
              inputErrors: {
                segmentComponentTitle: '',
                audioFile: '',
              }
            }, ],
            inputError: '',
          }, ]
        }));
      } else {
        setInputs((values) => ({
          ...values,
          segments: [
            ...values.segments,
            {
              initial: false,
              segmentTitle: '',
              segmentComponents: [{
                initial: true,
                segmentComponentTitle: '',
                audioFile: '',
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
    const AddSegmentComponent = (index: any) => {
      if (inputs.segments[index].segmentComponents[0].initial) {
        inputs.segments[index].segmentComponents = [{
          initial: false,
          segmentComponentTitle: '',
          audioFile: '',
          inputErrors: {
            segmentComponentTitle: '',
            audioFile: '',
          }
        }, ];
      } else {
        inputs.segments[index].segmentComponents = [
          ...inputs.segments[index].segmentComponents,
          {
            initial: false,
            segmentComponentTitle: '',
            audioFile: '',
            inputErrors: {
              segmentComponentTitle: '',
              audioFile: '',
            }
          },
        ];
      }
      // initiate a rerender.
      setInputs((values) => ({
        ...values,
      }));

    }

    // remove a segment
    const RemoveSegment = (index: any) => {
      if (inputs.segments.length === 1) {
        setInputs((values) => ({
          ...values,
          segments: [{
            initial: true,
            segmentTitle: '',
            segmentComponents: [{
              initial: true,
              segmentComponentTitle: '',
              audioFile: '',
              inputErrors: {
                segmentComponentTitle: '',
                audioFile: '',
              }
            }, ],
            inputError: '',
          }, ]
        }));
      } else {
        const newSegments = [...inputs.segments];
        newSegments.splice(index, 1);
        setInputs((values) => ({
          ...values,
          segments: newSegments
        }));
      }
    }

    // remove a segment component
    const RemoveSegmentComponent = (index: any, componentIndex: any) => {
      const newSegments = [...inputs.segments];
      if (inputs.segments[index].segmentComponents.length === 1) {
        const newSegmentComponents = [{
          initial: true,
          segmentComponentTitle: '',
          audioFile: '',
          inputErrors: {
            segmentComponentTitle: '',
            audioFile: '',
          }
        }, ];
        newSegments[index].segmentComponents = newSegmentComponents;
        setInputs((values) => ({
          ...values,
          segments: newSegments
        }));
      } else {
        const newSegmentComponents = [...inputs.segments[index].segmentComponents];
        newSegmentComponents.splice(componentIndex, 1);
        newSegments[index].segmentComponents = newSegmentComponents;
        setInputs((values) => ({
          ...values,
          segments: newSegments
        }));
      }
    }

    const HandleInputChange = (event: any) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({
        ...values,
        [name]: value
      }));
    };


    const HandleSubmit = (event: any) => {
      event.preventDefault();
      console.log(inputs);
      return;
      setButtonDisabled(true);
      setApiErrorMessages([]);
      if (
        inputs.inputErrors.title == '' &&
        inputs.inputErrors.composer == '' &&
        inputs.inputErrors.score == '' &&
        inputs.inputErrors.audioFile == ''
      ) {
        const data = {
          first_name: inputs.title,
          last_name: inputs.composer,
          score: inputs.score,
          audioFile: inputs.audioFile
        };
        register(true, data).catch(err => {
          // console.log(err)
          setApiErrorMessages(["Sorry, we couldn't process your request. Something went wrong, please try again."]);
          alertDialogTrigger.current?.click();
        }).then((res) => {
          if (res !== void({})) {
            if (res.status === 'fail') {
              setApiErrorMessages(res.error_messages);
              alertDialogTrigger.current?.click();
            } else if (res.status === 'success') {
              //console.log(res.data);
              router.push('/auth/score-verification-notice')

            }
          }
        });

        setButtonDisabled(false);
      }
    }
return (
<>
  <div>
    <AlertDialog>
      <AlertDialogTrigger ref={alertDialogTrigger}></AlertDialogTrigger>
      <AlertDialogContent className='bg-gray-50 dark:bg-gray-900'>
        <AlertDialogHeader>
          <AlertDialogTitle>Error!</AlertDialogTitle>
          <AlertDialogDescription>
            <div className='p-2 bg-red-100 text-red-600 rounded-lg'>

              {apiErrorMessages.map((error, index) => {
              return (
              <div className="m-2" key={index}>
                {error}
              </div>
              );
              })}
            </div>

          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <form onSubmit={HandleSubmit} className="space-y-3">
      <div className="flex justify-center items-center flex-col rounded-lg bg-gray-50 dark:bg-gray-900 px-2 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Add Music
        </h1>
        <div className='w-full lg:w-3/4'>
          <div className="w-full mb-4">
            <TextInput label="Title" type="text" id="title" name="title" placeholder="Music title" required
              autoComplete="on" value={inputs.title || '' } onChange={HandleInputChange} autoFocus />
            <div className={ inputs.inputErrors.title ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputs.inputErrors.title}
            </div>
          </div>
          <div className="w-full mb-4">
            <TextArea rows={3} label="Description" id="description" name="description"
              placeholder="brief music description" required
              description='(Give a brief description of the music. For example you may tell us about its genre, or category from a consumer perspective.)'
              value={inputs.description || '' } onChange={HandleInputChange} />
            <div className={ inputs.inputErrors.description ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputs.inputErrors.description}
            </div>
          </div>
          <div className="w-full mb-4">
            <TextInput label="Composer" type="text" id="composer" name="composer" placeholder="Composer name" required
              autoComplete="on" value={inputs.composer || '' } onChange={HandleInputChange} />
            <div className={ inputs.inputErrors.composer ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputs.inputErrors.composer}
            </div>
          </div>
          <div className="w-full mb-4">
            <FileInput label="Score" id="score" name="score" required value={inputs.score || '' }
              onChange={HandleInputChange} accept="image/png, image/jpg, image/jpeg, .pdf" />
            <div className={ inputs.inputErrors.score ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputs.inputErrors.score}
            </div>
          </div>
          <div className="w-full mb-4">
            <FileInput label="Audio"
              description='(Select a clear audio file preferably, a piece recorded in a studio setup or live performance. A midi file would be the next best option.)'
              id="audioFile" name="audioFile" required value={inputs.audioFile || '' } onChange={HandleInputChange} accept="audio/*" />
            {inputs.audioFile &&
            <div className='w-full my-2'>
              <audio controls className='w-full'>
                <source src={inputs.audioFile} type='audio/wav' />
                <p>
                  Your browser doesn't support this audio file. Here is a
                  <a href="/assets/audio/baraka_top_top.wav">link to the audio</a> instead.
                </p>
              </audio>
            </div>
            }
          <div className="w-full mb-4">
            <TextArea rows={20} label="Lyrics" id="lyrics" name="lyrics" placeholder="Type music lyrics here" required
              value={inputs.lyrics || '' } onChange={HandleInputChange} />
            <div className={ inputs.inputErrors.lyrics ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputs.inputErrors.lyrics}
            </div>
          </div>
            <div className={ inputs.inputErrors.audioFile ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputs.inputErrors.audioFile}
            </div>
          </div>
          {!inputs.segments[0].initial && inputs.segments.map((segment, index) => {
            return (
              <div key={index} className='bg-sky-200 dark:bg-black p-4 my-4 rounded-lg'>
                <div className='w-full flex justify-end items-center'>
                  <button onClick={()=> RemoveSegment(index)} type='button' className='text-red-500 gap-1 text-3xl
                    md:text-5xl'>
                    <TrashIcon className="w-7" />
                  </button>
                </div>
                <div className='w-full flex justify-center items-center text-amber-600 text-2xl font-bold'>
                  {segment.segmentTitle || `Segment ${index+1}`}
                </div>
                <div className="w-full mb-4">
                  <TextInput label={`Segment ${index+1} Title`} type="text" id={`segmentTitle-${index}`}
                    name={`segmentTitle_${index}`} placeholder="Segment title" required autoComplete="on"
                    value={segment.segmentTitle || '' } onChange={event=> {
                    let data = {...inputs};
                    data.segments[index].segmentTitle = event.target.value;
                    setInputs(data);
                    }} />
                    <div className={ segment.inputError ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
                      {segment.inputError}
                    </div>
                </div>
              {
                !segment.segmentComponents[0].initial && segment.segmentComponents.map((segmentComponent, componentIndex) => {
                  return(
                    <div key={componentIndex} className="mt-2 border p-2 rounded-lg  bg-slate-200 dark:bg-gray-900">
                      <div className='w-full flex justify-end items-center'>
                        <button onClick={()=> RemoveSegmentComponent(index, componentIndex)} type='button'
                          className='text-red-500 gap-1 text-2xl'>
                          <TrashIcon className="w-5" />
                        </button>
                      </div>
                      <div className='w-full flex justify-center items-center text-lg font-bold'>
                        {segmentComponent.segmentComponentTitle || `Component ${componentIndex+1}`}
                      </div>
                      <div className="w-full mb-4">
                        <TextInput label={`Component ${componentIndex+1} Title`} type="text"
                          id={`segmentTitle-${index}-${componentIndex}`} name={`segmentTitle_${index}_${componentIndex}`}
                          placeholder="Component title" required autoComplete="on"
                          value={segmentComponent.segmentComponentTitle || '' } onChange={event=> {
                          let data = {...inputs};
                          data.segments[index].segmentComponents[componentIndex].segmentComponentTitle = event.target.value;
                          setInputs(data);
                          }} />
                          <div className={ segmentComponent.inputErrors.segmentComponentTitle
                            ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
                            {segmentComponent.inputErrors.segmentComponentTitle}
                          </div>
                      </div>
                      <div className="w-full mb-4">
                        <FileInput label="Audio" description='(Select a clear audioFile file.)'
                          id={`audioFile-${index}-${componentIndex}`} name={`audioFile_${index}_${componentIndex}`} required
                          value={segmentComponent.audioFile || '' } onChange={event=> {
                          let data = {...inputs};
                          data.segments[index].segmentComponents[componentIndex].audioFile = event.target.value;
                          setInputs(data);
                          }} accept="audio/*" />
                          <div className={ segmentComponent.inputErrors.audioFile
                            ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
                            {segmentComponent.inputErrors.audioFile}
                          </div>
                      </div>
                    </div>
                  );
                })
              }
            <div className="w-full my-4 flex justify-end">
              <Button onClick={()=>AddSegmentComponent(index)} type='button'><MdAddCircleOutline className='me-1'/> Add segment component</Button>
            </div>
          </div>
            );

          })}
          <div className="w-full my-4 flex justify-center items-center">
            <Button onClick={AddSegment} type='button'><MdAddCircleOutline className='me-1'/> Add Segment</Button>
          </div>
          <ActionButton className='w-full flex justify-center items-center' disabled={buttonDisabled}>
            Submit
          </ActionButton>
        </div>
      </div>
    </form>
  </div>
</>
);
}
export default Page;