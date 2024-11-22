'use server'

import { auth } from "@/auth";
import { MusicGroup, PaginatedGroupMembers, PaginatedGroupMembershipRequest, PaginatedGroupsReturnData, ReturnData } from "../definitions";

let returnData: ReturnData = {
    status: '',
    data: null,
    error_messages: []
}

let paginatedGroupsReturnData: PaginatedGroupsReturnData = {
    status: '',
    data: null,
    totalPages: 1,
    currentPage: 1,
    error_messages: []
}


export async function CreateMusicGroup(data: {groupName: string; groupDescription: string; groupContact: string}) {
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

export async function UpdateMusicGroup(id: any, data: {groupName: string; groupDescription: string; groupContact: string})                                                                                                           {
  try {
      const postData = {
            group_name: data.groupName.trim(),
            group_description: data.groupDescription,
            group_contact: data.groupContact,
      }
    const session = await auth().then(res=>{return res});
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/music-groups/my-music-groups/${id}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData),
    });
    // console.log(response.status);
    const result = await response.json();
    // console.log(result.data);

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

export async function DeleteMusicGroup(id: any, password: string){
  const postData = {
    password: password
  }
  try {
    const session = await auth().then(res=>{return res});
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/music-groups/my-music-groups/${id}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    body: JSON.stringify(postData),
    });
    // console.log(response.status);
    const result = await response.json();
    //console.log(result.data);

    if (response.status == 403) {
      //return validation errors
      const returnData: ReturnData = {
        status: 'fail',
        data: {},
        error_messages: ["Invalid Password."]
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

export async function getFilteredMusicGroups(
  query: string,
  currentPage: number,
): Promise<PaginatedGroupsReturnData> {
  //throw new Error();
  try {
    const session = await auth().then(res=>{return res});
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/music-groups?query=${query}&page=${currentPage}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    //console.log(response.status);
    const result = await response.json();
    //console.log(result.data);

    if (response.status == 200) {                        
      let groups = null;
      let totalPages = 0;
      let currentPage = 0;
      if (result.data.groups.data.length > 0) {
        groups = result.data.groups.data;
        totalPages = result.data.groups.last_page;
        currentPage = result.data.groups.current_page;
      }
      paginatedGroupsReturnData = {
        status: 'success',
        data: groups,
        totalPages: totalPages,
        currentPage: currentPage,
        error_messages: []
      }
      return paginatedGroupsReturnData;
    }
    else {
      paginatedGroupsReturnData = {
        status: 'fail',
        data: null,
        totalPages: 1,
        currentPage: 1,
        error_messages: ["Sorry, we couldn't fetch your music groups. Something went wrong, please reload page to fetch again."]
      }
      return paginatedGroupsReturnData;
    }
  } catch (error) {
      paginatedGroupsReturnData = {
        status: 'fail',
        data: null,
        totalPages: 1,
        currentPage: 1,
        error_messages: ["Sorry, we couldn't fetch your music groups . Something went wrong, please reload page to fetch again."]
      }
      return paginatedGroupsReturnData;
  }    
}

export async function getMyMusicGroups(): Promise<MusicGroup[] | null> {
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
    let groups = null;
    if (response.status == 200) {
      if (result.data.groups.length > 0) {
        groups = result.data.groups;
      }
      return groups;
    }
    else {
      throw new Error("Sorry, we couldn't fetch your music groups. Something went wrong, please reload page to fetch again.");
    }
  } catch (error) {
    throw error;
  }    
}

export async function RequestMusicGroupMembership(id: any): Promise<ReturnData> {
  try {
    const session = await auth().then(res=>{return res});
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/music-groups/${id}/request-membership`, {
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
        data: {},
        error_messages: []
      }
    }
    else {
      returnData = {
        status: 'fail',
        data: {},
        error_messages: ["Sorry, we couldn't process your request. Something went wrong, please reload page to fetch again."]
      }
    }
    return returnData;
  } catch (error) {
      returnData = {
        status: 'fail',
        data: {},
        error_messages: ["Sorry, we couldn't process your request. Something went wrong, please reload page to fetch again."]
      }
      return returnData;
  }    
}

export async function getMyMusicGroup(id: any): Promise<MusicGroup> {
  try {
    const session = await auth().then(res=>{return res});
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/music-groups/my-music-groups/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    //console.log(response.status);
    const result = await response.json();
    //console.log(result.data.group);

    if (response.status == 200) {
      return result.data.group
    }
    else {
      throw new Error('');
    }
  } catch (error) {
    throw error;
  }    
}

export async function getFilteredMusicGroupMembers(
  id: any,
  query: string,
  currentPage: number,
): Promise<PaginatedGroupMembers> {

  let paginatedGroupMembers: PaginatedGroupMembers = {
    status: '',
    data: null,
    totalPages: 1,
    currentPage: 1,
    error_messages: []
  }

  try {
    const session = await auth().then(res=>{return res});
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/music-groups/my-music-groups/${id}/members?query=${query}&page=${currentPage}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    // console.log(response.status);
    const result = await response.json();
    // console.log(result.data);

    if (response.status == 200) {          

      let members = null;
      let totalPages = 0;
      let currentPage = 0;
      if (result.data.members.data.length > 0) {
        members = result.data.members.data;
        totalPages = result.data.members.last_page;
        currentPage = result.data.members.current_page;
      }
      paginatedGroupMembers = {
        status: 'success',
        data: members,
        totalPages: totalPages,
        currentPage: currentPage,
        error_messages: []
      }
      return paginatedGroupMembers;
    }
    else {
      throw new Error();
      paginatedGroupMembers = {
        status: 'fail',
        data: null,
        totalPages: 1,
        currentPage: 1,
        error_messages: ["Sorry, we couldn't process your request. Something went wrong, please reload page to fetch again."]
      }
      return paginatedGroupMembers;
    }
  } catch (error) {
    throw error;
      paginatedGroupMembers = {
        status: 'fail',
        data: null,
        totalPages: 1,
        currentPage: 1,
        error_messages: ["Sorry, we couldn't process your request. Something went wrong, please reload page to fetch again."]
      }
      return paginatedGroupMembers;
  }    
}


export async function getFilteredMusicGroupMembershipRequests(
  id: any,
  query: string,
  currentPage: number,
): Promise<PaginatedGroupMembershipRequest> {

  let paginatedGroupMembershipRequests: PaginatedGroupMembershipRequest = {
    status: '',
    data: null,
    totalPages: 1,
    currentPage: 1,
    error_messages: []
  }

  try {
    const session = await auth().then(res=>{return res});
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/music-groups/my-music-groups/${id}/members/requests?query=${query}&page=${currentPage}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    // console.log(response.status);
    const result = await response.json();
    // console.log(result.data);

    if (response.status == 200) {          

      let requests = null;
      let totalPages = 0;
      let currentPage = 0;
      if (result.data.requests.data.length > 0) {
        requests = result.data.requests.data;
        totalPages = result.data.requests.last_page;
        currentPage = result.data.requests.current_page;
      }
      paginatedGroupMembershipRequests = {
        status: 'success',
        data: requests,
        totalPages: totalPages,
        currentPage: currentPage,
        error_messages: []
      }
      return paginatedGroupMembershipRequests;
    }
    else {
      throw new Error();
      paginatedGroupMembershipRequests = {
        status: 'fail',
        data: null,
        totalPages: 1,
        currentPage: 1,
        error_messages: ["Sorry, we couldn't process your request. Something went wrong, please reload page to fetch again."]
      }
      return paginatedGroupMembershipRequests;
    }
  } catch (error) {
    throw error;
      paginatedGroupMembershipRequests = {
        status: 'fail',
        data: null,
        totalPages: 1,
        currentPage: 1,
        error_messages: ["Sorry, we couldn't process your request. Something went wrong, please reload page to fetch again."]
      }
      return paginatedGroupMembershipRequests;
  }    
}

export async function HandleMusicGroupMembershipRequestFeedback(slug: any, id: any, feedback: string): Promise<ReturnData> {
  let postData = {
    feedback: feedback
  }
  try {
    const session = await auth().then(res=>{return res});
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/music-groups/my-music-groups/${slug}/members/requests/${id}/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData),
    });
    // console.log(response);
    // console.log(response.status);
    const result = await response.json();
    //console.log(result.data);

    if (response.status == 200) {
      //console.log(result);
      returnData = {
        status: 'success',
        data: {},
        error_messages: []
      }
    }
    else {
      returnData = {
        status: 'fail',
        data: {},
        error_messages: ["Sorry, we couldn't process your request. Something went wrong, please reload page to fetch again."]
      }
    }
    return returnData;
  } catch (error) {
      returnData = {
        status: 'fail',
        data: {},
        error_messages: ["Sorry, we couldn't process your request. Something went wrong, please reload page to fetch again."]
      }
      return returnData;
  }    
}

export async function HandleMusicGroupMemberActions(slug: any, id: any, action: string): Promise<ReturnData> {
  // returnData = {
  //   status: 'fail',
  //   data: {},
  //   error_messages: ["Sorry, we couldn't process your request. Something went wrong, please reload page to fetch again."]
  // }
  // return returnData;
  let postData = {
    action: action
  }
  try {
    const session = await auth().then(res=>{return res});
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/music-groups/my-music-groups/${slug}/members/${id}/actions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData),
    });
    // console.log(response);
    // console.log(response.status);
    const result = await response.json();
    //console.log(result.data);

    if (response.status == 200) {
      //console.log(result);
      returnData = {
        status: 'success',
        data: {},
        error_messages: []
      }
    }
    else {
      returnData = {
        status: 'fail',
        data: {},
        error_messages: ["Sorry, we couldn't process your request. Something went wrong, please reload page to fetch again."]
      }
    }
    return returnData;
  } catch (error) {
      returnData = {
        status: 'fail',
        data: {},
        error_messages: ["Sorry, we couldn't process your request. Something went wrong, please reload page to fetch again."]
      }
      return returnData;
  }    
}