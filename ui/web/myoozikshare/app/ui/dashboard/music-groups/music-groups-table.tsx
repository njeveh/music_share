"use client"
import { MusicGroup } from "@/app/lib/definitions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ActionsDropdownMenu } from "@/app/ui/components/actions-dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { TableBodySkeleton } from "./skeletons";
import { Suspense } from "react";
const MusicGroupsTable = ({musicGroups}: {musicGroups: MusicGroup[]}) => {
  return (
    <>
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
          <TableBody>

            { (musicGroups == null) && (
            <TableRow>
              <TableCell colSpan={3}>There are no music groups available currently.</TableCell>
            </TableRow>
            )}

            { ( musicGroups !== null) && (
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
          </TableBody>
        </Suspense>
      </Table>
    </>
  );
}

export default MusicGroupsTable;