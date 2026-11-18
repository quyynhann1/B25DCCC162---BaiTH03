import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from '../features/cart/cartSlice'
import { formatPrice } from '../utils/format'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)

  if (items.length === 0) {
    return (
      <div className="state">
        <h1>Giỏ hàng</h1>
        <p>Giỏ hàng của bạn đang trống.</p>
        <Link to="/" className="btn btn--primary">
          Tiếp tục mua sắm
        </Link>
      </div>
    )
  }

  return (
    <section>
      <h1>Giỏ hàng</h1>
      <ul className="cart-list">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="cart-item">
            <img src={product.image} alt={product.title} className="cart-item__image" />
            <div className="cart-item__info">
              <Link to={`/products/${product.id}`} className="cart-item__title">
                {product.title}
              </Link>
              <span>{formatPrice(product.price)}</span>
            </div>
            <div className="qty">
              <button
                className="btn btn--ghost"
                onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))}
                aria-label="Giảm số lượng"
              >
                −
              </button>
              <span className="qty__value">{quantity}</span>
              <button
                className="btn btn--ghost"
                onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))}
                aria-label="Tăng số lượng"
              >
                +
              </button>
            </div>
            <strong className="cart-item__sum">{formatPrice(product.price * quantity)}</strong>
            <button
              className="btn btn--danger"
              onClick={() => dispatch(removeFromCart(product.id))}
            >
              Xoá
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <button className="btn btn--ghost" onClick={() => dispatch(clearCart())}>
          Xoá toàn bộ giỏ
        </button>
        <div className="cart-summary__total">
          Tổng tiền: <strong>{formatPrice(total)}</strong>
        </div>
        <Link to="/checkout" className="btn btn--primary">
          Thanh toán
        </Link>
      </div>
    </section>
  )
}
