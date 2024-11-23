'use client'

import { Inputs } from '@/app/lib/definitions';
import { MicrophoneIcon} from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';
import { BsUpload } from 'react-icons/bs';
import AudioRecorder from './input-fields/audio-recorder';
import FileInput from './input-fields/file-input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MdClose } from 'react-icons/md';
import { RemoveSegmentComponentUploadAudioFile, RemoveAudioFileSelectedForUpload } from '@/app/dashboard/lib/utils';

type SetInputs = React.Dispatch<React.SetStateAction<Inputs>>
const AudioInput = (
  {SegmentIndex, segmentComponentIndex, inputs, setInputs}:
  {SegmentIndex: any; segmentComponentIndex: any; inputs: Inputs; setInputs: SetInputs}
) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioInputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');


const HandleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const files = event.target.files;
        if (files && files[0]) {
          const file = files[0];
          const previewUrl = URL.createObjectURL(file);
          if (SegmentIndex === null) {
            setInputs((values) => ({
              ...values,
              [name]: {
                file: file,
                url: values.audioFile.url,
                previewUrl: previewUrl,
                uploadUrl: '',
                publicId: values.audioFile.publicId,
              }
            }));
          }else {
            const newInputs = {...inputs};
            newInputs.segments[SegmentIndex].segmentComponents[segmentComponentIndex].audioFile = {
              ...newInputs.segments[SegmentIndex].segmentComponents[segmentComponentIndex].audioFile,
              file: file,
              previewUrl: previewUrl,
              uploadUrl: '',
            };
            setInputs((values) => ({
              ...newInputs
            }));
          }
        setPreviewUrl(previewUrl);
        if(audioRef.current){
          audioRef.current.pause();
          audioRef.current.load();
        }
        }
    }
  return (
    <div className="w-full mb-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className='border-none'>
          <div className="w-fit flex justify-center items-center gap-2">
            <AccordionTrigger className='py-2'>
                <div className='flex gap-2 md:gap-4 justify-center items-center'>
                  <p>Select file</p>
                  <BsUpload className='' />
                </div>
            </AccordionTrigger>
          </div>
          <AccordionContent>
            <FileInput
              ref={audioInputRef}
              description='(Select a clear audio file preferably, a piece recorded in a studio setup or live performance.)'
              id={SegmentIndex === null? "audioFile" : `audioFile-${SegmentIndex}-${segmentComponentIndex}`}
              name={SegmentIndex === null? "audioFile" : `audioFile-${SegmentIndex}-${segmentComponentIndex}`}
              onChange={HandleFileInputChange} accept="audio/mpeg, audio/mp4, audio/ogg, audio/wav, audio/aac, audio/m4a, " />
          </AccordionContent>
        </AccordionItem>
          <AccordionItem value="item-2" className='border-none'>
          <div className="w-fit flex justify-center items-center gap-2">
            <AccordionTrigger className='py-2'>
                <div className='flex gap-2 md:gap-4 justify-center items-center'>
                  <p>Record</p>
                  <MicrophoneIcon className='w-5' />
                </div>
            </AccordionTrigger>
          </div>
          <AccordionContent>
            <AudioRecorder SegmentIndex={SegmentIndex} segmentComponentIndex={segmentComponentIndex} inputs={inputs} setInputs={setInputs} audioRef={audioRef} setPreviewUrl={setPreviewUrl} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {previewUrl &&
      <div className='relative border-2 border-dashed border-amber-500 p-2 rounded'>
        {SegmentIndex === null ?
          <button type='button' className='absolute top-0 end-0' onClick={(e) => {RemoveAudioFileSelectedForUpload(setInputs, audioInputRef, setPreviewUrl)}}>
            <MdClose className='w-8 h-8 text-red-700'/>
          </button>:
          <button type='button' className='absolute top-0 end-0' onClick={(e) => {RemoveSegmentComponentUploadAudioFile(inputs, setInputs, SegmentIndex, segmentComponentIndex, audioInputRef, setPreviewUrl)}}>
            <MdClose className='w-8 h-8 text-red-700'/>
          </button>        
        }
        <div className='text-red-500'>Audio Input Preview</div>
        <audio controls ref={audioRef} className='w-full my-2'>
          <source src={previewUrl} type='audio/mpeg' />
          <source src={previewUrl} type='audio/mp4' />
          <source src={previewUrl} type='audio/ogg' />
          <source src={previewUrl} type='audio/wav' />
          <source src={previewUrl} type='audio/aac' />
          <source src={previewUrl} type='audio/m4a' />
          <p>
            Your browser doesn't support this audio file.
          </p>
        </audio>
      </div>
      }
      <div className={ inputs.inputErrors.audioFile ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
        {inputs.inputErrors.audioFile}
      </div>
    </div>
  );
}
export default AudioInput;