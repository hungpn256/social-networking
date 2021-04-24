import axios from 'axios';
import { ip } from '../../configs/ip';
class serviceLogin {
  getUserRecomment() {
    return axios.get(`${ip}/user/recomment`);
  }
}
export default new serviceLogin({ url: ip });
