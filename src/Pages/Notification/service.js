import axios from 'axios';
import { ip } from '../../configs/ip';

export const getUnseen = () => {
  return axios.get(`${ip}/notification/unSeen`);
};
