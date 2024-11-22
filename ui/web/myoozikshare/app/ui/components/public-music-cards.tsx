import { GetFilteredPublicMusic } from "@/app/lib/actions/music";
import { PaginatedMUsicData } from "@/app/lib/definitions";
import { MusicCard } from "./music-card";
import Pagination from "./music/pagination";

const PublicMusicCards = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
const paginatedMusic: PaginatedMUsicData = (await GetFilteredPublicMusic(query, currentPage));
  return (
  <div>
    { (paginatedMusic.data == null) && (
      <div className="w-full h-[100vh] flex justify-center items-center">There is no music available for public view currently. Please check later.</div>
    )}
    {paginatedMusic.data !== null &&
      <div>
        <div className='w-full flex justify-center items-center ssp-font-family p-4 md:p-6'>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 min-[500px]:grid-cols-2">    
            <>
            {paginatedMusic.data.map((music, index) => (
              <MusicCard key={music.id} music={music} />
            ))}
            </>
          </div>
        </div>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={paginatedMusic.totalPages} currentPage={currentPage} />
        </div>  
      </div>
    }
  </div>
);
}

export default PublicMusicCards;