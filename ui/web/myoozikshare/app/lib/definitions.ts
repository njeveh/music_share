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

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
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
  previewUrl: string;
  uploadUrl: string;
};

type SegmentComponentInputErrors = {
  segmentComponentTitle: string,
  audioFile: string,
}

type SegmentComponent = {
  initial: boolean;
  segmentComponentTitle: string;
  audioFile: InputFile;
  inputErrors: SegmentComponentInputErrors;
};

type Segment = {
  initial: boolean;
  segmentTitle: string;
  segmentComponents: SegmentComponent[];
  inputError: string;
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
  musicGroupsToShareWith: string[];
};

export type CloudUploadResponse =  {
  success: boolean,
  url: string;
  publicID: string;
};
export type FilesUploadResponse =  {
  success: boolean,
  uploadedFiles: string[];
  uploadedAudios: string[];
  postData: MusicPostData;
};

type PostDataSegmentComponent = {
  title: string;
  audio: string;
};

type PostDataSegment = {
  title: string;
  segment_components: PostDataSegmentComponent[];
};
export type MusicPostData = {
  title: string;
  description: string;
  composer: string;
  score: string;
  audio: string;
  lyrics: string;
  segments: PostDataSegment[];
  publish: boolean;
  music_groups_to_share_with: string[];
}