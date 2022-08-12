import axios from 'axios';
import serviceBase from '../../Base/service';
import { ip } from '../../configs/ip';
class serviceLogin extends serviceBase {
  updateProfile = (payload) => {
    return axios.put(`${ip}/user/profile`, payload);
  };
  getProfileUser = (payload) => {
    const { _id } = payload;
    return axios.get(`${ip}/user/${_id}`);
  };
  getArticles = (payload) => {
    const { _id, currentId } = payload;
    payload._id = undefined;
    return axios.get(`${ip}/post/${_id}`, { params: { _id: currentId } });
  };
  postArticle = (payload) => {
    return axios.post(`${ip}/post/create`, payload);
  };
  deleteArticle = (payload) => {
    return axios.delete(`${ip}/post/${payload}`);
  };

  getFriend = (payload) => {
    return axios.get(`${ip}/friend`, { status: payload });
  };
}
export default new serviceLogin({ url: ip });
