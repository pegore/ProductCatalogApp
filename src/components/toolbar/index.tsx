import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import { CiSearch } from "react-icons/ci";
import { fetchProductList } from '../../store/product/ProductSlice';
import { useState } from 'react';
import { SelectedFilter } from '../../model/productList/SelectedFilters';
import { StoreState } from '../../model/store/StoreState';

export default function Toolbar() {
    const [search, setSearch] = useState('');
    const filters = useSelector<StoreState, SelectedFilter | undefined>(state => state.product.filters)
    const dispatch = useDispatch();

    function handleSearch(event: any) {
        event.preventDefault();
        dispatch(fetchProductList({
            ...filters,
            searchFilter: search
        }))
    }

    return (
        <header className='toolbar'>
            <h1 className='toolbar__title'>Catalago de Produtos</h1>
            <form className='toolbar__search' onSubmit={handleSearch}>
                <input className='toolbar__search-field' type="search" onInput={(event: any) => setSearch(event.target.value)}/>
                <button className='toolbar__search-button' type='submit'>
                    <CiSearch size={30}/>
                </button>
            </form>
        </header>
    )
}
