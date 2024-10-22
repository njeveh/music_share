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
import { Inputs } from "@/app/lib/definitions";
import { initialInputs } from "../lib/data";
import { useState } from "react";


const Page = () => {
  const [inputs, setInputs] = useState<Inputs>(initialInputs);
  return ( 
    <>
      <div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none tracking-tight">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <div className="w-fit flex justify-center items-center gap-2">
                    <div className="font-bold text-3xl">
                      Sifa na Utukufu Vyote ni Kwa Mungu eeh! eeh!
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
                  <div>
                    Audio:
                  </div>
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
    </>
  );
}

export default Page;