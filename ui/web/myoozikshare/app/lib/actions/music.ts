"use server"

import { auth } from "@/auth";
import { Music, MusicPostData, PaginatedMUsicData, ReturnData, Inputs, Segment, SegmentComponent } from "../definitions";

let returnData: ReturnData = {
  status: '',
  data: null,
  error_messages: []
}


export async function UploadMusic(postData: MusicPostData): Promise<ReturnData> {
  //console.log(postData);
  // return returnData;
  try {
    const session = (await auth());
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/music/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData),
    });
    //console.log(response.status);
    const result = await response.json();
    //console.log(result.data);

    if (response.status == 403) {
      //return validation errors
      returnData = {
        status: 'fail',
        data: {},
        error_messages: result.data.values
      }
    } else if (response.status == 200) {
      //console.log(result);
      returnData = {
        status: 'success',
        data: result.data.music,
        error_messages: []
      }
    } else {
      returnData = {
        status: 'fail',
        data: {},
        error_messages: ["Sorry an error occured while uploading your data. Please try again."]
      }
    }
    return returnData;
  } catch (error) {
      returnData = {
        status: 'fail',
        data: {},
        error_messages: ["Sorry an error occured while uploading your data. Please try again."]
      }
      return returnData;
    //throw error;
  }
}

export async function getMyMusic(id: any): Promise<Music> {
  try {
    const session = (await auth());
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/music/my-music/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    //console.log(response.status);
    const result = await response.json();
    //console.log(result.data.music);

    if (response.status == 200) {
      return result.data.music
    }
    else {
      throw new Error('');
    }
  } catch (error) {
    throw error;
  }    
}

export async function getFormatMyMusic(id: any): Promise<Inputs> {
  try {
    const session = (await auth());
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/music/my-music/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    //console.log(response.status);
    const result = await response.json();
    //console.log(result.data.music);

    if (response.status == 200) {
      const music = result.data.music;
      const segments: any = music.music_segments;
      const music_segments: Segment[] = [];
      let music_segment_components: SegmentComponent[] = [];
      if (segments && segments.length > 0) {
        segments.forEach((segment: any) => {
          music_segment_components = [];
          const components = segment.music_segment_components;
          if (components && components.length > 0) {
            components.forEach((component: any) => {
              const music_segment_component: SegmentComponent = {
                id: segment.id,
                status: null,
                segmentComponentTitle: component.title,
                audioFile: {
                  file: null,
                  url: component.audio,
                  previewUrl: '',
                  uploadUrl: '',
                },
                inputErrors: {
                    segmentComponentTitle: '',
                    audioFile: '',
                }
              }
              music_segment_components.push(music_segment_component);            
            })
          }
          const music_segment: Segment = {
            id: segment.id,
            segmentTitle: segment.title,
            segmentComponents: music_segment_components,
            inputError: '',
            status: null,
          }
          music_segments.push(music_segment);
        });
      }
      const formatedMusicData: Inputs = {
        title: music.title,
        description: music.description,
        composer: music.composer,
        score: {
          file: null,
          url: music.score,
          previewUrl: '',
          uploadUrl: ''
        },
        audioFile: {
          file: null,
          url: music.audio,
          previewUrl: '',
          uploadUrl: ''
        },
        lyrics: music.lyrics,
        segments: music_segments,
        inputErrors: {
          title: '',
          description: '',
          composer: '',
          score: '',
          audioFile: '',
          lyrics: '',
        },
        publish: music.is_published,
        visible: music.is_visible,
        musicGroupsToShareWith: music.music_groups_shared_with
      };
      console.log(formatedMusicData);
      return formatedMusicData;
    }
    else {
      throw new Error('');
    }
  } catch (error) {
    throw error;
  }    
}

export async function GetFilteredPublicMusic(
  query: string,
  currentPage: number,
): Promise<PaginatedMUsicData> {

  let paginatedMUsicData: PaginatedMUsicData = {
    status: 'fail',
    data: null,
    totalPages: 1,
    currentPage: 1,
    error_messages: []
  }

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/music/public?query=${query}&page=${currentPage}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(response.status);
    const result = await response.json();
    // console.log(result.data);

    if (response.status == 200) {          

      let music = null;
      let totalPages = 0;
      let currentPage = 0;
      if (result.data.music.data.length > 0) {
        music = result.data.music.data;
        totalPages = result.data.music.last_page;
        currentPage = result.data.music.current_page;
      }
      paginatedMUsicData = {
        status: 'success',
        data: music,
        totalPages: totalPages,
        currentPage: currentPage,
        error_messages: []
      }
      //console.log(paginatedMUsicData.data);
      return paginatedMUsicData;
    }
    else {
      throw new Error('');
    }
  } catch (error) {
     throw new Error('Sorry, something went wrong while fetching data, please reload page to fetch again.');
  }    
}

export async function GetMyFilteredMusic(
  query: string,
  currentPage: number,
): Promise<PaginatedMUsicData> {

  let paginatedMUsicData: PaginatedMUsicData = {
    status: 'fail',
    data: null,
    totalPages: 1,
    currentPage: 1,
    error_messages: []
  }

  try {
    const session = (await auth());
    const token = session?.user.accessToken;    
    const response = await fetch(`${process.env.BACKEND_API_URL}/music/my-music?query=${query}&page=${currentPage}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    // console.log(response.status);
    const result = await response.json();
    // console.log(result.data);

    if (response.status == 200) {          

      let music = null;
      let totalPages = 0;
      let currentPage = 0;
      if (result.data.music.data.length > 0) {
        music = result.data.music.data;
        totalPages = result.data.music.last_page;
        currentPage = result.data.music.current_page;
      }
      paginatedMUsicData = {
        status: 'success',
        data: music,
        totalPages: totalPages,
        currentPage: currentPage,
        error_messages: []
      }
      //console.log(paginatedMUsicData.data);
      return paginatedMUsicData;
    }
    else {
      throw new Error('');
    }
  } catch (error) {
     throw new Error('Sorry, something went wrong while fetching data, please reload page to fetch again.');
  }    
}