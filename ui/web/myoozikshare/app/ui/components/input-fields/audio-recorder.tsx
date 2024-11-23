'use client'

import { Inputs } from '@/app/lib/definitions';
import { MicrophoneIcon} from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';
import { BsRecordCircle, BsStopCircleFill } from 'react-icons/bs';

type SetInputs = React.Dispatch<React.SetStateAction<Inputs>>
type SetPreviewUrl = React.Dispatch<React.SetStateAction<string>>

const mimeType: string = "audio/webm";
const AudioRecorder = ({
    SegmentIndex,
    segmentComponentIndex,
    inputs,
    setInputs,
    setPreviewUrl,
    audioRef
  }: {
    SegmentIndex: any; segmentComponentIndex: any; inputs: Inputs; setInputs: SetInputs; setPreviewUrl: SetPreviewUrl; audioRef: any
  }) => {
    const [audioChunks, setAudioChunks]: any = useState([]);
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef<any>(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState<any>(null);

    const getMicrophonePermission = async () => {
      if ("MediaRecorder" in window) {
        try {
          const streamData = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
          });
          setPermission(true);
          setStream(streamData);
        } catch (err:any) {
          alert(err.message);
        }
      } else {
        alert("The MediaRecorder API is not supported in your browser.");
      }
    }

    const startRecording = async () => {
      setRecordingStatus("recording");
      //create new Media recorder instance using the stream
      const media = new MediaRecorder(stream, {
        type: mimeType
      });
      //set the MediaRecorder instance to the mediaRecorder ref
      mediaRecorder.current = media;
      //invokes the start method to start the recording process
      mediaRecorder.current.start();
      let localAudioChunks: any = [];
      mediaRecorder.current.ondataavailable = (event: any) => {
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        localAudioChunks.push(event.data);
      };
      setAudioChunks(localAudioChunks);
    }

    const stopRecording = () => {
      setRecordingStatus("inactive");
      //stops the recording instance
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = () => {
        //creates a blob file from the audiochunks data
        const audioBlob = new Blob(audioChunks, {
          type: mimeType
        });
        //creates a playable URL from the blob file.
        const playableUrl = URL.createObjectURL(audioBlob);
        setAudioChunks([]);
        if (SegmentIndex == null) {
          setInputs((prevState) => ({
            ...prevState,
            audioFile: {
              file: audioBlob,
              url: prevState.audioFile.url,
              previewUrl: playableUrl,
              uploadUrl: '',
              publicId: prevState.audioFile.publicId,
            }
          }));
        }else {
            const newInputs = {...inputs};
            newInputs.segments[SegmentIndex].segmentComponents[segmentComponentIndex].audioFile = {
              ...newInputs.segments[SegmentIndex].segmentComponents[segmentComponentIndex].audioFile,
              file: audioBlob,
              previewUrl: playableUrl,
              uploadUrl: '',
            };
            setInputs((values) => ({
              ...newInputs
            }));
        }
        setPreviewUrl(playableUrl);
        if (audioRef.current) {          
          audioRef.current.pause();
          audioRef.current.load();
        }
      };
    }
    return (
      <div>
        <div className="audio-controls">
          {!permission ? (
          <button onClick={getMicrophonePermission} type="button">
            <MicrophoneIcon className='w-8 md:w-10 mt-2' />
          </button>
          ) : null}
          {permission && recordingStatus === "inactive" ? (
          <div className='py-2'>
            <p className='text-xs md:text-sm'>Click the button below to start recording.</p>
            <button onClick={startRecording} type="button">
              <BsRecordCircle className='text-red-500 text-2xl lg:text-4xl' />
            </button>
          </div>
          ) : null}
          {recordingStatus === "recording" ? (
          <div className='py-2'>
            <p className='text-xs md:text-sm'>Recording..</p>
            <p className='text-xs md:text-sm'>Click the button below to stop recording.</p>
            <button onClick={stopRecording} type="button">
              <BsStopCircleFill className='text-red-500 text-2xl lg:text-4xl' />
            </button>
          </div>
          ) : null}
        </div>
      </div>
    );
}
export default AudioRecorder;