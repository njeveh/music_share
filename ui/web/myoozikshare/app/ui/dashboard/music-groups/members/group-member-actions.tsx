"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { MusicGroup, MusicGroupMember } from '@/app/lib/definitions';
import { HandleMusicGroupMemberActions } from '@/app/lib/actions/music-groups';
import { useState } from "react";
import { Spinner } from "@/app/ui/components/animators";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CheckIcon } from "@heroicons/react/24/outline";

const GroupMemberActions = (
  {slug, musicGroup, musicGroupMember} :
  {slug: any; musicGroup: MusicGroup; musicGroupMember: MusicGroupMember}
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();


  async function handleAction(id: any, feedback: string) {
    setRequestStatus('');
    setIsLoading(true);
    const status = (await HandleMusicGroupMemberActions(slug, id, feedback)).status;
    if (status == 'success') {
      setRequestStatus('success');

      //trigger a page rerender to reflect new membership status
      const params = new URLSearchParams(searchParams);
      replace(`${pathname}?${params.toString()}`);
    }
    else {
      setRequestStatus('fail');
    }
    setIsLoading(false);
  }

  return (
    <>
    {(musicGroup.is_super_admin || !musicGroupMember.is_super_admin) &&
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {requestStatus == ''?  (
          <div>
            {isLoading ? (
              <Button variant="outline" className="w-24" disabled>
                <Spinner customClasses='w-8 h-8' />
              </Button>
            ) : (
          <Button variant="outline">
            Actions
            <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          </Button>
            )}
        </div>
      )
      : requestStatus == 'success'? (
          <Button variant="outline" className="text-green-600">
            <span className="">success</span>
            <CheckIcon className="w-6 h-6" />
          </Button>
      ):
       requestStatus == 'fail' &&
          <Button variant="outline">
            <span className="text-red-500">Request failed try again</span>
            <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          </Button>
      }
    </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!musicGroupMember.is_admin && (
          <>
            <DropdownMenuItem>
              <button type='button' onClick={e => {handleAction(musicGroupMember.id, 'make_admin')}}>Make admin</button>
            </DropdownMenuItem>
          </>
        )}
        {!musicGroupMember.is_super_admin && musicGroupMember.is_admin && (
          <>
            <DropdownMenuItem>
              <button type='button' onClick={e => {handleAction(musicGroupMember.id, 'make_super_admin')}}>Make super admin</button>
            </DropdownMenuItem>
          </>
        )}
        {!musicGroup.is_super_admin && musicGroupMember.is_admin && (
          <>
            <DropdownMenuItem>
              <button type='button' onClick={e => {handleAction(musicGroupMember.id, 'remove_admin')}}>Remove admin</button>
            </DropdownMenuItem>
          </>
        )} 
        {musicGroup.is_super_admin && (
          <>
            {musicGroupMember.is_admin && (
              <>
                <DropdownMenuItem>
                  <button type='button' onClick={e => {handleAction(musicGroupMember.id, 'remove_admin')}}>Remove admin</button>
                </DropdownMenuItem>
              </>
            )}                                  
            {musicGroupMember.is_super_admin && (
              <>
                <DropdownMenuItem>
                  <button type='button' onClick={e => {handleAction(musicGroupMember.id, 'remove_super_admin')}}>Remove super admin</button>
                </DropdownMenuItem>
              </>
            )}
          </>
        )}        

        {!musicGroup.is_super_admin && !musicGroupMember.is_super_admin && (
          <>
            <DropdownMenuItem>
              <button type='button' onClick={e => {handleAction(musicGroupMember.id, 'remove')}}>
                <span className="text-red-600">Remove</span>
              </button>
            </DropdownMenuItem>
          </>
        )}
        {musicGroup.is_super_admin && (
          <>
            <DropdownMenuItem>
              <button type='button' onClick={e => {handleAction(musicGroupMember.id, 'remove')}}>
                <span className="text-red-600">Remove</span>
              </button>
            </DropdownMenuItem>
          </>
        )}       
      </DropdownMenuContent>
    </DropdownMenu>
}
    </>
  );
}

export default GroupMemberActions;