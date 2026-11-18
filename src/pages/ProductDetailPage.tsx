import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  fetchProducts,
  selectProductById,
  selectProductsStatus,
} from '../features/products/productsSlice'
import { addToCart } from '../features/cart/cartSlice'
import { formatPrice } from '../utils/format'
import NotFoundPage from './NotFoundPage'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const productId = Number(id)
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectProductsStatus)
  const product = useAppSelector(selectProductById(productId))

  // Vào thẳng /products/:id (F5) thì danh sách chưa có -> tự tải
  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchProducts())
    }
  }, [status, dispatch])

  if (status === 'idle' || status === 'loading') {
    return <p className="state">Đang tải sản phẩm...</p>
  }
  if (status === 'failed') {
    return (
      <div className="state state--error">
        <p>Không tải được dữ liệu sản phẩm.</p>
        <button className="btn btn--primary" onClick={() => void dispatch(fetchProducts())}>
          Thử lại
        </button>
      </div>
    )
  }
  if (!product) {
    return <NotFoundPage />
  }

  return (
    <section className="detail">
      <Link to="/" className="detail__back">
        ← Quay lại danh sách
      </Link>
      <div className="detail__layout">
        <div className="detail__image-wrap">
          <img src={product.image} alt={product.title} className="detail__image" />
        </div>
        <div className="detail__info">
          <span className="card__category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="detail__price">{formatPrice(product.price)}</p>
          <p className="detail__desc">{product.description}</p>
          <button className="btn btn--primary" onClick={() => dispatch(addToCart(product))}>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </section>
  )
}
