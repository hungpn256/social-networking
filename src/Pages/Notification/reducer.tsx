import { INotificationReducer } from '../../Models/notification';
import {
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_UNSEEN_SUCCESS,
  NOTIFICATION_UNSEEN_SUCCESS,
} from './constants';
const initialState: INotificationReducer = {
  notifications: [],
  requesting: false,
  totalUnseen: 0,
};

const reducer = (state = initialState, action: any): INotificationReducer => {
  switch (action.type) {
    case GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
      };
    case GET_NOTIFICATION_UNSEEN_SUCCESS:
      console.log(action);

      return {
        ...state,
        ...action.payload,
      };

    case NOTIFICATION_UNSEEN_SUCCESS: {
      const noti = state.notifications.find(
        (notification) => notification._id === action.payload.notificationId
      );
      if (noti) {
        noti.isSeen = true;
      }
      return {
        ...state,
        notifications: [...state.notifications],
        totalUnseen: Math.max(state.totalUnseen - 1, 0),
      };
    }

    case 'CLEAR_STATE': {
      return { ...initialState };
    }
    default:
      return { ...state };
  }
};
export default reducer;
