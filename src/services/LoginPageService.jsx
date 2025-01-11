import axios from "../config/AxiosConfig";
//! axiosta default ile çıkış yaptığımız için axiosInstance vermemize gerek yok
//! kök url



class LoginPageService {

    //---------------------------------  BURDAN TÜM DATA GET İLE ÇEKİLİP LOGİN PAGEYE KARŞILAŞTIRMA İÇİN GÖNDERİLİR

    login() {
        return axios.get("/users")
            .then((response) => {
                console.log(response)
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            })
    }





}


export default new LoginPageService();