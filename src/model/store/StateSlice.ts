import { Option } from "../Option";
import { Product } from "../Product";
import { SelectedFilter } from "../productList/SelectedFilters";
import { StoreStateStatus } from "./StoreStateStatus";

export interface StateSlice<T> {
    data: T[]
    status: StoreStateStatus
    error?: string
}

export interface ProductStateSlide extends StateSlice<Product> {
    brands: Option[]
    filters?: SelectedFilter
}