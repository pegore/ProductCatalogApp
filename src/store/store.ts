import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product/ProductSlice";
import { StoreState } from "../model/store/StoreState";

const storeConfig = {
    reducer: {
        product: productSlice
    }
}

const store = configureStore<StoreState>(storeConfig)

export default store;