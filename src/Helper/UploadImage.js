import { storage } from '../configs/firebase';
import { convertTypeMedia } from './Article';
const handleUpload = async (image) =>
  new Promise((resolve, reject) => {
    console.log('🚀 ~ file: UploadImage.js ~ line 3 ~ image', image);
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // setProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        const url = await storage.ref('images').child(image.name).getDownloadURL();
        resolve({ url, typeMedia: convertTypeMedia(image.type) });
      }
    );
  });
export default handleUpload;
