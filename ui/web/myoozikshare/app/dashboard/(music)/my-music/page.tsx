import MyMusicCards from '@/app/ui/dashboard/music/my-music-cards';
import { lusitana } from '@/app/ui/fonts';
import { MusicCardsSkeleton } from '@/app/ui/skeletons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

return (
<>
  <div className="w-full p-2 flex justify-end items-center">
    <Link href={'/dashboard/my-music/add-music'}>
      <Button type="button">
        <MdAddCircleOutline className='me-1'/>Add music
      </Button>
    </Link>
  </div>
  <div className='w-full flex justify-center items-center p-2'>
    <h1 className={`${lusitana.className} mb-3 text-2xl`}>
      My Music
    </h1>  
  </div>
  <Suspense key={query + currentPage} fallback={<MusicCardsSkeleton />}>
    <MyMusicCards query={query} currentPage={currentPage} />     
  </Suspense>
</>
);
}