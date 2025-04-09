"use client"

import { useState } from "react"
import { Search, Package, MapPin, Info, X } from "lucide-react"
import CourierSelector from "@/components/courier-selector"
import TrackingResult from "@/components/tracking-result"
import TrackingTimeline from "@/components/tracking-timeline"
import LoadingAnimation from "@/components/loading-animation"

// Daftar kurir yang didukung
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
]

// API key dari Binderbyte
const API_KEY = "d661a8634dbb7f8a5c42aa6bd5b89e46e5989977ecac63fbe5d60ca3ad9cf963"

export default function Home() {
  const [courier, setCourier] = useState(COURIERS[0])
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingResult, setTrackingResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)

  // Fungsi untuk melacak resi
  const trackPackage = async (e) => {
    e.preventDefault()

    if (!trackingNumber.trim()) {
      setError("Silakan masukkan nomor resi terlebih dahulu")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(
        `https://api.binderbyte.com/v1/track?api_key=${API_KEY}&courier=${courier.id}&awb=${trackingNumber}`,
      )

      const data = await response.json()

      if (data.status === 200) {
        setTrackingResult(data.data)
      } else {
        setError(data.message || "Terjadi kesalahan saat melacak resi")
        setTrackingResult(null)
      }
    } catch (err) {
      setError("Terjadi kesalahan pada server. Silakan coba lagi nanti.")
      setTrackingResult(null)
    } finally {
      setLoading(false)
    }
  }

  // Fungsi untuk mengisi contoh nomor resi
  const fillExampleTracking = () => {
    setTrackingNumber(courier.example)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header */}
      <header className="bg-[#1877F2] text-white py-4 px-6 shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            CekResi<span className="text-purple-300">.idn</span>
          </h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-purple-300 transition-colors">
              Beranda
            </a>
            <a href="#" className="hover:text-purple-300 transition-colors">
              Cek Resi
            </a>
            <a href="#" className="hover:text-purple-300 transition-colors">
              Kontak
            </a>
          </nav>
          <button className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Lacak Paket Anda dengan Mudah</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Masukkan nomor resi dari berbagai ekspedisi dan dapatkan informasi real-time tentang status pengiriman Anda.
          </p>
        </div>

        {/* Form Pelacakan */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <form onSubmit={trackPackage} className="space-y-6">
            <CourierSelector couriers={COURIERS} selectedCourier={courier} onSelect={setCourier} />

            <div className="relative">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder={`Masukkan nomor resi ${courier.name} (contoh: ${courier.example})`}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
              <Package className="absolute left-4 top-3.5 text-gray-400" size={20} />

              <button
                type="button"
                onClick={fillExampleTracking}
                className="absolute right-4 top-3 text-xs text-purple-600 hover:text-purple-800"
              >
                Contoh
              </button>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-start">
                <Info size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#8A2BE2] to-[#DDA0DD] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Melacak...
                </span>
              ) : (
                <span className="flex items-center">
                  <Search size={20} className="mr-2" />
                  Lacak Paket
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Loading Animation */}
        {loading && <LoadingAnimation />}

        {/* Hasil Pelacakan */}
        {trackingResult && !loading && (
          <div className="max-w-4xl mx-auto">
            <TrackingResult result={trackingResult} courier={courier} onViewDetail={() => setShowModal(true)} />
          </div>
        )}
      </section>

      {/* Modal Detail */}
      {showModal && trackingResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Detail Pengiriman {courier.name}</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Package size={18} className="text-gray-500 mr-2" />
                  <p className="text-sm text-gray-600">
                    Nomor Resi: <span className="font-medium text-gray-800">{trackingNumber}</span>
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <MapPin size={18} className="text-gray-500 mr-2" />
                  <p className="text-sm text-gray-600">
                    Pengirim: <span className="font-medium text-gray-800">{trackingResult.origin}</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <MapPin size={18} className="text-gray-500 mr-2" />
                  <p className="text-sm text-gray-600">
                    Penerima: <span className="font-medium text-gray-800">{trackingResult.destination}</span>
                  </p>
                </div>
              </div>

              <TrackingTimeline history={trackingResult.history} />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#1877F2] text-white py-8 px-6 mt-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-2">
                CekResi<span className="text-purple-300">.idn</span>
              </h2>
              <p className="text-blue-100 text-sm">Lacak paket Anda dari berbagai ekspedisi dengan mudah</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-purple-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-purple-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-purple-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-blue-400 text-center text-blue-100 text-sm">
            &copy; {new Date().getFullYear()} CekResi.idn. Semua hak dilindungi.
          </div>
        </div>
      </footer>
    </main>
  )
}
