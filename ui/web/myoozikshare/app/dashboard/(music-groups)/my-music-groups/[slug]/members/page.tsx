import {
Table,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"
import { Suspense } from 'react';
import SearchForm from "@/app/ui/dashboard/music-groups/search-form";
import { MembersTableBodySkeleton } from "@/app/ui/dashboard/music-groups/skeletons";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { MusicGroup } from '@/app/lib/definitions';
import { getMyMusicGroup } from '@/app/lib/actions/music-groups';
import { lusitana } from '@/app/ui/fonts';
import GroupActionsMenu from '@/app/ui/dashboard/music-groups/group-actions-menu';
import MembersTableBody from "@/app/ui/dashboard/music-groups/members/members-table-body";

export default async function Page(props: {
    searchParams ? : Promise < {
      query ? : string; page ? : string;
    } > ,
    params: Promise < {
      slug: string
    } >
  }) {
    const slug = (await props.params).slug;
    const musicGroup: MusicGroup = (await getMyMusicGroup(slug));
    const searchParams = await props.searchParams;
    const query = searchParams ?.query || '';
    const currentPage = Number(searchParams ?.page) || 1;

    return (
      <>
        <div className='w-full fixed top-auto z-10 bg-gray-50 dark:bg-darkmenubg'>
          <div className='relative w-full flex justify-center items-center'>
            <div className={`${lusitana.className} p-2 font-bold`}>{musicGroup.group_name}</div>
            <div className='w-fit absolute end-1 '>
              <GroupActionsMenu slug={slug} musicGroup={musicGroup} />
            </div>
          </div>
        </div>
        <div className="mt-10 mb-2">
          <Link href={`/dashboard/my-music-groups/${musicGroup.id}`}
            className="w-fit flex justify-center items-center text-blue-500 hover:text-blue-400">
          <MdArrowBack />
          <span>Back</span>
          </Link>
        </div>
        <SearchForm />
        <div className="w-full my-2 flex justify-center items-center text-2xl font-bold">Members
        </div>
        <Table className="relative table-auto overflow-x-scroll">
          <TableHeader>
            <TableRow>
            </TableRow>
            <TableRow className="bg-black hover:bg-black text-white">
              <TableHead className="text-white dark:text-amber-500">Name</TableHead>
              <TableHead className="text-white dark:text-amber-500">Role</TableHead>
              <TableHead className="text-right text-white dark:text-amber-500">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <Suspense key={query + currentPage} fallback={<MembersTableBodySkeleton />}>
          <MembersTableBody slug={slug} query={query} currentPage={currentPage} />
          </Suspense>
        </Table>
      </>
  );
}