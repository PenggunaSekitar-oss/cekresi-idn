// Courier Data
const COURIERS = [
  { id: "jne", name: "JNE", color: "#D4232B", example: "582230008329223" },
  { id: "jnt", name: "J&T", color: "#D71149", example: "JP2255749628" },
  { id: "spx", name: "Shopee Express", color: "#F25C05", example: "SPXID048949914625" },
  { id: "sicepat", name: "SiCepat", color: "#e60000", example: "005244878857" },
  { id: "anteraja", name: "AnterAja", color: "#00AEEF", example: "11000098821211" },
  { id: "wahana", name: "Wahana", color: "#0F4B8F", example: "AGN42256" },
  { id: "lex", name: "Lazada Express", color: "#0F146D", example: "LXAD-3194878510" },
  { id: "ninja", name: "Ninja", color: "#FF0000", example: "NVIDRATHT000000317" },
  { id: "first", name: "First Logistics", color: "#0033A0", example: "86559384" },
];

// API key dari Binderbyte
const API_KEY = "d661a8634dbb7f8a5c42aa6bd5b89e46e5989977ecac63fbe5d60ca3ad9cf963";

// Data Gateway lengkap
const GATEWAY_DATA = {
  // Gateway di Pulau Jawa
  "BDG": "Bandung",
  "BTO": "Tangerang",
  "BWX": "Banyuwangi",
  "BXW": "Bawean",
  "CBN": "Cirebon",
  "CGK": "Jakarta, Tangerang",
  "CKP": "Cikampek",
  "CXP": "Cilacap",
  "DPK": "Depok",
  "JBB": "Jember",
  "JKS": "Jakarta Selatan",
  "JKT": "Jakarta",
  "JOG": "Yogyakarta",
  "KJT": "Majalengka",
  "MLG": "Malang",
  "PCB": "Tangerang Selatan",
  "PPJ": "Kepulauan Seribu",
  "SOC": "Surakarta",
  "SRG": "Semarang",
  "SUB": "Surabaya",
  "TSY": "Tasikmalaya",
  
  // Gateway di Pulau Sumatra
  "AEG": "Padang Sidempuan",
  "BKS": "Bengkulu",
  "BTH": "Batam",
  "BTJ": "Banda Aceh",
  "DJB": "Jambi",
  "DTB": "Siborong-Borong",
  "DUM": "Dumai",
  "FLZ": "Sibolga",
  "GNS": "Gunung Sitoli",
  "KNO": "Medan, Deli Serdang",
  "LLG": "Lubuklinggau",
  "LSE": "Kepulauan Batu",
  "MEQ": "Suka Makmue",
  "MES": "Medan",
  "NTX": "Ranai",
  "PDG": "Padang",
  "PGK": "Pangkal Pinang",
  "PKU": "Pekanbaru",
  "PLM": "Palembang",
  "RKI": "Sipora",
  "SIW": "Simalungun, Toba Samosir",
  "SNX": "Sinabang",
  "TJQ": "Tanjung Pandan",
  "TKG": "Bandar Lampung",
  "TNJ": "Tanjung Pinang",
  "TXE": "Takengon",
  
  // Gateway di Pulau Sulawesi
  "AMP": "Tojo Una-Una",
  "BUW": "Bau-Bau",
  "GTO": "Gorontalo",
  "KDI": "Kendari",
  "KSR": "Selayar",
  "LLO": "Luwu",
  "MDC": "Manado",
  "MJU": "Mamuju",
  "MNA": "Melonguane",
  "MOH": "Morowali",
  "MXB": "Masamba",
  "NAH": "Sangihe",
  "PLW": "Palu",
  "PSJ": "Poso",
  "PUM": "Kolaka",
  "UPG": "Makassar",
  
  // Gateway di Pulau Kalimantan
  "BDJ": "Banjarmasin",
  "BEJ": "Tanjung Redep, Berau",
  "BPN": "Balikpapan",
  "BXT": "Bontang",
  "DTD": "Mahakam Ulu",
  "KTG": "Ketapang",
  "LBW": "Long Bawan",
  "LPU": "Long Apung",
  "NNX": "Nunukan",
  "PKN": "Pangkalanbun",
  "PKY": "Palangkaraya",
  "PNK": "Pontianak",
  "PSU": "Putussibau",
  "SMQ": "Sampit",
  "SQG": "Sintang",
  "SRI": "Samarinda",
  "TJS": "Tanjung Selor",
  "TRK": "Tarakan"
};

// Fungsi untuk memproses teks dan menambahkan informasi gateway
function processGatewayInfo(text) {
  if (!text || typeof text !== 'string') return text;
  
  // Cari pola seperti SUB_GATEWAY atau UPG_GATEWAY
  const gatewayPattern = /([A-Z]{2,3})_GATEWAY/g;
  let processedText = text;
  let match;
  
  // Cari semua kemunculan pola gateway
  while ((match = gatewayPattern.exec(text)) !== null) {
    const code = match[1]; // Ambil kode seperti SUB atau UPG
    const location = GATEWAY_DATA[code] || "Lokasi tidak diketahui";
    
    // Tambahkan informasi lokasi setelah kode gateway, hanya nama lokasi
    processedText = processedText.replace(
      new RegExp(`${code}_GATEWAY`, 'g'),
      `${code}_GATEWAY (${location})`
    );
  }
  
  return processedText;
}

// Fungsi untuk memformat teks dengan warna merah pada bagian dalam kurung siku
function formatLocationText(text) {
  const processedText = processGatewayInfo(text);
  const regex = /\[(.*?)\]/g;
  return processedText.replace(regex, '<span class="text-red-600">[$1]</span>');
}

// DOM Elements dan Event Listener Utama
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const trackingForm = document.getElementById("tracking-form");
  const trackingNumber = document.getElementById("tracking-number");
  const exampleButton = document.getElementById("example-button");
  const loadingAnimation = document.getElementById("loading-animation");
  const trackingResult = document.getElementById("tracking-result");
  const detailModal = document.getElementById("detail-modal");
  const closeModal = document.getElementById("close-modal");
  const modalCourierName = document.getElementById("modal-courier-name");
  const modalContent = document.getElementById("modal-content");
  const backToTop = document.getElementById("back-to-top");
  const themeToggle = document.getElementById("theme-toggle");
  let toast = document.getElementById("toast");
  const courierLogos = document.querySelectorAll(".courier-logo");
  const moreCouriers = document.querySelector(".more-couriers");
  const moreCouriersDropdown = document.querySelector(".more-couriers-dropdown");
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  const deliveryTruck = document.getElementById("delivery-truck");

  // Global Variables
  let selectedCourier = COURIERS[0];
  let trackingHistory = [];
  let isDarkMode = false;
  let apiCache = {}; // Cache untuk menyimpan hasil API

  // Initialize Counters
  initCounters();

  // Hide preloader after page load
  setTimeout(() => {
    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }
  }, 1500);

  // Mobile Menu Toggle
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      // Accessibility improvement - aria-expanded attribute
      const isExpanded = mobileMenu.classList.contains("hidden") ? "false" : "true";
      mobileMenuButton.setAttribute("aria-expanded", isExpanded);
    });
  }

  // Theme Toggle - Fixed implementation
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      isDarkMode = document.body.classList.contains("dark-mode");
      
      // Update icon based on current mode
      if (isDarkMode) {
        themeToggle.innerHTML = '<i class="fas fa-moon text-xl"></i>';
        themeToggle.setAttribute("aria-label", "Beralih ke mode terang");
        document.documentElement.classList.add('dark-mode');
      } else {
        themeToggle.innerHTML = '<i class="fas fa-sun text-xl"></i>';
        themeToggle.setAttribute("aria-label", "Beralih ke mode gelap");
        document.documentElement.classList.remove('dark-mode');
      }
      
      // Save preference to localStorage
      localStorage.setItem("darkMode", isDarkMode);
      
      // Update all elements that need dark mode styling
      updateDarkModeStyles();
    });
    
    // Check for saved theme preference on page load
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    if (savedDarkMode) {
      document.body.classList.add("dark-mode");
      document.documentElement.classList.add('dark-mode');
      themeToggle.innerHTML = '<i class="fas fa-moon text-xl"></i>';
      themeToggle.setAttribute("aria-label", "Beralih ke mode terang");
      isDarkMode = true;
      updateDarkModeStyles();
    }
  }
  
  // Function to update styles for dark mode
  function updateDarkModeStyles() {
    // Update background colors for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      if (isDarkMode) {
        if (section.classList.contains('bg-white')) {
          section.classList.remove('bg-white');
          section.classList.add('bg-gray-800');
        }
        if (section.classList.contains('bg-gradient-to-b')) {
          section.style.background = 'linear-gradient(to bottom, var(--bg-gradient-start), var(--bg-gradient-end))';
        }
      } else {
        if (section.classList.contains('bg-gray-800')) {
          section.classList.remove('bg-gray-800');
          section.classList.add('bg-white');
        }
        if (section.classList.contains('bg-gradient-to-b')) {
          section.style.background = '';
        }
      }
    });
    
    // Update card backgrounds
    const cards = document.querySelectorAll('.bg-white, .tracking-card, .courier-logo, .timeline-content');
    cards.forEach(card => {
      if (isDarkMode) {
        card.style.backgroundColor = 'var(--card-bg)';
        card.style.color = 'var(--text-primary)';
      } else {
        card.style.backgroundColor = '';
        card.style.color = '';
      }
    });
    
    // Update text colors
    const textElements = document.querySelectorAll('.text-gray-800, .text-gray-600, .text-gray-500');
    textElements.forEach(el => {
      if (isDarkMode) {
        if (el.classList.contains('text-gray-800')) {
          el.style.color = 'var(--text-primary)';
        } else {
          el.style.color = 'var(--text-secondary)';
        }
      } else {
        el.style.color = '';
      }
    });
    
    // Update form elements
    const formElements = document.querySelectorAll('input, textarea, select');
    formElements.forEach(el => {
      if (isDarkMode) {
        el.style.backgroundColor = 'var(--input-bg)';
        el.style.color = 'var(--text-primary)';
        el.style.borderColor = 'var(--input-border)';
      } else {
        el.style.backgroundColor = '';
        el.style.color = '';
        el.style.borderColor = '';
      }
    });
    
    // Update mobile menu
    const mobileMenuEl = document.getElementById('mobile-menu');
    if (mobileMenuEl) {
      if (isDarkMode) {
        mobileMenuEl.classList.remove('bg-white');
        mobileMenuEl.classList.add('bg-gray-800');
        mobileMenuEl.classList.remove('text-gray-800');
        mobileMenuEl.classList.add('text-gray-100');
      } else {
        mobileMenuEl.classList.remove('bg-gray-800');
        mobileMenuEl.classList.add('bg-white');
        mobileMenuEl.classList.remove('text-gray-100');
        mobileMenuEl.classList.add('text-gray-800');
      }
    }
  }

  // Courier Selection
  if (courierLogos) {
    courierLogos.forEach((logo) => {
      if (!logo.classList.contains("more-couriers")) {
        logo.addEventListener("click", function () {
          const courierId = this.getAttribute("data-courier");
          if (courierId) {
            selectedCourier = COURIERS.find((c) => c.id === courierId);
            courierLogos.forEach((l) => l.classList.remove("active"));
            this.classList.add("active");
            updateExampleButton();
          }
        });
      }
    });
  }

  // More Couriers Toggle
  if (moreCouriers && moreCouriersDropdown) {
    moreCouriers.addEventListener("click", () => {
      moreCouriersDropdown.classList.toggle("hidden");
      // Accessibility improvement
      const isExpanded = moreCouriersDropdown.classList.contains("hidden") ? "false" : "true";
      moreCouriers.setAttribute("aria-expanded", isExpanded);
    });

    const moreCourierLogos = moreCouriersDropdown.querySelectorAll(".courier-logo");
    moreCourierLogos.forEach((logo) => {
      logo.addEventListener("click", function () {
        const courierId = this.getAttribute("data-courier");
        if (courierId) {
          selectedCourier = COURIERS.find((c) => c.id === courierId);
          courierLogos.forEach((l) => l.classList.remove("active"));
          moreCourierLogos.forEach((l) => l.classList.remove("active"));
          this.classList.add("active");
          moreCouriersDropdown.classList.add("hidden");
          moreCouriers.setAttribute("aria-expanded", "false");
          updateExampleButton();
        }
      });
    });
  }

  // Example Button
  function updateExampleButton() {
    if (exampleButton) {
      exampleButton.textContent = "";
      exampleButton.removeEventListener("click", updateExampleHandler);
      exampleButton.addEventListener("click", updateExampleHandler);
    }
  }

  function updateExampleHandler() {
    if (trackingNumber) {
      trackingNumber.value = selectedCourier.example;
      validateTrackingNumber();
    }
  }

  updateExampleButton();

  // Tracking Form Submission
  if (trackingForm) {
    trackingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      trackPackage();
    });
  }

  // Validate Tracking Number
  function validateTrackingNumber() {
    if (!trackingNumber) return false;

    const validationMessage = document.getElementById("validation-message");
    const value = trackingNumber.value.trim();

    if (!value) {
      if (validationMessage) {
        validationMessage.textContent = "Silakan masukkan nomor resi";
        validationMessage.classList.remove("hidden", "text-green-600");
        validationMessage.classList.add("text-red-600");
      }
      return false;
    }

    let isValid = true;
    let message = "";

    switch (selectedCourier.id) {
      case "jne":
        isValid = /^\d{12,13}$/.test(value);
        message = "Nomor resi JNE harus terdiri dari 12-13 digit angka";
        break;
      case "jnt":
        isValid = /^[A-Z0-9]{10,12}$/.test(value);
        message = "Nomor resi J&T harus terdiri dari 10-12 karakter (huruf kapital dan angka)";
        break;
      case "spx":
        isValid = /^SPXID\d{12}$/.test(value);
        message = "Nomor resi Shopee Express harus diawali dengan SPXID diikuti 12 digit angka";
        break;
      default:
        isValid = value.length >= 8;
        message = "Nomor resi terlalu pendek";
    }

    if (validationMessage) {
      if (isValid) {
        validationMessage.textContent = "Nomor resi anda valid";
        validationMessage.classList.remove("hidden", "text-red-600");
        validationMessage.classList.add("text-green-600");
      } else {
        validationMessage.textContent = message;
        validationMessage.classList.remove("hidden", "text-green-600");
        validationMessage.classList.add("text-red-600");
      }
    }

    return isValid;
  }

  if (trackingNumber) {
    trackingNumber.addEventListener("input", validateTrackingNumber);
  }

  // Track Package
  async function trackPackage() {
    if (!trackingNumber || !validateTrackingNumber()) {
      return;
    }

    const awb = trackingNumber.value.trim();
    const cacheKey = `${selectedCourier.id}_${awb}`;

    // Tampilkan loading animation
    if (loadingAnimation) {
      loadingAnimation.classList.remove("hidden");
    }
    if (trackingResult) {
      trackingResult.classList.add("hidden");
    }

    try {
      // Cek apakah data sudah ada di cache
      if (apiCache[cacheKey] && (new Date().getTime() - apiCache[cacheKey].timestamp < 300000)) { // Cache valid selama 5 menit
        console.log("Menggunakan data dari cache");
        const cachedData = apiCache[cacheKey].data;
        
        if (loadingAnimation) {
          loadingAnimation.classList.add("hidden");
        }
        
        displayTrackingResult(cachedData.data);
        showToast("Berhasil", "Paket berhasil dilacak (dari cache)", "success");
        
        // Scroll to result with smooth animation
        setTimeout(() => {
          const resultElement = document.getElementById("tracking-result");
          if (resultElement) {
            resultElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
        
        return;
      }

      // Jika tidak ada di cache, lakukan API call
      const apiUrl = `https://api.binderbyte.com/v1/track?api_key=${API_KEY}&courier=${selectedCourier.id}&awb=${awb}`;
      console.log("Fetching API:", apiUrl);
      
      // Implementasi dengan timeout dan retry
      const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        
        try {
          const response = await fetch(url, {
            ...options,
            signal: controller.signal
          });
          clearTimeout(id);
          return response;
        } catch (error) {
          clearTimeout(id);
          throw error;
        }
      };
      
      // Implementasi retry logic
      const fetchWithRetry = async (url, options = {}, retries = 3, timeout = 10000) => {
        let lastError;
        
        for (let i = 0; i < retries; i++) {
          try {
            return await fetchWithTimeout(url, options, timeout);
          } catch (error) {
            console.log(`Attempt ${i + 1} failed. Retrying...`);
            lastError = error;
            // Tunggu sebentar sebelum retry
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        
        throw lastError;
      };
      
      // Gunakan fetch dengan retry
      const response = await fetchWithRetry(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Simpan ke cache
      apiCache[cacheKey] = {
        data: data,
        timestamp: new Date().getTime()
      };

      if (loadingAnimation) {
        loadingAnimation.classList.add("hidden");
      }

      if (data.status === 200) {
        if (!data.data || !data.data.summary || !data.data.history || data.data.history.length === 0) {
          showToast("Peringatan", "Data pengiriman tidak ditemukan atau tidak lengkap", "warning");
          return;
        }

        // Simpan ke history
        saveToTrackingHistory({
          courier: selectedCourier,
          awb: awb,
          result: {
            ...data.data,
            shipper: data.data.detail?.shipper || "Informasi tidak tersedia",
            receiver: data.data.detail?.receiver || "Informasi tidak tersedia",
          },
          timestamp: new Date().toISOString(),
        });

        displayTrackingResult(data.data);
        showToast("Berhasil", "Paket berhasil dilacak", "success");
        
        // Scroll to result with smooth animation
        setTimeout(() => {
          const resultElement = document.getElementById("tracking-result");
          if (resultElement) {
            resultElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        let errorMessage = data.message || "Terjadi kesalahan saat melacak resi";
        if (data.status === 400) {
          errorMessage = "Parameter tidak valid. Periksa nomor resi dan ekspedisi yang dipilih.";
        } else if (data.status === 401) {
          errorMessage = "API key tidak valid atau telah kedaluwarsa.";
        } else if (data.status === 404) {
          errorMessage = "Nomor resi tidak ditemukan. Pastikan nomor resi dan ekspedisi sudah benar.";
        } else if (data.status === 500) {
          errorMessage = "Terjadi kesalahan pada server. Silakan coba lagi nanti.";
        }
        showToast("Gagal", errorMessage, "error");
        console.error("API Error:", data);
      }
    } catch (error) {
      if (loadingAnimation) {
        loadingAnimation.classList.add("hidden");
      }
      
      // Cek jika error adalah timeout
      if (error.name === 'AbortError') {
        showToast("Error", "Permintaan timeout. Server tidak merespon dalam waktu yang ditentukan. Silakan coba lagi.", "error");
      } else {
        showToast("Error", `Terjadi kesalahan pada koneksi: ${error.message}. Periksa koneksi internet Anda dan coba lagi.`, "error");
      }
      
      console.error("Fetch Error:", error);
    }
  }

  // Calculate Delivery Duration
  function calculateDeliveryDuration(history) {
    if (!history || history.length === 0) return "Informasi tidak tersedia";

    const startDate = new Date(history[history.length - 1].date); // Tanggal resi terbit (entri pertama)
    let endDate = null;

    // Cari entri dengan status "diterima" atau sejenisnya
    const deliveredEntry = history.find((entry) =>
      entry.desc.toLowerCase().includes("diterima") ||
      entry.desc.toLowerCase().includes("delivered") ||
      entry.desc.toLowerCase().includes("selesai")
    );

    if (deliveredEntry) {
      endDate = new Date(deliveredEntry.date);
    } else {
      // Jika belum diterima, gunakan tanggal terakhir (entri paling atas)
      endDate = new Date(history[0].date);
    }

    if (!startDate || !endDate || isNaN(startDate) || isNaN(endDate)) {
      return "Informasi tidak tersedia";
    }

    const diffMs = endDate - startDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays} hari ${diffHours} jam ${diffMinutes} menit`;
    } else if (diffHours > 0) {
      return `${diffHours} jam ${diffMinutes} menit`;
    } else {
      return `${diffMinutes} menit`;
    }
  }

  // Display Tracking Result
  function displayTrackingResult(data) {
    if (!trackingResult) return;

    trackingResult.innerHTML = "";

    if (!data.summary || !data.history || data.history.length === 0) {
      showToast("Peringatan", "Data pengiriman tidak lengkap", "warning");
      return;
    }

    const status = getStatus(data.summary.status || data.summary);
    const trackingCard = document.createElement("div");
    trackingCard.className = "tracking-card animate__animated animate__fadeIn";
    trackingCard.setAttribute("role", "region");
    trackingCard.setAttribute("aria-label", "Hasil pelacakan paket");

    const trackingHeader = document.createElement("div");
    trackingHeader.className = "tracking-header";
    trackingHeader.style.backgroundColor = selectedCourier.color;

    let statusText = "Dalam Proses";
    let statusIcon = '<i class="fas fa-clock mr-2"></i>';

    if (status === "delivered") {
      statusText = "Diterima";
      statusIcon = '<i class="fas fa-check-circle mr-2"></i>';
    } else if (status === "in-transit") {
      statusText = "Dalam Pengiriman";
      statusIcon = '<i class="fas fa-truck mr-2"></i>';
    }

    trackingHeader.innerHTML = `
      <h3 class="text-xl font-bold">${selectedCourier.name}</h3>
      <div class="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm flex items-center">
        ${statusIcon}
        ${statusText}
      </div>
    `;

    // Modern Delivery Animation
    const trackingAnimation = document.createElement("div");
    trackingAnimation.className = "p-6 border-b";
    trackingAnimation.innerHTML = `
      <div class="relative h-24 mb-4 overflow-hidden">
        <!-- Road Background -->
        <div class="absolute bottom-0 left-0 right-0 h-8 bg-gray-200 rounded-lg"></div>
        
        <!-- Road Markings -->
        <div class="absolute bottom-3 left-0 right-0 flex justify-between">
          <div class="w-8 h-2 bg-white rounded-full"></div>
          <div class="w-8 h-2 bg-white rounded-full"></div>
          <div class="w-8 h-2 bg-white rounded-full"></div>
          <div class="w-8 h-2 bg-white rounded-full"></div>
          <div class="w-8 h-2 bg-white rounded-full"></div>
          <div class="w-8 h-2 bg-white rounded-full"></div>
        </div>
        
        <!-- Origin Point -->
        <div class="absolute bottom-8 left-0 flex flex-col items-center">
          <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <i class="fas fa-store text-white text-xs"></i>
          </div>
          <div class="w-1 h-6 bg-red-500"></div>
        </div>
        
        <!-- Destination Point -->
        <div class="absolute bottom-8 right-0 flex flex-col items-center">
          <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <i class="fas fa-home text-white text-xs"></i>
          </div>
          <div class="w-1 h-6 bg-green-500"></div>
        </div>
        
        <!-- Delivery Vehicle -->
        <div id="tracking-vehicle" class="absolute bottom-4 left-0 transition-all duration-1000 ease-in-out">
          <div class="relative">
            <!-- Modern Delivery Truck SVG -->
            <svg width="60" height="40" viewBox="0 0 60 40" class="delivery-truck-svg">
              <!-- Truck Body -->
              <rect x="10" y="5" width="30" height="20" rx="3" fill="${selectedCourier.color}" />
              <rect x="0" y="15" width="20" height="15" rx="3" fill="${selectedCourier.color}" />
              
              <!-- Truck Cabin Window -->
              <rect x="5" y="10" width="10" height="5" rx="1" fill="#A5B4FC" />
              
              <!-- Wheels -->
              <circle cx="10" cy="30" r="5" fill="#3B82F6" />
              <circle cx="10" cy="30" r="2" fill="#1E3A8A" />
              <circle cx="35" cy="30" r="5" fill="#3B82F6" />
              <circle cx="35" cy="30" r="2" fill="#1E3A8A" />
              
              <!-- Headlights -->
              <circle cx="2" cy="20" r="2" fill="#FBBF24" />
              
              <!-- Details -->
              <rect x="25" y="15" width="10" height="5" rx="1" fill="#F3F4F6" />
            </svg>
            
            <!-- Animated Elements -->
            <div class="absolute -top-8 -left-2 opacity-70">
              <svg width="20" height="10" viewBox="0 0 20 10" class="exhaust-animation">
                <circle cx="5" cy="5" r="2" fill="#E5E7EB" />
                <circle cx="10" cy="5" r="2" fill="#E5E7EB" />
                <circle cx="15" cy="5" r="2" fill="#E5E7EB" />
              </svg>
            </div>
            
            <!-- Package Indicator -->
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <!-- Progress Indicator -->
        <div class="absolute bottom-12 left-0 right-0 h-1 bg-gray-300 rounded-full">
          <div id="progress-bar" class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style="width: 0%"></div>
        </div>
      </div>
      
      <div class="flex justify-between text-xs text-gray-500">
        <div>${data.detail?.shipper || data.detail?.origin || "Pengirim"}</div>
        <div>${data.detail?.receiver || data.detail?.destination || "Penerima"}</div>
      </div>
    `;

    const trackingBody = document.createElement("div");
    trackingBody.className = "tracking-body";

    const lastHistory = data.history && data.history.length > 0 ? data.history[0] : {};
    const lastDesc = lastHistory.desc || "Informasi tidak tersedia";
    const lastDate = lastHistory.date || "Informasi tidak tersedia";
    const shipper = data.detail?.shipper || "Informasi tidak tersedia";
    const receiver = data.detail?.receiver || "Informasi tidak tersedia";
    const origin = data.detail?.origin || "Informasi tidak tersedia";
    const destination = data.detail?.destination || "Informasi tidak tersedia";
    const summary = data.summary.status || "Informasi tidak tersedia";
    const duration = calculateDeliveryDuration(data.history);

    trackingBody.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-start">
          <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <i class="fas fa-user text-purple-500"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Pengirim</p>
            <p class="font-medium">${shipper}</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <i class="fas fa-user-check text-green-500"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Penerima</p>
            <p class="font-medium">${receiver}</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <i class="fas fa-clock text-blue-500"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Waktu Update Terakhir</p>
            <p class="font-medium">${lastDate}</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
            <i class="fas fa-map-marker-alt text-gray-500"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Lokasi Terakhir</p>
            <p class="font-medium">${formatLocationText(lastDesc)}</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <i class="fas fa-box text-green-500"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Status</p>
            <p class="font-medium">${summary}</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-4">
            <i class="fas fa-hourglass-half text-teal-500"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Durasi Pengiriman</p>
            <p class="font-medium">${duration}</p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex items-start">
            <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-2">
              <i class="fas fa-map-marker-alt text-gray-500"></i>
            </div>
            <div>
              <p class="text-sm text-gray-500">Asal</p>
              <p class="font-medium">${origin}</p>
            </div>
          </div>
          <div class="mx-2 pt-3">
            <i class="fas fa-arrow-right text-gray-300"></i>
          </div>
          <div class="flex items-start">
            <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-2">
              <i class="fas fa-map-marker-alt text-gray-500"></i>
            </div>
            <div>
              <p class="text-sm text-gray-500">Tujuan</p>
              <p class="font-medium">${destination}</p>
            </div>
          </div>
        </div>
        <button id="view-detail-btn" class="mt-6 w-full py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
          <i class="fas fa-list-ul mr-2"></i> Lihat Detail
        </button>
      </div>
    `;

    trackingCard.appendChild(trackingHeader);
    trackingCard.appendChild(trackingAnimation);
    trackingCard.appendChild(trackingBody);
    trackingResult.appendChild(trackingCard);
    trackingResult.classList.remove("hidden");

    // Apply dark mode styles if needed
    if (isDarkMode) {
      updateDarkModeStyles();
    }

    animateVehicle(status);

    const viewDetailBtn = trackingCard.querySelector("#view-detail-btn");
    if (viewDetailBtn) {
      viewDetailBtn.addEventListener("click", () => {
        showDetailModal(data);
      });
    }
  }

  // Get Status
  function getStatus(summary) {
    if (!summary || typeof summary !== "string") {
      return "processing";
    }

    const summaryLower = summary.toLowerCase();

    if (
      summaryLower.includes("terkirim") ||
      summaryLower.includes("delivered") ||
      summaryLower.includes("diterima") ||
      summaryLower.includes("selesai")
    ) {
      return "delivered";
    } else if (
      summaryLower.includes("proses") ||
      summaryLower.includes("transit") ||
      summaryLower.includes("perjalanan") ||
      summaryLower.includes("dikirim") ||
      summaryLower.includes("menuju")
    ) {
      return "in-transit";
    } else {
      return "processing";
    }
  }

  // Animate Vehicle - Modern Animation
  function animateVehicle(status) {
    const vehicle = document.getElementById("tracking-vehicle");
    const progressBar = document.getElementById("progress-bar");
    if (!vehicle || !progressBar) return;

    if (window.vehicleInterval) {
      clearInterval(window.vehicleInterval);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bounce-truck {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      
      @keyframes exhaust {
        0% { opacity: 0.7; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(-10px) scale(0.5); }
      }
      
      .exhaust-animation {
        animation: exhaust 2s infinite;
      }
      
      .delivery-truck-svg {
        animation: bounce-truck 1s infinite;
      }
    `;
    document.head.appendChild(style);

    if (status === "delivered") {
      // Animate to destination
      vehicle.style.left = "calc(100% - 60px)";
      progressBar.style.width = "100%";
    } else if (status === "in-transit") {
      // Animate truck moving along the road
      let position = 0;
      const maxPosition = 100;
      const step = 0.5;
      
      const interval = setInterval(() => {
        position = Math.min(position + step, maxPosition);
        const positionPercent = position + "%";
        
        // Update truck position
        vehicle.style.left = `calc(${position}% - ${position * 0.6}px)`;
        
        // Update progress bar
        progressBar.style.width = positionPercent;
        
        // If reached destination, reset to beginning
        if (position >= maxPosition) {
          position = 0;
        }
      }, 50);
      
      window.vehicleInterval = interval;
    } else {
      // At origin
      vehicle.style.left = "0";
      progressBar.style.width = "0%";
    }
  }

  // Show Detail Modal
  function showDetailModal(data) {
    if (!detailModal || !modalCourierName || !modalContent) return;

    if (!data || !data.history) {
      showToast("Peringatan", "Data detail pengiriman tidak tersedia", "warning");
      return;
    }

    modalCourierName.textContent = selectedCourier.name;
    modalContent.innerHTML = "";

    const shipper = data.detail?.shipper || "Informasi tidak tersedia";
    const receiver = data.detail?.receiver || "Informasi tidak tersedia";

    const basicInfo = document.createElement("div");
    basicInfo.className = "mb-4";
    basicInfo.innerHTML = `
      <div class="flex items-center mb-2">
        <i class="fas fa-box text-indigo-600 mr-2"></i>
        <p class="text-sm text-gray-800">
          Nomor Resi: <span class="font-medium text-gray-800">${trackingNumber.value}</span>
        </p>
      </div>
      
      <div class="flex items-center mb-2">
        <i class="fas fa-user text-indigo-600 mr-2"></i>
        <p class="text-sm text-gray-800">
          Pengirim: <span class="font-medium text-gray-800">${shipper}</span>
        </p>
      </div>
      
      <div class="flex items-center">
        <i class="fas fa-user-check text-indigo-600 mr-2"></i>
        <p class="text-sm text-gray-800">
          Penerima: <span class="font-medium text-gray-800">${receiver}</span>
        </p>
      </div>
    `;

    const timeline = document.createElement("div");
    timeline.className = "tracking-timeline";

    const timelineHeader = document.createElement("h4");
    timelineHeader.className = "font-medium text-gray-800 mb-4";
    timelineHeader.textContent = "Riwayat Pengiriman";
    timeline.appendChild(timelineHeader);

    if (data.history && data.history.length > 0) {
      data.history.forEach((item) => {
        const date = item.date || "Tanggal tidak tersedia";
        const location = item.location || "Lokasi tidak tersedia";
        const desc = item.desc || "Deskripsi tidak tersedia";

        const timelineItem = document.createElement("div");
        timelineItem.className = "timeline-item";
        timelineItem.innerHTML = `
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">
              <i class="fas fa-calendar-alt text-indigo-600 mr-1"></i>
              ${date}
            </div>
            <div class="timeline-location">
              <i class="fas fa-map-marker-alt text-indigo-600 mr-1"></i>
              ${formatLocationText(location)}
            </div>
            <div class="timeline-description">
              ${formatLocationText(desc)}
            </div>
          </div>
        `;
        timeline.appendChild(timelineItem);
      });
    } else {
      const noHistory = document.createElement("div");
      noHistory.className = "text-center py-8 text-gray-600";
      noHistory.textContent = "Tidak ada riwayat pengiriman yang tersedia";
      timeline.appendChild(noHistory);
    }

    modalContent.appendChild(basicInfo);
    modalContent.appendChild(timeline);

    detailModal.classList.remove("hidden");
    detailModal.classList.add("animate__animated", "animate__fadeIn");
    
    // Apply dark mode styles to modal if needed
    if (isDarkMode) {
      const modalTextElements = detailModal.querySelectorAll('.text-gray-800, .text-gray-600, .text-gray-500');
      modalTextElements.forEach(el => {
        if (el.classList.contains('text-gray-800')) {
          el.style.color = 'var(--text-primary)';
        } else {
          el.style.color = 'var(--text-secondary)';
        }
      });
      
      const modalContent = detailModal.querySelector('.bg-white');
      if (modalContent) {
        modalContent.style.backgroundColor = 'var(--card-bg)';
      }
    }
  }

  // Close Modal
  if (closeModal && detailModal) {
    closeModal.addEventListener("click", () => {
      detailModal.classList.add("animate__fadeOut");
      setTimeout(() => {
        detailModal.classList.remove("animate__fadeOut");
        detailModal.classList.add("hidden");
      }, 500);
      if (window.vehicleInterval) {
        clearInterval(window.vehicleInterval);
      }
    });

    window.addEventListener("click", (e) => {
      if (e.target === detailModal) {
        detailModal.classList.add("animate__fadeOut");
        setTimeout(() => {
          detailModal.classList.remove("animate__fadeOut");
          detailModal.classList.add("hidden");
        }, 500);
        if (window.vehicleInterval) {
          clearInterval(window.vehicleInterval);
        }
      }
    });
  }

  // Accordion
  if (accordionHeaders) {
    accordionHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        this.classList.toggle("active");
        const icon = this.querySelector("i");
        if (icon) {
          icon.classList.toggle("rotate-180");
        }
        const content = this.nextElementSibling;
        if (content) {
          content.classList.toggle("active");
        }
        
        // Accessibility improvement
        const isExpanded = this.classList.contains("active") ? "true" : "false";
        this.setAttribute("aria-expanded", isExpanded);
      });
    });
  }

  // Show Toast
  function showToast(title, message, type) {
    try {
      let toast = document.getElementById("toast");
      if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className =
          "fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 transform translate-y-full opacity-0 transition-all duration-300 max-w-md";
        document.body.appendChild(toast);
      }

      let iconClass = "fas fa-info-circle text-blue-500";
      let bgClass = "bg-blue-100";

      if (type === "success") {
        iconClass = "fas fa-check-circle text-green-500";
        bgClass = "bg-green-100";
      } else if (type === "error") {
        iconClass = "fas fa-times-circle text-red-500";
        bgClass = "bg-red-100";
      } else if (type === "warning") {
        iconClass = "fas fa-exclamation-circle text-yellow-500";
        bgClass = "bg-yellow-100";
      }

      toast.innerHTML = `
        <div class="flex items-start">
          <div class="w-10 h-10 ${bgClass} rounded-full flex items-center justify-center mr-3">
            <i class="${iconClass}"></i>
          </div>
          <div class="flex-1">
            <h4 class="font-bold text-gray-800">${title}</h4>
            <p class="text-gray-600">${message}</p>
          </div>
          <button class="text-gray-500 hover:text-gray-700 ml-4 transition-colors" onclick="this.parentNode.parentNode.classList.remove('show')" aria-label="Tutup notifikasi">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `;

      // Apply dark mode styles to toast if needed
      if (isDarkMode) {
        toast.style.backgroundColor = 'var(--card-bg)';
        toast.style.color = 'var(--text-primary)';
        const toastTitle = toast.querySelector('h4');
        const toastMessage = toast.querySelector('p');
        if (toastTitle) toastTitle.style.color = 'var(--text-primary)';
        if (toastMessage) toastMessage.style.color = 'var(--text-secondary)';
      }

      if (title.includes("Status") && type === "info") {
        toast.classList.add("status-update-pulse");
        setTimeout(() => {
          toast.classList.remove("status-update-pulse");
        }, 3000);
      }

      toast.classList.add("show");
      toast.style.transform = "translateY(0)";
      toast.style.opacity = "1";

      setTimeout(() => {
        toast.style.transform = "translateY(100%)";
        toast.style.opacity = "0";
        setTimeout(() => {
          toast.classList.remove("show");
        }, 300);
      }, 3000);
    } catch (error) {
      console.error("Error in showToast:", error);
    }
  }

  // Back to Top Button
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Tracking History
  function saveToTrackingHistory(data) {
    let history = JSON.parse(localStorage.getItem("trackingHistory")) || [];
    history.unshift(data);
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    localStorage.setItem("trackingHistory", JSON.stringify(history));
    trackingHistory = history;
  }

  function loadTrackingHistory() {
    trackingHistory = JSON.parse(localStorage.getItem("trackingHistory")) || [];
  }

  loadTrackingHistory();

  // Helper function to format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  
  // Check for responsive design
  function checkResponsive() {
    const width = window.innerWidth;
    
    // Adjust UI based on screen size
    if (width < 768) {
      // Mobile adjustments
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        heroSection.classList.add('text-center');
      }
      
      // Adjust courier logos grid
      const courierLogosGrid = document.querySelector('.courier-logos');
      if (courierLogosGrid) {
        courierLogosGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
      }
      
      // Adjust delivery animation
      if (deliveryTruck) {
        deliveryTruck.style.transform = 'scale(0.8) translateY(-50%)';
      }
    } else {
      // Desktop adjustments
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        heroSection.classList.remove('text-center');
      }
      
      // Reset courier logos grid
      const courierLogosGrid = document.querySelector('.courier-logos');
      if (courierLogosGrid && window.innerWidth >= 640) {
        courierLogosGrid.style.gridTemplateColumns = 'repeat(5, 1fr)';
      }
      
      // Reset delivery animation
      if (deliveryTruck) {
        deliveryTruck.style.transform = 'translateY(-50%)';
      }
    }
  }
  
  // Run responsive check on load and resize
  checkResponsive();
  window.addEventListener('resize', checkResponsive);
});

// Initialize Counters
function initCounters() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"));
    const duration = 2000;
    const step = target / (duration / 20);

    let current = 0;
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current).toLocaleString();
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(counter);
  });
}

// Contact Form
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (!name || !email || !message) {
        showToast("Error", "Silakan lengkapi semua field", "error");
        return;
      }

      showToast("Berhasil", "Pesan Anda telah terkirim", "success");
      contactForm.reset();
    });
  }

  // Ensure showToast is globally available for contactForm
  function showToast(title, message, type) {
    try {
      let toast = document.getElementById("toast");
      if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className =
          "fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 transform translate-y-full opacity-0 transition-all duration-300 max-w-md";
        document.body.appendChild(toast);
      }

      let iconClass = "fas fa-info-circle text-blue-500";
      let bgClass = "bg-blue-100";

      if (type === "success") {
        iconClass = "fas fa-check-circle text-green-500";
        bgClass = "bg-green-100";
      } else if (type === "error") {
        iconClass = "fas fa-times-circle text-red-500";
        bgClass = "bg-red-100";
      } else if (type === "warning") {
        iconClass = "fas fa-exclamation-circle text-yellow-500";
        bgClass = "bg-yellow-100";
      }

      toast.innerHTML = `
        <div class="flex items-start">
          <div class="w-10 h-10 ${bgClass} rounded-full flex items-center justify-center mr-3">
            <i class="${iconClass}"></i>
          </div>
          <div class="flex-1">
            <h4 class="font-bold text-gray-800">${title}</h4>
            <p class="text-gray-600">${message}</p>
          </div>
          <button class="text-gray-500 hover:text-gray-700 ml-4 transition-colors" onclick="this.parentNode.parentNode.classList.remove('show')" aria-label="Tutup notifikasi">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `;

      // Apply dark mode styles if needed
      const isDarkMode = document.body.classList.contains('dark-mode');
      if (isDarkMode) {
        toast.style.backgroundColor = 'var(--card-bg)';
        toast.style.color = 'var(--text-primary)';
        const toastTitle = toast.querySelector('h4');
        const toastMessage = toast.querySelector('p');
        if (toastTitle) toastTitle.style.color = 'var(--text-primary)';
        if (toastMessage) toastMessage.style.color = 'var(--text-secondary)';
      }

      if (title.includes("Status") && type === "info") {
        toast.classList.add("status-update-pulse");
        setTimeout(() => {
          toast.classList.remove("status-update-pulse");
        }, 3000);
      }

      toast.classList.add("show");
      toast.style.transform = "translateY(0)";
      toast.style.opacity = "1";

      setTimeout(() => {
        toast.style.transform = "translateY(100%)";
        toast.style.opacity = "0";
        setTimeout(() => {
          toast.classList.remove("show");
        }, 300);
      }, 3000);
    } catch (error) {
      console.error("Error in showToast:", error);
    }
  }
});