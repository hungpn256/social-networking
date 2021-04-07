import axios from 'axios';
import serviceBase from '../../Base/service';
import { ip } from '../../configs/ip';
class serviceLogin extends serviceBase {
  login = (payload) => {
    debugger;
    return axios.post(`${ip}/auth/login`, payload);
  };
}
export default new serviceLogin({ url: ip });
