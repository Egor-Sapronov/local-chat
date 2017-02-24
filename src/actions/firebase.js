export const FILE_UPLOAD = 'FILE_UPLOAD';
export const FILE_UPLOAD_COMPLETE = 'FILE_UPLOAD_COMPLETE';

export function fileUpload(file, userId) {
  return {
    type: FILE_UPLOAD,
    file,
    userId,
  };
}

export function fileUploadComplete(file) {
  return {
    type: FILE_UPLOAD_COMPLETE,
    file,
  };
}
