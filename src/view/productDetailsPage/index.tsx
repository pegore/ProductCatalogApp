import { useSelector } from 'react-redux'
import './style.css'
import { Product } from '../../model/Product'
import { StoreState } from '../../model/store/StoreState'
import { useParams } from 'react-router-dom';

export default function ProductDetailsPage() {
    let { id } = useParams();
    const product: Product | undefined = useSelector<StoreState, Product | undefined>(state => state.product.data.find(product => product.id == parseInt(id || '')))

    return (
        <section className='product-details'>
            <img src={product?.cover} alt={product?.name} />
            <div>
                <span className='product-details__info'> {product?.brand} - {product?.category} </span>
                <h4 className='product-details__title'> {product?.name} </h4>
                <span className='product-details__price'> R$ {product?.price} </span>
                <p className='product-details__description'> {product?.description} </p>
                <button className='product-details__buy'> Comprar </button>
            </div>
        </section>
    )
}

