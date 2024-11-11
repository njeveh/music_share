import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Suspense } from 'react';
import SearchForm from "@/app/ui/dashboard/music-groups/search-form";
import MusicGroupsTableBody from "@/app/ui/dashboard/music-groups/music-groups-table-body";
import { TableBodySkeleton } from "@/app/ui/dashboard/music-groups/skeletons";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
const Page = async (props: {
    searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;  
  return (
    <>
      <div className="mb-2">
        <Link href={'/dashboard/my-music-groups'} className="w-fit flex justify-center items-center text-blue-500 hover:text-blue-400">
        <MdArrowBack />
        <span>My music groups</span>
        </Link>
      </div>
      <SearchForm />
      <div className="w-full my-2 flex justify-center items-center text-2xl font-bold">Music Groups
      </div>
      <Table className="relative table-auto overflow-x-scroll">
        <TableHeader>
          <TableRow>
          </TableRow>
          <TableRow className="bg-black text-white">
            <TableHead className="text-white dark:text-amber-500">Group Name</TableHead>
            <TableHead className="text-right text-white dark:text-amber-500">Membership Status</TableHead>
          </TableRow>
        </TableHeader>
        {/* <Suspense fallback={<TableBodySkeleton />}>
          <MusicGroupsTableBody />
        </Suspense> */}
        <Suspense key={query + currentPage} fallback={<TableBodySkeleton />}>
          <MusicGroupsTableBody query={query} currentPage={currentPage} />
        </Suspense>
      </Table>
    </>
  );
}

export default Page;