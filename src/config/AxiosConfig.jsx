import axios from 'axios';
// https://axios-http.com/docs/instance
//! KÖK ADRES OLUŞTURMA  -  kendi oluşturduğumuz json-servera kullanıcı gönderme


const axiosRootInstance = axios.create({
    baseURL: 'http://localhost:3005',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
})


// dışarı istediğimi gibi çağırmak için
export default axiosRootInstance;