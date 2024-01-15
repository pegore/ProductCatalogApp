import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StoreStateStatus } from "../../model/storeStateStatus";
import { StateSlice } from "../../model/StateSlice";

const initialState: StateSlice = {
    data: [],
    status: StoreStateStatus.COMPLETE,
}

export const fetchProductList = createAsyncThunk(
    'product/fetchProductList',
    async () => {
        try {
            const res = await fetch('api.json');
            const data = await res.json();
            return {
                data,
                status: StoreStateStatus.COMPLETE
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
            state.data = action.payload.data;
            state.status = action.payload.status;
        }),
        builder.addCase(fetchProductList.rejected, (state, action) => {
            state.status = StoreStateStatus.ERROR;
            state.error = action.error.message;
        })
    }
});

export default productSlice.reducer;