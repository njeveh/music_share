"use server"

import crypto from "crypto";
import { cloudinary } from "@/cloudinary.config";
import { CloudUploadResponse } from "../definitions";

 let cloudUploadReturnData: CloudUploadResponse =  {
  success: false,
  url: '',
  publicId: '',
};


const generateSHA1 =(data: any) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
}

const generateSignature = (publicId: string, apiSecret: string) => {
	const timestamp = new Date().getTime();
	return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};


export async function DeleteFiles(publicIds: string[]): Promise<boolean> {
  if (!publicIds || !Array.isArray(publicIds)) {
    return false;
  }

  if (publicIds[0] === '' && publicIds.length === 1) {
    return true;
  }
  try {
    // Delete multiple files using Cloudinary's `destroy` method
    const deleteResponses = await Promise.all(
      publicIds.map((publicId) =>
        cloudinary.uploader.destroy(publicId)
      )
    );

    return true;
  } catch (error) {
    return false;
  }
}