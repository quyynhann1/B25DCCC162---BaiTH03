import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearCart, selectCartItems, selectCartTotal } from '../features/cart/cartSlice'
import { useAuth } from '../contexts/AuthContext'
import { formatPrice } from '../utils/format'

export default function CheckoutPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const { user } = useAuth()

  // Trạng thái "đã đặt hàng" chỉ liên quan tới trang này -> useState
  const [ordered, setOrdered] = useState(false)

  const handleOrder = () => {
    dispatch(clearCart())
    setOrdered(true)
  }

  if (ordered) {
    return (
      <div className="state state--success">
        <h1>🎉 Đặt hàng thành công!</h1>
        <p>Cảm ơn {user?.username} đã mua sắm tại ShopMini.</p>
        <Link to="/" className="btn btn--primary">
          Về trang chủ
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="state">
        <h1>Thanh toán</h1>
        <p>Giỏ hàng trống, chưa có gì để thanh toán.</p>
        <Link to="/" className="btn btn--primary">
          Tiếp tục mua sắm
        </Link>
      </div>
    )
  }

  return (
    <section>
      <h1>Thanh toán</h1>
      <p>
        Người đặt: <strong>{user?.username}</strong>
      </p>
      <ul className="checkout-list">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="checkout-item">
            <span>
              {product.title} × {quantity}
            </span>
            <strong>{formatPrice(product.price * quantity)}</strong>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <div className="cart-summary__total">
          Tổng tiền: <strong>{formatPrice(total)}</strong>
        </div>
        <button className="btn btn--primary" onClick={handleOrder}>
          Đặt hàng
        </button>
      </div>
    </section>
  )
}
