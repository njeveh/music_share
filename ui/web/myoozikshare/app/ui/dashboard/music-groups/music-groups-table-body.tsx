import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { getMusicGroups } from "@/app/lib/actions/music-groups";
import { MusicGroup } from "@/app/lib/definitions";
import ActionsMenu from "./actions-menu";

const MusicGroupsTableBody = async () => {
    const musicGroups: MusicGroup[] | null = (await getMusicGroups()).data;
  return (
    <>
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
              <ActionsMenu musicGroup={musicGroup} />
            </TableCell>
          </TableRow>
          ))}
        </>
        )}
      </TableBody>
    </>
  );
}

export default MusicGroupsTableBody;