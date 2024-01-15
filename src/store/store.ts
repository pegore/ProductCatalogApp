import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";

const storeConfig = {
    reducer: {
        product: productSlice
    }
}

const store = configureStore(storeConfig)

export default store;