// const ip = 'https://social-networking-v1.herokuapp.com/api/v1';
const environment = process.env.NODE_ENV || 'development';
const ip =
  environment === 'development' ? 'http://localhost:8000/api/v1' : 'https://2dl1ul.deta.dev/api/v1';
const ipSocket =
  environment === 'development' ? 'http://localhost:8000/' : 'https://2dl1ul.deta.dev/';
export { ip, ipSocket };
