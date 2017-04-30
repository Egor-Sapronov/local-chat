export const IMAGE_MESSAGE_UPLOAD = 'IMAGE_MESSAGE_UPLOAD';
export const IMAGE_MESSAGE_UPLOAD_COMPLETE = 'IMAGE_MESSAGE_UPLOAD_COMPLETE';

export function imageMessageUpload(file, userId) {
  return {
    type: IMAGE_MESSAGE_UPLOAD,
    file,
    userId,
  };
}

export function imageMessageUploadComplete(file) {
  return {
    type: IMAGE_MESSAGE_UPLOAD_COMPLETE,
    file,
  };
}
