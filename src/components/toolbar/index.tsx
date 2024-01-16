import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import { CiSearch } from "react-icons/ci";
import { fetchProductList } from '../../store/product/ProductSlice';
import { useState } from 'react';
import { SelectedFilter } from '../../model/productList/SelectedFilters';
import { StoreState } from '../../model/store/StoreState';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Toolbar() {
    const [search, setSearch] = useState('');
    const filters = useSelector<StoreState, SelectedFilter | undefined>(state => state.product.filters)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation();

    function handleSearch(event: any) {
        event.preventDefault();
        navigate('')
        dispatch(fetchProductList({
            ...filters,
            searchFilter: search
        }))
    }

    return (
        <header className='toolbar'>
            <h1 className='toolbar__title'>Catalago de Produtos</h1>
            {
            location.pathname == '/' &&
                <form className='toolbar__search' onSubmit={handleSearch}>
                    <input className='toolbar__search-field' type="search" onInput={(event: any) => setSearch(event.target.value)}/>
                    <button className='toolbar__search-button' type='submit'>
                        <CiSearch size={30}/>
                    </button>
                </form>
            }
        </header>
    )
}
