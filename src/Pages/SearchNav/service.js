import axios from 'axios';
import { ip } from '../../configs/ip';
class serviceLogin {
  search = (payload) => {
    return axios.get(`${ip}/search`, { params: { q: payload } });
  };
}
export default new serviceLogin();
