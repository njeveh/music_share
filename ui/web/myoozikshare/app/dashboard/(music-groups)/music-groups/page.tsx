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
 
const groups = [
  {
    
    name: "Kwaya ya mtakatifu Kizito Makuburi",
    status: "member",
  },
  {
    
    name: "Group 002",
    status: "pending",
  },
  {
    
    name: "Group 003",
    status: "pending",
  },
  {
    
    name: "St. Peter's Kavuvwani Catholic Church Choir",
    status: "member",
  },
  {
    name: "Group 005",
    status: "pending",
  },
  {
    name: "Group 006",
    status: "member",
  },
  {
    name: "Evangelical Singers",
    status: "member",
  },
]

const Page = () => {
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
        <Table className="relative table-auto overflow-x-scroll">
          <TableHeader>
            <TableRow>
            </TableRow>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((name, key) => (
            <TableRow key={name.name}>
              <TableCell className="px-2 w-fit whitespace-nowrap">{name.name}</TableCell>
              <TableCell className="px-2 font-medium">{name.status}</TableCell>
              <TableCell className="px-2 text-right">
                <ActionsDropdownMenu title="Actions">
                  <DropdownMenuItem>
                    <Link href={'/dashboard/music-group'}>Visit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={()=> ({})}>
                    Leave
                  </DropdownMenuItem>
                </ActionsDropdownMenu>
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Page;