import { useNavigate } from 'react-router-dom';
import { Product } from '../../../../model/Product'
import './style.css'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const navigate = useNavigate();


    function goToDetails() {
        navigate(`/${product.id}`)
    }

    return (
        <figure className='product-card' onClick={goToDetails}>
            <img className='product-card__cover' src={product.cover} alt={product.name} />
            <figcaption className='product-card__name'>{product.name}</figcaption>
            <figcaption className='product-card__brand'>{product.brand}</figcaption>
            <figcaption className='product_card__price' >R$ {product.price}</figcaption>
        </figure>
    )
}

