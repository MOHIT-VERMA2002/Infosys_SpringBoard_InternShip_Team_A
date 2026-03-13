import { useState, useEffect } from "react";
import { Users, MoreVertical } from "lucide-react";
import AdminLayout from "@/layouts/AdminLayout";


export default function ManageUsers() {

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {

    const data = [
      {
        id: 1,
        name: "Rahul Verma",
        phone: "9876543210",
        city: "Lucknow",
        cars: ["UP32 AB 1234", "UP32 XY 9087"],
        totalBookings: 12,
        totalSpent: 2400,
        blocked: false,
        lastBooking: {
          parking: "Phoenix Mall",
          date: "2026-02-20",
          slot: "A-12",
          amount: 120
        }
      },
      {
        id: 2,
        name: "Amit Singh",
        phone: "9123456780",
        city: "Kanpur",
        cars: ["UP78 KK 9081"],
        totalBookings: 2,
        totalSpent: 300,
        blocked: false,
        lastBooking: {
          parking: "Lulu Mall",
          date: "2025-12-01",
          slot: "B-05",
          amount: 100
        }
      }
    ];

    setUsers(data);

  }, []);

  const getStatus = (user) => {

    if (user.blocked) return "Blocked";

    const last = new Date(user.lastBooking.date);
    const today = new Date();
    const diff = (today - last) / (1000 * 60 * 60 * 24);

    return diff > 30 ? "Inactive" : "Active";
  };

  const toggleBlock = (id) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === id ? { ...u, blocked: !u.blocked } : u
      )
    );
    setOpenMenu(null);
  };

  const filteredUsers = users.filter((u) =>
    `${u.name} ${u.phone} ${u.city} ${u.cars.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase().trim())
  );

  return (
    <AdminLayout>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
          <Users className="text-blue-600 w-8 h-8"/> User Insights
        </h1>

        <div className="bg-white border rounded-2xl shadow-sm p-4 flex flex-col lg:flex-row lg:items-center gap-4 justify-between">

          <div className="relative w-full lg:max-w-md">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, phone, city, car number..."
              className="w-full pl-11 pr-24 py-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-red-500 hover:text-red-600"
              >
                Clear
              </button>
            )}

          </div>

          <div className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-700">{filteredUsers.length}</span> of {users.length}
          </div>

        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-400 py-16">
            No user found
          </div>
        )}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">

          {filteredUsers.map(user => {

            const status = getStatus(user);

            return (
              <div key={user.id} className="bg-white rounded-2xl border p-6 space-y-5 shadow-sm hover:shadow-lg transition relative">

                <div className="flex justify-between items-start">

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.phone}</p>
                    <p className="text-sm text-gray-400">{user.city}</p>
                  </div>

                  <div className="relative">

                    <MoreVertical
                      className="cursor-pointer text-gray-500"
                      onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                    />

                    {openMenu === user.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg text-sm z-10">
                        <button
                          onClick={() => toggleBlock(user.id)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          {user.blocked ? "Unblock" : "Block"}
                        </button>
                      </div>
                    )}

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">

                  <div>
                    <p className="text-gray-400">Bookings</p>
                    <p className="font-semibold text-blue-600">{user.totalBookings}</p>
                  </div>

                  <div>
                    <p className="text-gray-400">Spent</p>
                    <p className="font-semibold text-green-600">₹ {user.totalSpent}</p>
                  </div>

                </div>

                <div className="text-sm space-y-1">
                  <p className="text-gray-400">Cars</p>
                  <p className="text-gray-700">{user.cars.join(", ")}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 space-y-1">
                  <p className="text-xs text-gray-400">Last Booking</p>
                  <p className="text-sm font-medium">{user.lastBooking.parking}</p>
                  <p className="text-xs text-gray-500">
                    {user.lastBooking.date} • Slot {user.lastBooking.slot}
                  </p>
                  <p className="text-sm font-semibold text-blue-600">
                    ₹ {user.lastBooking.amount}
                  </p>
                </div>

                <span className={`text-xs px-3 py-1 rounded-full font-medium w-fit ${
                  status === "Active"
                    ? "bg-green-100 text-green-600"
                    : status === "Inactive"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-500"
                }`}>
                  {status}
                </span>

              </div>
            );
          })}

        </div>

      </div>

    </AdminLayout>
  );
}