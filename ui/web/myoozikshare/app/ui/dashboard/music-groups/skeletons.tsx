import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BsSearch } from "react-icons/bs";

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function TableRowSkeleton() {
  return (
    <TableRow className="">
      <TableCell colSpan={2} className={`${shimmer} relative overflow-hidden`}>
        <div className="w-full flex justify-between items-center">
          {/* Group Name */}
          <div className="w-1/2 h-5 rounded bg-gray-100 dark:bg-gray-900"></div>
          {/* Group Membership status */}
          <div className="bg-white dark:bg-gray-700 h-9 w-24 px-4 py-2 border border-gray-100 rounded-lg">
            <div className="w-16 h-5 bg-gray-100 dark:bg-gray-900"></div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );

}
export function TableBodySkeleton () {
  return (
    <>
      <TableBody>
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
      </TableBody>
    </>
  );
}

export function MusicGroupsTableSkeleton() {
  return (
    <>
    <div className="w-full my-2 flex justify-center items-center text-2xl font-bold">Available Music Groups</div>
    <Table className="relative table-auto">
      <TableHeader>
        <TableRow>
        </TableRow>
        <TableRow>
          <TableHead>Group Name</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
      </TableBody>
    </Table>
    </>
  );
}

export function MusicGroupsPageSkeleton() {
  return (
    <>
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
    <div className="w-full my-2 flex justify-center items-center text-2xl font-bold">Music Groups</div>
    <Table className="relative table-auto">
      <TableHeader>
        <TableRow>
        </TableRow>
          <TableRow className="bg-black text-white">
            <TableHead className="text-white dark:text-amber-500">Group Name</TableHead>
            <TableHead className="text-right text-white dark:text-amber-500">Membership Status</TableHead>
          </TableRow>
      </TableHeader>
      <TableBody>
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
      </TableBody>
    </Table>
    </>
  );
}

export function MembersTableRowSkeleton() {
  return (
    <TableRow className="">
      <TableCell colSpan={3} className={`${shimmer} relative overflow-hidden`}>
        <div className="w-full flex justify-between items-center">
          {/* Name */}
          <div className="w-1/3 h-5 rounded bg-gray-100 dark:bg-gray-900"></div>
          {/* Role */}
          <div className="w-1/3 h-5 rounded bg-gray-100 dark:bg-gray-900"></div>
          {/* Actions */}
          <div className="bg-white dark:bg-gray-700 h-9 w-24 px-4 py-2 border border-gray-100 rounded-lg">
            <div className="w-16 h-5 bg-gray-100 dark:bg-gray-900"></div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );

}
export function MembersTableBodySkeleton () {
  return (
    <>
      <TableBody>
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
      </TableBody>
    </>
  );
}


export function MembershipRequestsTableRowSkeleton() {
  return (
    <TableRow className="">
      <TableCell colSpan={3} className={`${shimmer} relative overflow-hidden`}>
        <div className="w-full flex justify-between items-center">
          {/* Name */}
          <div className="w-1/3 h-5 rounded bg-gray-100 dark:bg-gray-900"></div>
          {/* Status */}
          <div className="w-1/3 h-5 rounded bg-gray-100 dark:bg-gray-900"></div>
          {/* Actions */}
          <div className="bg-white dark:bg-gray-700 h-9 w-24 px-4 py-2 border border-gray-100 rounded-lg">
            <div className="w-16 h-5 bg-gray-100 dark:bg-gray-900"></div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );

}
export function MembershipRequestsTableBodySkeleton () {
  return (
    <>
      <TableBody>
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
        <MembersTableRowSkeleton />
      </TableBody>
    </>
  );
}


export function MusicGroupsTableRowSkeleton() {
  return (
    <TableRow className="">
      <TableCell colSpan={3} className={`${shimmer} relative overflow-hidden`}>
        <div className="w-full flex justify-between items-center">
          {/* Name */}
          <div className="w-1/3 h-5 rounded bg-gray-100 dark:bg-gray-900"></div>
          {/* Actions */}
          <div className="bg-white dark:bg-gray-700 h-9 w-24 px-4 py-2 border border-gray-100 rounded-lg">
            <div className="w-16 h-5 bg-gray-100 dark:bg-gray-900"></div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );

}
export function MusicGroupsTableBodySkeleton () {
  return (
    <>
      <TableBody>
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
        <MusicGroupsTableRowSkeleton />
      </TableBody>
    </>
  );
}