import { getMyMusic } from "@/app/lib/actions/music";
import { Music } from "@/app/lib/definitions";
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

const Page = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const slug = (await params).slug
  const music: Music = (await getMyMusic(slug));

  return ( 
    <>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>{music.title}</CardTitle>
            <div  className="text-sm text-muted-foreground">
              <p >Composer: {music.composer}</p>
              <p >Posted by: {music.author}</p>
            </div>
            <div>
              <div>About:</div>
              <p className="text-sm text-muted-foreground">{music.description}</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
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
            </div>
            <div className="mb-2">
              <div>Audio:</div>
              <div className='w-full my-2'>
                <audio controls className='w-full my-2'>
                  <source src={music.audio} type='audio/mpeg' />
                  <source src={music.audio} type='audio/mp4' />
                  <source src={music.audio} type='audio/ogg' />
                  <source src={music.audio} type='audio/wav' />
                  <source src={music.audio} type='audio/aac' />
                  <source src={music.audio} type='audio/m4a' />
                  <p>
                    Your browser doesn't support this audio file.
                  </p>
                </audio>
              </div>
            </div>
            <div className="my-4">
              <div>Lyrics:</div>
              <div className="whitespace-pre-wrap">
                {music.lyrics}
              </div>
            </div>
            <div className="pt-4">
              <div className="font-bold">Breakdown</div>
              {music.music_segments !== null && music.music_segments.length > 0 && (
                <div>
                {music.music_segments.map((segment) => (
                  <div key={segment.id} className="mt-2 border p-2 rounded-lg  bg-slate-200 dark:bg-gray-900">
                    <div className="w-full flex justify-center items-center text-amber-600 text-2xl font-bold">{segment.title}</div>
                    {segment.music_segment_components !== null && segment.music_segment_components.length > 0 && (
                      <div>
                        {segment.music_segment_components.map((component) => (
                          <div key={component.id} className="p-2">
                            <div className="w-full flex justify-start items-center text-lg font-bold" >{component.title}:</div>
                            <div className="mb-2">
                              <div className='w-full my-2'>
                                <audio controls className='w-full my-2'>
                                  <source src={component.audio} type='audio/mpeg' />
                                  <source src={component.audio} type='audio/mp4' />
                                  <source src={component.audio} type='audio/ogg' />
                                  <source src={component.audio} type='audio/wav' />
                                  <source src={component.audio} type='audio/aac' />
                                  <source src={component.audio} type='audio/m4a' />
                                  <p>
                                    Your browser doesn't support this audio file.
                                  </p>
                                </audio>
                              </div>
                            </div>                            
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </>
  );
}

export default Page;