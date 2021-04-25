import axios from 'axios';
import { ip } from '../../configs/ip';
class serviceLogin {
  getUserRecomment() {
    return axios.get(`${ip}/user/recomment`);
  }
  followUser(payload) {
    return axios.put(`${ip}/follow/${payload}`);
  }
}
export default new serviceLogin({ url: ip });
