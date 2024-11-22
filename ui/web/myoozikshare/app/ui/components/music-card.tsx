import { Music } from '@/app/lib/definitions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MdLibraryMusic } from 'react-icons/md';
  
  export async function MusicCard({
    music
  }: {
    music: Music
  }) {

    return (
    <>
      <div
        className="scale-100 p-4 flex flex-col justify-start items-center col-span-1 bg-slate-200 dark:bg-gray-900 rounded-2xl shadow-lg shadow-slate-300 motion-safe:hover:scale-[1.01] transition-all duration-250">
        <div className='w-full flex justify-center items-center'>
          <MdLibraryMusic className='w-20 h-20 md:w-32 md:h-32 text-amber-500' />
        </div>
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
        <div className="w-full mb-2">
          <h3 className="text-sm font-medium">{music.title}</h3>
        <div>Composer: {music.composer}</div>
        <div>Posted by: {music.author}</div>
        </div>
        <div>
          <Link href={`/music-breakdown/${music.id}`}>
            <Button>See breakdown</Button>
          </Link>
        </div>
      </div>
    </>
    );
  }
  