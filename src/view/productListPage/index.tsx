import { useState } from 'react'
import { StoreState } from '../../../../model/store/StoreState'
import { Product } from '../../model/Product'
import ProductCard from './components/productCard'
import ProductFilter from './components/productFilter'
import './style.css'
import { useSelector } from 'react-redux'
import { FaFilter } from 'react-icons/fa'

export default function ProductListPage() {
    const [filterIsClose, setFilterIsClose] = useState(true)

    const productList: Product[] = useSelector<StoreState, Product[]>(state => state.product.data)
    return (
        <section className='product-list'>
            <button className='product-list__show-filter' type="button" onClick={() => setFilterIsClose(false)}>
                <FaFilter size={35} color='cornflowerblue'/>
            </button>
            <ProductFilter handleModalChange={setFilterIsClose} isClosed={filterIsClose}/>
            <ul className='product-list__list'>
                {productList.map((product: Product) => <li key={product.id}>
                    <ProductCard product={product} />
                </li>)}
            </ul>
        </section>
    )
}

