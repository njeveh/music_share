
import { initialMusicPostData } from "@/app/dashboard/lib/data";
import { CloudUploadResponse, FilesUploadResponse, Inputs, MusicPostData } from "../definitions";
import { DeleteFiles } from "./upload-to-cloud";

type MusicPostDataSetter = React.Dispatch < React.SetStateAction < MusicPostData >>;


let cloudUploadReturnData: CloudUploadResponse = {
  success: false,
  url: '',
  publicID: '',
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
async function UploadScore(inputs: Inputs): Promise<boolean>{
  try {
    if (inputs.score.file !== null) {
      const formData = new FormData();
      formData.append('file', inputs.score.file);
      const result = await UploadScoreFile(formData);
      if(result.success){
        uploadedFiles.push(result.publicID);
        postData.score = result.url
        return true;                  
      }else{
        await DeleteFiles(uploadedFiles);
        await DeleteFiles(uploadedAudios);
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
async function UploadMainAudio(inputs: Inputs): Promise<boolean>{
  try {
    if (inputs.audioFile.file !== null) {
      const formData = new FormData();
      formData.append('file', inputs.audioFile.file);
      const result = await UploadAudioFile(formData);
      if(result.success){
        uploadedAudios.push(result.publicID);
        postData.audio = result.url
        return true;                  
      }else{
        await DeleteFiles(uploadedAudios);
        await DeleteFiles(uploadedFiles);
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
export default async function UploadFiles (inputs: Inputs, musicPostDataSetter: MusicPostDataSetter): Promise<FilesUploadResponse> {
  try {          
    if (await UploadScore(inputs)) {
      if (await UploadMainAudio(inputs)) {
        for (let segmentIndex = 0; segmentIndex < inputs.segments.length; segmentIndex++) {
          if (!postData.segments[segmentIndex]){
            postData.segments[segmentIndex] = {
              title: '',
              segment_components: [{
                title: '',
                audio: '',
              }]
            }
          }            
          
          postData.segments[segmentIndex] = {
            ...postData.segments[segmentIndex],
            title: inputs.segments[segmentIndex].segmentTitle
          };

          let segmentComponents = inputs.segments[segmentIndex].segmentComponents;
          for (let segmentComponentIndex = 0; segmentComponentIndex < segmentComponents.length; segmentComponentIndex++) {
            if (segmentComponents[segmentComponentIndex].audioFile.file !== null) {             
              const formData = new FormData();
              formData.append('file', segmentComponents[segmentComponentIndex].audioFile.file);
              const res = await UploadAudioFile(formData)
              if(res.success){
                uploadedAudios.push(res.publicID);
                postData.segments[segmentIndex].segment_components[segmentComponentIndex] = {
                  title: segmentComponents[segmentComponentIndex].segmentComponentTitle,
                  audio: res.url,
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
      publicID: uploadedScoreData.public_id,
      url: uploadedScoreData.secure_url,
    }
  } else {
    cloudUploadReturnData = {
      success: false,
      publicID: '',
      url: '',
    }
  }
  return cloudUploadReturnData;
  } catch (error) {
    //console.error(error);
      cloudUploadReturnData = {
        success: false,
        publicID: '',
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
      publicID: uploadedAudioData.public_id,
      url: uploadedAudioData.secure_url,
    }
  } else {
    cloudUploadReturnData = {
      success: false,
      publicID: '',
      url: '',
    }
  }
  return cloudUploadReturnData;
  } catch (error) {
    console.error(error);
      cloudUploadReturnData = {
        success: false,
        publicID: '',
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