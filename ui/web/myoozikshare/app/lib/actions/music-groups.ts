'use server'

import { auth } from "@/auth";
import { ReturnData } from "../definitions";

let returnData: ReturnData = {
    status: '',
    data: null,
    error_messages: []
}

export async function createMusicGroup(data: {groupName: string; groupDescription: string; groupContact: string})                                                                                                           {
  try {
      const postData = {
            group_name: data.groupName.trim(),
            group_description: data.groupDescription,
            group_contact: data.groupContact,
      }
    const session = await auth().then(res=>{return res});
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/music-groups/create`, {
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
      const returnData: ReturnData = {
        status: 'fail',
        data: {},
        error_messages: result.data.values
      }
      return returnData;
    }else if (response.status == 200) {
      //console.log(result);
      const returnData: ReturnData = {
        status: 'success',
        data: result,
        error_messages: []
      }
      return returnData;
    }
    else {
      const returnData: ReturnData = {
        status: 'fail',
        data: {},
        error_messages: ["Sorry, we couldn't process your request. Something went wrong, please try again."]
      }
      return returnData;
    }
  } catch (error) {
    //console.error(error);
    throw error;
  }
}

export async function getMusicGroups(): Promise<ReturnData> {
  //throw new Error();
  try {
    const session = await auth().then(res=>{return res});
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/music-groups`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    //console.log(response.status);
    const result = await response.json();
    //console.log(result.data);

    if (response.status == 200) {
      //console.log(result);
      let $groups = null;
      if (result.data.groups.length > 0) {
        $groups = result.data.groups
      }
      returnData = {
        status: 'success',
        data: $groups,
        error_messages: []
      }
      return returnData;
    }
    else {
      throw new Error();
      returnData = {
        status: 'fail',
        data: null,
        error_messages: ["Sorry, we couldn't fetch your music groups. Something went wrong, please reload page to fetch again."]
      }
      return returnData;
    }
  } catch (error) {
    throw error;
      returnData = {
        status: 'fail',
        data: null,
        error_messages: ["Sorry, we couldn't fetch your music groups . Something went wrong, please reload page to fetch again."]
      }
      return returnData;
  }    
}

export async function getMyMusicGroups(): Promise<ReturnData> {
  try {
    const session = await auth().then(res=>{return res});
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/music-groups/my-music-groups`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    //console.log(response.status);
    const result = await response.json();
    //console.log(result.data);

    if (response.status == 200) {
      //console.log(result);
      returnData = {
        status: 'success',
        data: result.data,
        error_messages: []
      }
    }
    else {
      returnData = {
        status: 'fail',
        data: {},
        error_messages: ["Sorry, we couldn't fetch your music groups. Something went wrong, please reload page to fetch again."]
      }
    }
    return returnData;
  } catch (error) {
      returnData = {
        status: 'fail',
        data: {},
        error_messages: ["Sorry, we couldn't fetch your music groups . Something went wrong, please reload page to fetch again."]
      }
      return returnData;
  }    
}