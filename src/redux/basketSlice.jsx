import { createSlice } from '@reduxjs/toolkit'




const initialState = {
    basket: [],
    totalAmount: 0
}


const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {

        //----------------------- satın alım sonrası sayfa yenilendiğinde app den gelen basket değerini basmak için

        setBasket: (state, action) => {
            state.basket = [...action.payload];
        },
        //----------------------- sepete ürün ekleme
        addProductToBasket: (state, action) => {
            // console.log(state, action)
            if (state.basket == 0) {
                state.basket = [action.payload]
            } else {
                //içeride ürünler varsa
                const findProduct = state.basket.find((product) => product.id === action.payload.id);
                if (findProduct) {
                    //bu ürün daha önceden eklenmiş
                    if (findProduct.count && action.payload.count) {
                        findProduct.count = findProduct.count + action.payload.count;
                        //! eğer mevcut basketimin id si gelen ürünle eşitse yeni ürünü dön değilse mevcut basketi dön diyoruz
                        //! seperade operatörü ile yeni dizi dönebiliriz
                        state.basket = [...state.basket.map((product) => product.id === findProduct.id ? findProduct : product)];
                    }
                } else {
                    // basket dolu ama bu ürün daha önce eklenmemiş
                    state.basket = [...state.basket, action.payload] //! önceki basketleri distruct edip yeni gelenleri payload olarak ekle
                }
            }
            localStorage.setItem("basket", JSON.stringify(state.basket));
        },
        //----------------------- sepete ürün fiyatı toplama
        calculateBasket: (state) => {
            let totalAmount = 0;
            state.basket && state.basket.map((product) => {
                if (product.count) {
                    totalAmount += product.price * product.count;
                }
            })
            state.totalAmount = totalAmount.toFixed(2);
        },

        //----------------------- sepetten ürün çıkarma
        removeProductFromBasket: (state, action) => {
            state.basket = [...state.basket.filter((product) => product.id !== action.payload)];
            //! idsi eşit olmayanları filtreledik bunları bırakdıtk
            localStorage.setItem("basket", JSON.stringify(state.basket));
        }

    }
})


export const { setBasket, addProductToBasket, calculateBasket, removeProductFromBasket } = basketSlice.actions
export default basketSlice.reducer