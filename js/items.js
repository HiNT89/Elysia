// ============================================
// GENERIC ENTITY MANAGER
// ============================================
// Manager tổng quát có thể làm việc với bất kỳ entity nào
// Tự động thay đổi theo AppConfig

const EntityManager = {
  items: [],
  editingItemId: null,
  currentLang: "vi",

  // Initialize entity manager
  init() {
    this.setupEventListeners();
    // Don't load items here - let auth.js handle it after login
    // this.loadItems();
    this.currentLang = i18n.currentLang || "vi";
  },

  // Setup event listeners
  setupEventListeners() {
    // Add item button
    $("#addTourBtn").on("click", () => {
      this.editingItemId = null;
      this.resetForm();
      $("#tourModalTitle").text(
        AppConfig.getLabel("addButton", this.currentLang)
      );
    });

    // Save item button
    $("#saveTourBtn").on("click", () => {
      this.saveItem();
    });

    // Search items
    $("#searchTour").on("input", (e) => {
      this.searchItems(e.target.value);
    });

    // Dynamic filters based on config
    const filterableFields = AppConfig.getFilterableFields();
    filterableFields.forEach((field) => {
      $(`#filter${this.capitalize(field.key)}`).on("change", (e) => {
        this.filterByField(field, e.target.value);
      });
    });

    // View favorites
    $("#viewFavorites").on("click", () => {
      if (window.FavoritesManager) {
        FavoritesManager.showFavorites();
      }
    });

    // Clear filters
    $("#clearFilter").on("click", () => {
      this.clearFilters();
    });

    // Confirm delete button
    $("#confirmDeleteBtn").on("click", () => {
      this.confirmDeleteItem();
    });
  },

  // Show loading spinner
  showLoading() {
    $("#toursList").html(`
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">${AppConfig.getLabel(
          "loading",
          this.currentLang
        )}</p>
      </div>
    `);
  },

  // Hide loading spinner
  hideLoading() {
    $("#toursLoading").remove();
  },

  // Load all items
  async loadItems() {
    try {
      this.showLoading();
      this.items = await API.entity.getAll();
      this.displayItems(this.items);
      this.updateFilters();
    } catch (error) {
      console.error("Error loading items:", error);
      this.hideLoading();
      this.showAlert(
        "error",
        `Không thể tải danh sách ${AppConfig.entity.namePlural}`
      );
    }
  },

  // Display items
  displayItems(items) {
    const itemsList = $("#toursList");
    itemsList.empty();

    if (items.length === 0) {
      const isFiltering = $("#searchTour").val() || this.hasActiveFilters();
      const emptyMessage = isFiltering
        ? AppConfig.getLabel("emptyFilter", this.currentLang)
        : AppConfig.getLabel("empty", this.currentLang);
      const emptyIcon = isFiltering ? "fa-search" : "fa-inbox";

      itemsList.html(`
        <div class="col-12 text-center py-5 empty-state">
          <div class="empty-icon-wrapper">
            <i class="fas ${emptyIcon} fa-4x text-muted mb-3"></i>
          </div>
          <h5 class="text-muted mb-2">${emptyMessage}</h5>
          ${
            isFiltering
              ? '<button class="btn btn-outline-primary btn-sm mt-2" id="clearFilterFromEmpty"><i class="fas fa-redo me-1"></i>' +
                AppConfig.getLabel("clearFilter", this.currentLang) +
                "</button>"
              : ""
          }
        </div>
      `);

      // Bind clear filter event
      $("#clearFilterFromEmpty").on("click", () => {
        this.clearFilters();
      });

      return;
    }

    items.forEach((item) => {
      const itemCard = this.renderItemCard(item);
      itemsList.append(itemCard);
    });

    // Bind events to new elements
    this.bindItemCardEvents();
  },

  // Render single item card (dynamic based on config)
  renderItemCard(item) {
    const isFavorite = window.FavoritesManager
      ? FavoritesManager.isFavorite(item.id)
      : false;
    const favoriteIcon = isFavorite
      ? "fas fa-heart text-danger"
      : "far fa-heart";

    // Get title field
    const titleField = AppConfig.getTitleField();
    const title = item[titleField.key];

    // Get display fields
    const displayFields = AppConfig.getDisplayFields().filter(
      (f) => !f.displayAsTitle
    );

    // Build field rows
    let fieldsHtml = "";
    displayFields.forEach((field) => {
      const value = item[field.key];
      if (value) {
        const formattedValue = AppConfig.formatValue(
          field,
          value,
          this.currentLang
        );
        const icon = field.icon
          ? `<i class="fas ${field.icon} text-primary"></i>`
          : "";
        fieldsHtml += `
          <p class="card-text">
            ${icon} ${formattedValue}
          </p>
        `;
      }
    });

    return `
      <div class="${AppConfig.ui.itemsPerRow} mb-4 entity-card" data-item-id="${
      item.id
    }">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title">${title}</h5>
              <button class="btn btn-sm btn-link p-0 favorite-btn" data-item-id="${
                item.id
              }">
                <i class="${favoriteIcon}"></i>
              </button>
            </div>
            ${fieldsHtml}
          </div>
          <div class="card-footer bg-transparent">
            <button class="btn btn-sm btn-outline-primary edit-item" data-item-id="${
              item.id
            }">
              <i class="fas fa-edit"></i> ${i18n.t("common.edit")}
            </button>
            <button class="btn btn-sm btn-outline-danger delete-item" data-item-id="${
              item.id
            }">
              <i class="fas fa-trash"></i> ${i18n.t("common.delete")}
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // Bind events to item cards
  bindItemCardEvents() {
    // Edit item
    $(".edit-item")
      .off("click")
      .on("click", (e) => {
        const itemId = $(e.currentTarget).data("item-id");
        this.editItem(itemId);
      });

    // Delete item
    $(".delete-item")
      .off("click")
      .on("click", (e) => {
        const itemId = $(e.currentTarget).data("item-id");
        this.deleteItem(itemId);
      });

    // Favorite toggle
    $(".favorite-btn")
      .off("click")
      .on("click", (e) => {
        const itemId = $(e.currentTarget).data("item-id");
        if (window.FavoritesManager) {
          FavoritesManager.toggleFavorite(itemId);
        }
      });
  },

  // Save item (create or update)
  async saveItem() {
    const itemData = this.collectFormData();

    // Validation using config
    const validation = AppConfig.validateAll(itemData);
    if (!validation.valid) {
      this.showAlert("error", validation.errors.join("<br>"));
      return;
    }

    try {
      if (this.editingItemId) {
        // Update existing item
        await API.entity.update(this.editingItemId, itemData);
        this.showAlert(
          "success",
          AppConfig.getLabel("updateSuccess", this.currentLang)
        );
      } else {
        // Create new item
        await API.entity.create(itemData);
        this.showAlert(
          "success",
          AppConfig.getLabel("addSuccess", this.currentLang)
        );
      }

      // Close modal and reload items
      $("#tourModal").modal("hide");
      this.loadItems();
    } catch (error) {
      console.error("Error saving item:", error);
      this.showAlert("error", `Không thể lưu ${AppConfig.entity.name}`);
    }
  },

  // Collect form data based on config
  collectFormData() {
    const data = {};
    AppConfig.entity.fields.forEach((field) => {
      const $input = $(`#tour${this.capitalize(field.key)}`);
      let value = $input.val();

      // Convert to appropriate type
      if (field.type === "number") {
        value = value ? parseFloat(value) : null;
      } else if (field.type === "text" || field.type === "textarea") {
        value = value ? value.trim() : "";
      }

      data[field.key] = value;
    });
    return data;
  },

  // Edit item
  async editItem(itemId) {
    try {
      const item = await API.entity.getById(itemId);
      if (item) {
        this.editingItemId = itemId;

        // Populate form based on config
        AppConfig.entity.fields.forEach((field) => {
          const $input = $(`#tour${this.capitalize(field.key)}`);
          $input.val(item[field.key] || "");
        });

        $("#tourModalTitle").text(
          AppConfig.getLabel("editTitle", this.currentLang)
        );
        $("#tourModal").modal("show");
      }
    } catch (error) {
      console.error("Error loading item:", error);
      this.showAlert(
        "error",
        `Không thể tải thông tin ${AppConfig.entity.name}`
      );
    }
  },

  // Delete item
  deleteItem(itemId) {
    // Get item info
    const item = this.items.find((t) => t.id == itemId);
    if (item) {
      const titleField = AppConfig.getTitleField();
      $("#deleteTourName").text(item[titleField.key]);
    }

    // Store itemId for confirmation
    this.deletingItemId = itemId;

    // Show modal
    $("#deleteConfirmModal").modal("show");
  },

  // Confirm delete item
  async confirmDeleteItem() {
    if (!this.deletingItemId) return;

    try {
      await API.entity.delete(this.deletingItemId);
      this.showAlert(
        "success",
        AppConfig.getLabel("deleteSuccess", this.currentLang)
      );
      this.loadItems();

      // Remove from favorites if exists
      if (window.FavoritesManager) {
        FavoritesManager.removeFavorite(this.deletingItemId);
      }

      // Close modal
      $("#deleteConfirmModal").modal("hide");
      this.deletingItemId = null;
    } catch (error) {
      console.error("Error deleting item:", error);
      this.showAlert("error", `Không thể xóa ${AppConfig.entity.name}`);
    }
  },

  // Search items
  async searchItems(query) {
    if (!query.trim()) {
      this.displayItems(this.items);
      return;
    }

    try {
      const results = await API.entity.search(query);
      this.displayItems(results);
    } catch (error) {
      console.error("Error searching items:", error);
    }
  },

  // Filter by field (generic)
  async filterByField(field, value) {
    if (!value) {
      this.displayItems(this.items);
      return;
    }

    try {
      let results;
      if (field.filterType === "range") {
        results = await API.entity.filterByRange(field.key, value);
      } else {
        results = await API.entity.filterBy(field.key, value);
      }
      this.displayItems(results);
    } catch (error) {
      console.error("Error filtering items:", error);
    }
  },

  // Update filter options dynamically
  updateFilters() {
    const filterableFields = AppConfig.getFilterableFields();

    filterableFields.forEach((field) => {
      if (field.filterType === "range") {
        // Range filters are predefined in config
        return;
      }

      // Get unique values for this field
      const uniqueValues = [
        ...new Set(this.items.map((item) => item[field.key]).filter(Boolean)),
      ];
      const filterSelect = $(`#filter${this.capitalize(field.key)}`);

      // Keep first option (All)
      filterSelect.find("option:not(:first)").remove();

      uniqueValues.forEach((value) => {
        filterSelect.append(`<option value="${value}">${value}</option>`);
      });
    });
  },

  // Check if has active filters
  hasActiveFilters() {
    const filterableFields = AppConfig.getFilterableFields();
    return filterableFields.some((field) => {
      return $(`#filter${this.capitalize(field.key)}`).val();
    });
  },

  // Clear all filters
  clearFilters() {
    // Reset search input
    $("#searchTour").val("");

    // Reset all dynamic filters
    const filterableFields = AppConfig.getFilterableFields();
    filterableFields.forEach((field) => {
      $(`#filter${this.capitalize(field.key)}`).val("");
    });

    // Display all items
    this.displayItems(this.items);
  },

  // Reset form
  resetForm() {
    $("#tourForm")[0].reset();
    this.editingItemId = null;
  },

  // Show alert
  showAlert(type, message) {
    if (window.AuthManager) {
      AuthManager.showAlert(type, message);
    }
  },

  // Get item by ID
  getItemById(itemId) {
    return this.items.find((item) => item.id == itemId);
  },

  // Helper: Capitalize first letter
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
};

// ============================================
// BACKWARD COMPATIBILITY
// ============================================
// Để code cũ vẫn hoạt động
const TourManager = EntityManager;
