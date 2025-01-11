import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appSlice'
import basketReducer from './basketSlice'

export const store = configureStore({
    reducer: {
        app: appReducer,
        basket: basketReducer
    },
})