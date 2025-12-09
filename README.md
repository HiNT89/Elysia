# Travel Booking Application

Ứng dụng quản lý tour du lịch được xây dựng với HTML, CSS, JavaScript, jQuery và Bootstrap.

## 🎯 Tính năng chính

### 1. Quản lý người dùng

- **Đăng nhập**: Người dùng nhập email và mật khẩu để đăng nhập
- **Đăng ký tài khoản**: Tạo tài khoản mới với validation email và mật khẩu
- **Xác thực**: Hệ thống kiểm tra thông tin và cho phép truy cập
- **Đăng xuất**: Người dùng có thể đăng xuất khỏi hệ thống

### 2. Quản lý Tour Du lịch

- **Hiển thị danh sách tour**: Xem tất cả các tour có sẵn
- **Thêm tour mới**: Tạo tour với thông tin đầy đủ
- **Sửa tour**: Cập nhật thông tin tour đã có
- **Xóa tour**: Xóa tour không còn sử dụng
- **Lọc theo địa điểm**: Tìm tour theo destination
- **Lọc theo giá**: Tìm tour theo khoảng giá
- **Tìm kiếm**: Tìm kiếm tour theo tên hoặc thời lượng

### 3. Danh sách Tour Yêu thích (LocalStorage)

- **Lưu tour**: Lưu tour mà người dùng quan tâm
- **Xem danh sách**: Xem tất cả tour đã lưu
- **Xóa tour**: Xóa tour khỏi danh sách yêu thích
- **Ghi chú**: Thêm ghi chú cho tour yêu thích

### 4. Tính năng nâng cao

- **Animation**: Hiệu ứng chuyển động mượt mà
- **Dark Mode**: Chế độ tối bảo vệ mắt
- **Multi Language**: Hỗ trợ Tiếng Việt và English
- **Performance**: Tối ưu hóa hiệu suất với debounce/throttle

## 🏗️ Cấu trúc dự án

```
travel-booking/
│
├── index.html              # File HTML chính
├── README.md              # Tài liệu hướng dẫn
│
├── css/
│   └── style.css          # Custom styles, animations, dark mode
│
└── js/
    ├── api.js             # API Service - Dễ dàng thay đổi API
    ├── i18n.js            # Multi-language support
    ├── auth.js            # Authentication logic
    ├── tours.js           # Tour management
    ├── favorites.js       # Favorites management (LocalStorage)
    └── app.js             # Main application entry point
```

## 🔧 Thay đổi API

### Cách 1: Thay đổi Mock API sang Real API

Mở file `js/api.js` và tìm dòng cuối:

```javascript
// Để sử dụng Real API: const API = ApiService;
// Để sử dụng Mock API: const API = MockApiService;
const API = MockApiService; // Sử dụng Mock API hiện tại

// Thay đổi thành:
const API = ApiService; // Sử dụng Real API
```

### Cách 2: Cấu hình API URL

Trong file `js/api.js`, thay đổi cấu hình:

```javascript
const API_CONFIG = {
  baseURL: "https://your-api-url.com", // Thay đổi URL tại đây
  endpoints: {
    users: "/users",
    tours: "/tours",
  },
  headers: {
    "Content-Type": "application/json",
    // Thêm authentication token nếu cần
    // 'Authorization': 'Bearer YOUR_TOKEN'
  },
};
```

### Cách 3: Sử dụng MockAPI (Tool Fake API)

1. Đăng ký tài khoản tại [MockAPI.io](https://mockapi.io/)
2. Tạo project mới
3. Tạo resources: `users` và `tours` với các fields như yêu cầu
4. Copy API URL và update vào `API_CONFIG.baseURL`

```javascript
const API_CONFIG = {
  baseURL: "https://[your-id].mockapi.io/api/v1",
  endpoints: {
    users: "/users",
    tours: "/tours",
  },
};
```

## 🚀 Hướng dẫn sử dụng

### 1. Cài đặt

```bash
# Clone hoặc tải project về
cd travel-booking

# Mở file index.html bằng trình duyệt
# Hoặc sử dụng Live Server trong VS Code
```

### 2. Sử dụng ứng dụng

#### Bước 1: Đăng ký tài khoản

- Nhấn tab "Đăng ký"
- Nhập họ tên, email, mật khẩu (tối thiểu 6 ký tự)
- Nhấn "Đăng ký"

#### Bước 2: Đăng nhập

- Nhập email và mật khẩu đã đăng ký
- Nhấn "Đăng nhập"

#### Bước 3: Quản lý Tour

- Xem danh sách tour có sẵn
- Nhấn "Thêm Tour" để tạo tour mới
- Nhấn "Sửa" để chỉnh sửa tour
- Nhấn "Xóa" để xóa tour

#### Bước 4: Tìm kiếm và Lọc

- Sử dụng ô tìm kiếm để tìm tour
- Chọn địa điểm từ dropdown
- Chọn thời lượng tour

#### Bước 5: Yêu thích Tour

- Nhấn icon ♡ trên card tour để thêm vào yêu thích
- Nhấn nút "Yêu thích" để xem danh sách
- Nhấn icon ♥ để xóa khỏi danh sách

## 📦 Dependencies

- **Bootstrap 5.3.0**: UI Framework
- **jQuery 3.7.0**: JavaScript library
- **Font Awesome 6.4.0**: Icons

## 🎨 Tính năng UI/UX

### Animations

- Fade in khi load trang
- Slide up cho card
- Hover effects
- Smooth transitions

### Dark Mode

- Tự động lưu preference
- Toggle bằng button trên navbar
- Responsive với tất cả components

### Multi Language

- Tiếng Việt (mặc định)
- English
- Dễ dàng thêm ngôn ngữ mới trong `js/i18n.js`

### Performance

- Debounce cho search input
- Throttle cho scroll events
- Lazy loading cho images (nếu có)
- Optimized rendering

## 🔐 LocalStorage Data

Ứng dụng lưu trữ dữ liệu trong LocalStorage:

```javascript
// User authentication
currentUser: { id, name, email, createdAt }

// Mock data (khi dùng MockApiService)
mock_users: [...]
mock_tours: [...]

// Favorites
tour_favorites: [tourId1, tourId2, ...]

// Settings
theme: 'light' | 'dark'
language: 'vi' | 'en'
```

## 📱 Responsive Design

- Desktop: Grid layout 3 columns
- Tablet: Grid layout 2 columns
- Mobile: Stack layout 1 column

## ⚡ Performance Tips

1. **Debounced Search**: Search chỉ trigger sau 300ms người dùng ngừng gõ
2. **Throttled Scroll**: Scroll events chỉ fire mỗi 100ms
3. **Lazy Animation**: Animation chỉ chạy khi element vào viewport
4. **Cached Data**: Data được cache trong memory để giảm API calls

## 🔄 Quy trình phát triển

### Thêm tính năng mới

1. Thêm UI trong `index.html`
2. Thêm styles trong `css/style.css`
3. Thêm logic trong file JavaScript tương ứng
4. Test trên nhiều trình duyệt

### Thêm API endpoint mới

Trong `js/api.js`:

```javascript
// Thêm vào API_CONFIG
endpoints: {
    users: '/users',
    tours: '/tours',
    bookings: '/bookings' // Endpoint mới
}

// Thêm service methods
bookings: {
    getAll: async () => {
        return await ApiService.request(API_CONFIG.endpoints.bookings);
    },
    create: async (data) => {
        return await ApiService.request(API_CONFIG.endpoints.bookings, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}
```

## 🐛 Debugging

Mở Developer Console (F12) để xem:

- Performance metrics
- API calls
- Error messages
- Console logs

## 📝 TODO / Future Enhancements

- [ ] Thêm booking system
- [ ] Payment integration
- [ ] Email notifications
- [ ] Image upload cho tours
- [ ] Reviews và ratings
- [ ] Social sharing
- [ ] PWA support (offline mode)
- [ ] Export/Import favorites

## 📄 License

MIT License - Free to use and modify

## 👨‍💻 Developer

Được xây dựng với ❤️ sử dụng HTML, CSS, JavaScript, jQuery, Bootstrap

---

**Lưu ý**: Ứng dụng hiện đang sử dụng MockAPI (dữ liệu giả trong LocalStorage). Để sử dụng API thật, vui lòng xem hướng dẫn "Thay đổi API" ở trên.
