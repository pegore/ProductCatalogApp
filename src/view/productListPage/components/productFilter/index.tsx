import { useDispatch, useSelector } from 'react-redux'
import { Option } from '../../../../model/Option'
import { StoreState } from '../../../../model/store/StoreState'
import ProductFilterField, { ProductFilterFieldProps } from '../productFilterField'
import './style.css'
import { useEffect, useState } from 'react'
import { fetchProductList } from '../../../../store/product/ProductSlice'
import { SelectedFilter, SelectedPriceFilter } from '../../../../model/productList/SelectedFilters'
import ProductPriceField from '../productPriceFilter'

export default function ProductFilter() {
    const [brandCurrentValue, setBrandCurrentValue] = useState('all');
    const [priceCurrentValue, setPriceCurrentValue] = useState<SelectedPriceFilter>();
    const brands: Option[] = useSelector<StoreState, Option[]>(state => state.product.brands)
    const dispatch = useDispatch();

    const filters: ProductFilterFieldProps[] = [
        {
            name: 'brand',
            title: "Marca",
            options: [{
                value: 'all',
                label: 'Todas'
            }, ...brands],
            currentValue: brandCurrentValue,
            handleChanges: (value) => {
                setBrandCurrentValue(value);
            }
        }
    ]

    useEffect(() => {
        dispatch(fetchProductList())
    }, [])

    function hasFilterSelect() {
        const hasPriceFilter = priceCurrentValue?.minValue || priceCurrentValue?.maxValue;
        return filters.some(filter => !!filter.currentValue) || hasPriceFilter;
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        const selectedFilters: SelectedFilter = {
            genericFilters: filters.filter(filter => !!filter.currentValue).map(filter => {
                return {
                    name: filter.name,
                    value: filter.currentValue
                }
            }),
            priceFilter: priceCurrentValue
        }
        dispatch(fetchProductList(selectedFilters))
    }

    function handlePriceChanges(minValue: number, maxValue: number) {
        setPriceCurrentValue({
            minValue,
            maxValue,
            name: 'price',
        })
    }

    return (
        <form onSubmit={handleSubmit} className='product-filter'>
            <h3> Filtros </h3>
            <ul className='product-filter_list'>
                <ProductPriceField currentValue={priceCurrentValue} handleChanges={handlePriceChanges}/>
                {filters.map(filter => <ProductFilterField {...filter}  />)}
            </ul>
            <button className='product-filter_submit' type='submit' disabled={!hasFilterSelect()}> Filtrar </button>
        </form>
    )
}

