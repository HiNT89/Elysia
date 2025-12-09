// API Configuration - Dễ dàng thay đổi API URL tại đây
const API_CONFIG = {
  baseURL: "https://69388b0a4618a71d77d09d79.mockapi.io/", // Thay đổi URL API tại đây
  endpoints: {
    users: "/users",
    tours: "/tours",
  },
  // Có thể thêm headers, authentication, timeout, etc.
  headers: {
    "Content-Type": "application/json",
  },
};

// API Service - Tất cả API calls được quản lý tại đây
const ApiService = {
  // Generic request handler
  async request(endpoint, options = {}) {
    try {
      const url = `${API_CONFIG.baseURL}${endpoint}`;
      const config = {
        ...options,
        headers: {
          ...API_CONFIG.headers,
          ...options.headers,
        },
      };

      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // Users API
  users: {
    getAll: async () => {
      return await ApiService.request(API_CONFIG.endpoints.users);
    },

    getById: async (id) => {
      return await ApiService.request(`${API_CONFIG.endpoints.users}/${id}`);
    },

    getByEmail: async (email) => {
      const users = await ApiService.users.getAll();
      console.log("🚀 ~ users:", users);
      return users.find((user) => user.email === email);
    },

    create: async (userData) => {
      return await ApiService.request(API_CONFIG.endpoints.users, {
        method: "POST",
        body: JSON.stringify(userData),
      });
    },

    update: async (id, userData) => {
      return await ApiService.request(`${API_CONFIG.endpoints.users}/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      });
    },

    delete: async (id) => {
      return await ApiService.request(`${API_CONFIG.endpoints.users}/${id}`, {
        method: "DELETE",
      });
    },
  },

  // Tours API
  tours: {
    getAll: async () => {
      return await ApiService.request(API_CONFIG.endpoints.tours);
    },

    getById: async (id) => {
      return await ApiService.request(`${API_CONFIG.endpoints.tours}/${id}`);
    },

    create: async (tourData) => {
      return await ApiService.request(API_CONFIG.endpoints.tours, {
        method: "POST",
        body: JSON.stringify(tourData),
      });
    },

    update: async (id, tourData) => {
      return await ApiService.request(`${API_CONFIG.endpoints.tours}/${id}`, {
        method: "PUT",
        body: JSON.stringify(tourData),
      });
    },

    delete: async (id) => {
      return await ApiService.request(`${API_CONFIG.endpoints.tours}/${id}`, {
        method: "DELETE",
      });
    },

    search: async (query) => {
      const tours = await ApiService.tours.getAll();
      return tours.filter(
        (tour) =>
          tour.title.toLowerCase().includes(query.toLowerCase()) ||
          tour.destination.toLowerCase().includes(query.toLowerCase()) ||
          tour.description.toLowerCase().includes(query.toLowerCase())
      );
    },

    filterByDestination: async (destination) => {
      const tours = await ApiService.tours.getAll();
      return tours.filter(
        (tour) => tour.destination.toLowerCase() === destination.toLowerCase()
      );
    },

    filterByDuration: async (durationRange) => {
      const tours = await ApiService.tours.getAll();

      if (durationRange === "1-3") {
        return tours.filter((tour) => tour.duration >= 1 && tour.duration <= 3);
      } else if (durationRange === "4-7") {
        return tours.filter((tour) => tour.duration >= 4 && tour.duration <= 7);
      } else if (durationRange === "8+") {
        return tours.filter((tour) => tour.duration >= 8);
      }

      return tours;
    },
  },
};


// Export API - THAY ĐỔI TẠI ĐÂY ĐỂ CHUYỂN GIỮA MOCK VÀ REAL API
// Để sử dụng Real API: const API = ApiService;
// Để sử dụng Mock API: const API = MockApiService;
const API = ApiService; // Sử dụng Mock API

// Nếu muốn dùng Real API, uncomment dòng dưới và comment dòng trên
// const API = ApiService;
