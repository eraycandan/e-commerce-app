import axios from 'axios';



class ProductService {
    //----------------------------------------------- FAKESTORE DEN ÜRÜNLERİ ÇEKMEK İÇİN KULLANILIR
    BASE_URL = "https://fakestoreapi.com";


    async getAllProducts() {
        //http://localhost:5001/users
        //https://fakestoreapi.com/products     //! farklı bir api isteği atılcağından axiosRootInstanceyi çağıramıyoruz
        try {
            const response = await axios.get(`${this.BASE_URL}/products`);
            // console.log(response.data)
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    //? product detail yazarken çağırılan servis fakestore api de number tipli olduğunu gördük

    async getProductById(productId) {
        try {
            const response = await axios.get(`${this.BASE_URL}/products/${productId}`)
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }




}




export default new ProductService();