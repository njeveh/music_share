
import { initialMusicPostData } from "@/app/dashboard/lib/data";
import { CloudUploadResponse, FilesUploadResponse, Inputs, MusicPostData } from "../definitions";
import { DeleteFiles } from "./upload-to-cloud";

type MusicPostDataSetter = React.Dispatch < React.SetStateAction < MusicPostData >>;


let cloudUploadReturnData: CloudUploadResponse = {
  success: false,
  url: '',
  publicId: '',
};

let filesUploadReturnData: FilesUploadResponse = {
  success: false,
  uploadedFiles: [],
  uploadedAudios: [],
  postData: initialMusicPostData,
};

const uploadedFiles: string[] = [];
const uploadedAudios: string[] = [];
const postData: MusicPostData = initialMusicPostData;

/**Upload music score */
async function UploadScore(inputs: Inputs, action: 'new' | 'update'): Promise<boolean>{
  try {
    if (inputs.score.file !== null) {
      const formData = new FormData();
      formData.append('file', inputs.score.file);
      if (action === 'update') {
        formData.append('public_id', inputs.score.publicId);
        formData.append('overwrite', 'true');
      }
      const result = await UploadScoreFile(formData);
      if(result.success){
        if (action === 'new') {
          uploadedFiles.push(result.publicId);
        }
        postData.score = {
          url: result.url,
          public_id: result.publicId
        }
        return true;                  
      }else{
        if (action === 'new') {
          await DeleteFiles(uploadedFiles);
          await DeleteFiles(uploadedAudios);
        }
        return false;
      }
    }else{
      return true;
    }
  } catch (error) {
      return false;
    }
}

/**Upload the main music audio */
async function UploadMainAudio(inputs: Inputs, action: 'new' | 'update'): Promise<boolean>{
  try {
    if (inputs.audioFile.file !== null) {
      const formData = new FormData();
      formData.append('file', inputs.audioFile.file);
      if (action === 'update') {
        formData.append('public_id', inputs.score.publicId);
        formData.append('overwrite', 'true');
      }      
      const result = await UploadAudioFile(formData);
      if(result.success){
        if (action === 'new') {
          uploadedAudios.push(result.publicId);
        }
        postData.audio = {
          url: result.url,
          public_id: result.publicId
        }
        return true;                  
      }else{
        if (action === 'new') {
          await DeleteFiles(uploadedFiles);
          await DeleteFiles(uploadedAudios);
        }
        return false;
      }
    }else{
      return true;
    }
  } catch (error) {
      return false;
    }
}
// upload music files to cloud
export async function UploadFiles (inputs: Inputs): Promise<FilesUploadResponse> {
  try {          
    if (await UploadScore(inputs, 'new')) {
      if (await UploadMainAudio(inputs, 'new')) {
        for (let segmentIndex = 0; segmentIndex < inputs.segments.length; segmentIndex++) {
          if (!postData.music_segments[segmentIndex]){
            postData.music_segments[segmentIndex] = {
              title: '',
              music_segment_components: [{
                title: '',
                audio: {
                  url: '',
                  public_id: ''
                }
              }]
            }
          }            
          
          postData.music_segments[segmentIndex] = {
            ...postData.music_segments[segmentIndex],
            title: inputs.segments[segmentIndex].segmentTitle
          };

          let segmentComponents = inputs.segments[segmentIndex].segmentComponents;
          for (let segmentComponentIndex = 0; segmentComponentIndex < segmentComponents.length; segmentComponentIndex++) {
            const file = segmentComponents[segmentComponentIndex].audioFile.file;
            if (file) {             
              const formData = new FormData();
              formData.append('file', file);
              const res = await UploadAudioFile(formData)
              if(res.success){
                uploadedAudios.push(res.publicId);
                postData.music_segments[segmentIndex].music_segment_components[segmentComponentIndex] = {
                  title: segmentComponents[segmentComponentIndex].segmentComponentTitle,
                  audio: {
                    url: res.url,
                    public_id: res.publicId
                  }
                };             
              }else{
                await DeleteFiles(uploadedAudios)
                await DeleteFiles(uploadedFiles)
                throw new Error('');
              }
            }
          }
        }
        filesUploadReturnData = {
          success: true,
          uploadedAudios: uploadedAudios,
          uploadedFiles: uploadedFiles,
          postData: postData,
        }
      }
      else{
        filesUploadReturnData = {
          success: false,
          uploadedAudios: [],
          uploadedFiles: [],
          postData: initialMusicPostData,
        }
      }
    }else{
      filesUploadReturnData = {
        success: false,
        uploadedAudios: [],
        uploadedFiles: [],
        postData: initialMusicPostData,
      }
    }
    return filesUploadReturnData; 
  } catch (error) {
    // console.error(error);
    filesUploadReturnData = {
      success: false,
      uploadedAudios: [],
      uploadedFiles: [],
      postData: initialMusicPostData,
    }
    return filesUploadReturnData;
  }
}


// upload updated music files to cloud
export async function UploadUpdatedFiles(inputs: Inputs): Promise<FilesUploadResponse> {
  filesUploadReturnData = {
    success: true,
    uploadedAudios: uploadedAudios,
    uploadedFiles: uploadedFiles,
    postData: postData,
  }
  try { 
    if(inputs.score.file && inputs.score.publicId ) {
      await UploadScore(inputs, 'update');    
    }
    else {
      postData.score = {
        url: inputs.score.url,
        public_id: inputs.score.publicId
      }
    }
    if(inputs.audioFile.file && inputs.audioFile.publicId ) {
      await UploadMainAudio(inputs, 'update');      
    }
    else {
      postData.audio = {
        url: inputs.audioFile.url,
        public_id: inputs.audioFile.publicId
      }
    } 
    for (let segmentIndex = 0; segmentIndex < inputs.segments.length; segmentIndex++) {
      if (!postData.music_segments[segmentIndex]){
        postData.music_segments[segmentIndex] = {
          id: '',
          title: '',
          music_segment_components: [{
            id: '',
            title: '',
            audio: {
              url: '',
              public_id: ''
            }
          }]
        }
      }            
      
      postData.music_segments[segmentIndex] = {
        ...postData.music_segments[segmentIndex],
        id: inputs.segments[segmentIndex].id,
        title: inputs.segments[segmentIndex].segmentTitle
      };

      let segmentComponents = inputs.segments[segmentIndex].segmentComponents;
      for (let segmentComponentIndex = 0; segmentComponentIndex < segmentComponents.length; segmentComponentIndex++) {
        const file = segmentComponents[segmentComponentIndex].audioFile.file;
        const publicId = segmentComponents[segmentComponentIndex].audioFile.publicId;
        if (file) {             
          const formData = new FormData();
          formData.append('file', file);
          if (publicId) {
            formData.append('public_id', publicId);
            formData.append('overwrite', 'true');
          }
          const res = await UploadAudioFile(formData)
          if(res.success){
            if (!publicId) {
              uploadedAudios.push(res.publicId);
            }
            postData.music_segments[segmentIndex].music_segment_components[segmentComponentIndex] = {
              id: segmentComponents[segmentComponentIndex].id || '', 
              title: segmentComponents[segmentComponentIndex].segmentComponentTitle,
              audio: {
                url: res.url,
                public_id: res.publicId
              }
            };             
          }else{
            if (!publicId) {
              await DeleteFiles(uploadedAudios)
              await DeleteFiles(uploadedFiles)
            }            
            throw new Error('');
          }
        } else {
          postData.music_segments[segmentIndex].music_segment_components[segmentComponentIndex] = {
            id: segmentComponents[segmentComponentIndex].id, 
            title: segmentComponents[segmentComponentIndex].segmentComponentTitle,
            audio: {
              url: segmentComponents[segmentComponentIndex].audioFile.url,
              public_id: segmentComponents[segmentComponentIndex].audioFile.publicId,
            }
          };          
        }
      }
    }
    filesUploadReturnData = {
      success: true,
      uploadedAudios: uploadedAudios,
      uploadedFiles: uploadedFiles,
      postData: postData,
    }     
    return filesUploadReturnData; 
  } catch (error) {
    //console.error(error);
    filesUploadReturnData = {
      success: false,
      uploadedAudios: [],
      uploadedFiles: [],
      postData: initialMusicPostData,
    }
    return filesUploadReturnData;
  }
}

export async function UploadScoreFile(formData: FormData): Promise<CloudUploadResponse> {
  try {
  // formData.append('file', file);
  formData.append('upload_preset', 'upload_score');
    const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/njeveh-cloud/raw/upload`, {
        method: "POST",
        body: formData,
      }
    );
    const uploadedScoreData = await uploadResponse.json();

    // console.log(uploadedScoreData);

  if (uploadedScoreData.secure_url) {
    cloudUploadReturnData = {
      success: true,
      publicId: uploadedScoreData.public_id,
      url: uploadedScoreData.secure_url,
    }
  } else {
    cloudUploadReturnData = {
      success: false,
      publicId: '',
      url: '',
    }
  }
  return cloudUploadReturnData;
  } catch (error) {
    //console.error(error);
      cloudUploadReturnData = {
        success: false,
        publicId: '',
        url: '',
      }
      return cloudUploadReturnData;
  }
}

export async function UploadAudioFile(formData: FormData): Promise<CloudUploadResponse> {
  try {
  // formData.append('file', file);
  formData.append('upload_preset', 'upload_audio');
    const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/njeveh-cloud/auto/upload`, {
        method: "POST",
        body: formData,
      }
    );
    const uploadedAudioData = await uploadResponse.json();
  if (uploadedAudioData.secure_url) {
    cloudUploadReturnData = {
      success: true,
      publicId: uploadedAudioData.public_id,
      url: uploadedAudioData.secure_url,
    }
  } else {
    cloudUploadReturnData = {
      success: false,
      publicId: '',
      url: '',
    }
  }
  return cloudUploadReturnData;
  } catch (error) {
    console.error(error);
      cloudUploadReturnData = {
        success: false,
        publicId: '',
        url: '',
      }
      return cloudUploadReturnData;
  }
}

// export async function DeleteFiles(publicIds: string[]): Promise<CloudUploadResponse> {
//   try {
//   // formData.append('file', file);
//   formData.append('upload_preset', 'upload_audio');
//     const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/njeveh-cloud/auto/upload`, {
//         method: "POST",
//         body: formData,
//       }
//     );
//     const uploadedAudioData = await uploadResponse.json();
//   if (uploadedAudioData.secure_url) {
//     cloudUploadReturnData = {
//       success: true,
//       publicID: uploadedAudioData.public_id,
//       url: uploadedAudioData.secure_url,
//     }
//   } else {
//     cloudUploadReturnData = {
//       success: false,
//       publicID: '',
//       url: '',
//     }
//   }
//   return cloudUploadReturnData;
//   } catch (error) {
//     console.error(error);
//       cloudUploadReturnData = {
//         success: false,
//         publicID: '',
//         url: '',
//       }
//       return cloudUploadReturnData;
//   }
// }