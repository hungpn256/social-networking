import axios from 'axios';
import serviceBase from '../../Base/service';
import { ip } from '../../configs/ip';
class serviceSignup extends serviceBase {
  register = (payload) => {
    return axios.post(`${ip}/auth/register`, payload);
  };
}
export default new serviceSignup({ url: ip });
