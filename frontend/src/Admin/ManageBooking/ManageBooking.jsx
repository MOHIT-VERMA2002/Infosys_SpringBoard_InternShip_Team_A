import { useState, useEffect } from "react";
import {
  CalendarDays,
  BellRing,
  TrendingUp,
  AlertTriangle,
  Eye,
  Activity
} from "lucide-react";
import AdminLayout from "@/layouts/AdminLayout";

export default function ManageBookings() {

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [parkingFilter, setParkingFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const itemsPerPage = 8;

  useEffect(() => {

    const parkings = ["Phoenix Mall","Lulu Mall","Airport","Hazratganj","Ekana Stadium"];
    const users = ["Rahul","Amit","Sara","John","Ali","Zoya","Kabir","Riya","Vikram","Neha"];

    const data = Array.from({ length: 35 }, (_, i) => {

      const isToday = i % 5 === 0;
      const status = i % 3 === 0 ? "Pending" : "Confirmed";

      return {
        id: i + 1,
        user: users[i % users.length],
        parking: parkings[i % parkings.length],
        date: isToday
          ? new Date().toISOString().split("T")[0]
          : `2026-01-${(i % 28) + 1}`,
        slot: `A-${i + 10}`,
        status,
        amount: 80 + i * 5
      };

    });

    setBookings(data);

  }, []);

  const today = new Date().toISOString().split("T")[0];

  const todayBookings = bookings.filter(b => b.date === today);

  const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0);

  const parkingStats = Object.values(
    bookings.reduce((acc, b) => {
      acc[b.parking] = acc[b.parking] || { name: b.parking, count: 0, revenue:0 };
      acc[b.parking].count++;
      acc[b.parking].revenue += b.amount;
      return acc;
    }, {})
  );

  const pendingBookings = bookings.filter(b=>b.status==="Pending");

  /* TOP USERS */

  const topUsers = Object.values(
    bookings.reduce((acc,b)=>{
      acc[b.user] = acc[b.user] || {name:b.user,count:0};
      acc[b.user].count++;
      return acc;
    },{})
  ).sort((a,b)=>b.count-a.count).slice(0,5);

  /* FILTER */

  let filteredBookings = bookings.filter((b) => {

    const matchesSearch =
      `${b.user} ${b.parking} ${b.slot} ${b.status}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || b.status === statusFilter;

    const matchesParking =
      parkingFilter === "All" || b.parking === parkingFilter;

    return matchesSearch && matchesStatus && matchesParking;

  });

  filteredBookings.sort((a,b)=>
    sortOrder==="asc"
      ? new Date(a.date)-new Date(b.date)
      : new Date(b.date)-new Date(a.date)
  );

  const totalPages = Math.ceil(filteredBookings.length/itemsPerPage);

  const paginatedBookings =
    filteredBookings.slice((page-1)*itemsPerPage,page*itemsPerPage);

  const handleCancel = (id, user) => {

    setBookings(prev =>
      prev.map(b =>
        b.id === id ? { ...b, status: "Cancelled" } : b
      )
    );

    setToast(`Booking cancelled & ${user} notified`);
    setTimeout(() => setToast(""), 3000);

  };

  const exportCSV=()=>{

    const rows=[
      ["ID","User","Parking","Slot","Date","Amount","Status"],
      ...filteredBookings.map(b=>[
        b.id,b.user,b.parking,b.slot,b.date,b.amount,b.status
      ])
    ];

    const csv=rows.map(r=>r.join(",")).join("\n");

    const blob=new Blob([csv],{type:"text/csv"});
    const link=document.createElement("a");
    link.href=URL.createObjectURL(blob);
    link.download="bookings.csv";
    link.click();

  };

  return (

    <AdminLayout>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">

        <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
          <CalendarDays className="text-blue-600 w-9 h-9"/> Booking Analytics
        </h1>

        {toast && (
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl w-fit">
            <BellRing size={18}/> {toast}
          </div>
        )}

        {/* KPI CARDS */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatCard title="Total Bookings" value={bookings.length}/>
          <StatCard title="Today Bookings" value={todayBookings.length}/>
          <StatCard title="Total Revenue" value={`₹ ${totalRevenue}`}/>
          <StatCard title="Pending Alerts" value={pendingBookings.length}/>

        </div>

        {/* PARKING PERFORMANCE */}

        <Section title="Parking Performance">

          {parkingStats.map(p=>{

            const percent=(p.count/bookings.length)*100;

            return(

              <div key={p.name} className="mb-4">

                <div className="flex justify-between text-sm mb-1">
                  <span>{p.name}</span>
                  <span>{p.count} bookings</span>
                </div>

                <div className="w-full bg-gray-200 h-3 rounded-full">

                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{width:`${percent}%`}}
                  />

                </div>

              </div>

            );

          })}

        </Section>

        {/* TOP USERS */}

        <Section title="Top Users">

          <div className="grid md:grid-cols-5 gap-4">

            {topUsers.map(u=>(
              <div key={u.name} className="bg-white border rounded-xl p-4 text-center shadow">
                <p className="font-semibold">{u.name}</p>
                <p className="text-blue-600 font-bold">{u.count}</p>
                <p className="text-xs text-gray-400">Bookings</p>
              </div>
            ))}

          </div>

        </Section>

        {/* BOOKING TABLE */}

        <Section title="All Bookings">

          <div className="flex flex-wrap gap-3 mb-4">

            <input
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder="Search booking..."
              className="border px-4 py-2 rounded-lg text-sm"
            />

            <select
              value={statusFilter}
              onChange={(e)=>setStatusFilter(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            >
              <option>All</option>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>

            <select
              value={parkingFilter}
              onChange={(e)=>setParkingFilter(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            >
              <option>All</option>
              {parkingStats.map(p=>(
                <option key={p.name}>{p.name}</option>
              ))}
            </select>

            <button
              onClick={()=>setSortOrder(sortOrder==="asc"?"desc":"asc")}
              className="border px-4 py-2 rounded-lg text-sm"
            >
              Sort {sortOrder==="asc"?"↑":"↓"}
            </button>

            <button
              onClick={exportCSV}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Export CSV
            </button>

          </div>

          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="w-full text-sm">

              <thead className="bg-gray-50">

                <tr>

                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">User</th>
                  <th className="p-4 text-left">Parking</th>
                  <th className="p-4 text-left">Slot</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-right">Action</th>

                </tr>

              </thead>

              <tbody>

                {paginatedBookings.map(b=>(
                  <tr key={b.id} className="border-t hover:bg-gray-50">

                    <td className="p-4">{b.id}</td>
                    <td className="p-4">{b.user}</td>
                    <td className="p-4">{b.parking}</td>
                    <td className="p-4">{b.slot}</td>
                    <td className="p-4">{b.date}</td>
                    <td className="p-4 text-blue-600 font-semibold">₹ {b.amount}</td>

                    <td className="p-4">
                      <StatusBadge status={b.status}/>
                    </td>

                    <td className="p-4 text-right flex gap-2 justify-end">

                      <button
                        onClick={()=>setSelectedBooking(b)}
                        className="bg-gray-200 px-3 py-1 rounded-lg text-xs flex items-center gap-1"
                      >
                        <Eye size={14}/> View
                      </button>

                      {b.status==="Pending"&&(
                        <button
                          onClick={()=>handleCancel(b.id,b.user)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs"
                        >
                          Cancel
                        </button>
                      )}

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {/* PAGINATION */}

          <div className="flex justify-center gap-2 mt-4">

            {[...Array(totalPages)].map((_,i)=>(
              <button
                key={i}
                onClick={()=>setPage(i+1)}
                className={`px-3 py-1 rounded-lg ${
                  page===i+1?"bg-blue-600 text-white":"bg-gray-200"
                }`}
              >
                {i+1}
              </button>
            ))}

          </div>

        </Section>

      </div>

    </AdminLayout>

  );
}

/* COMPONENTS */

const StatCard=({title,value})=>(
  <div className="bg-white border p-6 rounded-2xl shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-3xl font-bold text-blue-600 mt-2">{value}</h2>
  </div>
);

const Section=({title,children})=>(
  <div className="space-y-5">
    <h2 className="text-xl font-semibold">{title}</h2>
    {children}
  </div>
);

const StatusBadge=({status})=>(
  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
    status==="Confirmed"?"bg-green-100 text-green-600":
    status==="Pending"?"bg-yellow-100 text-yellow-600":
    "bg-red-100 text-red-500"
  }`}>
    {status}
  </span>
);