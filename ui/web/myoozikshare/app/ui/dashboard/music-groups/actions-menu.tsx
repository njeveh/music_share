"use client"

import { Button } from "@/components/ui/button";
import { Spinner } from "../../components/animators";
import { useState } from "react";
import { RequestMusicGroupMembership } from "@/app/lib/actions/music-groups";

const ActionsMenu = ({musicGroupId}: {musicGroupId: any}) => {
const [isLoading, setIsLoading] = useState(false);
const [requestStatus, setRequestStatus] = useState('');
  // const createPageURL = (pageNumber: number | string) => {
  //   const params = new URLSearchParams(searchParams);
  //   // params.set('page', `${currentPage}`);
  //   params.set('page', pageNumber.toString());
  //   return `${pathname}?${params.toString()}`;
  // }; 
  
  function handleMusicGroupMembershipRequest(id: any) {
    setIsLoading(true);
    setRequestStatus('');
    RequestMusicGroupMembership(id).then(res => {
      if(res !== void({})) {
        setRequestStatus(res.status);
      }
      setIsLoading(false);
    });
  }
  return (
    <>
    <div>
      {requestStatus == ''? (
        <>
          {isLoading ? (
            <div className="w-full flex justify-end items-center">
              <Button variant={'secondary'} className="w-24 py-2" disabled>
                <Spinner customClasses='w-8 h-8' />
              </Button>
            </div>
          ) : (
              <Button variant={'secondary'} onClick={e => handleMusicGroupMembershipRequest(musicGroupId)}>
                Request
              </Button>
          )}
        </>
    )
    : requestStatus == 'success'?
      <span className="text-gray-400 dark:text-gray-300">Requested; Pending</span>
      :
      <Button variant={'secondary'} onClick={e => handleMusicGroupMembershipRequest(musicGroupId)}>
        <span className="text-red-500">Request failed try again</span>
      </Button>
    }
    </div>
    </>
  );
}
export default ActionsMenu;