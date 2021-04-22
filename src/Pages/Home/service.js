import axios from 'axios';
import serviceBase from '../../Base/service';
import { ip } from '../../configs/ip';
class serviceLogin {
  getUserRecomment() {
    return axios.get(`${ip}/user/suggest`);
  }
}
export default new serviceLogin({ url: ip });
