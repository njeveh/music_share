import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FileIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const Page = () => {
  return ( 
    <>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Top! Top!</CardTitle>
            <CardDescription>
              <div>Composer: John M. Doe</div>
              <div>Posted by: Jane Doe</div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div>
                Score
              </div>
              <div className="w-fit">
                <Link
                  href={'https://www.swahilimusicnotes.com/song/download/45804/pdf/1684320038-utushibishe-kwa-fadhili-zako.pdf'}
                  target="__blank" className="w-fit">
                <FileIcon className="w-10 h-10 text-amber-500" />
                </Link>
              </div>
            </div>
            <div className="mb-2">
              <div>Audio</div>
              <div className='w-full my-2'>
                <audio controls className='w-full'>
                  <source src='/assets/audio/top_top.mp3' type="audio/mp3" />
                  <p>
                    Your browser doesn't support this audio file. Here is a
                    <a href="/assets/audio/top_top.mp3">link to the audio</a> instead.
                  </p>
                </audio>
              </div>
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
          </CardContent>
          {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
        </Card>

      </div>
    </>
  );
}

export default Page;