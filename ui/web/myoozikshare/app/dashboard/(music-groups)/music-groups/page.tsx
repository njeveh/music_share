import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getMusicGroups } from "@/app/lib/actions/music-groups";
import { Suspense } from 'react';
import SearchForm from "@/app/ui/dashboard/music-groups/search-form";
import MusicGroupsTableBody from "@/app/ui/dashboard/music-groups/music-groups-table-body";
import { TableBodySkeleton } from "@/app/ui/dashboard/music-groups/skeletons";

const Page = () => {
  return (
    <>
      <SearchForm />
      <div className="w-full my-2 flex justify-center items-center text-2xl font-bold">Available Music Groups
      </div>
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
        <Suspense fallback={<TableBodySkeleton />}>
          <MusicGroupsTableBody />
        </Suspense>
      </Table>
    </>
  );
}

export default Page;