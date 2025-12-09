// Tour Manager
const TourManager = {
  tours: [],
  editingTourId: null,

  // Initialize tour manager
  init() {
    this.setupEventListeners();
    this.loadTours();
  },

  // Setup event listeners
  setupEventListeners() {
    // Add tour button
    $("#addTourBtn").on("click", () => {
      this.editingTourId = null;
      this.resetForm();
      $("#tourModalTitle").text(i18n.t("tour.add"));
    });

    // Save tour button
    $("#saveTourBtn").on("click", () => {
      this.saveTour();
    });

    // Search tours
    $("#searchTour").on("input", (e) => {
      this.searchTours(e.target.value);
    });

    // Filter by destination
    $("#filterDestination").on("change", (e) => {
      this.filterByDestination(e.target.value);
    });

    // Filter by duration
    $("#filterDuration").on("change", (e) => {
      this.filterByDuration(e.target.value);
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
      this.confirmDeleteTour();
    });
  },

  // Show loading spinner
  showLoading() {
    $("#toursList").html(`
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted" data-i18n="tour.loading">${i18n.t(
          "tour.loading"
        )}</p>
      </div>
    `);
  },

  // Hide loading spinner
  hideLoading() {
    $("#toursLoading").remove();
  },

  // Load all tours
  async loadTours() {
    try {
      this.showLoading();
      this.tours = await API.tours.getAll();
      this.displayTours(this.tours);
      this.updateDestinationFilter();
    } catch (error) {
      console.error("Error loading tours:", error);
      this.hideLoading();
      this.showAlert("error", "Không thể tải danh sách tour");
    }
  },

  // Display tours
  displayTours(tours) {
    const toursList = $("#toursList");
    toursList.empty();

    if (tours.length === 0) {
      const isFiltering =
        $("#searchTour").val() ||
        $("#filterDestination").val() ||
        $("#filterDuration").val();
      const emptyMessage = isFiltering
        ? i18n.t("tour.emptyFilter")
        : i18n.t("tour.empty");
      const emptyIcon = isFiltering ? "fa-search" : "fa-inbox";

      toursList.html(`
        <div class="col-12 text-center py-5 empty-state">
          <div class="empty-icon-wrapper">
            <i class="fas ${emptyIcon} fa-4x text-muted mb-3"></i>
          </div>
          <h5 class="text-muted mb-2">${emptyMessage}</h5>
          ${
            isFiltering
              ? '<button class="btn btn-outline-primary btn-sm mt-2" id="clearFilterFromEmpty"><i class="fas fa-redo me-1"></i>' +
                i18n.t("tour.clearFilter") +
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

    tours.forEach((tour) => {
      const isFavorite = window.FavoritesManager
        ? FavoritesManager.isFavorite(tour.id)
        : false;
      const favoriteIcon = isFavorite
        ? "fas fa-heart text-danger"
        : "far fa-heart";

      const tourCard = `
                <div class="col-md-4 mb-4 tour-card" data-tour-id="${tour.id}">
                    <div class="card h-100 shadow-sm">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h5 class="card-title">${tour.title}</h5>
                                <button class="btn btn-sm btn-link p-0 favorite-btn" data-tour-id="${
                                  tour.id
                                }">
                                    <i class="${favoriteIcon}"></i>
                                </button>
                            </div>
                            <p class="card-text">
                                <i class="fas fa-map-marker-alt text-primary"></i> ${
                                  tour.destination
                                }
                            </p>
                            <p class="card-text">
                                <i class="fas fa-clock text-info"></i> ${
                                  tour.duration
                                } ${
        tour.duration > 1 ? i18n.t("common.days") : i18n.t("common.day")
      }
                            </p>
                            <p class="card-text">
                                <i class="fas fa-money-bill-wave text-success"></i> ${this.formatPrice(
                                  tour.price
                                )}
                            </p>
                            <p class="card-text text-muted small">${
                              tour.description || ""
                            }</p>
                        </div>
                        <div class="card-footer bg-transparent">
                            <button class="btn btn-sm btn-outline-primary edit-tour" data-tour-id="${
                              tour.id
                            }">
                                <i class="fas fa-edit"></i> ${i18n.t(
                                  "common.edit"
                                )}
                            </button>
                            <button class="btn btn-sm btn-outline-danger delete-tour" data-tour-id="${
                              tour.id
                            }">
                                <i class="fas fa-trash"></i> ${i18n.t(
                                  "common.delete"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            `;

      toursList.append(tourCard);
    });

    // Bind events to new elements
    this.bindTourCardEvents();
  },

  // Bind events to tour cards
  bindTourCardEvents() {
    // Edit tour
    $(".edit-tour")
      .off("click")
      .on("click", (e) => {
        const tourId = $(e.currentTarget).data("tour-id");
        this.editTour(tourId);
      });

    // Delete tour
    $(".delete-tour")
      .off("click")
      .on("click", (e) => {
        const tourId = $(e.currentTarget).data("tour-id");
        this.deleteTour(tourId);
      });

    // Favorite toggle
    $(".favorite-btn")
      .off("click")
      .on("click", (e) => {
        const tourId = $(e.currentTarget).data("tour-id");
        if (window.FavoritesManager) {
          FavoritesManager.toggleFavorite(tourId);
        }
      });
  },

  // Save tour (create or update)
  async saveTour() {
    const tourData = {
      title: $("#tourTitle").val().trim(),
      destination: $("#tourDestination").val().trim(),
      price: parseInt($("#tourPrice").val()),
      duration: parseInt($("#tourDuration").val()),
      description: $("#tourDescription").val().trim(),
    };

    // Validation
    if (
      !tourData.title ||
      !tourData.destination ||
      !tourData.price ||
      !tourData.duration
    ) {
      this.showAlert("error", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (tourData.price <= 0 || tourData.duration <= 0) {
      this.showAlert("error", "Giá và thời lượng phải lớn hơn 0");
      return;
    }

    try {
      if (this.editingTourId) {
        // Update existing tour
        await API.tours.update(this.editingTourId, tourData);
        this.showAlert("success", i18n.t("tour.updateSuccess"));
      } else {
        // Create new tour
        await API.tours.create(tourData);
        this.showAlert("success", i18n.t("tour.addSuccess"));
      }

      // Close modal and reload tours
      $("#tourModal").modal("hide");
      this.loadTours();
    } catch (error) {
      console.error("Error saving tour:", error);
      this.showAlert("error", "Không thể lưu tour");
    }
  },

  // Edit tour
  async editTour(tourId) {
    try {
      const tour = await API.tours.getById(tourId);
      if (tour) {
        this.editingTourId = tourId;
        $("#tourTitle").val(tour.title);
        $("#tourDestination").val(tour.destination);
        $("#tourPrice").val(tour.price);
        $("#tourDuration").val(tour.duration);
        $("#tourDescription").val(tour.description || "");
        $("#tourModalTitle").text(i18n.t("tour.edit"));
        $("#tourModal").modal("show");
      }
    } catch (error) {
      console.error("Error loading tour:", error);
      this.showAlert("error", "Không thể tải thông tin tour");
    }
  },

  // Delete tour
  deleteTour(tourId) {
    // Get tour info
    const tour = this.tours.find((t) => t.id == tourId);
    if (tour) {
      $("#deleteTourName").text(tour.title);
    }

    // Store tourId for confirmation
    this.deletingTourId = tourId;

    // Show modal
    $("#deleteConfirmModal").modal("show");
  },

  // Confirm delete tour
  async confirmDeleteTour() {
    if (!this.deletingTourId) return;

    try {
      await API.tours.delete(this.deletingTourId);
      this.showAlert("success", i18n.t("tour.deleteSuccess"));
      this.loadTours();

      // Remove from favorites if exists
      if (window.FavoritesManager) {
        FavoritesManager.removeFavorite(this.deletingTourId);
      }

      // Close modal
      $("#deleteConfirmModal").modal("hide");
      this.deletingTourId = null;
    } catch (error) {
      console.error("Error deleting tour:", error);
      this.showAlert("error", "Không thể xóa tour");
    }
  },

  // Search tours
  async searchTours(query) {
    if (!query.trim()) {
      this.displayTours(this.tours);
      return;
    }

    try {
      const results = await API.tours.search(query);
      this.displayTours(results);
    } catch (error) {
      console.error("Error searching tours:", error);
    }
  },

  // Filter by destination
  async filterByDestination(destination) {
    if (!destination) {
      this.displayTours(this.tours);
      return;
    }

    try {
      const results = await API.tours.filterByDestination(destination);
      this.displayTours(results);
    } catch (error) {
      console.error("Error filtering tours:", error);
    }
  },

  // Filter by duration
  async filterByDuration(durationRange) {
    if (!durationRange) {
      this.displayTours(this.tours);
      return;
    }

    try {
      const results = await API.tours.filterByDuration(durationRange);
      this.displayTours(results);
    } catch (error) {
      console.error("Error filtering tours:", error);
    }
  },

  // Update destination filter options
  updateDestinationFilter() {
    const destinations = [
      ...new Set(this.tours.map((tour) => tour.destination)),
    ];
    const filterSelect = $("#filterDestination");

    // Keep first option (All)
    filterSelect.find("option:not(:first)").remove();

    destinations.forEach((destination) => {
      filterSelect.append(
        `<option value="${destination}">${destination}</option>`
      );
    });
  },

  // Clear all filters
  clearFilters() {
    // Reset search input
    $("#searchTour").val("");

    // Reset destination filter
    $("#filterDestination").val("");

    // Reset duration filter
    $("#filterDuration").val("");

    // Display all tours
    this.displayTours(this.tours);
  },

  // Reset form
  resetForm() {
    $("#tourForm")[0].reset();
    this.editingTourId = null;
  },

  // Format price
  formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  },

  // Show alert
  showAlert(type, message) {
    if (window.AuthManager) {
      AuthManager.showAlert(type, message);
    }
  },

  // Get tour by ID
  getTourById(tourId) {
    return this.tours.find((tour) => tour.id == tourId);
  },
};
