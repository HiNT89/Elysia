// ============================================
// UI RENDERER - Dynamic UI Generation
// ============================================
// Tạo giao diện động dựa trên AppConfig

const UIRenderer = {
  currentLang: "vi",

  // Initialize UI
  init() {
    this.currentLang = i18n.currentLang || "vi";
    this.renderPageTitle();
    this.renderForm();
    this.renderFilters();
  },

  // Render page title
  renderPageTitle() {
    const pageTitle = AppConfig.getLabel("pageTitle", this.currentLang);
    $("h2[data-i18n='tour.title']").text(pageTitle);
  },

  // Render form fields dynamically
  renderForm() {
    const formContainer = $("#tourForm");
    formContainer.empty();

    // Add hidden ID field
    formContainer.append('<input type="hidden" id="tourId" />');

    // Render each field based on config
    AppConfig.entity.fields.forEach((field) => {
      const fieldHtml = this.renderFormField(field);
      formContainer.append(fieldHtml);
    });
  },

  // Render single form field
  renderFormField(field) {
    const label = field.label[this.currentLang];
    const placeholder = field.placeholder
      ? field.placeholder[this.currentLang]
      : "";
    const required = field.required ? "required" : "";
    const fieldId = `tour${this.capitalize(field.key)}`;

    let inputHtml = "";

    switch (field.type) {
      case "text":
        inputHtml = `
          <input
            type="text"
            class="form-control"
            id="${fieldId}"
            placeholder="${placeholder}"
            ${required}
          />
        `;
        break;

      case "number":
        const min = field.min !== undefined ? `min="${field.min}"` : "";
        const max = field.max !== undefined ? `max="${field.max}"` : "";
        inputHtml = `
          <input
            type="number"
            class="form-control"
            id="${fieldId}"
            placeholder="${placeholder}"
            ${min}
            ${max}
            ${required}
          />
        `;
        break;

      case "textarea":
        const rows = field.rows || 3;
        inputHtml = `
          <textarea
            class="form-control"
            id="${fieldId}"
            rows="${rows}"
            placeholder="${placeholder}"
            ${required}
          ></textarea>
        `;
        break;

      case "select":
        inputHtml = `
          <select class="form-select" id="${fieldId}" ${required}>
            <option value="">-- Chọn --</option>
            ${(field.options || [])
              .map(
                (opt) =>
                  `<option value="${opt.value}">${
                    opt.label[this.currentLang] || opt.label
                  }</option>`
              )
              .join("")}
          </select>
        `;
        break;

      default:
        inputHtml = `
          <input
            type="text"
            class="form-control"
            id="${fieldId}"
            placeholder="${placeholder}"
            ${required}
          />
        `;
    }

    return `
      <div class="mb-3">
        <label class="form-label">${label}</label>
        ${inputHtml}
      </div>
    `;
  },

  // Render filters dynamically
  renderFilters() {
    const filterableFields = AppConfig.getFilterableFields();
    const filtersContainer = $(".row.g-3.align-items-end");

    // Keep search input and action buttons, remove old filters
    const searchInput = filtersContainer.find(".col-lg-4").first();
    const actionButtons = filtersContainer.find(".col-lg-3").last();

    filtersContainer.empty();
    filtersContainer.append(searchInput);

    // Render each filterable field
    filterableFields.forEach((field) => {
      const filterHtml = this.renderFilter(field);
      filtersContainer.append(filterHtml);
    });

    // Re-add action buttons at the end
    filtersContainer.append(actionButtons);
  },

  // Render single filter
  renderFilter(field) {
    const label = field.label[this.currentLang];
    const icon = field.icon ? `<i class="fas ${field.icon}"></i>` : "";
    const filterId = `filter${this.capitalize(field.key)}`;
    const colSize = "col-lg-3 col-md-6";

    let optionsHtml = "";

    if (field.filterType === "range" && field.filterRanges) {
      // Range filter with predefined ranges
      optionsHtml = field.filterRanges
        .map((range) => {
          const rangeLabel =
            this.currentLang === "en" ? range.labelEn : range.label;
          return `<option value="${range.value}">${rangeLabel}</option>`;
        })
        .join("");
    } else {
      // Dynamic filter - options will be populated from data
      optionsHtml = `<option value="">Tất cả</option>`;
    }

    return `
      <div class="${colSize}">
        <label class="form-label small text-muted mb-1">
          ${icon}
          <span>${label}</span>
        </label>
        <select class="form-select" id="${filterId}">
          <option value="">Tất cả</option>
          ${optionsHtml}
        </select>
      </div>
    `;
  },

  // Update language
  updateLanguage(lang) {
    this.currentLang = lang;
    this.renderPageTitle();
    this.renderForm();
    this.renderFilters();
  },

  // Helper: Capitalize first letter
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
};
