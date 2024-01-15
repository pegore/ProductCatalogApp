import { StoreState } from '../../../../model/store/StoreState'
import { Product } from '../../model/Product'
import ProductCard from './components/productCard'
import './style.css'
import { useSelector } from 'react-redux'

export default function ProductListPage() {
    const productList: Product[] = useSelector<StoreState, Product[]>(state => state.product.data)
    return (
        <ul className='product-list'>
            {productList.map((product: Product) => <li key={product.id}>
                <ProductCard product={product} />
            </li>)}
        </ul>
    )
}

