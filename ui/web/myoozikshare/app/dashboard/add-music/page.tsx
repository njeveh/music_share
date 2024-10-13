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
import { MdAdd, MdAddCircleOutline } from 'react-icons/md';
import { pathToFileURL } from 'url';
import path from 'path/posix';

const Page = () => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const alertDialogTrigger = useRef(null);
    const router = useRouter();
    const [apiErrorMessages, setApiErrorMessages] = useState(['']);
    const [inputs, setInputs] = useState({
      title: '',
      composer: '',
      score: '',
      audioFile: '',
      segments: [
          {
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
            },],
            inputError: '',
          },
      ],
      inputErrors: {
        title: '',
        composer: '',
        score: '',
        audioFile: '',
      }
    });
    const AddSegment = () => {
      if (inputs.segments[0].initial) {
        setInputs((values) => ({
        ...values,
        segments: [
          {
            initial: false,
            segmentTitle: '',
            segmentComponents: [
              {
                initial: true,
                segmentComponentTitle: '',
                audioFile: '',
                inputErrors: {
                  segmentComponentTitle: '',
                  audioFile: '',
                }
              },
            ],
            inputError: '',
          },
        ]
      }));
      }else{
      setInputs((values) => ({
        ...values,
        segments: [
          ...values.segments,
          {
            initial: false,
            segmentTitle: '',
            segmentComponents: [
              {
                initial: true,
                segmentComponentTitle: '',
                audioFile: '',
                inputErrors: {
                  segmentComponentTitle: '',
                  audioFile: '',
                }
              },
            ],
            inputError: '',
          },
        ]
      }));
    }
  }
  const AddSegmentComponent = (index: any) => {
      if (inputs.segments[index].segmentComponents[0].initial) {
        inputs.segments[index].segmentComponents = [
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
      }else{
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
    const HandleInputChange = (event: any) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({
        ...values,
        [name]: value
      }));
    };

    const HandleSegmentInputChange = (event: any, segmentIndex: any) => {
      // const name: string = event.target.name;
      // const value = event.target.value;
      // let data = {...inputs}
      // data.segments[segmentIndex][name] = value;

      // inputs.segments[segmentIndex][name] = value;
      // setInputs((values) => ({
      //   ...values,
      //   segments: [
      //     ...values.segments,
      //     values.segments[segmentIndex]: {
      //       ...values.segments[segmentIndex],
      //       [name]: value,
      //     }
      //   ]
      // }));
      // setInputs((values) => ({
      //   ...values,
      // }));
    }

    const HandleSegmentComponentInputChange = (event: any, segmentIndex: any, segmentComponentIndex: any) => {
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
        inputErrors.title == '' &&
        inputErrors.composer == '' &&
        inputErrors.score == '' &&
        inputErrors.audioFile == ''
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
        <div className='w-full md:w-3/4 lg:w-1/2'>
          <div className="w-full mb-4">
            <TextInput label="Title" type="text" id="title" name="title" placeholder="Music title" required
              autoComplete="on" value={inputs.title || '' } onChange={HandleInputChange} autoFocus />
            <div className={ inputs.inputErrors.title ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputs.inputErrors.title}
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
              description='(Select a clear audioFile file preferably, a piece recorded in a studio setup or live performance. A midi file would be the next best option.)'
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
            <div className={ inputs.inputErrors.audioFile ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputs.inputErrors.audioFile}
            </div>
          </div>
          {!inputs.segments[0].initial && inputs.segments.map((segment, index) => {
            return (
          <div key={index} className='bg-sky-200 dark:bg-black p-4 my-4 rounded-lg'>
            <div className='w-full flex justify-center items-center text-2xl font-bold'>
              {segment.segmentTitle || `Segment ${index+1}`}              
              </div>
              <div className="w-full mb-4">
                <TextInput label={`Segment ${index+1} Title`} type="text" id={`segmentTitle-${index}`} name={`segmentTitle_${index}`} placeholder="Segment title" required
                  autoComplete="on" value={segment.segmentTitle || '' } onChange={event => {
                          let data = {...inputs};
                          data.segments[index].segmentTitle = event.target.value;
                          setInputs(data);
                  }} autoFocus />
                <div className={ segment.inputError ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
                  {segment.inputError}
                </div>
              </div>
              {
                !segment.segmentComponents[0].initial && segment.segmentComponents.map((segmentComponent, componentIndex) => {
                  return(
                <div key={componentIndex} className="mt-2 border p-2 rounded-lg  bg-slate-200 dark:bg-gray-900">
                  <div className='w-full flex justify-center items-center text-lg font-bold'>
                    {segmentComponent.segmentComponentTitle || `Component ${componentIndex+1}`}              
                  </div>
                  <div className="w-full mb-4">
                    <TextInput label={`Component ${componentIndex+1} Title`} type="text" id={`segmentTitle-${index}-${componentIndex}`} name={`segmentTitle_${index}_${componentIndex}`} placeholder="Component title" required
                      autoComplete="on" value={segmentComponent.segmentComponentTitle || '' } onChange={event => {
                          let data = {...inputs};
                          data.segments[index].segmentComponents[componentIndex].segmentComponentTitle = event.target.value;
                          setInputs(data);
                  }} autoFocus />
                    <div className={ segmentComponent.inputErrors.segmentComponentTitle ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
                      {segmentComponent.inputErrors.segmentComponentTitle}
                    </div>
                  </div>
                  <div className="w-full mb-4">
                    <FileInput label="Audio"
                      description='(Select a clear audioFile file.)'
                      id={`audioFile-${index}-${componentIndex}`} name={`audioFile_${index}_${componentIndex}`} required value={segmentComponent.audioFile || '' } onChange={event => {
                          let data = {...inputs};
                          data.segments[index].segmentComponents[componentIndex].audioFile = event.target.value;
                          setInputs(data);
                  }} accept="audio/*" />
                    <div className={ segmentComponent.inputErrors.audioFile ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
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