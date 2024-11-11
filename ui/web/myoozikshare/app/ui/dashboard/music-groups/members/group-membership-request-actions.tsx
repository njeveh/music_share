"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { MusicGroup, MusicGroupMembershipRequest } from '@/app/lib/definitions';
import { ActionsDropdownMenu } from '@/app/ui/components/actions-dropdown-menu';
import { HandleMusicGroupMembershipRequestFeedback } from '@/app/lib/actions/music-groups';
import { useState } from "react";
import { Spinner } from "@/app/ui/components/animators";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CheckIcon } from "@heroicons/react/24/outline";

const GroupMembershipRequestActions = (
  {slug, musicGroup, musicGroupMembershipRequest} :
  {slug: any; musicGroup: MusicGroup; musicGroupMembershipRequest: MusicGroupMembershipRequest}
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();


  async function handleAction(id: any, feedback: string) {
    setRequestStatus('');
    setIsLoading(true);
    const status = (await HandleMusicGroupMembershipRequestFeedback(slug, id, feedback)).status;
    if (status == 'success') {
      musicGroupMembershipRequest.status = feedback;
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
          <Button variant="outline" disabled={musicGroupMembershipRequest.status == 'accepted'}
          className={musicGroupMembershipRequest.status == 'accepted'? "text-green-600": "text-red-500" }>
            <span className="">{musicGroupMembershipRequest.status}</span>
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
        {musicGroup.is_admin && (
          <>
            {musicGroupMembershipRequest.status == 'pending' && (
              <>
                <DropdownMenuItem>
                  <button type='button' onClick={e => {handleAction(musicGroupMembershipRequest.id, 'accepted')}}>Accept</button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button type='button' onClick={e => {handleAction(musicGroupMembershipRequest.id, 'rejected')}}>Reject</button>
                </DropdownMenuItem>
              </>
            )}
            {musicGroupMembershipRequest.status == 'rejected' && (
              <>
                <DropdownMenuItem>
                  <button type='button' onClick={e => {handleAction(musicGroupMembershipRequest.id, 'accepted')}}>Accept</button>
                </DropdownMenuItem>
              </>
            )}            
          </>
          
        )}
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
}

export default GroupMembershipRequestActions;