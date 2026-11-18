import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import type { Product } from '../types'
import { formatPrice } from '../utils/format'

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch()

  return (
    <article className="card">
      <Link to={`/products/${product.id}`} className="card__image-wrap">
        <img src={product.image} alt={product.title} className="card__image" loading="lazy" />
      </Link>
      <div className="card__body">
        <span className="card__category">{product.category}</span>
        <Link to={`/products/${product.id}`} className="card__title" title={product.title}>
          {product.title}
        </Link>
        <div className="card__footer">
          <strong className="card__price">{formatPrice(product.price)}</strong>
          <button className="btn btn--primary" onClick={() => dispatch(addToCart(product))}>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  )
}
