// ============================================
// APPLICATION CONFIGURATION
// ============================================
// Đây là file cấu hình trung tâm của ứng dụng
// Thay đổi cấu hình ở đây để chuyển đổi giữa các loại entity (tours, clothes, products, etc.)

const AppConfig = {
  // ============================================
  // API CONFIGURATION
  // ============================================
  api: {
    baseURL: "https://69388b0a4618a71d77d09d79.mockapi.io/",
    // Thay đổi endpoint chính ở đây (ví dụ: "tours", "clothes", "products", "books", etc.)
    entityEndpoint: "tours",
    usersEndpoint: "users",
    headers: {
      "Content-Type": "application/json",
    },
  },

  // ============================================
  // ENTITY CONFIGURATION
  // ============================================
  // Định nghĩa cấu trúc của entity (đối tượng chính của ứng dụng)
  entity: {
    // Tên đơn và tên số nhiều của entity
    name: "tour",
    namePlural: "tours",

    // Icon hiển thị (Font Awesome class)
    icon: "fa-plane",

    // ============================================
    // FIELDS DEFINITION
    // ============================================
    // Định nghĩa các trường dữ liệu của entity
    // Mỗi field có cấu hình riêng về type, validation, display
    fields: [
      {
        key: "title", // API field name
        type: "text",
        required: true,
        label: {
          vi: "Tên tour",
          en: "Tour Name",
        },
        placeholder: {
          vi: "Nhập tên tour",
          en: "Enter tour name",
        },
        displayInCard: true,
        displayAsTitle: true, // Field này sẽ là tiêu đề chính
        icon: "fa-heading",
      },
      {
        key: "destination",
        type: "text",
        required: true,
        label: {
          vi: "Địa điểm",
          en: "Destination",
        },
        placeholder: {
          vi: "Nhập địa điểm",
          en: "Enter destination",
        },
        displayInCard: true,
        icon: "fa-map-marker-alt",
        filterable: true, // Có thể lọc theo field này
      },
      {
        key: "price",
        type: "number",
        required: true,
        label: {
          vi: "Giá (VNĐ)",
          en: "Price (VND)",
        },
        placeholder: {
          vi: "Nhập giá",
          en: "Enter price",
        },
        displayInCard: true,
        icon: "fa-money-bill-wave",
        format: "currency", // Format hiển thị
        min: 0,
      },
      {
        key: "duration",
        type: "number",
        required: true,
        label: {
          vi: "Thời lượng (ngày)",
          en: "Duration (days)",
        },
        placeholder: {
          vi: "Nhập số ngày",
          en: "Enter number of days",
        },
        displayInCard: true,
        icon: "fa-clock",
        min: 1,
        suffix: {
          vi: "ngày",
          en: "days",
        },
        filterable: true,
        filterType: "range", // Loại filter: range, exact, select
        filterRanges: [
          { label: "1-3 ngày", value: "1-3", labelEn: "1-3 days" },
          { label: "4-7 ngày", value: "4-7", labelEn: "4-7 days" },
          { label: "8+ ngày", value: "8+", labelEn: "8+ days" },
        ],
      },
      {
        key: "description",
        type: "textarea",
        required: false,
        label: {
          vi: "Mô tả",
          en: "Description",
        },
        placeholder: {
          vi: "Nhập mô tả chi tiết",
          en: "Enter description",
        },
        displayInCard: true,
        icon: "fa-align-left",
        rows: 3,
      },
    ],
  },

  // ============================================
  // UI CONFIGURATION
  // ============================================
  ui: {
    // Số items trên mỗi hàng (Bootstrap col class)
    itemsPerRow: "col-md-4", // col-md-4 = 3 items/row, col-md-6 = 2 items/row, col-md-3 = 4 items/row

    // Colors
    theme: {
      primary: "#0d6efd",
      success: "#198754",
      danger: "#dc3545",
      warning: "#ffc107",
      info: "#0dcaf0",
    },

    // Tùy chỉnh text hiển thị
    labels: {
      vi: {
        appTitle: "Travel Booking",
        pageTitle: "Quản lý Tour Du lịch",
        addButton: "Thêm Tour",
        editTitle: "Chỉnh sửa Tour",
        deleteConfirm: "Bạn có chắc muốn xóa tour này?",
        searchPlaceholder: "Tìm kiếm tour...",
        allDestinations: "Tất cả địa điểm",
        allDurations: "Tất cả",
        clearFilter: "Xóa lọc",
        favorites: "Yêu thích",
        empty: "Chưa có tour nào",
        emptyFilter: "Không tìm thấy tour phù hợp",
        loading: "Đang tải danh sách tour...",
        addSuccess: "Thêm tour thành công!",
        updateSuccess: "Cập nhật tour thành công!",
        deleteSuccess: "Xóa tour thành công!",
      },
      en: {
        appTitle: "Travel Booking",
        pageTitle: "Tour Management",
        addButton: "Add Tour",
        editTitle: "Edit Tour",
        deleteConfirm: "Are you sure you want to delete this tour?",
        searchPlaceholder: "Search tours...",
        allDestinations: "All Destinations",
        allDurations: "All",
        clearFilter: "Clear Filter",
        favorites: "Favorites",
        empty: "No tours available",
        emptyFilter: "No tours found",
        loading: "Loading tours...",
        addSuccess: "Tour added successfully!",
        updateSuccess: "Tour updated successfully!",
        deleteSuccess: "Tour deleted successfully!",
      },
    },
  },

  // ============================================
  // HELPER METHODS
  // ============================================
  // Các hàm tiện ích để lấy thông tin từ config

  // Lấy label theo ngôn ngữ hiện tại
  getLabel(key, lang = "vi") {
    return this.ui.labels[lang][key] || key;
  },

  // Lấy field config theo key
  getField(key) {
    return this.entity.fields.find((field) => field.key === key);
  },

  // Lấy tất cả các field bắt buộc
  getRequiredFields() {
    return this.entity.fields.filter((field) => field.required);
  },

  // Lấy tất cả các field hiển thị trong card
  getDisplayFields() {
    return this.entity.fields.filter((field) => field.displayInCard);
  },

  // Lấy field được dùng làm title
  getTitleField() {
    return this.entity.fields.find((field) => field.displayAsTitle);
  },

  // Lấy các field có thể filter
  getFilterableFields() {
    return this.entity.fields.filter((field) => field.filterable);
  },

  // Format giá trị theo config của field
  formatValue(field, value, lang = "vi") {
    if (!value) return "";

    // Format currency
    if (field.format === "currency") {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    }

    // Add suffix if exists
    if (field.suffix) {
      const suffix = field.suffix[lang] || field.suffix.vi;
      return `${value} ${suffix}`;
    }

    return value;
  },

  // Validate field value
  validateField(field, value) {
    if (field.required && (!value || value.toString().trim() === "")) {
      return {
        valid: false,
        message: `${field.label.vi} là bắt buộc`,
      };
    }

    if (field.type === "number") {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        return {
          valid: false,
          message: `${field.label.vi} phải là số`,
        };
      }
      if (field.min !== undefined && numValue < field.min) {
        return {
          valid: false,
          message: `${field.label.vi} phải lớn hơn hoặc bằng ${field.min}`,
        };
      }
      if (field.max !== undefined && numValue > field.max) {
        return {
          valid: false,
          message: `${field.label.vi} phải nhỏ hơn hoặc bằng ${field.max}`,
        };
      }
    }

    return { valid: true };
  },

  // Validate tất cả các field
  validateAll(data) {
    const errors = [];
    this.entity.fields.forEach((field) => {
      const result = this.validateField(field, data[field.key]);
      if (!result.valid) {
        errors.push(result.message);
      }
    });
    return {
      valid: errors.length === 0,
      errors: errors,
    };
  },
};

// ============================================
// EXAMPLE: Cách chuyển đổi sang API khác
// ============================================
/*
// VÍ DỤ 1: CHUYỂN SANG CLOTHES API
const AppConfig = {
  api: {
    baseURL: "https://api.example.com/",
    entityEndpoint: "clothes",
    usersEndpoint: "users",
  },
  entity: {
    name: "clothes",
    namePlural: "clothes",
    icon: "fa-tshirt",
    fields: [
      {
        key: "name",
        type: "text",
        required: true,
        label: { vi: "Tên sản phẩm", en: "Product Name" },
        displayInCard: true,
        displayAsTitle: true,
        icon: "fa-tag",
      },
      {
        key: "category",
        type: "text",
        required: true,
        label: { vi: "Danh mục", en: "Category" },
        displayInCard: true,
        icon: "fa-list",
        filterable: true,
      },
      {
        key: "size",
        type: "text",
        required: true,
        label: { vi: "Kích cỡ", en: "Size" },
        displayInCard: true,
        icon: "fa-ruler",
      },
      {
        key: "color",
        type: "text",
        required: true,
        label: { vi: "Màu sắc", en: "Color" },
        displayInCard: true,
        icon: "fa-palette",
      },
      {
        key: "price",
        type: "number",
        required: true,
        label: { vi: "Giá (VNĐ)", en: "Price (VND)" },
        displayInCard: true,
        icon: "fa-money-bill-wave",
        format: "currency",
      },
    ],
  },
  ui: {
    labels: {
      vi: {
        pageTitle: "Quản lý Quần áo",
        addButton: "Thêm Quần áo",
        searchPlaceholder: "Tìm kiếm quần áo...",
        // ... other labels
      },
    },
  },
};

// VÍ DỤ 2: CHUYỂN SANG BOOKS API
const AppConfig = {
  api: {
    entityEndpoint: "books",
  },
  entity: {
    name: "book",
    namePlural: "books",
    icon: "fa-book",
    fields: [
      {
        key: "title",
        type: "text",
        required: true,
        label: { vi: "Tiêu đề", en: "Title" },
        displayInCard: true,
        displayAsTitle: true,
      },
      {
        key: "author",
        type: "text",
        required: true,
        label: { vi: "Tác giả", en: "Author" },
        displayInCard: true,
        icon: "fa-user-pen",
        filterable: true,
      },
      {
        key: "isbn",
        type: "text",
        required: true,
        label: { vi: "ISBN", en: "ISBN" },
        displayInCard: true,
      },
      {
        key: "pages",
        type: "number",
        required: true,
        label: { vi: "Số trang", en: "Pages" },
        displayInCard: true,
        icon: "fa-file",
      },
      {
        key: "price",
        type: "number",
        required: true,
        label: { vi: "Giá", en: "Price" },
        displayInCard: true,
        format: "currency",
      },
    ],
  },
};
*/
