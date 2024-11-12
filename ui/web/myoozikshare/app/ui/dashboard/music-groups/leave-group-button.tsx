"use client";

import { HandleMusicGroupMemberActions } from "@/app/lib/actions/music-groups";
import { MusicGroup } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "../../components/animators";
import { CheckIcon } from "@heroicons/react/24/outline";

const LeaveGroupButton = (
  {slug, musicGroup} :
  {slug: any; musicGroup: MusicGroup}
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState('');
  const router = useRouter();

  async function HandleLeaveGroup() {
    setRequestStatus('');
    setIsLoading(true);
    const status = (await HandleMusicGroupMemberActions(slug, musicGroup.member_id, 'leave')).status;
    if (status == 'success') {
      setRequestStatus('success');
      //redirect to my music groups page
      router.replace('/dashboard/my-music-groups')
    }
    else {
      setRequestStatus('fail');
    }
    setIsLoading(false);
  }
    
  return (
    <>
        {requestStatus == ''?  (
          <div>
            {isLoading ? (
              <Button variant="outline" className="w-24" disabled>
                <Spinner customClasses='w-8 h-8' />
              </Button>
            ) : (
              <Button type="button" variant={'destructive'} onClick={e => {HandleLeaveGroup()}}>Leave Group</Button>
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
        <Button type="button" variant={'destructive'} onClick={e => {HandleLeaveGroup()}}>
          <span className="text-red-500">Request failed try again</span>
        </Button>
      }    
    </>
  );
}

export default LeaveGroupButton;