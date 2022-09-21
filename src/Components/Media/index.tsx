import { Image } from 'antd';
import React from 'react';
import { IFile } from '../../Models/article';

export default function Media({ url, typeMedia }: IFile) {
  return (
    <div>
      {typeMedia.includes('image') ? (
        <Image
          width="100%"
          style={{
            aspectRatio: '4 / 3',

            objectFit: 'cover',
          }}
          src={url}
        ></Image>
      ) : (
        <video width="320" height="240" controls>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
