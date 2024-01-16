import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StoreStateStatus } from "../../model/store/StoreStateStatus";
import { ProductStateSlide } from "../../model/store/StateSlice";
import { Product } from "../../model/Product";
import { SelectedFilter } from "../../model/productList/SelectedFilters";

const initialState: ProductStateSlide = {
    data: [],
    status: StoreStateStatus.COMPLETE,
    brands: []
}

function filterProductList(productList: Product[], filters?: SelectedFilter): Product[] {
    if (!filters) {
        return productList
    }
    let newProductList: Product[] = [...productList];
    if (filters.searchFilter) {
        newProductList = newProductList.filter(product => product.name.includes(filters.searchFilter || ''))
    }

    if (filters.genericFilters) {
        filters.genericFilters.forEach(filter => {
            if (filter.value == 'all') {
                return;
            }
            newProductList = newProductList.filter(product => product[filter.name].toLowerCase() == filter.value)
        })
    }
    if (filters.priceFilter && (filters.priceFilter?.minValue || filters.priceFilter?.maxValue)) {
        newProductList = newProductList.filter(product => {
            const hasMinValue = filters.priceFilter.minValue? product.price > filters.priceFilter.minValue: true
            const hasMaxValue = filters.priceFilter.maxValue? product.price < filters.priceFilter.maxValue: true
            return  hasMinValue && hasMaxValue
        })
    }
    return newProductList;

}

export const fetchProductList = createAsyncThunk(
    'product/fetchProductList',
    async (selectedFilters?: SelectedFilter) => {
        try {
            const res = await fetch('api.json');
            const data = await res.json();
            return {
                data: filterProductList(data, selectedFilters),
                brands: data.map((product: Product) => {
                    return {
                        value: product.brand.toLowerCase(),
                        label: product.brand,
                    }
                }),
                status: StoreStateStatus.COMPLETE,
                filters: selectedFilters
            }
        } catch (error: any) {
            return {
                error,
                status: StoreStateStatus.ERROR
            }
        }

    }
  )

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers:  (builder) => {
        builder.addCase(fetchProductList.pending, (state) => {
            state.status = StoreStateStatus.LOADING;
        }),
        builder.addCase(fetchProductList.fulfilled, (state, action) => {
            state.filters = action.payload.filters;
            state.data = action.payload.data;
            state.brands = action.payload.brands
            state.status = action.payload.status;
        }),
        builder.addCase(fetchProductList.rejected, (state, action) => {
            state.status = StoreStateStatus.ERROR;
            state.error = action.error.message;
        })
    }
});

export default productSlice.reducer;