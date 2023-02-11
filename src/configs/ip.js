// const ip = 'https://social-networking-v1.herokuapp.com/api/v1';
const environment = process.env.NODE_ENV || 'development';
const ip =
  environment === 'development'
    ? 'http://localhost:8000/api/v1'
    : 'https://social-backend-tzwbd.appengine.bfcplatform.vn/api/v1';
const ipSocket =
  environment === 'development'
    ? 'http://localhost:8000'
    : 'https://social-backend-tzwbd.appengine.bfcplatform.vn';
export { ip, ipSocket };
