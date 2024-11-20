"use server"

import { auth } from "@/auth";
import { Music, MusicPostData, ReturnData } from "../definitions";
import { Inputs, MusicGroup } from '@/app/lib/definitions';

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
    //console.log(result.data.group);

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