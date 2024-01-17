import { useDispatch, useSelector } from 'react-redux'
import { Option } from '../../../../model/Option'
import { StoreState } from '../../../../model/store/StoreState'
import ProductFilterField, { ProductFilterFieldProps } from '../productFilterField'
import './style.css'
import { useEffect, useState } from 'react'
import { fetchProductList } from '../../../../store/product/ProductSlice'
import { SelectedFilter, SelectedPriceFilter } from '../../../../model/productList/SelectedFilters'
import ProductPriceField from '../productPriceFilter'
import { IoCloseSharp } from 'react-icons/io5'

interface ProductFilterProps {
    isClosed: boolean;
    handleModalChange: (close: boolean) => void;
}

export default function ProductFilter({ isClosed, handleModalChange }: ProductFilterProps) {
    const [brandCurrentValue, setBrandCurrentValue] = useState('all');
    const [categoryCurrentValue, setCategoryCurrentValue] = useState('all');
    const [priceCurrentValue, setPriceCurrentValue] = useState<SelectedPriceFilter>();
    const brands: Option[] = useSelector<StoreState, Option[]>(state => state.product.brands)
    const categories: Option[] = useSelector<StoreState, Option[]>(state => state.product.categories)
    const selectedFilters: SelectedFilter | undefined = useSelector<StoreState, SelectedFilter | undefined>(state => state.product.filters)
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
        },
        {
            name: 'category',
            title: "Categoria",
            options: [{
                value: 'all',
                label: 'Todas'
            }, ...categories],
            currentValue: categoryCurrentValue,
            handleChanges: (value) => {
                setCategoryCurrentValue(value);
            }
        },
    ]

    useEffect(() => {
        dispatch(fetchProductList(selectedFilters))
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
        dispatch(fetchProductList(selectedFilters));
        handleModalChange(true);
    }

    function handlePriceChanges(minValue: number, maxValue: number) {
        setPriceCurrentValue({
            minValue,
            maxValue,
            name: 'price',
        })
    }

    return (
        <form onSubmit={handleSubmit} className={`product-filter ${isClosed? '--hidden': ''}`}>
            <div className='product-filter__title'>
                <h3> Filtros </h3>
                <button type='button' className='product-filter__close' onClick={() => handleModalChange(true)}>
                    <IoCloseSharp size={30}/>
                </button>
            </div>
            <ul className='product-filter_list'>
                <ProductPriceField currentValue={priceCurrentValue} handleChanges={handlePriceChanges}/>
                {filters.map((filter, index) => <ProductFilterField key={index} {...filter}  />)}
            </ul>
            <button className='product-filter_submit' type='submit' disabled={!hasFilterSelect()}> Filtrar </button>
        </form>
    )
}

