import axios from "../config/AxiosConfig";
//! axiosta default ile çıkış yaptığımız için axiosInstance vermemize gerek yok

class RegisterPageService {

    register(newUser) {
        return axios.post("/users", newUser)
            .then((response) => {
                // console.log(response)
                return response.data;
            })
            .catch((error) => {
                console.log("kayıt sırasında hata oluştu", error);
                throw error;
            })
    }



}

export default new RegisterPageService();
