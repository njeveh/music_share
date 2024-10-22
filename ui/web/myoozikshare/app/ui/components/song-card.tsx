import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MdLibraryMusic } from 'react-icons/md';
  
  export function SongCard({
    title,
    composer,
    link,
  }: {
    title: string;
    composer: string;
    link: string;

  }) {
  
    return (
    <>
      <div
        className="scale-100 p-4 flex flex-col justify-start items-center col-span-1 bg-slate-200 dark:bg-gray-900 rounded-2xl shadow-lg shadow-slate-300 motion-safe:hover:scale-[1.01] transition-all duration-250">
        <div className='w-full flex justify-center items-center'>
          <MdLibraryMusic className='w-20 h-20 md:w-32 md:h-32 text-amber-500' />
        </div>
        <div className='w-full my-2'>
          <audio controls className='w-full'>
            <source src='/assets/audio/baraka_top_top.wav' type="audio/wav" />
            <p>
              Your browser doesn't support this audio file. Here is a
              <a href="/assets/audio/baraka_top_top.wav">link to the audio</a> instead.
            </p>
          </audio>
        </div>
        <div className="w-full mb-2">
          <h3 className="text-sm font-medium">{title}</h3>
        <div>Composer: {composer}</div>
        <div>Posted by: Jane Doe</div>
        </div>
        <div>
          <Link href={link}>
            <Button>See breakdown</Button>
          </Link>
        </div>
      </div>
    </>
    );
  }
  