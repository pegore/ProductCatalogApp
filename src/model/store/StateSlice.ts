import { StoreStateStatus } from "./StoreStateStatus";

export interface StateSlice<T> {
    data: T[]
    status: StoreStateStatus
    error?: string
}