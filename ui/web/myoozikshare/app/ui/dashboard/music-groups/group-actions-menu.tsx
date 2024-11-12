"use client";

import Link from 'next/link';
import * as React from "react"
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MusicGroup } from '@/app/lib/definitions';
import LeaveGroupButton from './leave-group-button';
const GroupActionsMenu = ({slug, musicGroup} : {slug: any; musicGroup: MusicGroup}) => {
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <button type='button' className='flex flex-col justify-center items-center gap-2'>
            <DotsVerticalIcon className='text-2xl w-8 h-8' />
          </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {musicGroup.is_admin && 
          <>
            <DropdownMenuItem>
              <Link href={`/dashboard/my-music-groups/${slug}/members/requests`}>Membership requests</Link>
            </DropdownMenuItem>        
          </>
        }
        <DropdownMenuItem>
          <Link href={`/dashboard/my-music-groups/${slug}/members`}>Members</Link>
        </DropdownMenuItem>
        {musicGroup.is_admin && 
          <>
            <DropdownMenuItem>
              <Link href={`/dashboard/my-music-groups/${slug}/settings`}>Settings</Link>
            </DropdownMenuItem>          
          </>
        }        
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
}

export default GroupActionsMenu;