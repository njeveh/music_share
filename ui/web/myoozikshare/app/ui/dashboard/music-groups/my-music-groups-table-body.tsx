import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { getMyMusicGroups } from "@/app/lib/actions/music-groups";
import { MusicGroup } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MyMusicGroupsTableBody = async () => {
  const musicGroups: MusicGroup[] | null = await getMyMusicGroups();

  return (
    <>
      <TableBody>
        { (musicGroups == null) && (
        <TableRow>
          <TableCell colSpan={2}>You are currently not a member of any music group.</TableCell>
        </TableRow>
        )}

        { ( musicGroups !== null) && (
          <>
            {musicGroups.map((musicGroup: MusicGroup, key: any) => (
                <TableRow key={musicGroup.id}>
                  <TableCell className="px-2 w-fit whitespace-nowrap">{musicGroup.group_name}</TableCell>
                  <TableCell className="text-end">
                    <Button type="button">
                      <Link href={`/dashboard/my-music-groups/${musicGroup.id}`}>Visit</Link>
                    </Button>
                  </TableCell>
                </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </>
  );
}

export default MyMusicGroupsTableBody;