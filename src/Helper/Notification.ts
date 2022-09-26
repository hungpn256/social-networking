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
      break;
    }
    case 'COMMENT_POST': {
      const post = notification.post;
      const comment = post?.comment.slice(-1);
      title = `<strong>${comment
        ?.map((i) => i.createdBy.fullName)
        .join(', ')}</strong> commented <strong>${post?.createdBy.fullName}</strong>'s post: "${
        comment?.[0]?.content
      }"`;
      break;
    }
  }
  return title;
};

export const getImage = (notification: INotification): string => {
  let image = '';
  const post = notification.post;
  const imagePost = post?.files.find((i) => i.typeMedia === 'IMAGE')?.url ?? '';
  switch (notification.type) {
    case 'LIKE_POST': {
      const liked = post?.liked.slice(-1);
      image = imagePost || liked?.[0]?.likedBy?.avatar || post?.createdBy.avatar || '';
      break;
    }
    case 'COMMENT_POST': {
      const comment = post?.comment?.slice?.(-1);
      image = imagePost || comment?.[0]?.createdBy?.avatar || post?.createdBy.avatar || '';
      break;
    }
  }
  return image;
};
