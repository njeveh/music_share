"use client"

import Footer from '@/app/ui/components/footer/footer';
import { SongCard } from '@/app/ui/components/music-card';
import Link from 'next/link';
import { ActionsDropdownMenu } from "@/app/ui/components/actions-dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MusicGroup } from '@/app/lib/definitions';
import { getMyMusicGroup } from '@/app/lib/actions/music-groups';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const cards = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

return (
<>
  <div className='w-full flex justify-end items-center'>
    <ActionsDropdownMenu title='Options'>
      <DropdownMenuItem>
        <Link href={'/dashboard/music-group'}>Visit</Link>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={()=> ({})}>
        Leave
      </DropdownMenuItem>
    </ActionsDropdownMenu>
  </div>
  <div className='w-full flex justify-center items-center ssp-font-family p-4 md:p-6'>
    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 min-[500px]:grid-cols-2">
      {cards.map((card, key) => {
        return (
        <SongCard key={key} title='Sifa na Utukufu Vyote ni Kwa Mungu' composer='John M. Doe' link='/dashboard/music-breakdown' />
        );
      })
    }
    </div>
  </div>       
  <Footer />
</>
);
}