'use client'

import { PencilSquareIcon } from "@heroicons/react/24/outline";
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


const Page = () => {
  return ( 
    <>
      <div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="font-semibold leading-none tracking-tight">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <div className="w-fit flex justify-center items-center gap-2">
                    <div>
                      Top! Top!
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
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat eaque necessitatibus velit facilis suscipit adipisci consectetur in, tenetur accusantium impedit quam voluptatibus laboriosam sapiente eligendi hic similique aut, ad maiores!
                  </div>
                  <AccordionContent>
                    <form action="">
                      <div className="w-full mb-4">
                        <TextArea label="Description"
                        rows={3}                          
                          id="description" name="description" required />
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
                      Composer: John M. Doe
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
                        href={'https://www.swahilimusicnotes.com/song/download/45804/pdf/1684320038-utushibishe-kwa-fadhili-zako.pdf'}
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
                  <div className="w-fit flex justify-center items-center gap-2">
                    <div>
                      Audio
                    </div>
                    <AccordionTrigger>
                      <PencilSquareIcon className="w-5" />
                    </AccordionTrigger>
                  </div>
                  <div className='w-full my-2'>
                    <audio controls className='w-full'>
                      <source src='/assets/audio/top_top.mp3' type="audio/mp3" />
                      <p>
                        Your browser doesn't support this audio file. Here is a
                        <a href="/assets/audio/top_top.mp3">link to the audio</a> instead.
                      </p>
                    </audio>
                  </div>
                  <AccordionContent>
                    <form action="">
                      <div className="w-full mb-4">
                        <FileInput label="Audio"
                          description='(Select a clear audio file preferably, a piece recorded in a studio setup or live performance. A midi file would be the next best option.)'
                          id="audioFile" name="audioFile" required accept="audio/*" />
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
              <div className="font-bold">Breakdown</div>
              <div className="mt-2 border p-2 rounded-lg  bg-slate-200 dark:bg-gray-900">
                <div className="font-medium">Stanzas</div>
                <div className="p-2">
                  <div>Tenor:</div>
                  <div className='w-full my-2'>
                    <audio controls className='w-full'>
                      <source src='/assets/audio/stanzas.wav' type="audio/wav" />
                      <p>
                        Your browser doesn't support this audio file. Here is a
                        <a href="/assets/audio/stanzas.wav">link to the audio</a> instead.
                      </p>
                    </audio>
                  </div>
                </div>
              </div>

              <div className="mt-2 border p-2 rounded-lg  bg-slate-200 dark:bg-gray-900">
                <div className="font-medium">Chorus</div>
                <div className="p-2">
                  <div>All:</div>
                  <div className='w-full my-2'>
                    <audio controls className='w-full'>
                      <source src='/assets/audio/chorus.wav' type="audio/wav" />
                      <p>
                        Your browser doesn't support this audio file. Here is a
                        <a href="/assets/audio/chorus.wav">link to the audio</a> instead.
                      </p>
                    </audio>
                  </div>
                </div>
                <div className="p-2">
                  <div>Soprano:</div>
                  <div className='w-full my-2'>
                    <audio controls className='w-full'>
                      <source src='/assets/audio/chorus_sop.wav' type="audio/wav" />
                      <p>
                        Your browser doesn't support this audio file. Here is a
                        <a href="/assets/audio/chorus_sop.wav">link to the audio</a> instead.
                      </p>
                    </audio>
                  </div>
                </div>
                <div className="p-2">
                  <div>Alto:</div>
                  <div className='w-full my-2'>
                    <audio controls className='w-full'>
                      <source src='/assets/audio/chorus_alto.wav' type="audio/wav" />
                      <p>
                        Your browser doesn't support this audio file. Here is a
                        <a href="/assets/audio/chorus_alto.wav">link to the audio</a> instead.
                      </p>
                    </audio>
                  </div>
                </div>
                <div className="p-2">
                  <div>Tenor:</div>
                  <div className='w-full my-2'>
                    <audio controls className='w-full'>
                      <source src='/assets/audio/chorus_tenor.wav' type="audio/wav" />
                      <p>
                        Your browser doesn't support this audio file. Here is a
                        <a href="/assets/audio/chorus_tenor.wav">link to the audio</a> instead.
                      </p>
                    </audio>
                  </div>
                </div>
                <div className="p-2">
                  <div>Bass:</div>
                  <div className='w-full my-2'>
                    <audio controls className='w-full'>
                      <source src='/assets/audio/chorus_bass.wav' type="audio/wav" />
                      <p>
                        Your browser doesn't support this audio file. Here is a
                        <a href="/assets/audio/chorus_bass.wav">link to the audio</a> instead.
                      </p>
                    </audio>
                  </div>
                </div>
              </div>

              <div className="mt-2 border p-2 rounded-lg  bg-slate-200 dark:bg-gray-900">
                <div className="font-medium">Conclusion</div>
                <div className="p-2">
                  <div>All:</div>
                  <div className='w-full my-2'>
                    <audio controls className='w-full'>
                      <source src='/assets/audio/conclusion.wav' type="audio/wav" />
                      <p>
                        Your browser doesn't support this audio file. Here is a
                        <a href="/assets/audio/conclusion.wav">link to the audio</a> instead.
                      </p>
                    </audio>
                  </div>
                </div>
                <div className="p-2">
                  <div>Soprano:</div>
                  <div className='w-full my-2'>
                    <audio controls className='w-full'>
                      <source src='/assets/audio/conclusion_sop.wav' type="audio/wav" />
                      <p>
                        Your browser doesn't support this audio file. Here is a
                        <a href="/assets/audio/conclusion_sop.wav">link to the audio</a> instead.
                      </p>
                    </audio>
                  </div>
                </div>
                <div className="p-2">
                  <div>Alto:</div>
                  <div className='w-full my-2'>
                    <audio controls className='w-full'>
                      <source src='/assets/audio/conclusion_alto.wav' type="audio/wav" />
                      <p>
                        Your browser doesn't support this audio file. Here is a
                        <a href="/assets/audio/conclusion_alto.wav">link to the audio</a> instead.
                      </p>
                    </audio>
                  </div>
                </div>
                <div className="p-2">
                  <div>Tenor:</div>
                  <div className='w-full my-2'>
                    <audio controls className='w-full'>
                      <source src='/assets/audio/conclusion_tenor.wav' type="audio/wav" />
                      <p>
                        Your browser doesn't support this audio file. Here is a
                        <a href="/assets/audio/conclusion_tenor.wav">link to the audio</a> instead.
                      </p>
                    </audio>
                  </div>
                </div>
                <div className="p-2">
                  <div>Bass:</div>
                  <div className='w-full my-2'>
                    <audio controls className='w-full'>
                      <source src='/assets/audio/conclusion_bass.wav' type="audio/wav" />
                      <p>
                        Your browser doesn't support this audio file. Here is a
                        <a href="/assets/audio/conclusion_bass.wav">link to the audio</a> instead.
                      </p>
                    </audio>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Page;