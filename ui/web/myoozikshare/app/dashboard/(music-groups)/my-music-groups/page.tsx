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