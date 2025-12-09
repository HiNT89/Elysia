// Main App Entry Point
$(document).ready(function () {
  // Initialize i18n first
  i18n.init();

  // Initialize UI Renderer (creates dynamic form and filters)
  UIRenderer.init();

  // Initialize Auth Manager
  AuthManager.init();

  // Initialize Entity Manager (formerly TourManager)
  EntityManager.init();

  // Initialize Favorites Manager
  FavoritesManager.init();

  // Initialize Theme Manager
  ThemeManager.init();

  // Initialize Performance Monitor
  PerformanceMonitor.init();

  console.log(`${AppConfig.entity.namePlural} App initialized successfully!`);
});

// Theme Manager - Dark Mode Support
const ThemeManager = {
  currentTheme: localStorage.getItem("theme") || "light",

  init() {
    this.applyTheme(this.currentTheme);
    this.setupEventListeners();
  },

  setupEventListeners() {
    $("#toggleTheme").on("click", (e) => {
      e.preventDefault();
      this.toggleTheme();
    });
  },

  toggleTheme() {
    this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
    this.applyTheme(this.currentTheme);
    localStorage.setItem("theme", this.currentTheme);
  },

  applyTheme(theme) {
    if (theme === "dark") {
      $("body").addClass("dark-mode");
      $("#toggleTheme i").removeClass("fa-moon").addClass("fa-sun");
    } else {
      $("body").removeClass("dark-mode");
      $("#toggleTheme i").removeClass("fa-sun").addClass("fa-moon");
    }
  },
};

// Performance Monitor
const PerformanceMonitor = {
  metrics: {
    pageLoadTime: 0,
    apiCalls: 0,
    renderTime: 0,
  },

  init() {
    // Measure page load time
    window.addEventListener("load", () => {
      const perfData = performance.timing;
      this.metrics.pageLoadTime =
        perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page Load Time: ${this.metrics.pageLoadTime}ms`);
    });

    // Monitor API calls
    this.monitorAPICalls();

    // Log performance metrics
    this.logMetrics();
  },

  monitorAPICalls() {
    const originalFetch = window.fetch;
    let apiCallCount = 0;

    window.fetch = function (...args) {
      apiCallCount++;
      PerformanceMonitor.metrics.apiCalls = apiCallCount;
      return originalFetch.apply(this, args);
    };
  },

  logMetrics() {
    // Log metrics every 30 seconds in development
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      setInterval(() => {
        console.log("Performance Metrics:", this.metrics);
      }, 30000);
    }
  },

  measureRenderTime(callback, label = "Render") {
    const start = performance.now();
    callback();
    const end = performance.now();
    const duration = end - start;
    this.metrics.renderTime = duration;
    console.log(`${label} Time: ${duration.toFixed(2)}ms`);
  },
};

// Utility Functions
const Utils = {
  // Debounce function for search optimization
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Format date
  formatDate(date) {
    return new Date(date).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },

  // Sanitize HTML to prevent XSS
  sanitizeHTML(str) {
    const temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  },

  // Copy to clipboard
  copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        console.log("Copied to clipboard");
      });
    }
  },
};

// Optimize search with debounce
$("#searchTour").on(
  "input",
  Utils.debounce((e) => {
    TourManager.searchTours(e.target.value);
  }, 300)
);

// Handle modal events
$("#tourModal").on("hidden.bs.modal", function () {
  TourManager.resetForm();
});

// Keyboard shortcuts
$(document).on("keydown", (e) => {
  // Ctrl/Cmd + K for search focus
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    $("#searchTour").focus();
  }

  // Ctrl/Cmd + N for new tour (when logged in)
  if ((e.ctrlKey || e.metaKey) && e.key === "n" && AuthManager.isLoggedIn()) {
    e.preventDefault();
    $("#addTourBtn").click();
  }
});

// Service Worker Registration (for PWA - optional)
if ("serviceWorker" in navigator) {
  // Uncomment to enable PWA
  // navigator.serviceWorker.register('/sw.js').then(registration => {
  //     console.log('Service Worker registered:', registration);
  // }).catch(error => {
  //     console.log('Service Worker registration failed:', error);
  // });
}

// Handle online/offline events
window.addEventListener("online", () => {
  AuthManager.showAlert("success", "Đã kết nối internet");
});

window.addEventListener("offline", () => {
  AuthManager.showAlert("warning", "Mất kết nối internet");
});

// Export for global access
window.AuthManager = AuthManager;
window.TourManager = TourManager;
window.FavoritesManager = FavoritesManager;
window.ThemeManager = ThemeManager;
window.Utils = Utils;
