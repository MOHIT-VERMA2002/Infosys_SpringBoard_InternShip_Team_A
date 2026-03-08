import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Search, MapPin, ChevronDown, ChevronUp, X, Zap } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ZoomControl } from "react-leaflet";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const createPriceIcon = (price) => {
  return L.divIcon({
    html: `
      <div style="display:flex; flex-direction:column; align-items:center;">
        
        <!-- Bigger Green Car Box -->
        <div style="
          background:#84cc16;
          width:46px;
          height:40px;
          border-radius:8px;
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:0 4px 10px rgba(0,0,0,0.25);
          border:3px solid white;
        ">
          <svg xmlns="http://www.w3.org/2000/svg" 
               viewBox="0 0 24 24" 
               fill="white" 
               width="26" 
               height="26">
            <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-5zm2.2-4a1 1 0 0 0-.95.68L5.3 11h13.4l-.95-3.32A1 1 0 0 0 16.8 7H7.2zM7 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
          </svg>
        </div>

        <!-- Price -->
        <div style="
          background:white;
          color:black;
          font-weight:700;
          font-size:12px;
          padding:3px 8px;
          border-radius:6px;
          margin-top:4px;
          box-shadow:0 2px 6px rgba(0,0,0,0.25);
        ">
          ₹${price}
        </div>

      </div>
    `,
    className: "",
    iconSize: [50, 60],
    iconAnchor: [25, 55],
  });
};

const parkingData = [
  {
    id: 1,
    name: "Sitabuldi Fort Parking",
    address: "Sitabuldi, Nagpur, Maharashtra 440012",
    hourly: 30,
    monthly: 3500,
    dayRate: 180,
    earlyBirdRate: 150,
    weekendRate: 200,
    availableSpots: 45,
    position: [21.1466, 79.0882]
  },
  {
    id: 2,
    name: "Dharampeth Plaza Parking",
    address: "Dharampeth, Nagpur, Maharashtra 440010",
    hourly: 35,
    monthly: 4200,
    dayRate: 200,
    earlyBirdRate: 160,
    weekendRate: 220,
    availableSpots: 32,
    position: [21.1389, 79.0712]
  },
  {
    id: 3,
    name: "Wardha Road Mall Parking",
    address: "Wardha Road, Nagpur, Maharashtra 440015",
    hourly: 40,
    monthly: 4800,
    dayRate: 240,
    earlyBirdRate: 200,
    weekendRate: 260,
    availableSpots: 28,
    position: [21.1255, 79.0925]
  },
  {
    id: 4,
    name: "Manish Nagar Market Parking",
    address: "Manish Nagar, Nagpur, Maharashtra 440027",
    hourly: 25,
    monthly: 3000,
    dayRate: 150,
    earlyBirdRate: 120,
    weekendRate: 170,
    availableSpots: 50,
    position: [21.1070, 79.0450]
  },
  {
    id: 5,
    name: "Civil Lines Metro Parking",
    address: "Civil Lines, Nagpur, Maharashtra 440001",
    hourly: 45,
    monthly: 5400,
    dayRate: 270,
    earlyBirdRate: 220,
    weekendRate: 290,
    availableSpots: 22,
    position: [21.1594, 79.0869]
  },
  {
    id: 6,
    name: "Sadar Market Parking",
    address: "Sadar, Nagpur, Maharashtra 440001",
    hourly: 30,
    monthly: 3600,
    dayRate: 180,
    earlyBirdRate: 150,
    weekendRate: 200,
    availableSpots: 38,
    position: [21.1529, 79.0820]
  },
];

const EV_CHARGING_HOURLY = 15;
const EV_CHARGING_MONTHLY = 500;

const BookParking = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("HOURLY");
  const [expandedCards, setExpandedCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    vehicle: "",
    address: "",
  });
  const [includeEVCharging, setIncludeEVCharging] = useState(false);

  const filteredParking = useMemo(() => {
    if (!search.trim()) return parkingData;
    return parkingData.filter((p) =>
      `${p.name} ${p.address}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

const handleDetailsClick = (parkingId) => {
  setExpandedCards((prev) =>
    prev.includes(parkingId)
      ? prev.filter((id) => id !== parkingId) // close
      : [...prev, parkingId] // open
  );
};

  const handleBookParking = (parking) => {
    setSelectedBooking(parking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
    setIncludeEVCharging(false);
  };

  const handleUserDetailsChange = (field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getBasePrice = () => {
    return mode === "HOURLY" ? selectedBooking.hourly : selectedBooking.monthly;
  };

  const getEVChargingPrice = () => {
    return mode === "HOURLY" ? EV_CHARGING_HOURLY : EV_CHARGING_MONTHLY;
  };

  const getTotalPrice = () => {
    const basePrice = getBasePrice();
    const evCharge = includeEVCharging ? getEVChargingPrice() : 0;
    return basePrice + evCharge;
  };

  const handleContinueToPayment = () => {
    if (
      !userDetails.name.trim() ||
      !userDetails.phone.trim() ||
      !userDetails.vehicle.trim() ||
      !userDetails.address.trim()
    ) {
      alert("Please fill in all required fields");
      return;
    }

    navigate("/payment", {
      state: {
        booking: selectedBooking,
        mode: mode,
        userDetails: userDetails,
        evCharging: includeEVCharging,
        totalPrice: getTotalPrice(),
      }
    });
  };

  const getCurrentPrice = (parking) => {
    return mode === "HOURLY" ? parking.hourly : parking.monthly;
  };

  const getPriceLabel = () => {
    return mode === "HOURLY" ? "/hour" : "/month";
  };

  return (
    <div className="flex h-[calc(100vh-75px)] overflow-hidden bg-gray-100">
      <div className="flex-1 relative h-full">
        <div className="absolute top-6 left-6 z-[1000] w-full max-w-[580px]">
          <div className="border-3 border-blue-400 rounded-xl shadow-md">
            <div className="bg-white rounded-lg flex items-stretch overflow-hidden">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search address"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
                />
              </div>

              <button
                onClick={() => {
                  setMode("HOURLY");
                  setExpandedCards([]);
                }}
                className={`px-6 py-3 text-sm font-semibold transition-all ${
                  mode === "HOURLY"
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="mr-1">🚗</span> Hourly
              </button>
              <button
                onClick={() => {
                  setMode("MONTHLY");
                  setExpandedCards([]);
                }}
                className={`px-6 py-3 text-sm font-semibold transition-all ${
                  mode === "MONTHLY"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="mr-1">📅</span> Monthly
              </button>
            </div>
          </div>
        </div>

        <MapContainer
          center={[21.1458, 79.0882]}
          zoom={13}
          className="h-full w-full"
          zoomControl={false}
        >
          <ZoomControl position="bottomleft" />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {filteredParking.map((p) => (
            <Marker
              key={p.id}
              position={p.position}
              icon={createPriceIcon(p.hourly)}
            >
              <Popup>
                <div className="text-sm">
                  <strong className="text-gray-900">{p.name}</strong>
                  <p className="text-gray-600 text-xs mt-1">{p.address}</p>
                  <p className="text-green-600 font-semibold mt-2">
                    ₹{p.hourly}/hour
                  </p>
                  <p className="text-gray-700 text-xs">
                    Day rate: ₹{p.dayRate}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="w-[400px] bg-white shadow-xl overflow-y-auto flex flex-col">
        <div className="p-4 bg-gray-50 border-b sticky top-0 z-10 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900">
            Available Parking ({filteredParking.length})
          </h2>
          <p className="text-xs text-gray-600 mt-1">Nagpur, Maharashtra</p>
        </div>

        <div className="space-y-0 flex-1 overflow-y-auto">
          {filteredParking.map((parking) => {
          const isExpanded = expandedCards.includes(parking.id);

            return (
              <div
                key={parking.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="text-green-600" size={22} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-base mb-1 leading-tight">
                        {parking.name}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {parking.address}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xl font-bold text-gray-900">
                      ₹{getCurrentPrice(parking)}<span className="text-sm font-normal text-gray-500">{getPriceLabel()}</span>
                    </p>
                  </div>

                  {isExpanded && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-3 space-y-2 animate-fadeIn">
                      {mode === "HOURLY" ? (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Day rate:</span>
                            <span className="font-semibold text-gray-900">₹{parking.dayRate}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Early bird rate:</span>
                            <span className="font-semibold text-gray-900">₹{parking.earlyBirdRate}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Weekend rate:</span>
                            <span className="font-semibold text-gray-900">₹{parking.weekendRate}/hour</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Monthly rate:</span>
                            <span className="font-semibold text-gray-900">₹{parking.monthly}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Daily equivalent:</span>
                            <span className="font-semibold text-gray-900">₹{Math.round(parking.monthly / 30)}/day</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Billing cycle:</span>
                            <span className="font-semibold text-gray-900">Monthly (30 days)</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-semibold text-gray-900">Nagpur</span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          24/7 secure parking with CCTV surveillance
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDetailsClick(parking.id)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all flex items-center justify-center gap-2"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp size={16} />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} />
                          Details
                        </>
                      )}
                    </button>

                    {isExpanded && (
                      <button
                        onClick={() => handleBookParking(parking)}
                        className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
                      >
                        Book Parking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && selectedBooking && (
        <div className="fixed inset-0 z-[3000] flex center justify-center bg-black/60 backdrop-blur-sm p-10 overflow-y-auto flex-1">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col animate-fadeIn">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
              <h2 className="text-2xl font-bold text-gray-900">Confirm Booking</h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="text-green-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {selectedBooking.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedBooking.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Selected Plan</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    mode === "HOURLY"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {mode === "HOURLY" ? "Hourly Parking" : "Monthly Parking"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Base Price</span>
                  <span className="text-lg font-bold text-gray-900">
                    ₹{getBasePrice()}
                    <span className="text-sm font-normal text-gray-500">{getPriceLabel()}</span>
                  </span>
                </div>

                <div className="space-y-3 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-3 flex-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeEVCharging}
                        onChange={(e) => setIncludeEVCharging(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                          <Zap size={16} className="text-amber-500" />
                          EV Charging
                        </p>
                        <p className="text-xs text-gray-500">
                          +₹{getEVChargingPrice()}{mode === "HOURLY" ? "/hour" : "/month"}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Total Price</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{getTotalPrice()}
                    <span className="text-sm font-normal text-gray-500">{getPriceLabel()}</span>
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={userDetails.name}
                      onChange={(e) => handleUserDetailsChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2 bg-white text-black  border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={userDetails.phone}
                      onChange={(e) => handleUserDetailsChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-2 bg-white text-black  border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Vehicle Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={userDetails.vehicle}
                      onChange={(e) => handleUserDetailsChange("vehicle", e.target.value)}
                      placeholder="e.g., MH 01 AB 1234"
                      className="w-full px-4 py-2 bg-white text-black  border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={userDetails.address}
                      onChange={(e) => handleUserDetailsChange("address", e.target.value)}
                      placeholder="Enter your address"
                      rows={2}
                      className="w-full px-4 py-2 bg-white text-black  border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3 flex-shrink-0">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleContinueToPayment}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BookParking;