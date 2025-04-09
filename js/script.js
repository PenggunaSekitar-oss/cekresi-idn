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

// Contoh penggunaan
console.log(processGatewayInfo("Paket akan dikirimkan ke SUB_GATEWAY"));
// Output: "Paket akan dikirimkan ke SUB_GATEWAY (Surabaya)"

console.log(processGatewayInfo("Paket akan dikirimkan ke JKT_GATEWAY"));
// Output: "Paket akan dikirimkan ke JKT_GATEWAY (Jakarta)"

console.log(processGatewayInfo("Paket akan dikirimkan ke UPG_GATEWAY"));
// Output: "Paket akan dikirimkan ke UPG_GATEWAY (Makassar)"


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
  let toast = document.getElementById("toast");
  const courierLogos = document.querySelectorAll(".courier-logo");
  const moreCouriers = document.querySelector(".more-couriers");
  const moreCouriersDropdown = document.querySelector(".more-couriers-dropdown");
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  // Global Variables
  let selectedCourier = COURIERS[0];
  let trackingHistory = [];

  // Initialize AOS
  let AOS;
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }

  // Hide preloader after page load (10 detik)
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 200); // biar transisi smooth
    }
  }, 2000); // 10 detik

  // Mobile Menu Toggle
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
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
          updateExampleButton();
        }
      });
    });
  }

  // Example Button
  function updateExampleButton() {
    if (exampleButton) {
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

    if (loadingAnimation) {
      loadingAnimation.classList.remove("hidden");
    }
    if (trackingResult) {
      trackingResult.classList.add("hidden");
    }

    try {
      const apiUrl = `https://api.binderbyte.com/v1/track?api_key=${API_KEY}&courier=${selectedCourier.id}&awb=${awb}`;
      console.log("Fetching API:", apiUrl);
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (loadingAnimation) {
        loadingAnimation.classList.add("hidden");
      }

      if (data.status === 200) {
        if (!data.data || !data.data.summary || !data.data.history || data.data.history.length === 0) {
          showToast("Peringatan", "Data pengiriman tidak ditemukan atau tidak lengkap", "warning");
          return;
        }

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
      showToast("Error", `Terjadi kesalahan pada koneksi: ${error.message}. Periksa koneksi internet Anda dan coba lagi.`, "error");
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
    if (!trackingResult) return

    trackingResult.innerHTML = ""

    if (!data.summary || !data.history || data.history.length === 0) {
      showToast("Peringatan", "Data pengiriman tidak lengkap", "warning")
      return
    }

    const status = getStatus(data.summary.status || data.summary)
    const trackingCard = document.createElement("div")
    trackingCard.className = "tracking-card animate__animated animate__fadeIn"

    const trackingHeader = document.createElement("div")
    trackingHeader.className = "tracking-header"
    trackingHeader.style.backgroundColor = selectedCourier.color

    let statusText = "Dalam Proses"
    let statusIcon = '<i class="fas fa-clock mr-2"></i>'

    if (status === "delivered") {
      statusText = "Diterima"
      statusIcon = '<i class="fas fa-check-circle mr-2"></i>'
    } else if (status === "in-transit") {
      statusText = "Dalam Pengiriman"
      statusIcon = '<i class="fas fa-truck mr-2"></i>'
    }

    trackingHeader.innerHTML = `
      <h3 class="text-xl font-bold">${selectedCourier.name}</h3>
      <div class="px-3 py-1 bg-blue bg-opacity-20 rounded-full text-sm flex items-center">
        ${statusIcon}
        ${statusText}
      </div>
    `

    const trackingAnimation = document.createElement("div")
    trackingAnimation.className = "p-6 border-b"
    trackingAnimation.innerHTML = `
      <div class="relative h-16 mb-4">
        <div class="absolute top-1/2 left-0 right-0 h-0.5 border-t-2 border-dashed border-gray-300"></div>
        <div class="absolute top-1/2 left-0 w-4 h-4 bg-gray-200 rounded-full transform -translate-y-1/2 flex items-center justify-center">
          <div class="w-2 h-2 bg-gray-500 rounded-full"></div>
        </div>
        <div class="absolute top-1/2 right-0 w-4 h-4 bg-gray-200 rounded-full transform -translate-y-1/2 flex items-center justify-center">
          <div class="w-2 h-2 bg-gray-500 rounded-full"></div>
        </div>
        <div id="tracking-vehicle" class="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000 ease-in-out" style="color: ${selectedCourier.color};">
          <i class="fas fa-truck text-2xl"></i>
        </div>
      </div>
      <div class="flex justify-between text-xs text-gray-500">
        <div>${data.detail?.shipper || data.detail?.origin || "Pengirim"}</div>
        <div>${data.detail?.receiver || data.detail?.destination || "Penerima"}</div>
      </div>
    `

    const trackingBody = document.createElement("div")
    trackingBody.className = "tracking-body"

    const lastHistory = data.history && data.history.length > 0 ? data.history[0] : {}
    const lastDesc = lastHistory.desc || "Informasi tidak tersedia"
    const lastDate = lastHistory.date || "Informasi tidak tersedia"
    const shipper = data.detail?.shipper || "Rahasia Spx"
    const receiver = data.detail?.receiver || "Rahasia Spx"
    const origin = data.detail?.origin || "Informasi tidak tersedia"
    const destination = data.detail?.destination || "Informasi tidak tersedia"
    const summary = data.summary.status || "Informasi tidak tersedia"
    const duration = calculateDeliveryDuration(data.history)

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
          <div class="w-10 h-10	bg-gray-100 rounded-full flex items-center justify-center mr-4">
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
        <div class="flex items-start">
          <div class="flex items-start mr-4">
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
        <button id="view-detail-btn" class="mt-6 w-full py-2.5 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
          <i class="fas fa-list-ul mr-2"></i> Lihat Detail
        </button>
      </div>
    `

    trackingCard.appendChild(trackingHeader)
    trackingCard.appendChild(trackingAnimation)
    trackingCard.appendChild(trackingBody)
    trackingResult.appendChild(trackingCard)
    trackingResult.classList.remove("hidden")

    animateVehicle(status)

    const viewDetailBtn = trackingCard.querySelector("#view-detail-btn")
    if (viewDetailBtn) {
      viewDetailBtn.addEventListener("click", () => {
        showDetailModal(data)
      })
    }
  }

  // Get Status
  function getStatus(summary) {
    if (!summary || typeof summary !== "string") {
      return "processing"
    }

    const summaryLower = summary.toLowerCase()

    if (
      summaryLower.includes("terkirim") ||
      summaryLower.includes("delivered") ||
      summaryLower.includes("diterima") ||
      summaryLower.includes("selesai")
    ) {
      return "delivered"
    } else if (
      summaryLower.includes("proses") ||
      summaryLower.includes("transit") ||
      summaryLower.includes("perjalanan") ||
      summaryLower.includes("dikirim") ||
      summaryLower.includes("menuju")
    ) {
      return "in-transit"
    } else {
      return "processing"
    }
  }

  // Animate Vehicle
  function animateVehicle(status) {
    const vehicle = document.getElementById("tracking-vehicle")
    if (!vehicle) return

    if (window.vehicleInterval) {
      clearInterval(window.vehicleInterval)
    }

    if (status === "delivered") {
      vehicle.style.left = "90%"
    } else if (status === "in-transit") {
      let position = 0
      const interval = setInterval(() => {
        position = (position + 1) % 100
        vehicle.style.left = `${position}%`
        if (position % 10 === 0) {
          vehicle.classList.add("animate-bounce")
          setTimeout(() => {
            vehicle.classList.remove("animate-bounce")
          }, 500)
        }
      }, 100)
      window.vehicleInterval = interval
    } else {
      vehicle.style.left = "0%"
    }
  }

  // Show Detail Modal
  function showDetailModal(data) {
    if (!detailModal || !modalCourierName || !modalContent) return

    if (!data || !data.history) {
      showToast("Peringatan", "Data detail pengiriman tidak tersedia", "warning")
      return
    }

    modalCourierName.textContent = selectedCourier.name
    modalContent.innerHTML = ""

    const shipper = data.detail?.shipper || "Rahasia Spx"
    const receiver = data.detail?.receiver || "Rahasia Spx"

    const basicInfo = document.createElement("div")
    basicInfo.className = "mb-4"
    basicInfo.innerHTML = `
      <div class="flex items-center mb-2">
        <i class="fas fa-box text-gray-800 mr-2"></i>
        <p class="text-sm text- gray-800">
          Nomor Resi: <span class="font-medium text-gray-800">${trackingNumber.value}</span>
        </p>
      </div>
      
      <div class="flex items-center mb-2">
        <i class="fas fa-user text-gray-800 mr-2"></i>
        <p class="text-sm text-gray-800">
          Pengirim: <span class="font-medium text-gray-800">${shipper}</span>
        </p>
      </div>
      
      <div class="flex items-center">
        <i class="fas fa-user-check text-gray-800 mr-2"></i>
        <p class="text-sm text-gray-800">
          Penerima: <span class="font-medium text-gray-800">${receiver}</span>
        </p>
      </div>
    `

    const timeline = document.createElement("div")
    timeline.className = "tracking-timeline"

    const timelineHeader = document.createElement("h4")
    timelineHeader.className = "font-medium text-gray-800 mb-4"
    timelineHeader.textContent = "Riwayat Pengiriman"
    timeline.appendChild(timelineHeader)

    if (data.history && data.history.length > 0) {
      data.history.forEach((item) => {
        const date = item.date || "Tanggal tidak tersedia"
        const location = item.location || "Lokasi tidak tersedia"
        const desc = item.desc || "Deskripsi tidak tersedia"

        const timelineItem = document.createElement("div")
        timelineItem.className = "timeline-item"
        timelineItem.innerHTML = `
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">
              <i class="fas fa-calendar-alt text-gray-800 mr-1"></i>
              ${date}
            </div>
            <div class="timeline-location">
              <i class="fas fa-map-marker-alt text-gray-800 mr-1"></i>
              ${formatLocationText(location)}
            </div>
            <div class="timeline-description">
              ${formatLocationText(desc)}
            </div>
          </div>
        `
        timeline.appendChild(timelineItem)
      })
    } else {
      const noHistory = document.createElement("div")
      noHistory.className = "text-center py-8 text-gray-,800"
      noHistory.textContent = "Tidak ada riwayat pengiriman yang tersedia"
      timeline.appendChild(noHistory)
    }

    modalContent.appendChild(basicInfo)
    modalContent.appendChild(timeline)

    detailModal.classList.remove("hidden")
    detailModal.classList.add("animate__animated", "animate__fadeIn")
  }

  // Close Modal
  if (closeModal && detailModal) {
    closeModal.addEventListener("click", () => {
      detailModal.classList.add("animate__fadeOut")
      setTimeout(() => {
        detailModal.classList.remove("animate__fadeOut")
        detailModal.classList.add("hidden")
      }, 500)
      if (window.vehicleInterval) {
        clearInterval(window.vehicleInterval)
      }
    })

    window.addEventListener("click", (e) => {
      if (e.target === detailModal) {
        detailModal.classList.add("animate__fadeOut")
        setTimeout(() => {
          detailModal.classList.remove("animate__fadeOut")
          detailModal.classList.add("hidden")
        }, 500)
        if (window.vehicleInterval) {
          clearInterval(window.vehicleInterval)
        }
      }
    })
  }

  // Accordion
  if (accordionHeaders) {
    accordionHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        this.classList.toggle("active")
        const content = this.nextElementSibling
        if (content) {
          content.classList.toggle("active")
        }
      })
    })
  }

  // Show Toast
  function showToast(title, message, type) {
    try {
      let toast = document.getElementById("toast")
      if (!toast) {
        toast = document.createElement("div")
        toast.id = "toast"
        toast.className =
          "fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 transform translate-y-full opacity-0 transition-all duration-300 max-w-md"
        document.body.appendChild(toast)
      }

      let iconClass = "fas fa-info-circle text-blue-500"
      let bgClass = "bg-blue-100"

      if (type === "success") {
        iconClass = "fas fa-check-circle text-green-500"
        bgClass = "bg-green-100"
      } else if (type === "error") {
        iconClass = "fas fa-times-circle text-red-500"
        bgClass = "bg-red-100"
      } else if (type === "warning") {
        iconClass = "fas fa-exclamation-circle text-yellow-500"
        bgClass = "bg-yellow-100"
      }

      toast.innerHTML = `
        <div class="flex items-start">
          <div class="w-10 h-10 ${bgClass} rounded-full flex items-center justify-center mr-3">
            <i class="${iconClass}"></i>
          </div>
          <div class="flex-1">
            <h4 class="font-bold text-gray-800">${title}</h4>
            <p class="text-gray-800">${message}</p>
          </div>
          <button class="text-gray-800 hover:text-gray-800 ml-4" onclick="this.parentNode.parentNode.classList.remove('show')">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `

      if (title.includes("Status") && type === "info") {
        toast.classList.add("status-update-pulse")
        setTimeout(() => {
          toast.classList.remove("status-update-pulse")
        }, 3000)
      }

      toast.classList.add("show")
      toast.style.transform = "translateY(0)"
      toast.style.opacity = "1"

      setTimeout(() => {
        toast.style.transform = "translateY(100%)"
        toast.style.opacity = "0"
        setTimeout(() => {
          toast.classList.remove("show")
        }, 300)
      }, 3000)
    } catch (error) {
      console.error("Error in showToast:", error)
    }
  }

  // Back to Top Button
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add("show")
      } else {
        backToTop.classList.remove("show")
      }
    })

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Tracking History
  function saveToTrackingHistory(data) {
    let history = JSON.parse(localStorage.getItem("trackingHistory")) || []
    history.unshift(data)
    if (history.length > 10) {
      history = history.slice(0, 10)
    }
    localStorage.setItem("trackingHistory", JSON.stringify(history))
    trackingHistory = history
  }

  function loadTrackingHistory() {
    trackingHistory = JSON.parse(localStorage.getItem("trackingHistory")) || []
  }

  loadTrackingHistory()

  // Helper function to format date
  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
})

// Initialize Counters
function initCounters() {
  const counters = document.querySelectorAll(".counter")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const duration = 2000
    const step = target / (duration / 20)

    let current = 0
    const updateCounter = () => {
      current += step
      if (current < target) {
        counter.textContent = Math.ceil(current).toLocaleString()
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target.toLocaleString()
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCounter()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(counter)
  })
}

// Contact Form
const contactForm = document.getElementById("contact-form")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    if (!name || !email || !message) {
      showToast("Error", "Silakan lengkapi semua field", "error")
      return
    }

    showToast("Berhasil", "Pesan Anda telah terkirim", "success")
    contactForm.reset()
  })
}

// Ensure showToast is globally available for contactForm
function showToast(title, message, type) {
  try {
    let toast = document.getElementById("toast")
    if (!toast) {
      toast = document.createElement("div")
      toast.id = "toast"
      toast.className =
        "fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 transform translate-y-full opacity-0 transition-all duration-300 max-w-md"
      document.body.appendChild(toast)
    }

    let iconClass = "fas fa-info-circle text-blue-500"
    let bgClass = "bg-blue-100"

    if (type === "success") {
      iconClass = "fas fa-check-circle text-green-500"
      bgClass = "bg-green-100"
    } else if (type === "error") {
      iconClass = "fas fa-times-circle text-red-500"
      bgClass = "bg-red-100"
    } else if (type === "warning") {
      iconClass = "fas fa-exclamation-circle text-yellow-500"
      bgClass = "bg-yellow-100"
    }

    toast.innerHTML = `
      <div class="flex items-start">
        <div class="w-10 h-10 ${bgClass} rounded-full flex items-center justify-center mr-3">
          <i class="${iconClass}"></i>
        </div>
        <div class="flex-1">
          <h4 class="font-bold text-gray-800">${title}</h4>
          <p class="text-gray-800">${message}</p>
        </div>
        <button class="text-gray-800 hover:text-gray-800 ml-4" onclick="this.parentNode.parentNode.classList.remove('show')">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `
    
    

    if (title.includes("Status") && type === "info") {
      toast.classList.add("status-update-pulse")
      setTimeout(() => {
        toast.classList.remove("status-update-pulse")
      }, 3000)
    }

    toast.classList.add("show")
    toast.style.transform = "translateY(0)"
    toast.style.opacity = "1"

    setTimeout(() => {
      toast.style.transform = "translateY(100%)"
      toast.style.opacity = "0"
      setTimeout(() => {
        toast.classList.remove("show")
      }, 300)
    }, 3000)
  } catch (error) {
    console.error("Error in showToast:", error)
  }
}