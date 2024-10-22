'use client'

import React, { useRef, useState } from 'react';
import { register } from '@/app/lib/actions';
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
import { MdAddCircleOutline } from 'react-icons/md';
import TextArea from '@/app/ui/components/input-fields/text-area';
import { TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { FileIcon } from '@radix-ui/react-icons';
import { Inputs } from '@/app/lib/definitions';
import AudioInput from '@/app/ui/components/audio-input';
import { AddSegment, AddSegmentComponent, RemoveSegment, RemoveSegmentComponent} from '../lib/utils'
import { initialInputs } from '../lib/data';

const Page = () => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const alertDialogTrigger = useRef(null);
    const audioRef = useRef();
    const router = useRouter();
    const [apiErrorMessages, setApiErrorMessages] = useState(['']);
    const [inputs, setInputs] = useState<Inputs>(initialInputs);

    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({
        ...values,
        [name]: value
      }));
    }

    const HandleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const files = event.target.files;
        if (files && files[0]) {
          const file = files[0];
          const previewUrl = URL.createObjectURL(file);
          setInputs((values) => ({
            ...values,
            [name]: {
              file: file,
              previewUrl: previewUrl
            }
          }));
        if(audioRef.current){
          audioRef.current.pause();
          audioRef.current.load();
        }
        }
    }
    


    const HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
            <FileInput label="Score" id="score" name="score" required
              onChange={HandleFileInputChange} accept="image/png, image/jpg, image/jpeg, .pdf" />
            {inputs.score.file &&
              <Link
                href={inputs.score.previewUrl}
                target="__blank" className="w-fit">
              <FileIcon className="w-10 h-10 text-amber-500" />
              </Link>
            }              
            <div className={ inputs.inputErrors.score ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputs.inputErrors.score}
            </div>
          </div>
          <div className="w-full mb-4">
            <AudioInput SegmentIndex={null} segmentComponentIndex={null} inputs={inputs} setInputs={setInputs} />
          </div>
          <div className="w-full mb-4">
            <TextArea rows={20} label="Lyrics" id="lyrics" name="lyrics" placeholder="Type music lyrics here" required
              value={inputs.lyrics || '' } onChange={HandleInputChange} />
            <div className={ inputs.inputErrors.lyrics ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputs.inputErrors.lyrics}
            </div>
          </div>
          {!inputs.segments[0].initial && inputs.segments.map((segment, index) => {
            return (
              <div key={index} className='bg-sky-200 dark:bg-black p-2 my-4 rounded-lg'>
                <div className='w-full flex justify-end items-center'>
                  <button onClick={()=> RemoveSegment(inputs, setInputs, index)} type='button' className='text-red-500 gap-1 text-3xl
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
                        <button onClick={()=> RemoveSegmentComponent(inputs, setInputs, index, componentIndex)} type='button'
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
                          <AudioInput SegmentIndex={index} segmentComponentIndex={componentIndex} inputs={inputs} setInputs={() => setInputs} />
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
              <Button onClick={()=>AddSegmentComponent(inputs, setInputs, index)} type='button'><MdAddCircleOutline className='me-1'/> Add segment component</Button>
            </div>
          </div>
            );

          })}
          <div className="w-full my-4 flex justify-center items-center">
            <Button onClick={() => AddSegment(inputs, setInputs)} type='button'><MdAddCircleOutline className='me-1'/> Add Segment</Button>
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