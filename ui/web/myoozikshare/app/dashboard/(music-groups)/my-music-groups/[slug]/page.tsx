import Footer from '@/app/ui/components/footer/footer';
import { SongCard } from '@/app/ui/components/music-card';
import { MusicGroup } from '@/app/lib/definitions';
import { getMyMusicGroup } from '@/app/lib/actions/music-groups';
import { lusitana } from '@/app/ui/fonts';
import GroupActionsMenu from '@/app/ui/dashboard/music-groups/group-actions-menu';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const musicGroup: MusicGroup = (await getMyMusicGroup(slug));
  const cards = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

return (
<>
<div className='w-full fixed top-auto z-10 bg-gray-50 dark:bg-darkmenubg'>
  <div className='relative w-full flex justify-center items-center'>
    <div className={`${lusitana.className} p-2 font-bold`}>{musicGroup.group_name}</div>
    <div className='w-fit absolute end-1 ' >
      <GroupActionsMenu slug={slug} musicGroup={musicGroup} />
    </div>
  </div>
</div>
  <div className='w-full flex justify-center items-center ssp-font-family mt-8 p-4 md:p-6'>
    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 min-[500px]:grid-cols-2">
      {cards.map((card, key) => {
        return (
        <SongCard key={key} title='Sifa na Utukufu Vyote ni Kwa Mungu' composer='John M. Doe' link='/dashboard/music-breakdown' />
        );
      })
    }      
    </div>
  </div>       
</>
);
}