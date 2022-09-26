import { INotification } from '../Models/notification';
import IUser from '../Models/user';

export const getTitleNotification = (notification: INotification): string => {
  let title = '';
  switch (notification.type) {
    case 'LIKE_POST': {
      const post = notification.post;
      const liked = post?.liked.slice(-1);
      title = `<strong>${liked
        ?.map((i) => (i.likedBy as IUser).fullName)
        .join(', ')}</strong> liked <strong>${post?.createdBy.fullName}</strong>'s post`;
    }
  }
  return title;
};

export const getImage = (notification: INotification): string => {
  let image = '';
  switch (notification.type) {
    case 'LIKE_POST': {
      const post = notification.post;
      const liked = post?.liked.slice(-1);
      const imagePost = post?.files.find((i) => i.typeMedia === 'IMAGE')?.url ?? '';
      image = imagePost || liked?.[0]?.likedBy?.avatar || post?.createdBy.avatar || '';
    }
  }
  return image;
};
