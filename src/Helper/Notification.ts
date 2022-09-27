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
    case 'REPLY_COMMENT': {
      const replyTo = notification.comment?.replyTo;
      const newComment = notification.comment?.newComment;
      title = `<strong>${newComment?.createdBy.fullName}</strong> replied to comment: "${replyTo?.content}"`;
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
    case 'REPLY_COMMENT': {
      image =
        notification.comment?.newComment?.createdBy?.avatar ??
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFA0PzwLOOR4smmmfHG6N1jNwOVsrh2V4oSQ&usqp=CAU';
      break;
    }
  }
  return image;
};

export const getLinkNotification = (notification: INotification): string => {
  switch (notification.type) {
    case 'LIKE_POST':
    case 'COMMENT_POST':
    case 'REPLY_COMMENT': {
      return `/article/${notification.post?._id}`;
    }
  }
  return '';
};
