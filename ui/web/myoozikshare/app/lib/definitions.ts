// This file contains type definitions for data used.
// It describes the shape of the data, and what data type each property should accept.

export type SignUpData = {
  firstName: string;
  lastName: string;
  userName: string | null;
  email: string,
  password: string,
  passwordConfirmation: string
};

export type ReturnData = {
  status: string;
  data: any;
  error_messages: Array<string>
}


export type AuthCredentials = {
  email: string,
  password: string,
  useCase: string,
};

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    emailVerified: Date | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    accessToken: string;
};

export type MusicGroup = {
  id: string;
  group_name: string;
  group_description: string;
  [key: string]: any
}

export type PaginatedGroupsReturnData = {
  status: string;
  data: MusicGroup | null;
  totalPages: number;
  currentPage: number;
  error_messages: Array<string>
}
export type MusicGroupMember = {
  id: string;
  name: string;
  is_creator: boolean;
  is_admin: boolean;
  is_super_admin: boolean;
  [key: string]: any
}

export type PaginatedGroupMembers = {
  status: string;
  data: MusicGroupMember | null;
  totalPages: number;
  currentPage: number;
  error_messages: Array<string>
}

export type MusicGroupMembershipRequest = {
  id: string;
  name: string;
  status: string;
  [key: string]: any
}

export type PaginatedGroupMembershipRequest = {
  status: string;
  data: MusicGroupMembershipRequest | null;
  totalPages: number;
  currentPage: number;
  error_messages: Array<string>
}

type InputFile = {
  file: File | Blob | null;
  url: string;
  previewUrl: string;
  uploadUrl: string;
  publicId: string;
};

type SegmentComponentInputErrors = {
  segmentComponentTitle: string,
  audioFile: string,
}

export type SegmentComponent = {
  status: null | 'added' | 'updated'
  segmentComponentTitle: string;
  audioFile: InputFile;
  inputErrors: SegmentComponentInputErrors;
  [key: string]: any
};

export type Segment = {
  segmentTitle: string;
  segmentComponents: SegmentComponent[];
  inputError: string;
  status: null | 'added' | 'updated'
  [key: string]: any
};

type InputErrors = {
  title: string;
  description: string;
  composer: string;
  score: string;
  audioFile: string;
  lyrics: string;
};

export type Inputs = {
  title: string;
  description: string;
  composer: string;
  score: InputFile;
  audioFile: InputFile;
  lyrics: string;
  segments: Segment[];
  inputErrors: InputErrors;
  publish: boolean;
  visible: boolean;
  musicGroupsToShareWith: string[];
  [key: string]: any
};

export type CloudUploadResponse =  {
  success: boolean,
  url: string;
  publicId: string;
};


type PostDataFile = {
  url: string;
  public_id: string;
};

type PostDataSegmentComponent = {
  title: string;
  audio: PostDataFile;
  [key: string]: any
};

type PostDataSegment = {
  title: string;
  music_segment_components: PostDataSegmentComponent[];
  [key: string]: any
};
export type MusicPostData = {
  title: string;
  description: string;
  composer: string;
  score: PostDataFile;
  audio: PostDataFile;
  lyrics: string;
  music_segments: PostDataSegment[];
  is_published: boolean;
  is_visible: boolean;
  music_groups_to_share_with: string[];
}

export type FilesUploadResponse =  {
  success: boolean,
  uploadedFiles: string[];
  uploadedAudios: string[];
  postData: MusicPostData;
};

type MusicSegmentComponent = {
  id: string;
  title: string,
  audio: string,
}

type MusicSegment = {
  id: string;
  title: string,
  music_segment_components: MusicSegmentComponent[] | null,
}
export type Music = {
  id: string;
  title: string;
  description: string;
  composer: string;
  score: string;
  audio: string;
  lyrics: string;
  music_segments: MusicSegment[] | null;
  is_published: boolean;
  is_visible: boolean;
  author: string;
  [key: string]: any
};

export type PaginatedMUsicData = {
  status: 'success' | 'fail';
  data: Music[] | null;
  totalPages: number,
  currentPage: number,
  error_messages: string[]  
}


// export type UpdatedInputs = {
//   title: string;
//   description: string;
//   composer: string;
//   score: InputFile;
//   audioFile: InputFile;
//   lyrics: string;
//   segments: Segment[];
//   inputErrors: InputErrors;
//   publish: boolean;
//   visible: boolean;
//   musicGroupsToShareWith: string[];
// };