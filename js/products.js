// Products page specific functionality
// Handles vehicle filtering, modal display, drag & drop comparison, and loan calculator

document.addEventListener("DOMContentLoaded", function () {
  initProductsPage();
});

let allVehicles = [];
let filteredVehicles = [];
let currentComparison = { vehicle1: null, vehicle2: null };

function initProductsPage() {
  loadVehicleData();
  initFilters();
  initModal();
  initDragAndDrop();
  initLoanCalculator();
  initVehicleSearch();
}

// Vehicle data
function loadVehicleData() {
  allVehicles = [
    // Luxury Cars
    {
      id: 1,
      name: "BMW X7 xDrive40i",
      price: 89500,
      category: "luxury",
      image:
        "https://cdn.pixabay.com/photo/2018/07/12/16/05/bmw-3533813_1280.jpg",
      specs: {
        engine: "Twin Turbo V8",
        horsepower: "523 HP",
        drivetrain: "AWD",
        acceleration: "4.2s 0-60mph",
        fuelEconomy: "21/26 MPG",
        seating: "7 passengers",
        transmission: "8-Speed Automatic",
      },
      description:
        "The BMW X7 combines luxury with performance in a stunning SUV package.",
      badge: "New",
    },
    {
      id: 2,
      name: "Mercedes S-Class S450",
      price: 126000,
      category: "luxury",
      image:
        "https://cdn.pixabay.com/photo/2016/11/22/22/31/auto-1850953_1280.jpg",
      specs: {
        engine: "V6 Turbo",
        horsepower: "429 HP",
        drivetrain: "RWD",
        acceleration: "4.8s 0-60mph",
        fuelEconomy: "23/31 MPG",
        seating: "5 passengers",
        transmission: "9-Speed Automatic",
      },
      description:
        "The Mercedes S-Class sets the standard for luxury sedans worldwide.",
      badge: "Featured",
    },
    {
      id: 3,
      name: "Audi A8 L 60 TFSI",
      price: 95500,
      category: "luxury",
      image:
        "https://cdn.pixabay.com/photo/2017/08/17/13/44/sports-car-2651393_960_720.jpg",
      specs: {
        engine: "V8 TFSI",
        horsepower: "453 HP",
        drivetrain: "AWD",
        acceleration: "4.6s 0-60mph",
        fuelEconomy: "22/29 MPG",
        seating: "5 passengers",
        transmission: "8-Speed Tiptronic",
      },
      description:
        "The Audi A8 L combines cutting-edge technology with unparalleled comfort.",
      badge: "Premium",
    },
    // Electric Vehicles
    {
      id: 4,
      name: "Tesla Model S Plaid",
      price: 135000,
      category: "electric",
      image:
        "https://cdn.pixabay.com/photo/2021/01/21/11/09/tesla-5937063_1280.jpg",
      specs: {
        engine: "Tri-Motor Electric",
        horsepower: "1020 HP",
        drivetrain: "AWD",
        acceleration: "1.9s 0-60mph",
        fuelEconomy: "120 MPGe",
        seating: "5 passengers",
        transmission: "Single-Speed",
      },
      description:
        "The Tesla Model S Plaid delivers unprecedented electric performance.",
      badge: "Electric",
    },
    {
      id: 5,
      name: "BMW iX xDrive50",
      price: 89500,
      category: "electric",
      image:
        "https://cdn.pixabay.com/photo/2022/06/20/20/36/car-7274571_1280.jpg",
      specs: {
        engine: "Dual Motor Electric",
        horsepower: "516 HP",
        drivetrain: "AWD",
        acceleration: "4.6s 0-60mph",
        fuelEconomy: "105 MPGe",
        seating: "5 passengers",
        transmission: "Single-Speed",
      },
      description:
        "BMW's flagship electric SUV with innovative technology and luxury.",
      badge: "New",
    },
    {
      id: 6,
      name: "Mercedes EQS 580",
      price: 125000,
      category: "electric",
      image:
        "https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg",
      specs: {
        engine: "Dual Motor Electric",
        horsepower: "516 HP",
        drivetrain: "AWD",
        acceleration: "4.1s 0-60mph",
        fuelEconomy: "107 MPGe",
        seating: "5 passengers",
        transmission: "Single-Speed",
      },
      description:
        "Mercedes' luxury electric sedan with exceptional range and comfort.",
      badge: "Electric",
    },
    // Sports Cars
    {
      id: 7,
      name: "Porsche 911 Turbo S",
      price: 235000,
      category: "sports",
      image:
        "https://cdn.pixabay.com/photo/2017/10/18/10/47/auto-2863638_1280.jpg",
      specs: {
        engine: "Twin Turbo Flat-6",
        horsepower: "640 HP",
        drivetrain: "AWD",
        acceleration: "2.6s 0-60mph",
        fuelEconomy: "18/24 MPG",
        seating: "4 passengers",
        transmission: "8-Speed PDK",
      },
      description:
        "The ultimate 911 combines everyday usability with track performance.",
      badge: "Performance",
    },
    {
      id: 8,
      name: "BMW M8 Competition",
      price: 185000,
      category: "sports",
      image:
        "https://cdn.pixabay.com/photo/2023/07/29/16/42/car-8157299_1280.jpg",
      specs: {
        engine: "Twin Turbo V8",
        horsepower: "617 HP",
        drivetrain: "AWD",
        acceleration: "3.0s 0-60mph",
        fuelEconomy: "16/22 MPG",
        seating: "4 passengers",
        transmission: "8-Speed Automatic",
      },
      description: "BMW's flagship grand tourer with race-bred performance.",
      badge: "M Performance",
    },
    {
      id: 9,
      name: "Mercedes AMG GT 63 S",
      price: 195000,
      category: "sports",
      image:
        "https://cdn.pixabay.com/photo/2022/05/12/12/30/racing-7191479_960_720.jpg",
      specs: {
        engine: "Twin Turbo V8",
        horsepower: "630 HP",
        drivetrain: "AWD",
        acceleration: "3.1s 0-60mph",
        fuelEconomy: "17/23 MPG",
        seating: "4 passengers",
        transmission: "9-Speed Automatic",
      },
      description: "Mercedes-AMG's four-door coupe with supercar performance.",
      badge: "AMG",
    },
  ];

  filteredVehicles = [...allVehicles];
  renderVehiclesByCategory();
}

function renderVehiclesByCategory() {
  const luxuryContainer = document.getElementById("luxury-vehicles");
  const electricContainer = document.getElementById("electric-vehicles");
  const sportsContainer = document.getElementById("sports-vehicles");

  // Clear all containers first to prevent overlap
  if (luxuryContainer) luxuryContainer.innerHTML = "";
  if (electricContainer) electricContainer.innerHTML = "";
  if (sportsContainer) sportsContainer.innerHTML = "";

  // Hide all sections initially
  const luxurySection = document.querySelector(".luxury-section");
  const electricSection = document.querySelector(".electric-section");
  const sportsSection = document.querySelector(".sports-section");

  if (luxurySection) luxurySection.style.display = "none";
  if (electricSection) electricSection.style.display = "none";
  if (sportsSection) sportsSection.style.display = "none";

  // Show only sections that have vehicles after filtering
  const luxuryVehicles = filteredVehicles.filter(
    (v) => v.category === "luxury"
  );
  const electricVehicles = filteredVehicles.filter(
    (v) => v.category === "electric"
  );
  const sportsVehicles = filteredVehicles.filter(
    (v) => v.category === "sports"
  );

  if (luxuryContainer && luxuryVehicles.length > 0) {
    renderVehicles(luxuryVehicles, luxuryContainer);
    if (luxurySection) luxurySection.style.display = "block";
  }

  if (electricContainer && electricVehicles.length > 0) {
    renderVehicles(electricVehicles, electricContainer);
    if (electricSection) electricSection.style.display = "block";
  }

  if (sportsContainer && sportsVehicles.length > 0) {
    renderVehicles(sportsVehicles, sportsContainer);
    if (sportsSection) sportsSection.style.display = "block";
  }

  // Show "No results" message if no vehicles found
  showNoResultsMessage(
    luxuryVehicles.length + electricVehicles.length + sportsVehicles.length ===
      0
  );
}

function renderVehicles(vehicles, container) {
  container.innerHTML = vehicles
    .map(
      (vehicle) => `
        <div class="vehicle-card" data-id="${vehicle.id}" draggable="true">
            <div class="vehicle-image">
                <img src="${vehicle.image}" alt="${
        vehicle.name
      }" loading="lazy">
                <div class="vehicle-badge">${vehicle.badge}</div>
            </div>
            <div class="vehicle-info">
                <h3 class="vehicle-title">${vehicle.name}</h3>
                <p class="vehicle-price">$${vehicle.price.toLocaleString()}</p>
                <div class="vehicle-specs">
                    <span>${vehicle.specs.horsepower}</span>
                    <span>${vehicle.specs.acceleration}</span>
                    <span>${vehicle.specs.drivetrain}</span>
                </div>
                <div class="vehicle-actions">
                    <button class="btn btn-primary" onclick="openVehicleModal(${
                      vehicle.id
                    })">View Details</button>
                    <button class="btn btn-secondary" onclick="scheduleTestDrive('${
                      vehicle.name
                    }')">Test Drive</button>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  // Add drag event listeners
  container.querySelectorAll(".vehicle-card").forEach((card) => {
    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("dragend", handleDragEnd);
  });
}

// Filter functionality
function initFilters() {
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");
  const searchInput = document.getElementById("searchInput");
  const clearFilters = document.getElementById("clearFilters");

  if (categoryFilter) {
    categoryFilter.addEventListener("change", applyFilters);
  }
  if (priceFilter) {
    priceFilter.addEventListener("change", applyFilters);
  }
  if (searchInput) {
    searchInput.addEventListener("input", debounce(applyFilters, 300));
  }
  if (clearFilters) {
    clearFilters.addEventListener("click", clearAllFilters);
  }
}

function applyFilters() {
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");
  const searchInput = document.getElementById("searchInput");

  let filtered = [...allVehicles];

  // Category filter
  if (categoryFilter && categoryFilter.value !== "all") {
    filtered = filtered.filter(
      (vehicle) => vehicle.category === categoryFilter.value
    );
  }

  // Price filter
  if (priceFilter && priceFilter.value !== "all") {
    const priceRange = priceFilter.value;
    filtered = filtered.filter((vehicle) => {
      switch (priceRange) {
        case "under-50k":
          return vehicle.price < 50000;
        case "50k-100k":
          return vehicle.price >= 50000 && vehicle.price <= 100000;
        case "over-100k":
          return vehicle.price > 100000;
        default:
          return true;
      }
    });
  }

  // Search filter
  if (searchInput && searchInput.value.trim() !== "") {
    const searchTerm = searchInput.value.toLowerCase().trim();
    filtered = filtered.filter(
      (vehicle) =>
        vehicle.name.toLowerCase().includes(searchTerm) ||
        vehicle.description.toLowerCase().includes(searchTerm) ||
        Object.values(vehicle.specs).some((spec) =>
          spec.toLowerCase().includes(searchTerm)
        )
    );
  }

  filteredVehicles = filtered;
  renderVehiclesByCategory();
}

function clearAllFilters() {
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");
  const searchInput = document.getElementById("searchInput");

  if (categoryFilter) categoryFilter.value = "all";
  if (priceFilter) priceFilter.value = "all";
  if (searchInput) searchInput.value = "";

  filteredVehicles = [...allVehicles];
  renderVehiclesByCategory();
}

// Simple vehicle search without dropdown suggestions
function initVehicleSearch() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  // Simple search without dropdown suggestions
  searchInput.addEventListener("input", debounce(applyFilters, 300));

  // Add placeholder and styling
  searchInput.placeholder = "Search vehicles...";
  searchInput.style.cssText = `
        padding: 0.75rem 1rem;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        font-size: 1rem;
        width: 100%;
        transition: border-color 0.3s ease;
    `;

  searchInput.addEventListener("focus", function () {
    this.style.borderColor = "#2c5aa0";
    this.style.boxShadow = "0 0 0 3px rgba(44, 90, 160, 0.1)";
  });

  searchInput.addEventListener("blur", function () {
    this.style.borderColor = "#e9ecef";
    this.style.boxShadow = "none";
  });
}

// Modal functionality
function initModal() {
  const modal = document.getElementById("vehicleModal");
  const closeBtn = modal?.querySelector(".close");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeVehicleModal);
  }

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeVehicleModal();
    }
  });

  // Escape key to close modal
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal && modal.style.display === "block") {
      closeVehicleModal();
    }
  });
}

function openVehicleModal(vehicleId) {
  const vehicle = allVehicles.find((v) => v.id === vehicleId);
  if (!vehicle) return;

  const modal = document.getElementById("vehicleModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const modalSpecs = document.getElementById("modalSpecs");
  const modalDescription = document.getElementById("modalDescription");

  if (!modal) return;

  modalImage.src = vehicle.image;
  modalImage.alt = vehicle.name;
  modalTitle.textContent = vehicle.name;
  modalPrice.textContent = `$${vehicle.price.toLocaleString()}`;
  modalDescription.textContent = vehicle.description;

  modalSpecs.innerHTML = Object.entries(vehicle.specs)
    .map(
      ([key, value]) => `
        <div class="spec-item">
            <span class="spec-label">${formatSpecLabel(key)}:</span>
            <span class="spec-value">${value}</span>
        </div>
    `
    )
    .join("");

  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  // Contact and test drive button handlers
  const contactBtn = document.getElementById("contactBtn");
  const testDriveBtn = document.getElementById("testDriveBtn");

  contactBtn.onclick = () => {
    window.location.href = `contact.html?vehicle=${encodeURIComponent(
      vehicle.name
    )}`;
  };

  testDriveBtn.onclick = () => {
    scheduleTestDrive(vehicle.name);
    closeVehicleModal();
  };
}

function closeVehicleModal() {
  const modal = document.getElementById("vehicleModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Make openVehicleModal globally available
window.openVehicleModal = openVehicleModal;

// Drag and Drop comparison
function initDragAndDrop() {
  const dropZones = document.querySelectorAll(".drop-zone");

  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", handleDragOver);
    zone.addEventListener("drop", handleDrop);
    zone.addEventListener("dragenter", handleDragEnter);
    zone.addEventListener("dragleave", handleDragLeave);
  });

  const clearComparisonBtn = document.getElementById("clearComparison");
  if (clearComparisonBtn) {
    clearComparisonBtn.addEventListener("click", clearComparison);
  }
}

function handleDragStart(e) {
  const vehicleId = parseInt(this.dataset.id);
  e.dataTransfer.setData("text/plain", vehicleId);
  this.style.opacity = "0.5";
}

function handleDragEnd(e) {
  this.style.opacity = "1";
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDragEnter(e) {
  e.preventDefault();
  this.classList.add("drag-over");
}

function handleDragLeave(e) {
  this.classList.remove("drag-over");
}

function handleDrop(e) {
  e.preventDefault();
  this.classList.remove("drag-over");

  const vehicleId = parseInt(e.dataTransfer.getData("text/plain"));
  const vehicle = allVehicles.find((v) => v.id === vehicleId);

  if (!vehicle) return;

  const zoneId = this.id;
  const slotNumber = zoneId === "dropZone1" ? "vehicle1" : "vehicle2";

  currentComparison[slotNumber] = vehicle;

  this.innerHTML = `
        <div class="comparison-vehicle">
            <img src="${vehicle.image}" alt="${vehicle.name}">
            <h4>${vehicle.name}</h4>
            <p>$${vehicle.price.toLocaleString()}</p>
        </div>
    `;

  // If both slots are filled, show comparison table
  if (currentComparison.vehicle1 && currentComparison.vehicle2) {
    showComparisonTable();
  }
}

function showComparisonTable() {
  const comparisonTable = document.getElementById("comparisonTable");
  const compare1Title = document.getElementById("compare1Title");
  const compare2Title = document.getElementById("compare2Title");
  const comparisonBody = document.getElementById("comparisonBody");

  if (!comparisonTable) return;

  compare1Title.textContent = currentComparison.vehicle1.name;
  compare2Title.textContent = currentComparison.vehicle2.name;

  const specs = Object.keys(currentComparison.vehicle1.specs);
  comparisonBody.innerHTML = specs
    .map(
      (spec) => `
        <tr>
            <td>${formatSpecLabel(spec)}</td>
            <td>${currentComparison.vehicle1.specs[spec]}</td>
            <td>${currentComparison.vehicle2.specs[spec]}</td>
        </tr>
    `
    )
    .join("");

  // Add price comparison
  comparisonBody.innerHTML += `
        <tr>
            <td>Price</td>
            <td>$${currentComparison.vehicle1.price.toLocaleString()}</td>
            <td>$${currentComparison.vehicle2.price.toLocaleString()}</td>
        </tr>
    `;

  comparisonTable.style.display = "block";
}

function clearComparison() {
  currentComparison = { vehicle1: null, vehicle2: null };

  const dropZone1 = document.getElementById("dropZone1");
  const dropZone2 = document.getElementById("dropZone2");
  const comparisonTable = document.getElementById("comparisonTable");

  if (dropZone1) {
    dropZone1.innerHTML = `
            <div class="drop-placeholder">
                <i class="fas fa-car"></i>
                <p>Drag a vehicle here</p>
            </div>
        `;
  }

  if (dropZone2) {
    dropZone2.innerHTML = `
            <div class="drop-placeholder">
                <i class="fas fa-car"></i>
                <p>Drag a vehicle here</p>
            </div>
        `;
  }

  if (comparisonTable) {
    comparisonTable.style.display = "none";
  }
}

// Loan Calculator
function initLoanCalculator() {
  const calculateBtn = document.getElementById("calculateBtn");
  if (calculateBtn) {
    calculateBtn.addEventListener("click", calculateLoan);
  }

  // Real-time calculation on input change
  const inputs = ["vehiclePrice", "downPayment", "interestRate", "loanTerm"];
  inputs.forEach((inputId) => {
    const input = document.getElementById(inputId);
    if (input) {
      input.addEventListener("input", debounce(calculateLoan, 500));
    }
  });
}

function calculateLoan() {
  const vehiclePrice =
    parseFloat(document.getElementById("vehiclePrice")?.value) || 0;
  const downPayment =
    parseFloat(document.getElementById("downPayment")?.value) || 0;
  const interestRate =
    parseFloat(document.getElementById("interestRate")?.value) || 0;
  const loanTerm = parseInt(document.getElementById("loanTerm")?.value) || 60;

  if (vehiclePrice <= 0) return;

  const loanAmount = vehiclePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm))) /
      (Math.pow(1 + monthlyRate, loanTerm) - 1);
  } else {
    monthlyPayment = loanAmount / loanTerm;
  }

  const totalPayment = monthlyPayment * loanTerm;
  const totalInterest = totalPayment - loanAmount;
  const totalCost = vehiclePrice + totalInterest;

  // Display results
  const monthlyPaymentElement = document.getElementById("monthlyPayment");
  const totalInterestElement = document.getElementById("totalInterest");
  const totalCostElement = document.getElementById("totalCost");
  const calculatorResult = document.getElementById("calculatorResult");

  if (monthlyPaymentElement)
    monthlyPaymentElement.textContent = `$${monthlyPayment.toFixed(2)}`;
  if (totalInterestElement)
    totalInterestElement.textContent = `$${totalInterest.toFixed(2)}`;
  if (totalCostElement)
    totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
  if (calculatorResult) calculatorResult.style.display = "block";
}

// Utility functions
function formatSpecLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function showNoResultsMessage(showMessage = false) {
  let noResultsDiv = document.getElementById("no-results-message");

  if (showMessage) {
    if (!noResultsDiv) {
      noResultsDiv = document.createElement("div");
      noResultsDiv.id = "no-results-message";
      noResultsDiv.className = "no-results";
      noResultsDiv.innerHTML = `
                <div class="no-results-content">
                    <i class="fas fa-search"></i>
                    <h3>No vehicles found</h3>
                    <p>Try adjusting your search criteria or clearing filters to see more results.</p>
                    <button onclick="clearAllFilters()" class="btn btn-primary">Clear All Filters</button>
                </div>
            `;

      // Insert after the filters section
      const filtersSection = document.querySelector(".filters");
      if (filtersSection) {
        filtersSection.parentNode.insertBefore(
          noResultsDiv,
          filtersSection.nextSibling
        );
      }
    }
    noResultsDiv.style.display = "block";
  } else {
    if (noResultsDiv) {
      noResultsDiv.style.display = "none";
    }
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add CSS for products page specific styling
const productStyles = document.createElement("style");
productStyles.textContent = `
    .vehicle-card {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.5s ease;
        cursor: grab;
        margin-bottom: 2rem;
    }

    .vehicle-card:active {
        cursor: grabbing;
    }

    .vehicle-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    }

    .vehicle-image {
        position: relative;
        height: 250px;
        overflow: hidden;
    }

    .vehicle-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }

    .vehicle-card:hover .vehicle-image img {
        transform: scale(1.1);
    }

    .vehicle-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
    }

    .vehicle-info {
        padding: 2rem;
    }

    .vehicle-title {
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
        color: #333;
    }

    .vehicle-price {
        font-size: 1.25rem;
        font-weight: 700;
        color: #2c5aa0;
        margin-bottom: 1rem;
    }

    .vehicle-specs {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
        color: #666;
        flex-wrap: wrap;
    }

    .vehicle-actions {
        display: flex;
        gap: 1rem;
    }

    .vehicle-actions .btn {
        flex: 1;
        padding: 0.75rem 1rem;
        font-size: 0.8rem;
    }

    .vehicles-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
    }

    .filter-section {
        padding: 3rem 0;
        background: #f8f9fa;
    }

    .filter-options {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
    }

    .filter-select,
    .search-input {
        padding: 0.75rem 1rem;
        border: 2px solid #e1e5e9;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.3s ease;
        background: white;
    }

    .filter-select:focus,
    .search-input:focus {
        outline: none;
        border-color: #2c5aa0;
        box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.1);
    }

    .search-input {
        min-width: 250px;
    }

    .drop-zone {
        width: 300px;
        height: 200px;
        border: 3px dashed #ddd;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #666;
        transition: all 0.3s ease;
        position: relative;
    }

    .drop-zone.drag-over {
        border-color: #2c5aa0;
        background: rgba(44, 90, 160, 0.1);
    }

    .drop-placeholder i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #ccc;
    }

    .comparison-area {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .vs-divider {
        font-size: 2rem;
        font-weight: bold;
        color: #2c5aa0;
    }

    .comparison-vehicle {
        text-align: center;
    }

    .comparison-vehicle img {
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 1rem;
    }

    .comparison-table {
        margin-top: 2rem;
    }

    .comparison-table table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .comparison-table th,
    .comparison-table td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #eee;
    }

    .comparison-table th {
        background: #2c5aa0;
        color: white;
        font-weight: 600;
    }

    .financing-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .financing-option {
        background: white;
        padding: 2rem;
        border-radius: 16px;
        text-align: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    .financing-option:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    }

    .option-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #2c5aa0 0%, #1a365d 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
        color: white;
        font-size: 2rem;
    }

    .financing-calculator {
        background: white;
        padding: 3rem;
        border-radius: 16px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        margin-top: 2rem;
    }

    .calc-row {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .calc-group {
        flex: 1;
    }

    .calc-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
    }

    .calc-group input,
    .calc-group select {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #e1e5e9;
        border-radius: 8px;
        font-size: 1rem;
    }

    .calc-result {
        background: #f8f9fa;
        padding: 2rem;
        border-radius: 8px;
        margin-top: 2rem;
        text-align: center;
    }

    .calc-result h4 {
        font-size: 2rem;
        color: #2c5aa0;
        margin-bottom: 1rem;
    }

    .modal {
        display: none;
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    }

    .modal-content {
        background-color: white;
        margin: 5% auto;
        border-radius: 16px;
        width: 90%;
        max-width: 1000px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        animation: modalSlideIn 0.3s ease;
    }

    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: translateY(-50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .close {
        position: absolute;
        right: 2rem;
        top: 1.5rem;
        color: #aaa;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        z-index: 1;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }

    .close:hover {
        background: rgba(0, 0, 0, 0.2);
        color: #333;
    }

    .modal-body {
        display: flex;
        gap: 2rem;
        padding: 2rem;
    }

    .modal-image {
        flex: 1;
    }

    .modal-image img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 8px;
    }

    .modal-info {
        flex: 1;
    }

    .modal-price {
        font-size: 2rem;
        color: #2c5aa0;
        font-weight: 700;
        margin-bottom: 2rem;
    }

    .modal-specs {
        margin-bottom: 2rem;
    }

    .spec-item {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 0;
        border-bottom: 1px solid #eee;
    }

    .spec-label {
        font-weight: 600;
        color: #333;
    }

    .spec-value {
        color: #666;
    }

    .modal-description {
        margin-bottom: 2rem;
        line-height: 1.6;
        color: #666;
    }

    .modal-actions {
        display: flex;
        gap: 1rem;
    }

    .modal-actions .btn {
        flex: 1;
    }
`;
document.head.appendChild(productStyles);
