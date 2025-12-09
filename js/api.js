// ============================================
// GENERIC API SERVICE
// ============================================
// API Service tổng quát có thể làm việc với bất kỳ entity nào
// Sử dụng AppConfig để xác định endpoint và cấu trúc dữ liệu

const ApiService = {
  // Generic request handler
  async request(endpoint, options = {}) {
    try {
      const url = `${AppConfig.api.baseURL}${endpoint}`;
      const config = {
        ...options,
        headers: {
          ...AppConfig.api.headers,
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

  // ============================================
  // USER API (Fixed - không thay đổi)
  // ============================================
  users: {
    getAll: async () => {
      return await ApiService.request(AppConfig.api.usersEndpoint);
    },

    getById: async (id) => {
      return await ApiService.request(`${AppConfig.api.usersEndpoint}/${id}`);
    },

    getByEmail: async (email) => {
      const users = await ApiService.users.getAll();
      console.log("🚀 ~ users:", users);
      return users.find((user) => user.email === email);
    },

    create: async (userData) => {
      return await ApiService.request(AppConfig.api.usersEndpoint, {
        method: "POST",
        body: JSON.stringify(userData),
      });
    },

    update: async (id, userData) => {
      return await ApiService.request(`${AppConfig.api.usersEndpoint}/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      });
    },

    delete: async (id) => {
      return await ApiService.request(`${AppConfig.api.usersEndpoint}/${id}`, {
        method: "DELETE",
      });
    },
  },

  // ============================================
  // ENTITY API (Generic - tự động thay đổi theo config)
  // ============================================
  entity: {
    getAll: async () => {
      return await ApiService.request(AppConfig.api.entityEndpoint);
    },

    getById: async (id) => {
      return await ApiService.request(`${AppConfig.api.entityEndpoint}/${id}`);
    },

    create: async (data) => {
      return await ApiService.request(AppConfig.api.entityEndpoint, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    update: async (id, data) => {
      return await ApiService.request(`${AppConfig.api.entityEndpoint}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },

    delete: async (id) => {
      return await ApiService.request(`${AppConfig.api.entityEndpoint}/${id}`, {
        method: "DELETE",
      });
    },

    // Generic search - tìm kiếm trên tất cả các field có displayInCard = true
    search: async (query) => {
      const items = await ApiService.entity.getAll();
      const searchableFields = AppConfig.getDisplayFields();

      return items.filter((item) => {
        return searchableFields.some((field) => {
          const value = item[field.key];
          if (!value) return false;
          return value.toString().toLowerCase().includes(query.toLowerCase());
        });
      });
    },

    // Generic filter by field
    filterBy: async (fieldKey, value) => {
      const items = await ApiService.entity.getAll();
      return items.filter(
        (item) =>
          item[fieldKey] &&
          item[fieldKey].toString().toLowerCase() === value.toLowerCase()
      );
    },

    // Filter by range (cho number fields)
    filterByRange: async (fieldKey, rangeValue) => {
      const items = await ApiService.entity.getAll();

      // Parse range (ví dụ: "1-3", "4-7", "8+")
      if (rangeValue.includes("-")) {
        const [min, max] = rangeValue.split("-").map(Number);
        return items.filter(
          (item) => item[fieldKey] >= min && item[fieldKey] <= max
        );
      } else if (rangeValue.includes("+")) {
        const min = parseInt(rangeValue);
        return items.filter((item) => item[fieldKey] >= min);
      }

      return items;
    },
  },
};

// ============================================
// BACKWARD COMPATIBILITY
// ============================================
// Để code cũ vẫn hoạt động, tạo alias "tours" trỏ đến "entity"
ApiService.tours = ApiService.entity;

// Export API
const API = ApiService;
