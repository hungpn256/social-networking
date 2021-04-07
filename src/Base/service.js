import axios from 'axios';
class serviceBase {
  contructor({ url }) {
    this.url = url || '';
  }
  get = function (payload) {
    return axios.get(this.url, { params: { ...payload } });
  };
  post = function (payload) {
    return axios.post(this.url, { params: { ...payload } });
  };
}
export default serviceBase;
