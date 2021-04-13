import axios from 'axios';
import serviceBase from '../../Base/service';
import { ip } from '../../configs/ip';
class serviceLogin extends serviceBase {
  changeAvatar = (payload) => {
    const formData = new FormData();
    formData.append('avatar', payload);
    return axios.put(`${ip}/user/avatar`, formData);
  };
}
export default new serviceLogin({ url: ip });
