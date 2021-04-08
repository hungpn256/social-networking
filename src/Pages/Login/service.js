import axios from 'axios';
import serviceBase from '../../Base/service';
import { ip } from '../../configs/ip';
class serviceLogin extends serviceBase {
  login = (payload) => {
    return axios.post(`${ip}/auth/login`, payload);
  };
  getUser = () => {
    return axios.get(`${ip}/user/profile`);
  };
}
export default new serviceLogin({ url: ip });
