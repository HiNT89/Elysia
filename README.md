# 🌍 Travel Booking Application

> Ứng dụng quản lý tour du lịch hiện đại với giao diện đẹp mắt, tính năng đa ngôn ngữ và chế độ Dark Mode

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=flat&logo=jquery&logoColor=white)](https://jquery.com/)

## 📖 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Tính năng](#-tính-năng)
- [Demo & Screenshots](#-demo--screenshots)
- [Cài đặt](#-cài-đặt)
- [Cấu trúc dự án](#️-cấu-trúc-dự-án)
- [Cấu hình API](#-cấu-hình-api)
- [Hướng dẫn sử dụng](#-hướng-dẫn-sử-dụng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Tính năng nâng cao](#-tính-năng-nâng-cao)
- [Hướng dẫn phát triển](#-hướng-dẫn-phát-triển)
- [License](#-license)

## 🎯 Giới thiệu

**Travel Booking** là một ứng dụng web Single Page Application (SPA) được xây dựng để quản lý tour du lịch một cách hiệu quả. Ứng dụng cung cấp giao diện người dùng trực quan, dễ sử dụng với nhiều tính năng hiện đại như:

- ✨ Giao diện responsive, hoạt động mượt mà trên mọi thiết bị
- 🌙 Chế độ Dark Mode thân thiện với mắt
- 🌐 Đa ngôn ngữ (Tiếng Việt & English)
- ⚡ Hiệu suất cao với debounce/throttle optimization
- 💾 Lưu trữ dữ liệu local với LocalStorage
- 🎨 Animation và transitions mượt mà

## ✨ Tính năng

### 🔐 Quản lý người dùng

- **Đăng ký**: Tạo tài khoản mới với validation email và mật khẩu
- **Đăng nhập**: Xác thực người dùng an toàn
- **Quản lý session**: Duy trì phiên đăng nhập
- **Đăng xuất**: Kết thúc phiên làm việc một cách bảo mật

### 🏖️ Quản lý Tour

- **CRUD Operations**: Tạo, đọc, cập nhật, xóa tour
- **Tìm kiếm thông minh**: Tìm kiếm theo tên, địa điểm, giá, thời lượng
- **Lọc nâng cao**:
  - Lọc theo địa điểm (destination)
  - Lọc theo khoảng giá
  - Lọc theo thời lượng tour
- **Hiển thị**: Grid view responsive với card design hiện đại
- **Validation**: Kiểm tra dữ liệu đầu vào đầy đủ

### ❤️ Tour Yêu thích

- **Lưu trữ local**: Sử dụng LocalStorage để lưu danh sách yêu thích
- **Quản lý**: Thêm/xóa tour khỏi danh sách
- **Persistent**: Dữ liệu được giữ lại ngay cả khi đóng trình duyệt
- **Đồng bộ**: Cập nhật real-time giữa các tab

### 🎨 UI/UX

- **Animations**: Fade in, slide up, hover effects
- **Dark Mode**: Chuyển đổi theme light/dark
- **Multi-language**: Chuyển đổi ngôn ngữ dễ dàng
- **Responsive**: Tối ưu cho mobile, tablet, desktop
- **Loading states**: Skeleton loading và progress indicators

## 📸 Demo & Screenshots

```
🖥️ Desktop View    📱 Mobile View    🌙 Dark Mode
[Grid Layout]     [Stack Layout]    [Dark Theme]
```

## 🚀 Cài đặt

### Yêu cầu

- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code khuyến nghị)
- Live Server extension (tùy chọn)

### Các bước cài đặt

1. **Clone repository**

```bash
git clone https://github.com/your-username/travel-booking.git
cd travel-booking
```

2. **Mở ứng dụng**

**Cách 1**: Sử dụng Live Server trong VS Code

- Cài đặt extension "Live Server"
- Click chuột phải vào `index.html`
- Chọn "Open with Live Server"

**Cách 2**: Mở trực tiếp file

- Double click vào file `index.html`
- Hoặc kéo thả file vào trình duyệt

3. **Truy cập ứng dụng**

```
Địa chỉ mặc định: http://localhost:5500 (Live Server)
Hoặc: file:///path/to/travel-booking/index.html
```

## 🗂️ Cấu trúc dự án

```
travel-booking/
│
├── index.html              # Trang chính - Single Page Application
├── README.md               # Tài liệu dự án (file này)
│
├── css/
│   └── style.css           # Styles, animations, dark mode, responsive
│
├── js/
│   ├── api.js              # API Services (Real API & Mock API)
│   ├── auth.js             # Authentication & Authorization
│   ├── tours.js            # Tour management logic
│   ├── favorites.js        # Favorites management với LocalStorage
│   ├── i18n.js             # Internationalization (đa ngôn ngữ)
│   └── app.js              # Application entry point & initialization
│
└── images/                 # Assets (logo, thumbnails, etc.)
```

### Chi tiết các module

| File           | Mô tả                 | Chức năng chính                                          |
| -------------- | --------------------- | -------------------------------------------------------- |
| `api.js`       | API Service Layer     | Quản lý tất cả API calls, hỗ trợ cả Real API và Mock API |
| `auth.js`      | Authentication Module | Đăng ký, đăng nhập, xác thực, quản lý session            |
| `tours.js`     | Tour Management       | CRUD operations, filter, search tours                    |
| `favorites.js` | Favorites System      | Quản lý danh sách yêu thích với LocalStorage             |
| `i18n.js`      | Internationalization  | Hỗ trợ đa ngôn ngữ (vi, en)                              |
| `app.js`       | Main Application      | Khởi tạo app, routing, event handling                    |

## 🔧 Cấu hình API

### Option 1: Sử dụng Mock API (Mặc định)

Ứng dụng sử dụng Mock API với dữ liệu được lưu trong LocalStorage. Phù hợp cho:

- Development & Testing
- Demo
- Không cần backend server

```javascript
// js/api.js (dòng cuối file)
const API = MockApiService; // ✅ Đang sử dụng
```

### Option 2: Chuyển sang Real API

**Bước 1**: Mở file `js/api.js` và thay đổi:

```javascript
// Thay đổi từ:
const API = MockApiService;

// Thành:
const API = ApiService;
```

**Bước 2**: Cấu hình API endpoint:

```javascript
const API_CONFIG = {
  baseURL: "https://your-api-domain.com/api", // URL của backend
  endpoints: {
    users: "/users", // Endpoint cho users
    tours: "/tours", // Endpoint cho tours
  },
  headers: {
    "Content-Type": "application/json",
    // Thêm authentication token nếu cần:
    // "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  },
};
```

### Option 3: Sử dụng MockAPI.io (Fake REST API)

1. Truy cập [MockAPI.io](https://mockapi.io/)
2. Đăng ký tài khoản miễn phí
3. Tạo project mới: "travel-booking"

4. Tạo resource **users** với schema:

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "createdAt": "date"
}
```

5. Tạo resource **tours** với schema:

```json
{
  "name": "string",
  "destination": "string",
  "price": "number",
  "duration": "string",
  "description": "string",
  "image": "string",
  "available": "boolean"
}
```

6. Copy API URL và update vào `js/api.js`:

```javascript
const API_CONFIG = {
  baseURL: "https://[your-project-id].mockapi.io/api/v1",
  endpoints: {
    users: "/users",
    tours: "/tours",
  },
};
```

7. Chuyển sang ApiService:

```javascript
const API = ApiService;
```

### API Methods Available

```javascript
// Users
API.users.getAll(); // Lấy tất cả users
API.users.getById(id); // Lấy user theo ID
API.users.create(data); // Tạo user mới
API.users.update(id, data); // Cập nhật user
API.users.delete(id); // Xóa user

// Tours
API.tours.getAll(); // Lấy tất cả tours
API.tours.getById(id); // Lấy tour theo ID
API.tours.create(data); // Tạo tour mới
API.tours.update(id, data); // Cập nhật tour
API.tours.delete(id); // Xóa tour
```

## 📚 Hướng dẫn sử dụng

### 1️⃣ Đăng ký tài khoản

1. Mở ứng dụng lần đầu tiên
2. Click tab **"Đăng ký"** trên form đăng nhập
3. Nhập thông tin:
   - **Họ tên**: Tên đầy đủ của bạn
   - **Email**: Địa chỉ email hợp lệ
   - **Mật khẩu**: Tối thiểu 6 ký tự
4. Click nút **"Đăng ký"**
5. Hệ thống tự động chuyển sang đăng nhập

### 2️⃣ Đăng nhập

1. Nhập **email** và **mật khẩu** đã đăng ký
2. Click **"Đăng nhập"**
3. Chờ xác thực và vào dashboard

### 3️⃣ Quản lý Tour

#### Xem danh sách tour

- Tất cả tour hiển thị dạng grid cards
- Mỗi card hiển thị: hình ảnh, tên, giá, địa điểm, thời lượng

#### Thêm tour mới

1. Click nút **"+ Thêm Tour"**
2. Điền form:
   - Tên tour
   - Địa điểm
   - Giá (USD)
   - Thời lượng (ngày)
   - Mô tả
   - URL hình ảnh
3. Click **"Lưu Tour"**

#### Sửa tour

1. Click icon **✏️ Sửa** trên tour card
2. Form sẽ hiển thị với dữ liệu hiện tại
3. Chỉnh sửa thông tin cần thiết
4. Click **"Cập nhật Tour"**

#### Xóa tour

1. Click icon **🗑️ Xóa** trên tour card
2. Xác nhận trong dialog
3. Tour sẽ bị xóa khỏi danh sách

### 4️⃣ Tìm kiếm & Lọc

#### Tìm kiếm

- Nhập từ khóa vào ô **"Tìm kiếm tour..."**
- Kết quả tự động cập nhật (debounced 300ms)
- Tìm kiếm theo: tên, địa điểm, mô tả

#### Lọc theo địa điểm

- Chọn địa điểm từ dropdown
- Hiển thị chỉ các tour của địa điểm đó

#### Lọc theo giá

- Sử dụng slider hoặc input min/max
- Kết quả hiển thị trong khoảng giá

#### Lọc theo thời lượng

- Chọn khoảng thời gian tour
- Kết quả được lọc theo số ngày

### 5️⃣ Quản lý Yêu thích

#### Thêm vào yêu thích

- Click icon **♡** (trái tim trống) trên tour card
- Icon chuyển thành **♥** (trái tim đầy)
- Tour được lưu vào LocalStorage

#### Xem danh sách yêu thích

- Click nút **"❤️ Yêu thích"** trên navbar
- Modal hiển thị tất cả tour đã lưu

#### Xóa khỏi yêu thích

- Click icon **♥** (trái tim đầy) để bỏ yêu thích
- Hoặc click **"Xóa"** trong modal yêu thích

### 6️⃣ Tùy chỉnh giao diện

#### Chuyển Dark Mode

- Click icon **🌙** trên navbar
- Theme chuyển sang Dark Mode
- Preference được lưu trong LocalStorage

#### Chuyển ngôn ngữ

- Click icon **🌐** trên navbar
- Chọn ngôn ngữ: **Tiếng Việt** hoặc **English**
- Toàn bộ UI cập nhật ngay lập tức

### 7️⃣ Đăng xuất

- Click nút **"Đăng xuất"** trên navbar
- Session kết thúc
- Redirect về trang đăng nhập

## 🛠️ Công nghệ sử dụng

### Frontend Technologies

| Công nghệ        | Version | Mục đích                        |
| ---------------- | ------- | ------------------------------- |
| **HTML5**        | -       | Cấu trúc semantic               |
| **CSS3**         | -       | Styling, animations, responsive |
| **JavaScript**   | ES6+    | Logic nghiệp vụ                 |
| **jQuery**       | 3.7.0   | DOM manipulation, AJAX          |
| **Bootstrap**    | 5.3.0   | UI components, grid system      |
| **Font Awesome** | 6.4.0   | Icons                           |

### Key Features Implementation

#### 🎨 Responsive Design

- **Mobile First** approach
- **Breakpoints**:
  - Mobile: < 576px (1 column)
  - Tablet: 576px - 992px (2 columns)
  - Desktop: > 992px (3 columns)

#### 🌙 Dark Mode

```css
/* Automatic theme switching */
[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
  /* ... more variables */
}
```

#### 🌐 Internationalization (i18n)

```javascript
// Dễ dàng mở rộng ngôn ngữ
const translations = {
  vi: {
    /* Tiếng Việt */
  },
  en: {
    /* English */
  },
  // Thêm ngôn ngữ mới ở đây
};
```

#### ⚡ Performance Optimization

**Debouncing** (Search Input)

```javascript
// Chỉ trigger sau 300ms người dùng ngừng typing
debounce(searchFunction, 300);
```

**Throttling** (Scroll Events)

```javascript
// Giới hạn scroll event firing mỗi 100ms
throttle(scrollHandler, 100);
```

**Lazy Loading**

- Animation chỉ chạy khi element vào viewport
- Giảm tải rendering ban đầu

#### 💾 Data Persistence (LocalStorage)

```javascript
// Dữ liệu được lưu trong LocalStorage
localStorage.setItem("currentUser", JSON.stringify(user));
localStorage.setItem("tour_favorites", JSON.stringify(favorites));
localStorage.setItem("theme", "dark");
localStorage.setItem("language", "vi");
```

## 🚀 Tính năng nâng cao

### Animation System

```css
/* Fade In Animation */
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

/* Slide Up Animation */
.slide-up {
  animation: slideUp 0.6s ease-out;
}

/* Hover Effects */
.tour-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
```

### Error Handling

```javascript
try {
  const tours = await API.tours.getAll();
  renderTours(tours);
} catch (error) {
  console.error("Error loading tours:", error);
  showErrorNotification("Không thể tải danh sách tour");
}
```

### Form Validation

- Email format validation
- Password strength check (min 6 chars)
- Required field validation
- Price range validation
- Real-time feedback

### Security Features

- Password hashing (trong production nên dùng bcrypt)
- XSS protection với input sanitization
- CSRF protection (khi dùng real API)
- Secure session management

## 👨‍💻 Hướng dẫn phát triển

### Thêm tính năng mới

#### 1. Thêm UI Component

**File: `index.html`**

```html
<!-- Thêm component mới -->
<div class="new-feature">
  <h3 data-i18n="feature.title">Feature Title</h3>
  <!-- ... -->
</div>
```

#### 2. Thêm Styles

**File: `css/style.css`**

```css
.new-feature {
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: 8px;
}
```

#### 3. Thêm Logic

**File: `js/app.js` hoặc tạo file mới**

```javascript
const NewFeatureModule = {
  init: function () {
    this.bindEvents();
    this.loadData();
  },

  bindEvents: function () {
    $("#new-feature-btn").on("click", this.handleClick.bind(this));
  },

  handleClick: function () {
    // Logic here
  },
};

// Initialize trong app.js
$(document).ready(function () {
  NewFeatureModule.init();
});
```

#### 4. Thêm translations

**File: `js/i18n.js`**

```javascript
const translations = {
  vi: {
    feature: {
      title: "Tiêu đề tính năng",
      description: "Mô tả tính năng",
    },
  },
  en: {
    feature: {
      title: "Feature Title",
      description: "Feature Description",
    },
  },
};
```

### Thêm API Endpoint mới

**File: `js/api.js`**

```javascript
// 1. Thêm endpoint vào config
const API_CONFIG = {
  baseURL: "https://api.example.com",
  endpoints: {
    users: "/users",
    tours: "/tours",
    bookings: "/bookings", // ✨ Endpoint mới
  },
};

// 2. Thêm service methods
const ApiService = {
  // ... existing code ...

  bookings: {
    getAll: async () => {
      return await ApiService.request(API_CONFIG.endpoints.bookings);
    },

    getById: async (id) => {
      return await ApiService.request(`${API_CONFIG.endpoints.bookings}/${id}`);
    },

    create: async (bookingData) => {
      return await ApiService.request(API_CONFIG.endpoints.bookings, {
        method: "POST",
        body: JSON.stringify(bookingData),
      });
    },

    update: async (id, bookingData) => {
      return await ApiService.request(
        `${API_CONFIG.endpoints.bookings}/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(bookingData),
        }
      );
    },

    delete: async (id) => {
      return await ApiService.request(
        `${API_CONFIG.endpoints.bookings}/${id}`,
        {
          method: "DELETE",
        }
      );
    },
  },
};

// 3. Thêm Mock Service (nếu cần)
const MockApiService = {
  // ... existing code ...

  bookings: {
    getAll: async () => {
      const bookings = JSON.parse(
        localStorage.getItem("mock_bookings") || "[]"
      );
      return { data: bookings };
    },

    create: async (bookingData) => {
      const bookings = JSON.parse(
        localStorage.getItem("mock_bookings") || "[]"
      );
      const newBooking = {
        id: Date.now().toString(),
        ...bookingData,
        createdAt: new Date().toISOString(),
      };
      bookings.push(newBooking);
      localStorage.setItem("mock_bookings", JSON.stringify(bookings));
      return { data: newBooking };
    },
    // ... more methods
  },
};
```

### Debugging Tips

#### 1. Mở Developer Console (F12)

```javascript
// Xem performance metrics
console.time("Load Tours");
await loadTours();
console.timeEnd("Load Tours");

// Xem API calls
console.log("API Request:", url, options);
console.log("API Response:", response);

// Xem errors chi tiết
console.error("Error details:", error);
console.trace(); // Stack trace
```

#### 2. Network Tab

- Monitor tất cả API requests
- Check request/response headers
- View response data

#### 3. Application Tab

- Inspect LocalStorage data
- Clear storage khi cần reset

#### 4. Console Commands

```javascript
// Test API
await API.tours.getAll();

// Check localStorage
console.log(localStorage);

// Clear all data
localStorage.clear();

// Reload translations
loadTranslations();
```

### Testing Checklist

- [ ] Test trên Chrome, Firefox, Safari
- [ ] Test responsive trên mobile/tablet
- [ ] Test Dark Mode
- [ ] Test đa ngôn ngữ
- [ ] Test CRUD operations
- [ ] Test form validation
- [ ] Test error handling
- [ ] Test performance với nhiều data

### Code Style Guidelines

```javascript
// ✅ Good: Sử dụng const/let
const API_URL = "https://api.example.com";
let currentUser = null;

// ❌ Bad: Sử dụng var
var apiUrl = "https://api.example.com";

// ✅ Good: Arrow functions
const loadTours = async () => {
  const tours = await API.tours.getAll();
  return tours;
};

// ✅ Good: Destructuring
const { name, email } = user;

// ✅ Good: Template literals
const message = `Welcome, ${user.name}!`;

// ✅ Good: Async/await thay vì callbacks
async function fetchData() {
  try {
    const data = await API.tours.getAll();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

## 📋 Roadmap / Future Enhancements

### Phase 1 - Core Features ✅ (Completed)

- [x] Authentication system
- [x] Tour CRUD operations
- [x] Search & Filter
- [x] Favorites with LocalStorage
- [x] Dark Mode
- [x] Multi-language

### Phase 2 - Enhanced Features 🚧 (In Progress)

- [ ] Booking system
- [ ] User profiles
- [ ] Tour reviews & ratings
- [ ] Image upload
- [ ] Advanced filters (tags, categories)

### Phase 3 - Advanced Features 📅 (Planned)

- [ ] Payment integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Social sharing (Facebook, Twitter)
- [ ] Tour recommendations (AI-powered)
- [ ] Real-time availability
- [ ] Chat support

### Phase 4 - PWA & Mobile 🔮 (Future)

- [ ] Progressive Web App (PWA)
- [ ] Offline mode with Service Workers
- [ ] Push notifications
- [ ] Mobile apps (React Native/Flutter)
- [ ] Geo-location features
- [ ] AR tour previews

## 🐛 Known Issues & Limitations

- Mock API không hỗ trợ pagination
- LocalStorage có giới hạn 5-10MB
- Không có backend authentication (production cần JWT)
- Images hosting cần external service

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 Travel Booking App

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👤 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Bootstrap Team for amazing UI framework
- Font Awesome for comprehensive icon set
- jQuery Team for simplifying JavaScript
- MockAPI.io for easy API testing
- All contributors who helped improve this project

---

<div align="center">

**[⬆ Về đầu trang](#-travel-booking-application)**

Made with ❤️ using HTML, CSS, JavaScript, jQuery & Bootstrap

⭐ **Star this repo if you find it helpful!** ⭐

</div>
