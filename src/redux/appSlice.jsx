import React from "react";
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    currentUser: {},
    products: [],
    favoriteProducts: [],
    loading: false,
    drawer: false,
    favoriteDrawer: false,
    darkMode: false
}



export const appSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setDrawer: (state, action) => {
            state.drawer = action.payload;
        },
        setFavoriteDrawer: (state, action) => {
            state.favoriteDrawer = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },

        setFavoriteProductsApp: (state, action) => {
            state.favoriteProducts = [...action.payload]
        },      //! seçili ürünler belli olduğu için localden  setFavoriteProducts gibi kontrol yapılmayacak

        setFavoriteProducts: (state, action) => {
            if (state.favoriteProducts.find(product => product.id === action.payload)) {
                state.favoriteProducts = [...state.favoriteProducts.filter(product => product.id !== action.payload)]
            } else {
                const productToAdd = state.products.find(product => product.id === action.payload);
                if (productToAdd) {
                    state.favoriteProducts = [...state.favoriteProducts, productToAdd];
                    console.log(state.favoriteProducts)
                }
            }
            localStorage.setItem("favorite", JSON.stringify(state.favoriteProducts))
        },
        removeProductFromFavoriteProducts: (state, action) => {
            state.favoriteProducts = [...state.favoriteProducts.filter((product) => product.id !== action.payload)];
            //! idsi eşit olmayanları filtreledik bunları bırakdıtk
            localStorage.setItem("favorite", JSON.stringify(state.favoriteProducts));
        },

        // initial statedeki productları maple dönüp - typesdeki title ile yakalıyoruz
        filterProducts: (state, action) => {
            const tempList = [];
            state.products.map((product) => {
                if (product.title.toLowerCase().includes(action.payload.toLowerCase())) {
                    tempList.push(product);
                }
            })
            state.products = [...tempList];
        },
        updateBalance: (state, action) => {
            const user = {
                ...action.payload
            }
            state.currentUser = user;
            localStorage.setItem("currentLoginUser", JSON.stringify(state.currentUser));
        },
        setCurrentLoginUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setChangeDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        }
    }

})

export const { setLoading, setDrawer, setFavoriteDrawer, setProducts, setFavoriteProductsApp, setFavoriteProducts, removeProductFromFavoriteProducts, filterProducts, updateBalance, setCurrentLoginUser, setChangeDarkMode } = appSlice.actions

export default appSlice.reducer