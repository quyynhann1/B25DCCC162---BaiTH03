import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface LocationState {
  from?: { pathname: string; search?: string }
}

export default function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as LocationState | null)?.from
  const redirectTo = from ? `${from.pathname}${from.search ?? ''}` : '/'

  // Dữ liệu form chỉ dùng trong trang này -> useState
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Đã đăng nhập thì không cần ở trang login nữa
  if (user) {
    return <Navigate to={redirectTo} replace />
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!username.trim()) {
      setError('Vui lòng nhập tên đăng nhập')
      return
    }
    if (login(username, password)) {
      navigate(redirectTo, { replace: true })
    } else {
      setError('Sai mật khẩu (gợi ý: 123456)')
    }
  }

  return (
    <section className="auth">
      <h1>Đăng nhập</h1>
      {from && <p className="state">Bạn cần đăng nhập để tiếp tục.</p>}
      <form onSubmit={handleSubmit} className="form">
        <label className="form__field">
          Tên đăng nhập
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </label>
        <label className="form__field">
          Mật khẩu
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error && <p className="form__error">{error}</p>}
        <button type="submit" className="btn btn--primary">
          Đăng nhập
        </button>
      </form>
    </section>
  )
}
