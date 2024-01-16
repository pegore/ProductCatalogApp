import { StoreState } from '../../../../model/store/StoreState'
import { Product } from '../../model/Product'
import ProductCard from './components/productCard'
import ProductFilter from './components/productFilter'
import './style.css'
import { useSelector } from 'react-redux'

export default function ProductListPage() {
    const productList: Product[] = useSelector<StoreState, Product[]>(state => state.product.data)
    return (
        <section className='product-list'>
            <ProductFilter />
            <ul className='product-list__list'>
                {productList.map((product: Product) => <li key={product.id}>
                    <ProductCard product={product} />
                </li>)}
            </ul>
        </section>
    )
}

