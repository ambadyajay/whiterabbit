import axios from 'axios';

export default function request(type, url, params) {

  switch (type) {
    case 'get':
      return axios
        .get(url)
        .then(function (response) {
          if (response.status === 200) {
            return response.data;
          }
        })
        .catch(function (error) {
          if (error.message.includes('status code 500')) {
            // alert('Token expired please login again');
          }
          console.log('Get Server Error', error);
          return error.response.data;
        });
      break;
    
    default:
      break;
  }
}