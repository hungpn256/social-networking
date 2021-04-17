import axios from 'axios';
import serviceBase from '../../Base/service';
import { ip } from '../../configs/ip';
class serviceLogin extends serviceBase {
  changeAvatar = (payload) => {
    const formData = new FormData();
    formData.append('avatar', payload);
    return axios.put(`${ip}/user/avatar`, formData);
  };
  changeCover = (payload) => {
    const formData = new FormData();
    formData.append('cover', payload);
    return axios.put(`${ip}/user/cover`, formData);
  };
  getProfileUser = (payload) => {
    const { _id } = payload;
    return axios.get(`${ip}/user/${_id}`);
  };
  getArticles = (payload) => {
    const { _id } = payload;
    payload._id = undefined;
    return axios.get(`${ip}/post/${_id}`, { params: { ...payload.paging } });
  };
  postArticle = (payload) => {
    let formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });
    return axios.post(`${ip}/post/create`, formData);
  };
}
export default new serviceLogin({ url: ip });
