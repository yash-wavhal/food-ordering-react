import { configureStore } from "@reduxjs/toolkit";
import ShoppingCart from "./redux/ShoppingCart";
import authReducer from "./redux/authSlice";


const store = configureStore({
    reducer:{
        user: ShoppingCart,
        auth: authReducer,
    }
});

export default store;