// Favorites Manager - Using LocalStorage
const FavoritesManager = {
  favorites: [],
  storageKey: "tour_favorites",

  // Initialize favorites manager
  init() {
    this.loadFavorites();
  },

  // Load favorites from LocalStorage
  loadFavorites() {
    const saved = localStorage.getItem(this.storageKey);
    this.favorites = saved ? JSON.parse(saved) : [];
  },

  // Save favorites to LocalStorage
  saveFavorites() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
  },

  // Check if tour is in favorites
  isFavorite(tourId) {
    return this.favorites.includes(tourId);
  },

  // Add tour to favorites
  addFavorite(tourId) {
    if (!this.isFavorite(tourId)) {
      this.favorites.push(tourId);
      this.saveFavorites();
      this.showAlert("success", i18n.t("favorites.addSuccess"));
      this.updateUI();
      return true;
    }
    return false;
  },

  // Remove tour from favorites
  removeFavorite(tourId) {
    const index = this.favorites.indexOf(tourId);
    if (index > -1) {
      this.favorites.splice(index, 1);
      this.saveFavorites();
      this.showAlert("success", i18n.t("favorites.removeSuccess"));
      this.updateUI();
      return true;
    }
    return false;
  },

  // Toggle favorite
  toggleFavorite(tourId) {
    if (this.isFavorite(tourId)) {
      this.removeFavorite(tourId);
    } else {
      this.addFavorite(tourId);
    }
  },

  // Get all favorite tours
  async getFavoriteTours() {
    const allTours = await API.tours.getAll();
    return allTours.filter((tour) => this.isFavorite(tour.id));
  },

  // Show favorites modal
  async showFavorites() {
    try {
      const favoriteTours = await this.getFavoriteTours();
      this.displayFavorites(favoriteTours);
      $("#favoritesModal").modal("show");
    } catch (error) {
      console.error("Error loading favorites:", error);
      this.showAlert("error", "Không thể tải danh sách yêu thích");
    }
  },

  // Display favorites
  displayFavorites(tours) {
    const favoritesList = $("#favoritesList");
    favoritesList.empty();

    if (tours.length === 0) {
      favoritesList.html(`
                <div class="col-12 text-center py-5">
                    <i class="far fa-heart fa-3x text-muted mb-3"></i>
                    <p class="text-muted">${i18n.t("favorites.empty")}</p>
                </div>
            `);
      return;
    }

    tours.forEach((tour) => {
      const tourCard = `
                <div class="col-md-6 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h6 class="card-title mb-0">${tour.title}</h6>
                                <button class="btn btn-sm btn-link text-danger p-0 remove-favorite" data-tour-id="${
                                  tour.id
                                }">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                            <p class="card-text small mb-1">
                                <i class="fas fa-map-marker-alt text-primary"></i> ${
                                  tour.destination
                                }
                            </p>
                            <p class="card-text small mb-1">
                                <i class="fas fa-clock text-info"></i> ${
                                  tour.duration
                                } ${
        tour.duration > 1 ? i18n.t("common.days") : i18n.t("common.day")
      }
                            </p>
                            <p class="card-text small mb-0">
                                <i class="fas fa-money-bill-wave text-success"></i> ${this.formatPrice(
                                  tour.price
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            `;

      favoritesList.append(tourCard);
    });

    // Bind remove favorite events
    $(".remove-favorite")
      .off("click")
      .on("click", (e) => {
        const tourId = $(e.currentTarget).data("tour-id");
        this.removeFavorite(tourId);
        this.showFavorites(); // Refresh the list
      });
  },

  // Update UI (refresh tour cards)
  updateUI() {
    if (window.TourManager && TourManager.tours.length > 0) {
      TourManager.displayTours(TourManager.tours);
    }
  },

  // Clear all favorites
  clearFavorites() {
    if (confirm("Bạn có chắc muốn xóa tất cả tour yêu thích?")) {
      this.favorites = [];
      this.saveFavorites();
      this.showAlert("success", "Đã xóa tất cả tour yêu thích");
      this.updateUI();
      this.showFavorites();
    }
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

  // Export favorites (for backup)
  exportFavorites() {
    const dataStr = JSON.stringify(this.favorites, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tour_favorites.json";
    link.click();
    URL.revokeObjectURL(url);
  },

  // Import favorites (from backup)
  importFavorites(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          this.favorites = imported;
          this.saveFavorites();
          this.showAlert("success", "Import thành công");
          this.updateUI();
        } else {
          this.showAlert("error", "File không đúng định dạng");
        }
      } catch (error) {
        console.error("Import error:", error);
        this.showAlert("error", "Không thể import file");
      }
    };
    reader.readAsText(file);
  },
};
