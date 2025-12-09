// Authentication Manager
const AuthManager = {
  currentUser: null,

  // Initialize auth state
  init() {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.showApp();
    } else {
      this.showAuth();
    }

    this.setupEventListeners();
  },

  // Setup event listeners
  setupEventListeners() {
    // Login form
    $("#loginForm").on("submit", (e) => {
      e.preventDefault();
      this.handleLogin();
    });

    // Register form
    $("#registerForm").on("submit", (e) => {
      e.preventDefault();
      this.handleRegister();
    });

    // Logout button - show modal
    $("#logoutButton").on("click", (e) => {
      e.preventDefault();
      $("#logoutConfirmModal").modal("show");
    });

    // Confirm logout button in modal
    $("#confirmLogoutBtn").on("click", () => {
      this.handleLogout();
    });
  },

  // Handle login
  async handleLogin() {
    const email = $("#loginEmail").val().trim();
    const password = $("#loginPassword").val();

    if (!email || !password) {
      this.showAlert("error", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      // Show loading
      this.showLoading(true);

      // Get user from API
      const user = await API.users.getByEmail(email);

      if (user && user.password === password) {
        this.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
        this.showAlert("success", i18n.t("auth.loginSuccess"));

        setTimeout(() => {
          this.showApp();
        }, 1000);
      } else {
        this.showAlert("error", i18n.t("auth.loginFailed"));
      }
    } catch (error) {
      console.error("Login error:", error);
      this.showAlert("error", "Đã xảy ra lỗi khi đăng nhập");
    } finally {
      this.showLoading(false);
    }
  },

  // Handle register
  async handleRegister() {
    const name = $("#registerName").val().trim();
    const email = $("#registerEmail").val().trim();
    const password = $("#registerPassword").val();

    if (!name || !email || !password) {
      this.showAlert("error", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (password.length < 6) {
      this.showAlert("error", "Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showAlert("error", "Email không hợp lệ");
      return;
    }

    try {
      this.showLoading(true);

      // Check if email exists
      const existingUser = await API.users.getByEmail(email);
      if (existingUser) {
        this.showAlert("error", i18n.t("auth.emailExists"));
        return;
      }

      // Create new user
      const newUser = await API.users.create({
        name,
        email,
        password,
      });

      this.showAlert("success", i18n.t("auth.registerSuccess"));

      // Auto login after register
      setTimeout(() => {
        $("#loginEmail").val(email);
        $("#loginPassword").val(password);
        $('a[href="#loginTab"]').tab("show");
      }, 1000);
    } catch (error) {
      console.error("Register error:", error);
      this.showAlert("error", "Đã xảy ra lỗi khi đăng ký");
    } finally {
      this.showLoading(false);
    }
  },

  // Handle logout
  handleLogout() {
    // Hide the modal first
    $("#logoutConfirmModal").modal("hide");

    // Clear current user
    this.currentUser = null;
    localStorage.removeItem("currentUser");

    // Clear search and filters
    $("#searchTour").val("");
    if (window.EntityManager) {
      EntityManager.clearFilters();
    }

    // Show success message
    this.showAlert("success", i18n.t("auth.logoutSuccess"));

    // Fade out app section, then show auth
    $("#appSection").fadeOut(300, () => {
      this.showAuth();
    });
  },

  // Show auth section
  showAuth() {
    $("#authSection").fadeIn();
    $("#appSection").hide();
    $("#userInfo").hide();
    $("#logoutBtn").hide();

    // Reset forms
    $("#loginForm")[0].reset();
    $("#registerForm")[0].reset();
  },

  // Show app section
  showApp() {
    $("#authSection").hide();
    $("#appSection").fadeIn();
    $("#userInfo").show();
    $("#logoutBtn").show();
    $("#userName").text(this.currentUser.name);

    // Load items (generic)
    if (typeof EntityManager !== "undefined" && EntityManager.loadItems) {
      EntityManager.loadItems();
    }
  },

  // Show loading state
  showLoading(show) {
    if (show) {
      $('button[type="submit"]')
        .prop("disabled", true)
        .html(
          '<span class="spinner-border spinner-border-sm"></span> Loading...'
        );
    } else {
      $('button[type="submit"]').prop("disabled", false);
      $('#loginForm button[type="submit"]').text(i18n.t("auth.login"));
      $('#registerForm button[type="submit"]').text(i18n.t("auth.register"));
    }
  },

  // Show alert message
  showAlert(type, message) {
    // Remove existing alerts
    $(".alert").remove();

    const alertClass = type === "success" ? "alert-success" : "alert-danger";
    const alertHtml = `
            <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;

    $(".container").prepend(alertHtml);

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      $(".alert").fadeOut(() => $(this).remove());
    }, 3000);
  },

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  },

  // Check if user is logged in
  isLoggedIn() {
    return this.currentUser !== null;
  },
};
