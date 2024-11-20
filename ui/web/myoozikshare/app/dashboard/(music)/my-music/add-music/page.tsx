import { getMyMusicGroups } from "@/app/lib/actions/music-groups";
import { MusicGroup } from "@/app/lib/definitions";
import AddMusicForm from "@/app/ui/dashboard/music/add-music-form";

const Page = async() => {
  // music groups where user can share music
  const musicGroups: MusicGroup[] | null = await getMyMusicGroups().then((groups) => {
    if (groups == null) return null;
    // super admins are allowed to share music to their groups
    return groups?.filter(group => group.is_super_admin == true);
  });
  return (
    <>
      <AddMusicForm musicGroups={musicGroups} />
    </>
  );
}
export default Page;