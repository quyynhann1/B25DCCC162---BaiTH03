import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCartCount } from '../features/cart/cartSlice'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

export default function Header() {
  const cartCount = useAppSelector(selectCartCount)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          🛍️ ShopMini
        </Link>

        <nav className="header__nav">
          <NavLink to="/cart" className="header__link">
            🛒 Giỏ hàng
            <span className="badge" aria-label={`${cartCount} sản phẩm trong giỏ`}>
              {cartCount}
            </span>
          </NavLink>

          {user ? (
            <>
              <span className="header__user">Xin chào, {user.username}</span>
              <button className="btn btn--ghost" onClick={logout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <NavLink to="/login" className="header__link">
              Đăng nhập
            </NavLink>
          )}

          <button
            className="btn btn--ghost"
            onClick={toggleTheme}
            aria-label="Đổi giao diện sáng/tối"
          >
            {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
          </button>
        </nav>
      </div>
    </header>
  )
}
