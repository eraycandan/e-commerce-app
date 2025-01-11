import axios from "axios";


// kategorileri çekmek için kullanıyoruz 


class CategoryService {

    BASE_URL = "https://fakestoreapi.com";

    //! sayfadaki filtreye göre listeleme için kategorileri getirme amaçlı

    async getAllCategories() {
        try {
            const response = await axios.get(`${this.BASE_URL}/products/categories`);
            // console.log(response)
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    //! sadece tek bir ürün kategorisine göre listeleme apisi 

    async getProductsByCategoryName(categoryName) {
        try {
            const response = await axios.get(`${this.BASE_URL}/products/category/${categoryName}`);
            // console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


}

export default new CategoryService();