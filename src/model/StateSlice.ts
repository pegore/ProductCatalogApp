import { StoreStateStatus } from "./storeStateStatus";

export interface StateSlice {
    data: any
    status: StoreStateStatus
    error?: string
}