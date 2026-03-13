import { useState, useEffect } from "react";
import { CarFront, Trash2, Pencil } from "lucide-react";

import EditParkingForm from "./EditParkingForm";
import AdminLayout from "@/layouts/AdminLayout";
import ParkingRegistrationForm from "./ParkingRegistration";

export default function ManageParking() {

  const [parkings, setParkings] = useState([]);

  // ✅ SEARCH STATE
  const [search, setSearch] = useState("");

  // ✅ EDIT STATES
  const [editOpen, setEditOpen] = useState(false);
  const [selectedParking, setSelectedParking] = useState(null);

  useEffect(() => {
    const backendData = [
      { id: 1, name: "Phoenix Mall Parking", area: "Alambagh", location: "Lucknow", totalSlots: 100, occupiedSlots: 60 },
      { id: 2, name: "Railway Station Parking", area: "Charbagh", location: "Lucknow", totalSlots: 120, occupiedSlots: 80 },
      { id: 3, name: "Lulu Mall Parking", area: "Golf City", location: "Lucknow", totalSlots: 150, occupiedSlots: 90 },
      { id: 4, name: "Airport Parking", area: "Amausi", location: "Lucknow", totalSlots: 200, occupiedSlots: 140 },
      { id: 5, name: "Hazratganj Parking", area: "Hazratganj", location: "Lucknow", totalSlots: 80, occupiedSlots: 50 },
      { id: 6, name: "Wave Mall Parking", area: "Gomti Nagar", location: "Lucknow", totalSlots: 90, occupiedSlots: 30 },
      { id: 7, name: "Kapoorthala Parking", area: "Aliganj", location: "Lucknow", totalSlots: 70, occupiedSlots: 20 },
      { id: 8, name: "Indira Nagar Parking", area: "Indira Nagar", location: "Lucknow", totalSlots: 110, occupiedSlots: 95 },
      { id: 9, name: "Medanta Parking", area: "Shaheed Path", location: "Lucknow", totalSlots: 130, occupiedSlots: 100 },
      { id: 10, name: "High Court Parking", area: "Qaiserbagh", location: "Lucknow", totalSlots: 60, occupiedSlots: 25 },
      { id: 11, name: "Sahara Ganj Parking", area: "Hazratganj", location: "Lucknow", totalSlots: 140, occupiedSlots: 100 },
{ id: 12, name: "Fun Republic Parking", area: "Gomti Nagar", location: "Lucknow", totalSlots: 90, occupiedSlots: 40 },
{ id: 13, name: "Patrakarpuram Parking", area: "Gomti Nagar", location: "Lucknow", totalSlots: 75, occupiedSlots: 35 },
{ id: 14, name: "Daliganj Parking", area: "Daliganj", location: "Lucknow", totalSlots: 60, occupiedSlots: 20 },
{ id: 15, name: "IT Metro Parking", area: "Aliganj", location: "Lucknow", totalSlots: 110, occupiedSlots: 70 },
{ id: 16, name: "Badshah Nagar Parking", area: "Nishatganj", location: "Lucknow", totalSlots: 95, occupiedSlots: 50 },
{ id: 17, name: "Transport Nagar Parking", area: "Transport Nagar", location: "Lucknow", totalSlots: 130, occupiedSlots: 90 },
{ id: 18, name: "Krishna Nagar Parking", area: "Krishna Nagar", location: "Lucknow", totalSlots: 80, occupiedSlots: 30 },
{ id: 19, name: "Ashiyana Parking", area: "Ashiyana", location: "Lucknow", totalSlots: 120, occupiedSlots: 60 },
{ id: 20, name: "Telibagh Parking", area: "Telibagh", location: "Lucknow", totalSlots: 70, occupiedSlots: 25 },

{ id: 21, name: "Rajajipuram Parking", area: "Rajajipuram", location: "Lucknow", totalSlots: 100, occupiedSlots: 55 },
{ id: 22, name: "Chowk Parking", area: "Chowk", location: "Lucknow", totalSlots: 65, occupiedSlots: 45 },
{ id: 23, name: "Aminabad Parking", area: "Aminabad", location: "Lucknow", totalSlots: 85, occupiedSlots: 70 },
{ id: 24, name: "Kaiserbagh Parking", area: "Kaiserbagh", location: "Lucknow", totalSlots: 90, occupiedSlots: 65 },
{ id: 25, name: "Mahanagar Parking", area: "Mahanagar", location: "Lucknow", totalSlots: 105, occupiedSlots: 50 },
{ id: 26, name: "Vibhuti Khand Parking", area: "Gomti Nagar", location: "Lucknow", totalSlots: 160, occupiedSlots: 120 },
{ id: 27, name: "DLF My Pad Parking", area: "Vibhuti Khand", location: "Lucknow", totalSlots: 150, occupiedSlots: 110 },
{ id: 28, name: "Ekana Stadium Parking", area: "Shaheed Path", location: "Lucknow", totalSlots: 300, occupiedSlots: 210 },
{ id: 29, name: "PGI Parking", area: "Raebareli Road", location: "Lucknow", totalSlots: 180, occupiedSlots: 130 },
{ id: 30, name: "Cantt Parking", area: "Cantonment", location: "Lucknow", totalSlots: 95, occupiedSlots: 60 },
    ];

    setParkings(backendData);
  }, []);

  // ✅ DELETE
  const handleDelete = (id) => {
    setParkings(prev => prev.filter((p) => p.id !== id));
  };

  // ✅ OPEN EDIT
  const handleEdit = (parking) => {
    setSelectedParking({
      ...parking,
      available: parking.totalSlots - parking.occupiedSlots,
      occupied: parking.occupiedSlots
    });
    setEditOpen(true);
  };

  // ✅ UPDATE
  const handleUpdate = (updated) => {

    const totalSlots =
      Number(updated.available) + Number(updated.occupied);

    setParkings(prev =>
      prev.map(p =>
        p.id === selectedParking.id
          ? {
              ...p,
              name: updated.name,
              area: updated.area,
              location: updated.location,
              totalSlots,
              occupiedSlots: Number(updated.occupied)
            }
          : p
      )
    );
  };

  // ✅ SEARCH FILTER
  const filteredParkings = parkings.filter((p) =>
    `${p.name} ${p.area} ${p.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getStatus = (percent) => {
    if (percent < 50) return "bg-green-100 text-green-600";
    if (percent < 80) return "bg-yellow-100 text-yellow-600";
    return "bg-red-100 text-red-600";
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-7xl mx-auto px-4 space-y-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
          <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-800">
            <CarFront className="text-blue-600 w-8 h-8" />
            Register New Parking
          </h1>

          <ParkingRegistrationForm />
        </div>

        {/* SEARCH */}
        <div className="max-w-md">
          <input
            type="text"
            placeholder="🔍 Search parking by name, area, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          />
        </div>

        {/* EMPTY STATE */}
        {filteredParkings.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No parking found
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredParkings.map((p) => {

            const available = p.totalSlots - p.occupiedSlots;
            const percent = (p.occupiedSlots / p.totalSlots) * 100;

            return (
              <div key={p.id}
                   className="relative rounded-3xl border bg-white p-5 shadow-md hover:shadow-xl transition">

                {/* ACTIONS */}
                <div className="absolute top-3 right-3 flex gap-2">

                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-500 hover:scale-110 transition"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

                <h2 className="text-lg font-semibold text-gray-800">
                  {p.name}
                </h2>

                <p className="text-sm text-gray-500 mb-3">
                  📍 {p.area}, {p.location}
                </p>

                <div className="flex justify-between text-sm mb-2">
                  <span>Total: {p.totalSlots}</span>

                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatus(percent)}`}>
                    {percent.toFixed(0)}% Full
                  </span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
                  <div
                    style={{ width: `${percent}%` }}
                    className={`h-full ${
                      percent < 50 ? "bg-green-500"
                      : percent < 80 ? "bg-yellow-500"
                      : "bg-red-500"
                    }`}
                  />
                </div>

                <div className="flex justify-between text-sm font-medium">
                  <span className="text-green-600">Avl: {available}</span>
                  <span className="text-red-500">Occ: {p.occupiedSlots}</span>
                </div>

              </div>
            );
          })}

        </div>

        {/* EDIT MODAL */}
        <EditParkingForm
          open={editOpen}
          setOpen={setEditOpen}
          data={selectedParking}
          onUpdate={handleUpdate}
        />

      </div>
    </AdminLayout>
  );
}