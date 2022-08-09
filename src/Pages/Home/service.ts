import axios from 'axios';
import { ip } from '../../configs/ip';

function getUserRecomment() {
  return axios.get(`${ip}/user/recomment`);
}

function followUser(payload: string) {
  return axios.put(`${ip}/user/follow/${payload}`);
}

function getArticle(_id?: string) {
  return axios.get(`${ip}/post`, { params: { _id } });
}

function getFriend() {
  return axios.get(`${ip}/friend`);
}

const service = {
  getUserRecomment,
  followUser,
  getArticle,
  getFriend,
};
export default service;
