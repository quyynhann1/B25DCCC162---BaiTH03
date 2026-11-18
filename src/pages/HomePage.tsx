import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
} from '../features/products/productsSlice'
import ProductCard from '../components/ProductCard'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const status = useAppSelector(selectProductsStatus)
  const error = useAppSelector(selectProductsError)

  // Từ khoá tìm kiếm chỉ dùng cục bộ trong trang này -> useState
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchProducts())
    }
  }, [status, dispatch])

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase()
    if (!q) return products
    return products.filter((p) => p.title.toLowerCase().includes(q))
  }, [products, keyword])

  return (
    <section>
      <div className="toolbar">
        <h1>Sản phẩm</h1>
        <input
          type="search"
          className="input toolbar__search"
          placeholder="Tìm sản phẩm theo tên..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {status === 'loading' && <p className="state">Đang tải sản phẩm...</p>}

      {status === 'failed' && (
        <div className="state state--error">
          <p>Không tải được sản phẩm: {error}</p>
          <button className="btn btn--primary" onClick={() => void dispatch(fetchProducts())}>
            Thử lại
          </button>
        </div>
      )}

      {status === 'succeeded' && filtered.length === 0 && (
        <p className="state">Không tìm thấy sản phẩm phù hợp.</p>
      )}

      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
