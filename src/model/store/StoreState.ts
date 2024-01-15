import { Product } from "../Product";
import { StateSlice } from "./StateSlice";

export interface StoreState {
    product: StateSlice<Product>
}