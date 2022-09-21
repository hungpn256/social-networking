import React, { useEffect, useState } from 'react';
import { IFile } from '../Models/article';
import { getAllPhoto } from '../Pages/Chat/service';

export default function usePhotos(userId?: string) {
  const [files, setFiles] = useState<IFile[]>([]);
  useEffect(() => {
    if (userId) {
      getPhoto();
    }
  }, [userId]);

  const getPhoto = async () => {
    if (userId) {
      const photos = await getAllPhoto({ userId });
      setFiles(photos.data.files);
    }
  };
  return { files, setFiles };
}
