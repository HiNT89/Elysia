// Multi-language support
const translations = {
  vi: {
    app: {
      title: "Travel Booking",
    },
    auth: {
      login: "Đăng nhập",
      register: "Đăng ký",
      logout: "Đăng xuất",
      name: "Họ tên",
      email: "Email",
      password: "Mật khẩu",
      loginSuccess: "Đăng nhập thành công!",
      registerSuccess: "Đăng ký thành công!",
      loginFailed: "Email hoặc mật khẩu không đúng!",
      emailExists: "Email đã tồn tại!",
      logoutConfirm: "Bạn có chắc muốn đăng xuất?",
      logoutSuccess: "Đăng xuất thành công!",
    },
    tour: {
      title: "Quản lý Tour Du lịch",
      add: "Thêm Tour",
      edit: "Sửa Tour",
      name: "Tên tour",
      destination: "Địa điểm",
      price: "Giá (VNĐ)",
      duration: "Thời lượng (ngày)",
      description: "Mô tả",
      search: "Tìm kiếm tour...",
      allDestinations: "Tất cả địa điểm",
      allDurations: "Tất cả thời lượng",
      clearFilter: "Xóa lọc",
      loading: "Đang tải danh sách tour...",
      empty: "Không có tour nào",
      emptyFilter: "Không tìm thấy tour phù hợp",
      addSuccess: "Thêm tour thành công!",
      updateSuccess: "Cập nhật tour thành công!",
      deleteSuccess: "Xóa tour thành công!",
      deleteTitle: "Xác nhận xóa tour",
      deleteConfirm:
        "Bạn có chắc muốn xóa tour này? Hành động này không thể hoàn tác.",
    },
    favorites: {
      title: "Danh sách yêu thích",
      add: "Thêm vào yêu thích",
      remove: "Xóa khỏi yêu thích",
      empty: "Chưa có tour yêu thích nào",
      addSuccess: "Đã thêm vào danh sách yêu thích!",
      removeSuccess: "Đã xóa khỏi danh sách yêu thích!",
    },
    common: {
      save: "Lưu",
      cancel: "Hủy",
      edit: "Sửa",
      delete: "Xóa",
      close: "Đóng",
      day: "ngày",
      days: "ngày",
    },
  },
  en: {
    app: {
      title: "Travel Booking",
    },
    auth: {
      login: "Login",
      register: "Register",
      logout: "Logout",
      name: "Full Name",
      email: "Email",
      password: "Password",
      loginSuccess: "Login successful!",
      registerSuccess: "Registration successful!",
      loginFailed: "Invalid email or password!",
      emailExists: "Email already exists!",
      logoutConfirm: "Are you sure you want to logout?",
      logoutSuccess: "Logout successful!",
    },
    tour: {
      title: "Tour Management",
      add: "Add Tour",
      edit: "Edit Tour",
      name: "Tour Name",
      destination: "Destination",
      price: "Price (VNĐ)",
      duration: "Duration (days)",
      description: "Description",
      search: "Search tours...",
      allDestinations: "All Destinations",
      allDurations: "All Durations",
      clearFilter: "Clear Filter",
      loading: "Loading tours...",
      empty: "No tours available",
      emptyFilter: "No tours found matching your criteria",
      addSuccess: "Tour added successfully!",
      updateSuccess: "Tour updated successfully!",
      deleteSuccess: "Tour deleted successfully!",
      deleteTitle: "Confirm Delete",
      deleteConfirm:
        "Are you sure you want to delete this tour? This action cannot be undone.",
    },
    favorites: {
      title: "Favorites",
      add: "Add to Favorites",
      remove: "Remove from Favorites",
      empty: "No favorite tours yet",
      addSuccess: "Added to favorites!",
      removeSuccess: "Removed from favorites!",
    },
    common: {
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      close: "Close",
      day: "day",
      days: "days",
    },
  },
};

// i18n Manager
const i18n = {
  currentLang: localStorage.getItem("language") || "vi",

  t(key) {
    const keys = key.split(".");
    let value = translations[this.currentLang];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  },

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem("language", lang);
    this.updateUI();
    this.updateLanguageDisplay();
  },

  updateUI() {
    // Update all elements with data-i18n attribute
    $("[data-i18n]").each(function () {
      const key = $(this).data("i18n");
      $(this).text(i18n.t(key));
    });

    // Update placeholders
    $("[data-i18n-placeholder]").each(function () {
      const key = $(this).data("i18n-placeholder");
      $(this).attr("placeholder", i18n.t(key));
    });
  },

  updateLanguageDisplay() {
    // Update current language display
    $("#currentLang").text(this.currentLang.toUpperCase());

    // Update check icons
    if (this.currentLang === "vi") {
      $("#checkVi").css("visibility", "visible");
      $("#checkEn").css("visibility", "hidden");
    } else {
      $("#checkVi").css("visibility", "hidden");
      $("#checkEn").css("visibility", "visible");
    }
  },

  init() {
    this.updateUI();
    this.updateLanguageDisplay();

    // Language option click events
    $(".language-option").on("click", (e) => {
      e.preventDefault();
      const lang = $(e.currentTarget).data("lang");
      this.setLanguage(lang);
    });
  },
};
