'use client'

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { FileIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import TextInput from "@/app/ui/components/input-fields/text-input";
import ActionButton from "@/app/ui/components/action-button";
import FileInput from "@/app/ui/components/input-fields/file-input";
import TextArea from "@/app/ui/components/input-fields/text-area";
import { MdAddCircleOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import AudioInput from "@/app/ui/components/audio-input";
import { MusicGroup, Inputs } from "@/app/lib/definitions";
import { useRef, useState } from "react";
import FullPageLoadingIndicator from "../../components/loading-state-indicators/full-page-loading-indicator";
import ApiFeedbackAlertDialog from "../../components/api-feedback-alert-dialog";
import { lusitana } from "../../fonts";
import { AddSegment, AddSegmentComponent, RemoveSegment, RemoveSegmentComponent } from "@/app/dashboard/lib/utils";

export default function MusicReviewForm({
  music,
  musicGroups
}: {
  music: Inputs
  musicGroups: MusicGroup[] | null;
}) {
    const [isPending, setIsPending] = useState(false);
    const alertDialogTrigger = useRef<HTMLButtonElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [apiErrorMessages, setApiErrorMessages] = useState({
      status: '',
      messages: ['']
    });
    const [inputs, setInputs] = useState<Inputs>(music);

    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({
        ...values,
        [name]: value
      }));
    }

    const HandleMusicGroupsCheckBoxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {      
      const value = event.target.value;
      let musicGroups = inputs.musicGroupsToShareWith;
      if (musicGroups.length > 0){
        const index = musicGroups.indexOf(value);
        if (index !== -1) {
          musicGroups.splice(index, 1);
          setInputs((values) => ({
            ...values,
            musicGroupsToShareWith: musicGroups
          }));
          return;
        }
      }
      musicGroups.push(value)
      setInputs((values) => ({
        ...values,
        musicGroupsToShareWith: musicGroups
      }));
    }    

    const HandleScoreInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const files = event.target.files;
        if (files && files[0]) {
          const file = files[0];
          const previewUrl = URL.createObjectURL(file);
          setInputs((values) => ({
            ...values,
            [name]: {
              file: file,
              previewUrl: previewUrl,
              uploadUrl: '',
            }
          }));
        }
    }

    const HandleSubmit = async (event: React.FormEvent < HTMLFormElement > ) => {
      // event.preventDefault();
      // // console.log(inputs);
      // //return;
      // setIsPending(true);
      // setApiErrorMessages({
      //   status: '',
      //   messages: ['']
      // });

      // if (
      //   inputs.inputErrors.title == '' &&
      //   inputs.inputErrors.composer == '' &&
      //   inputs.inputErrors.score == '' &&
      //   inputs.inputErrors.audioFile == ''
      // ) {
      //   const result = await UploadFiles(inputs);
      //   if (result.success) {
      //     const finalPostData = {
      //       ...result.postData,
      //       title: inputs.title,
      //       description: inputs.description,
      //       composer: inputs.composer,
      //       lyrics: inputs.lyrics,
      //       is_published: inputs.publish,
      //       is_visible: inputs.visible,
      //       music_groups_to_share_with: inputs.musicGroupsToShareWith,
      //     }
      //     const response = await UploadMusic(finalPostData);
      //     if (response !== void({})) {
      //       // console.log(res.data);
      //       if (response.status === 'fail') {
      //         await DeleteFiles(result.uploadedAudios);
      //         await DeleteFiles(result.uploadedFiles);
      //         setApiErrorMessages({
      //           status: 'fail',
      //           messages: response.error_messages
      //         });
      //         setIsPending(false);
      //         alertDialogTrigger.current?.click();
      //         return;
      //       } else if (response.status === 'success') {
      //         //console.log(response.data);
      //         router.push(`/dashboard/my-music/${response.data.id}`);
      //         setIsPending(false);
      //       }
      //     }
      //     setIsPending(false);
      //     return;
      //   }else{
      //     setApiErrorMessages({
      //       status: 'fail',
      //       messages: ['Sorry an error occured while uploading your data. Please try again.']
      //     });
      //     setIsPending(false);
      //     alertDialogTrigger.current?.click();
      //     return;          
      //   }
      // }
    }    

return (
    <>
      {isPending && (
      <FullPageLoadingIndicator />
      )}
      <div>
        <ApiFeedbackAlertDialog alertDialogTrigger={alertDialogTrigger} apiFeedback={apiErrorMessages} />
        <form onSubmit={HandleSubmit} className="space-y-3">
          <div
            className="flex justify-center items-center flex-col rounded-lg bg-gray-50 dark:bg-gray-900 px-2 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
              {music.title}
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
              onChange={HandleScoreInputChange} accept="image/png, image/jpg, image/jpeg, .pdf" />
                <div className="my-2 w-fit flex justify-center items-center gap-8">
                  <Link href={music.score.url} target="__blank"
                    className="p-2 flex flex-col justify-center items-center gap-2 border border-dashed border-red-500 rounded-lg">
                    <div className="text-sm underline">Current score</div>
                    <FileIcon className="w-10 h-10 text-amber-500" />
                  </Link>
                  {inputs.score.file &&
                    <Link href={inputs.score.previewUrl} target="__blank"
                      className="p-2 flex flex-col justify-center items-center gap-2 border border-dashed border-red-500 rounded-lg">
                      <div className="text-sm underline">Selected for upload</div>
                      <FileIcon className="w-10 h-10 text-amber-500" />
                    </Link>
                  }              
                </div>
            <div className={ inputs.inputErrors.score ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputs.inputErrors.score}
            </div>
          </div>
          <div className="w-full mb-4">
            <div className='mb-1 mt-4 block text-sm font-medium'>Audio:<span className="text-red-600">*</span></div>
            <div className="mb-2">
              <div className='w-full my-2'>
                <audio controls className='w-full my-2'>
                  <source src={inputs.audioFile.url} type='audio/mpeg' />
                  <source src={inputs.audioFile.url} type='audio/mp4' />
                  <source src={inputs.audioFile.url} type='audio/ogg' />
                  <source src={inputs.audioFile.url} type='audio/wav' />
                  <source src={inputs.audioFile.url} type='audio/aac' />
                  <source src={inputs.audioFile.url} type='audio/m4a' />
                  <p>
                    Your browser doesn't support this audio file.
                  </p>
                </audio>
              </div>
            </div>              
            <AudioInput SegmentIndex={null} segmentComponentIndex={null} inputs={inputs} setInputs={setInputs} />
          </div>
          <div className="w-full mb-4">
            <TextArea rows={20} label="Lyrics" id="lyrics" name="lyrics" placeholder="Type music lyrics here" required
              value={inputs.lyrics || '' } onChange={HandleInputChange} />
            <div className={ inputs.inputErrors.lyrics ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputs.inputErrors.lyrics}
            </div>
          </div>
          {inputs.segments.length > 0 && inputs.segments.map((segment, index) => {
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
                segment.segmentComponents.length > 0 && segment.segmentComponents.map((segmentComponent, componentIndex) => {
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
                        <div className='mb-1 mt-4 block text-sm font-medium'>Audio:<span className="text-red-600">*</span></div>
                        <div className="mb-2">
                          <div className='w-full my-2'>
                            <audio controls className='w-full my-2'>
                              <source src={segmentComponent.audioFile.url} type='audio/mpeg' />
                              <source src={segmentComponent.audioFile.url} type='audio/mp4' />
                              <source src={segmentComponent.audioFile.url} type='audio/ogg' />
                              <source src={segmentComponent.audioFile.url} type='audio/wav' />
                              <source src={segmentComponent.audioFile.url} type='audio/aac' />
                              <source src={segmentComponent.audioFile.url} type='audio/m4a' />
                              <p>
                                Your browser doesn't support this audio file.
                              </p>
                            </audio>
                          </div>
                        </div>              
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
          <div>
            <div className="mb-1 mt-4 block text-sm font-medium">Share with:</div>
            <div className='ps-2 mb-2 flex justify-start items-center gap-2'>
              <input type="checkbox" id="publish" name="publish" checked={inputs.publish}
                onChange={(e) => {setInputs((values) => ({...values, publish: !values.publish}));}} />
              <label htmlFor="publish">Public</label>
            </div>
            {musicGroups !== null &&(
              <>
                {
                  musicGroups.map((group, index) => {
                    return (
                      <div key={index} className='ps-2 mb-2 flex justify-start items-center gap-2'>
                        <input type="checkbox" id={`group-${group.id}`} name={`group-${group.id}`}
                        value={group.id}
                        checked = {inputs.musicGroupsToShareWith.includes(group.id)}
                        onChange={(e) => {HandleMusicGroupsCheckBoxInputChange(e)}}/>
                        <label htmlFor={`group-${group.id}`}>{`${group.group_name}`}</label>
                      </div>
                    );
                  })
                }
              </>
            )
            }
          </div>
          <div className='my-4'>
            <p>Make visible immediately after update (without reviewing)?</p>
            <div className='ps-2 mb-2 flex justify-start items-center gap-2'>
              <input type="radio" id="notVisibleAfterUpload" name="visibleAfterUpload" checked={!inputs.visible}
                onChange={(e) => {setInputs((values) => ({...values, visible: false}));}} />
              <label htmlFor="notVisibleAfterUpload">No</label>
            </div>                            
            <div className='ps-2 mb-2 flex justify-start items-center gap-2'>
              <input type="radio" id="visibleAfterUpload" name="visibleAfterUpload" checked={inputs.visible}
                onChange={(e) => {setInputs((values) => ({...values, visible: true}));}} />
              <label htmlFor="visibleAfterUpload">Yes</label>
            </div>
          </div>
          <ActionButton className='mt-4 w-full flex justify-center items-center' disabled={isPending}>
            {isPending? 'Saving...': 'Save'}
          </ActionButton>
        </div>
      </div>
    </form>
  </div>     
{/* <>
  {isPending && (
    <FullPageLoadingIndicator />
  )}
  <ApiFeedbackAlertDialog alertDialogTrigger={alertDialogTrigger} apiFeedback={apiErrorMessages} />
  <div>
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="leading-none tracking-tight">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <div className="w-fit flex justify-center items-center gap-2">
                <div className="font-bold text-3xl">
                  {music.title}
                </div>
                <AccordionTrigger>
                  <PencilSquareIcon className="w-5" />
                </AccordionTrigger>
              </div>
              <AccordionContent>
                <form action="">
                  <div className="w-full mb-4">
                    <TextInput label="Title" type="text" id="title" name="title" placeholder="Music title" required
                      autoComplete="on" />
                  </div>
                  <ActionButton>Update Title</ActionButton>
                </form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="text-sm text-muted-foreground">
          <div className="mb-2">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <div className="w-fit flex justify-center items-center gap-2">
                  <div>
                    Description
                  </div>
                  <AccordionTrigger>
                    <PencilSquareIcon className="w-5" />
                  </AccordionTrigger>
                </div>
                <div className='w-full my-2'>
                  {music.description}
                </div>
                <AccordionContent>
                  <form action="">
                    <div className="w-full mb-4">
                      <TextArea label="Description" rows={3} id="description" name="description" required />
                      </div>
                      <ActionButton>Update Description</ActionButton>
                    </form>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div>

              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <div className="w-fit flex justify-center items-center gap-2">
                    <div>
                      Composer: {music.composer}
                    </div>
                    <AccordionTrigger>
                      <PencilSquareIcon className="w-5" />
                    </AccordionTrigger>
                  </div>
                  <AccordionContent>
                    <form action="">
                      <div className="w-full mb-4">
                        <TextInput label="Composer" type="text" id="composer" name="composer"
                          placeholder="Music composer" required autoComplete="on" />
                      </div>
                      <ActionButton>Update Composer</ActionButton>
                    </form>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            </div>
          </div>
          <div className="p-6 pt-0">
            <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <div className="w-fit flex justify-center items-center gap-4">
                    <div>
                      Score:
                    </div>
                    <div className="w-fit">
                      <Link
                        href={music.score}
                        target="__blank" className="w-fit">
                      <FileIcon className="w-10 h-10 text-amber-500" />
                      </Link>
                    </div>
                    <AccordionTrigger>
                      <PencilSquareIcon className="w-5" />
                    </AccordionTrigger>
                  </div>
                  <AccordionContent>
                    <form action="">
                      <div className="w-full mb-4">
                        <FileInput label="Score" id="score" name="score" required accept="image/png, image/jpg, image/jpeg, .pdf" />
                      </div>
                      <ActionButton>Update Score</ActionButton>
                    </form>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="mb-2">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <div>
                    Audio:
                  </div>
                  <div className="w-full flex justify-center items-center gap-2">
                    <div className='flex-1 my-2'>
                      <audio controls className='w-full'>
                        <source src={music.audio} type="audio/wav" />
                        <p>
                          Your browser doesn't support this audio file. Here is a
                          <a href={music.audio}>link to the audio</a> instead.
                        </p>
                      </audio>
                    </div>
                    <AccordionTrigger>
                      <PencilSquareIcon className="w-5" />
                    </AccordionTrigger>
                  </div>
                  <AccordionContent>
                    <form action="">
                      <div className="w-full mb-2">
                        <AudioInput SegmentIndex={null} segmentComponentIndex={null} inputs={inputs}
                          setInputs={setInputs} />
                      </div>
                      <ActionButton>Update Audio</ActionButton>
                    </form>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="mb-2">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <div className="w-fit flex justify-center items-center gap-2">
                    <div>
                      Lyrics
                    </div>
                    <AccordionTrigger>
                      <PencilSquareIcon className="w-5" />
                    </AccordionTrigger>
                  </div>
                  <AccordionContent>
                    <form action="">
                      <div className="w-full mb-4">
                        <TextArea label="Lyrics"
                        rows={20}                          
                          id="lyrics" name="lyrics" required />
                      </div>
                      <ActionButton>Update Lyrics</ActionButton>
                    </form>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>            
            <div className="pt-4">
              <div className="font-bold text-2xl">Breakdown</div>
              <div className="mt-4 border p-2 rounded-lg  bg-sky-200 dark:bg-black">
                <div className='w-full flex justify-end items-center'>
                  <button onClick={()=> ({})} type='button' className='text-red-500 gap-1 text-3xl
                    md:text-5xl'>
                    <TrashIcon className="w-7" />
                  </button>
                </div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <div className="w-fit flex justify-center items-center gap-2">
                      <div className="text-amber-600 text-2xl font-bold">
                        Chorus
                      </div>
                      <AccordionTrigger>
                        <PencilSquareIcon className="w-5" />
                      </AccordionTrigger>
                    </div>
                    <AccordionContent>
                      <form action="">
                        <div className="w-full mb-4">
                          <TextInput label="Segment Title" type="text" id="segmentTitle" name="segmentTitle"
                            placeholder="Segment title" required autoComplete="on" />
                        </div>
                        <ActionButton>Update Segment Title</ActionButton>
                      </form>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="mt-2 border p-2 rounded-lg  bg-slate-200 dark:bg-gray-900">
                  <div className='w-full flex justify-end items-center'>
                    <button onClick={()=> ({})} type='button'
                      className='text-red-500 gap-1 text-2xl'>
                      <TrashIcon className="w-5" />
                    </button>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <div className="w-fit flex justify-center items-center gap-2">
                            <div className="text-lg font-bold">
                              All:
                            </div>
                            <AccordionTrigger>
                              <PencilSquareIcon className="w-5" />
                            </AccordionTrigger>
                          </div>
                          <AccordionContent>
                            <form action="">
                              <div className="w-full mb-4">
                                <TextInput label="Component Title" type="text" id="componentTitle" name="componentTitle"
                                  placeholder="Component title" required autoComplete="on" />
                              </div>
                              <ActionButton>Update Component Title</ActionButton>
                            </form>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      <div className="w-full flex justify-center items-center gap-2">
                        <div className='flex-1 my-2'>
                          <audio controls className='w-full'>
                            <source src='/assets/audio/baraka_top_top.wav' type="audio/wav" />
                            <p>
                              Your browser doesn't support this audio file. Here is a
                              <a href="/assets/audio/baraka_top_top.wav">link to the audio</a> instead.
                            </p>
                          </audio>
                        </div>
                        <AccordionTrigger>
                          <PencilSquareIcon className="w-5" />
                        </AccordionTrigger>
                      </div>
                      <AccordionContent>
                        <form action="">
                          <div className="w-full mb-2">
                            <AudioInput SegmentIndex={null} segmentComponentIndex={null} inputs={inputs}
                              setInputs={setInputs} />
                          </div>
                          <ActionButton>Update Audio</ActionButton>
                        </form>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="mt-2 border p-2 rounded-lg  bg-slate-200 dark:bg-gray-900">
                  <div className='w-full flex justify-end items-center'>
                    <button onClick={()=> ({})} type='button'
                      className='text-red-500 gap-1 text-2xl'>
                      <TrashIcon className="w-5" />
                    </button>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <div className="w-fit flex justify-center items-center gap-2">
                            <div className="text-lg font-bold">
                              Soprano:
                            </div>
                            <AccordionTrigger>
                              <PencilSquareIcon className="w-5" />
                            </AccordionTrigger>
                          </div>
                          <AccordionContent>
                            <form action="">
                              <div className="w-full mb-4">
                                <TextInput label="Component Title" type="text" id="componentTitle" name="componentTitle"
                                  placeholder="Component title" required autoComplete="on" />
                              </div>
                              <ActionButton>Update Component Title</ActionButton>
                            </form>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      <div className="w-full flex justify-center items-center gap-2">
                        <div className='flex-1 my-2'>
                          <audio controls className='w-full'>
                            <source src='/assets/audio/baraka_top_top.wav' type="audio/wav" />
                            <p>
                              Your browser doesn't support this audio file. Here is a
                              <a href="/assets/audio/baraka_top_top.wav">link to the audio</a> instead.
                            </p>
                          </audio>
                        </div>
                        <AccordionTrigger>
                          <PencilSquareIcon className="w-5" />
                        </AccordionTrigger>
                      </div>
                      <AccordionContent>
                        <form action="">
                          <div className="w-full mb-2">
                            <AudioInput SegmentIndex={null} segmentComponentIndex={null} inputs={inputs}
                              setInputs={setInputs} />
                          </div>
                          <ActionButton>Update Audio</ActionButton>
                        </form>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                                <div className="mt-2 border p-2 rounded-lg  bg-slate-200 dark:bg-gray-900">
                  <div className='w-full flex justify-end items-center'>
                    <button onClick={()=> ({})} type='button'
                      className='text-red-500 gap-1 text-2xl'>
                      <TrashIcon className="w-5" />
                    </button>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <div className="w-fit flex justify-center items-center gap-2">
                            <div className="text-lg font-bold">
                              Alto:
                            </div>
                            <AccordionTrigger>
                              <PencilSquareIcon className="w-5" />
                            </AccordionTrigger>
                          </div>
                          <AccordionContent>
                            <form action="">
                              <div className="w-full mb-4">
                                <TextInput label="Component Title" type="text" id="componentTitle" name="componentTitle"
                                  placeholder="Component title" required autoComplete="on" />
                              </div>
                              <ActionButton>Update Component Title</ActionButton>
                            </form>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      <div className="w-full flex justify-center items-center gap-2">
                        <div className='flex-1 my-2'>
                          <audio controls className='w-full'>
                            <source src='/assets/audio/baraka_top_top.wav' type="audio/wav" />
                            <p>
                              Your browser doesn't support this audio file. Here is a
                              <a href="/assets/audio/baraka_top_top.wav">link to the audio</a> instead.
                            </p>
                          </audio>
                        </div>
                        <AccordionTrigger>
                          <PencilSquareIcon className="w-5" />
                        </AccordionTrigger>
                      </div>
                      <AccordionContent>
                        <form action="">
                          <div className="w-full mb-2">
                            <AudioInput SegmentIndex={null} segmentComponentIndex={null} inputs={inputs}
                              setInputs={setInputs} />
                          </div>
                          <ActionButton>Update Audio</ActionButton>
                        </form>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                                <div className="mt-2 border p-2 rounded-lg  bg-slate-200 dark:bg-gray-900">
                  <div className='w-full flex justify-end items-center'>
                    <button onClick={()=> ({})} type='button'
                      className='text-red-500 gap-1 text-2xl'>
                      <TrashIcon className="w-5" />
                    </button>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <div className="w-fit flex justify-center items-center gap-2">
                            <div className="text-lg font-bold">
                              Tenor:
                            </div>
                            <AccordionTrigger>
                              <PencilSquareIcon className="w-5" />
                            </AccordionTrigger>
                          </div>
                          <AccordionContent>
                            <form action="">
                              <div className="w-full mb-4">
                                <TextInput label="Component Title" type="text" id="componentTitle" name="componentTitle"
                                  placeholder="Component title" required autoComplete="on" />
                              </div>
                              <ActionButton>Update Component Title</ActionButton>
                            </form>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      <div className="w-full flex justify-center items-center gap-2">
                        <div className='flex-1 my-2'>
                          <audio controls className='w-full'>
                            <source src='/assets/audio/baraka_top_top.wav' type="audio/wav" />
                            <p>
                              Your browser doesn't support this audio file. Here is a
                              <a href="/assets/audio/baraka_top_top.wav">link to the audio</a> instead.
                            </p>
                          </audio>
                        </div>
                        <AccordionTrigger>
                          <PencilSquareIcon className="w-5" />
                        </AccordionTrigger>
                      </div>
                      <AccordionContent>
                        <form action="">
                          <div className="w-full mb-2">
                            <AudioInput SegmentIndex={null} segmentComponentIndex={null} inputs={inputs}
                              setInputs={setInputs} />
                          </div>
                          <ActionButton>Update Audio</ActionButton>
                        </form>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                                <div className="mt-2 border p-2 rounded-lg  bg-slate-200 dark:bg-gray-900">
                  <div className='w-full flex justify-end items-center'>
                    <button onClick={()=> ({})} type='button'
                      className='text-red-500 gap-1 text-2xl'>
                      <TrashIcon className="w-5" />
                    </button>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <div className="w-fit flex justify-center items-center gap-2">
                            <div className="text-lg font-bold">
                              Bass:
                            </div>
                            <AccordionTrigger>
                              <PencilSquareIcon className="w-5" />
                            </AccordionTrigger>
                          </div>
                          <AccordionContent>
                            <form action="">
                              <div className="w-full mb-4">
                                <TextInput label="Component Title" type="text" id="componentTitle" name="componentTitle"
                                  placeholder="Component title" required autoComplete="on" />
                              </div>
                              <ActionButton>Update Component Title</ActionButton>
                            </form>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      <div className="w-full flex justify-center items-center gap-2">
                        <div className='flex-1 my-2'>
                          <audio controls className='w-full'>
                            <source src='/assets/audio/baraka_top_top.wav' type="audio/wav" />
                            <p>
                              Your browser doesn't support this audio file. Here is a
                              <a href="/assets/audio/baraka_top_top.wav">link to the audio</a> instead.
                            </p>
                          </audio>
                        </div>
                        <AccordionTrigger>
                          <PencilSquareIcon className="w-5" />
                        </AccordionTrigger>
                      </div>
                      <AccordionContent>
                        <form action="">
                          <div className="w-full mb-2">
                            <AudioInput SegmentIndex={null} segmentComponentIndex={null} inputs={inputs}
                              setInputs={setInputs} />
                          </div>
                          <ActionButton>Update Audio</ActionButton>
                        </form>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="w-full my-4 flex justify-end">
                  <Button onClick={()=>({})} type='button'><MdAddCircleOutline className='me-1'/> Add segment component</Button>
                </div>
              </div>
              <div className="w-full my-4 flex justify-center items-center">
                <Button onClick={()=>({})} type='button'><MdAddCircleOutline className='me-1'/> Add segment</Button>
              </div>
            </div>
          </div>
        </div>
      </div>    
</> */}
</>
);
}