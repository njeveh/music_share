"use client"

import Link from "next/link";
import { ActionsDropdownMenu } from "../../components/actions-dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MusicGroup } from "@/app/lib/definitions";
const ActionsMenu = ({musicGroup}: {musicGroup: MusicGroup}) => {
  return (
    <>
      <ActionsDropdownMenu title="Actions">
        <DropdownMenuItem>
          <Link href={`/dashboard/my-music-groups/${musicGroup.id}`}>Request membership</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=> ({})}>
          Leave
        </DropdownMenuItem>
      </ActionsDropdownMenu>
    </>
  );
}
export default ActionsMenu;