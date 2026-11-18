# ShopMini

Ứng dụng cửa hàng mini xây dựng bằng **React + TypeScript (Vite)**, quản lý state toàn cục bằng **Context API** và **Redux Toolkit**. Bài thực hành 03 (TH01).

## Chạy dự án

```bash
npm install
npm run dev      # chạy môi trường phát triển
npm run build    # kiểm tra kiểu TypeScript + build production
```

## Các trang

| Đường dẫn | Mô tả |
| --- | --- |
| `/` | Trang chủ: lưới sản phẩm responsive (1/2/4 cột), tìm kiếm theo tên |
| `/products/:id` | Chi tiết sản phẩm |
| `/cart` | Giỏ hàng: tăng/giảm số lượng, xoá, tổng tiền |
| `/login` | Đăng nhập giả lập (mật khẩu đúng: `123456`, tên đăng nhập tuỳ ý) |
| `/checkout` | Thanh toán (**protected route**) |
| `*` | Trang 404 |

Luồng bảo vệ route: vào `/checkout` khi chưa đăng nhập → chuyển sang `/login` (lưu lại đường dẫn cũ trong `location.state`) → đăng nhập xong quay lại `/checkout`.

## Dữ liệu nằm ở đâu và vì sao

### `useState` (state cục bộ của từng component)

| Dữ liệu | Vị trí | Lý do |
| --- | --- | --- |
| Từ khoá tìm kiếm | `HomePage` | Chỉ trang chủ dùng; không cần chia sẻ, rời trang thì bỏ cũng được |
| `username`, `password`, thông báo lỗi trong form | `LoginPage` | Dữ liệu tạm của form, không component nào khác cần |
| Cờ `ordered` (đã đặt hàng) | `CheckoutPage` | Chỉ để hiển thị thông báo thành công trong trang này |
| `theme`, `user` bên trong Provider | `ThemeProvider`, `AuthProvider` | Đây là nơi lưu giá trị gốc, rồi được chia sẻ qua Context |

### Context API

| Dữ liệu | Context | Lý do |
| --- | --- | --- |
| Theme sáng/tối + `toggleTheme` | `ThemeContext` | Nhiều component cần đọc (Header, toàn bộ giao diện), **ít thay đổi**, logic đơn giản nên không cần Redux |
| `user`, `login`, `logout` | `AuthContext` | Header, `LoginPage`, `ProtectedRoute`, `CheckoutPage` đều cần; là state "môi trường" của ứng dụng, ít thay đổi, logic đơn giản |

### Redux Toolkit

| Dữ liệu | Slice | Lý do |
| --- | --- | --- |
| Danh sách sản phẩm + `status` (`idle/loading/succeeded/failed`) + `error` | `productsSlice` | Dữ liệu từ API dùng ở nhiều trang (Trang chủ, Chi tiết); cần quản lý bất đồng bộ nên dùng `createAsyncThunk`; tải một lần rồi dùng lại, không gọi API lại khi chuyển trang |
| Giỏ hàng (`addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`) | `cartSlice` | Nhiều component đọc/ghi (ProductCard, Header, CartPage, CheckoutPage), **thay đổi thường xuyên**, có logic nghiệp vụ và dữ liệu dẫn xuất (tổng số lượng, tổng tiền) → dùng selector có memoize (`createSelector`), tránh render thừa |

### Nguyên tắc chọn

- Chỉ một component dùng → `useState`.
- Nhiều component dùng nhưng ít đổi, logic đơn giản (theme, đăng nhập) → Context.
- Dữ liệu dùng chung, đổi thường xuyên, có logic phức tạp / bất đồng bộ / dữ liệu dẫn xuất (sản phẩm, giỏ hàng) → Redux Toolkit.

## Cấu trúc thư mục

```
src/
├── app/            store.ts, hooks.ts
├── features/       products/productsSlice.ts, cart/cartSlice.ts
├── contexts/       ThemeContext.tsx, AuthContext.tsx
├── components/     Header, ProductCard, ProtectedRoute
├── layouts/        MainLayout.tsx
├── pages/          Home, ProductDetail, Cart, Login, Checkout, NotFound
├── types/          Product, CartItem, User
├── utils/          format.ts
├── App.tsx         khai báo Routes
└── main.tsx        Provider → ThemeProvider → AuthProvider → BrowserRouter
```

## Ghi chú

- API: <https://fakestoreapi.com/products>
- Toàn bộ code dùng TypeScript strict, không dùng `any`.
