export interface SelectedFilter {
    genericFilters: {
        name: string
        value: string
    }[],
    priceFilter?: SelectedPriceFilter
    searchFilter?: string
}

export interface SelectedPriceFilter {
    name: 'price',
    minValue: number
    maxValue: number
}