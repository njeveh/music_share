import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MdAddCircleOutline } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { Suspense } from "react";
import { MusicGroupsTableBodySkeleton } from "@/app/ui/dashboard/music-groups/skeletons";
import MyMusicGroupsTableBody from "@/app/ui/dashboard/music-groups/my-music-groups-table-body";

const Page = async () => {
  
  return (
    <>
      <div className="p-2">
        <div className="w-full flex justify-end gap-2">
          <Link href={'/dashboard/music-groups'}>
            <Button>
              <BsSearch className='me-1'/> search for new groups
            </Button>
          </Link>
          <Link href={'/dashboard/create-music-group'}>
            <Button>
              <MdAddCircleOutline className='me-1'/> New
            </Button>
          </Link>
        </div>      
        <div className="w-full my-2 flex justify-center items-center text-2xl font-bold">My music Groups</div>
        <Table className="relative table-auto overflow-x-scroll">
          <TableHeader>
            <TableRow>
            </TableRow>
            <TableRow>
              <TableHead>Group Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<MusicGroupsTableBodySkeleton />}>
            <MyMusicGroupsTableBody  />
          </Suspense>
        </Table>
      </div>
    </>
  );
}

export default Page;