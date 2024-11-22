import Navbar from './ui/components/navbar/navbar';
import Footer from './ui/components/footer/footer';
import PublicMusicCards from './ui/components/public-music-cards';
import { Suspense } from 'react';
import { MusicCardsSkeleton } from './ui/skeletons';

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
  <Navbar />
  <main className="px-2 pb-[100px]">
    <Suspense key={query + currentPage} fallback={<MusicCardsSkeleton />}>
      <PublicMusicCards query={query} currentPage={currentPage} />     
    </Suspense>     
  </main>
  <Footer />
</>
);
}