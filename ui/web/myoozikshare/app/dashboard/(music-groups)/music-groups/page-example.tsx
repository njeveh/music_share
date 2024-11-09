"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { ActionsDropdownMenu } from "@/app/ui/components/actions-dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MdAddCircleOutline } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import { getMusicGroups } from "@/app/lib/actions/music-groups";
import { MusicGroup } from "@/app/lib/definitions";
import { Suspense } from 'react';

const Page = () => {
  const [musicGroups, setMusicGroups] = useState<MusicGroup[] | null>(null);
  const [apiFeedbackErrors, setApiFeedbackErrors] = useState<string[] | null>(null);
  const [isAwaitingFetch, setIsAwaitingFetch] = useState(true);
  
  useEffect(() => {
    setIsAwaitingFetch(true);
    getMusicGroups().catch(err => {
      setIsAwaitingFetch(false);
      setApiFeedbackErrors(["Sorry, we couldn't fetch your music groups . Something went wrong, please reload page to fetch again."]);
    }).then((res)=>{
      //console.log(res);
      if(res !== void({})) {
        if (res.status == 'success') {
          setIsAwaitingFetch(false);
          setApiFeedbackErrors(null);
          if (res.data.groups.length > 0) {
            setMusicGroups(res.data.groups);
          }
          else {
            setMusicGroups(null);
          }
        }
        else {
          setIsAwaitingFetch(false);
          setMusicGroups(null);
          setApiFeedbackErrors(res.error_messages);
        }
      }
    });
  }, []);
  return (
    <>
      <div>
        <div className="w-full flex justify-center items-center py-2">
          <form className="max-w-2xl flex flex-1 flex-row search-form">
            <input type="text" id="search-input" className="h-10 w-full rounded-tl-lg rounded-bl-lg dark:bg-slate-600"
              name="searchValue" placeholder="Search for group ..." />
            <button type="submit"
              className="h-10 flex justify-center items-center w-16 bg-slate-600 p-2 rounded-tr-lg rounded-br-lg ">
              <BsSearch />
            </button>
          </form>
        </div>     
        <div className="w-full my-2 flex justify-center items-center text-2xl font-bold">Available Music Groups</div>
        <Table className="relative table-auto overflow-x-scroll">
          <TableHeader>
            <TableRow>
            </TableRow>
            <TableRow>
              <TableHead>Group Name</TableHead>
              {/* <TableHead>Status</TableHead> */}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
           { (isAwaitingFetch) && (
            <TableRow><TableCell colSpan={3}>Fetching your music groups...</TableCell></TableRow>
           )}

           { (!isAwaitingFetch && apiFeedbackErrors == null && musicGroups == null) && (
            <TableRow><TableCell colSpan={3}>There are no music groups available currently.</TableCell></TableRow>
           )}
           
            { ( !isAwaitingFetch && apiFeedbackErrors == null && musicGroups !== null) && (
              <>
                {musicGroups.map((musicGroup, key) => (
                <TableRow key={musicGroup.id}>
                  <TableCell className="px-2 w-fit whitespace-nowrap">{musicGroup.group_name}</TableCell>
                  {/* <TableCell className="px-2 font-medium">{musicGroup.group_name}</TableCell> */}
                  <TableCell className="px-2 text-right">
                    <ActionsDropdownMenu title="Actions">
                      <DropdownMenuItem>
                        <Link href={`/dashboard/my-music-groups/${musicGroup.id}`}>Visit</Link>
                        {/* Visit */}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={()=> ({})}>
                        Leave
                      </DropdownMenuItem>
                    </ActionsDropdownMenu>
                  </TableCell>
                </TableRow>
                ))}
              </>
            )}

            { (!isAwaitingFetch &&  apiFeedbackErrors !== null && musicGroups == null)  &&(
              <TableRow>
                <TableCell colSpan={3}>
                  <ul>
                   { apiFeedbackErrors.map((apiFeedbackError, key) => (
                      <li key={key}>
                        {apiFeedbackError}
                      </li>
                    )) }
                  </ul>
                </TableCell>
              </TableRow>
            )
            }          
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Page;