# Cosan Mini App

<p style="display: flex; flex-wrap: wrap; gap: 4px">
  <img alt="vite" src="https://img.shields.io/badge/vite-5.2.13-646CFF?logo=vite" />
  <img alt="react" src="https://img.shields.io/badge/react-18.3.1-61DAFB?logo=react" />
  <img alt="zmp-ui" src="https://img.shields.io/badge/zmp--ui-1.11.5-0084FF" />
  <img alt="zmp-sdk" src="https://img.shields.io/badge/zmp--sdk-2.41.0-0084FF" />
  <img alt="jotai" src="https://img.shields.io/badge/jotai-2.10.0-000000" />
  <img alt="tailwindcss" src="https://img.shields.io/badge/tailwindcss-3.4.3-06B6D4?logo=tailwindcss" />
</p>

Ứng dụng Mini App của Cosan trên nền tảng Zalo. Cung cấp đầy đủ tính năng mua sắm trực tuyến như xem sản phẩm, giỏ hàng, thanh toán và quản lý đơn hàng.


## Cài đặt và Phát triển

### Yêu cầu hệ thống

- Node.js >= 16.0.0
- npm hoặc yarn
- Zalo Mini App CLI hoặc Extension

### Cài đặt dự án

1. **Clone** repository này:
   ```bash
   git clone <repository-url>
   cd mini-app-cosan
   ```

2. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

3. **Cấu hình App ID** trong `app-config.json` nếu cần thiết.

4. **Khởi chạy** development server:
   ```bash
   npm start
   # hoặc
   zmp start
   ```

5. **Mở** `localhost:3000` trong browser để xem ứng dụng 🚀

### Sử dụng Zalo Mini App Extension

1. Cài đặt [Visual Studio Code](https://code.visualstudio.com/download) và [Zalo Mini App Extension](https://mini.zalo.me/docs/dev-tools).
2. Mở project trong VS Code.
3. Sử dụng Extension để **Configure App ID** và **Install Dependencies**.
4. Chuyển đến **Run** panel > **Start** để phát triển Mini App.

## Triển khai (Deployment)

1. **Tạo** Zalo Mini App ID. Tham khảo hướng dẫn tại [Coffee Shop Tutorial](https://mini.zalo.me/tutorial/coffee-shop/step-1/).

2. **Build** ứng dụng cho production:
   ```bash
   npm run build
   ```

3. **Deploy** Mini App lên Zalo:

   Sử dụng Zalo Mini App Extension: 
   - Chuyển đến Deploy panel > Login > Deploy

   Sử dụng `zmp-cli`:
   ```bash
   zmp login
   zmp deploy
   ```

4. **Quét QR code** bằng Zalo để xem trước Mini App của bạn.

## Cấu trúc dự án

Dự án được xây dựng với React + TypeScript và tích hợp với hệ thống backend CRM của Cosan.

### Cấu trúc thư mục:

- **`src`**: Chứa toàn bộ source code của Mini App:

  - **`components`**: Các component React có thể tái sử dụng
  - **`pages`**: Các trang chính của ứng dụng (Home, Cart, Checkout, Profile, v.v.)
  - **`api`**: Tích hợp API với backend Cosan
  - **`services`**: Các service xử lý logic nghiệp vụ
  - **`state`**: Quản lý state toàn cục với Jotai
  - **`utils`**: Các utility functions và helpers
  - **`css`**: Stylesheets với Tailwind CSS
  - **`static`**: Static assets (images, icons)
  - **`mock`**: Dữ liệu mẫu cho development
  - **`types.d.ts`**: TypeScript type definitions

- **`app-config.json`**: [Cấu hình Zalo Mini App](https://mini.zalo.me/documents/intro/getting-started/app-config/)

### Tính năng chính:

- 🛍️ **Catalog sản phẩm**: Xem danh sách và chi tiết sản phẩm
- 🛒 **Giỏ hàng**: Thêm, xóa, cập nhật số lượng sản phẩm
- 💳 **Thanh toán**: COD
- 📦 **Quản lý đơn hàng**: Theo dõi trạng thái đơn hàng
- 👤 **Hồ sơ người dùng**: Quản lý thông tin cá nhân
- 🔍 **Tìm kiếm**: Tìm kiếm sản phẩm theo từ khóa
- 📱 **Responsive**: Tối ưu cho mobile

## Cấu hình và Tùy chỉnh

### Kết nối với API Backend

Ứng dụng đã được cấu hình để kết nối với API backend của Cosan:

```json
// app-config.json
"template": {
  "apiUrl": "https://code.cosan.vn/api",
  "oaIDtoOpenChat": "4318657068771012646"
}
```

### API Endpoints được sử dụng:

- `GET /categories`: Lấy danh sách danh mục sản phẩm
- `GET /products`: Lấy danh sách sản phẩm
- `GET /banners`: Lấy danh sách banner hiển thị trên trang chủ
- `POST /orders`: Tạo đơn hàng mới
- `GET /orders/{id}`: Lấy thông tin chi tiết đơn hàng

> Tham khảo các file trong `src/mock/*.json` để xem cấu trúc dữ liệu mẫu.

> Để sử dụng các API yêu cầu xác thực, user identity có thể được lấy từ header `Authorization: Bearer ${ACCESS_TOKEN}`. Xem thêm tại [Login with Zalo](https://mini.zalo.me/intro/authen-user/).


### Tùy chỉnh giao diện

Điều chỉnh CSS variables trong `src/css/tailwind.scss` để phù hợp với thương hiệu của bạn:

```scss
// src/css/tailwind.scss
:root {
  --primary: #your-brand-color;
  --secondary: #your-secondary-color;
}
```

## Scripts có sẵn

```bash
# Khởi chạy development server
npm start

# Deploy lên Zalo Mini App
npm run deploy

# Build CSS với PostCSS
npm run build:css
```

## Công nghệ sử dụng

- **React 18** - UI Framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Jotai** - State management
- **Zalo Mini App SDK** - Platform integration
- **Vite** - Build tool
- **React Router** - Navigation
