import { useEffect, useState, useMemo } from "react";
import ReportCard from "./ReportCard";
import { Search, CalendarDays, Download } from "lucide-react";
import AdminLayout from "@/layouts/AdminLayout";

import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

export default function Reports() {

  const [section, setSection] = useState("parking");
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedParking, setSelectedParking] = useState(null);

  const usersMaster = [
    {
      name: "Rahul",
      phone: "9876543210",
      email: "rahul@mail.com",
      joinDate: "2025-01-10",
      vehicles: ["UP32AB1234"],
    },
    {
      name: "Amit",
      phone: "9999999999",
      email: "amit@mail.com",
      joinDate: "2024-12-01",
      vehicles: ["UP32CD5678"],
    }
  ];

  const parkingMaster = [
    {
      name: "Phoenix Mall",
      slots: 500,
      location: "Lucknow",
      owner: "Phoenix Group"
    },
    {
      name: "Airport",
      slots: 300,
      location: "Lucknow Airport",
      owner: "AAI"
    }
  ];

  useEffect(() => {

    const users = ["Rahul","Amit","Sara","John"];
    const parkings = ["Phoenix Mall","Airport"];

    const data = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      user: users[i % users.length],
      parking: parkings[i % parkings.length],
      car: `UP32 AB 12${i}`,
      amount: 100 + i * 20,
      date: new Date(Date.now() - i * 86400000)
    }));

    setBookings(data);

    /* default selection = first element */
    setSelectedUser(users[0]);
    setSelectedParking(parkings[0]);

  }, []);

  const last7DaysData = useMemo(() => {
    const last7 = new Date();
    last7.setDate(last7.getDate() - 7);
    return bookings.filter(b => new Date(b.date) >= last7);
  }, [bookings]);

  const users = [...new Set(last7DaysData.map(b => b.user))];
  const parkings = [...new Set(last7DaysData.map(b => b.parking))];

  const userBookings = last7DaysData.filter(b => b.user === selectedUser);
  const parkingBookings = last7DaysData.filter(b => b.parking === selectedParking);

  const selectedUserData = usersMaster.find(u => u.name === selectedUser);
  const selectedParkingData = parkingMaster.find(p => p.name === selectedParking);

  const downloadPDF = (rows, fileName, userDetails = null, parkingDetails = null) => {

    if (!rows.length) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`${fileName} Report`, 14, 15);

    let startY = 25;

    if (userDetails) {

      doc.setFontSize(12);

      doc.text(`Name: ${userDetails.name}`, 14, startY);
      doc.text(`Phone: ${userDetails.phone}`, 14, startY + 8);
      doc.text(`Email: ${userDetails.email}`, 14, startY + 16);
      doc.text(`Joined: ${userDetails.joinDate}`, 14, startY + 24);
      doc.text(`Vehicles: ${userDetails.vehicles.join(", ")}`, 14, startY + 32);

      startY += 40;
    }

    if (parkingDetails) {

      doc.setFontSize(12);

      doc.text(`Parking Name: ${parkingDetails.name}`, 14, startY);
      doc.text(`Total Slots: ${parkingDetails.slots}`, 14, startY + 8);
      doc.text(`Location: ${parkingDetails.location}`, 14, startY + 16);
      doc.text(`Owner: ${parkingDetails.owner}`, 14, startY + 24);

      startY += 35;
    }

    const tableData = rows.map((r) => [
      r.user,
      r.parking,
      r.car,
      `₹${r.amount}`,
      new Date(r.date).toLocaleDateString()
    ]);

    autoTable(doc, {
      head: [["User", "Parking", "Car", "Amount", "Date"]],
      body: tableData,
      startY: startY,
    });

    doc.save(`${fileName}-report.pdf`);
  };

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      <div className="flex gap-3 mb-5">
        <Tab id="parking" label="Parking" {...{section,setSection}}/>
        <Tab id="users" label="Users" {...{section,setSection}}/>
      </div>

      <div className="sticky top-0 z-10 bg-white pb-4">
        <div className="flex items-center gap-3 border rounded-xl px-4 py-3 shadow-sm">
          <Search size={18} className="text-gray-400"/>
          <input
            placeholder={`Search ${section}...`}
            className="w-full outline-none"
            onChange={(e)=>setSearch(e.target.value)}
          />
          <CalendarDays size={18} className="text-gray-400"/>
          <span className="text-xs text-gray-500">Last 7 days</span>
        </div>
      </div>

      {section === "parking" && (
        <>
          <List
            items={parkings.filter(p=>p.toLowerCase().includes(search.toLowerCase()))}
            onSelect={setSelectedParking}
          />

          {selectedParking && (
            <ReportCard
              title={`Parking 360° – ${selectedParking}`}
              action={
                <DownloadBtn 
                  onClick={() => downloadPDF(parkingBookings, selectedParking, null, selectedParkingData)}
                />
              }
            >
              <Stats rows={parkingBookings}/>
              <Parking360 name={selectedParking} bookings={parkingBookings}/>
              <Table rows={parkingBookings}/>
            </ReportCard>
          )}
        </>
      )}

      {section === "users" && (
        <>
          <List
            items={users.filter(u=>u.toLowerCase().includes(search.toLowerCase()))}
            onSelect={setSelectedUser}
          />

          {selectedUser && (
            <ReportCard
              title={`User 360° – ${selectedUser}`}
              action={
                <DownloadBtn 
                  onClick={() => downloadPDF(userBookings, selectedUser, selectedUserData)}
                />
              }
            >
              <Stats rows={userBookings}/>
              <User360 user={selectedUserData} bookings={userBookings}/>
              <Table rows={userBookings}/>
            </ReportCard>
          )}
        </>
      )}

    </AdminLayout>
  );
}

const DownloadBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
  >
    <Download size={16}/> Download PDF
  </button>
);

const Tab = ({ id, label, section, setSection }) => (
  <button
    onClick={() => setSection(id)}
    className={`px-5 py-2.5 rounded-xl text-sm font-medium
      ${section === id
        ? "bg-blue-600 text-white shadow"
        : "bg-gray-100 hover:bg-gray-200"}
    `}
  >
    {label}
  </button>
);

const List = ({ items, onSelect }) => (
  <div className="flex gap-2 flex-wrap my-4">
    {items.map(i => (
      <button
        key={i}
        onClick={() => onSelect(i)}
        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-600"
      >
        {i}
      </button>
    ))}
  </div>
);

const Stats = ({ rows }) => {
  const revenue = rows.reduce((a,b)=>a+b.amount,0);
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <Card label="Bookings" value={rows.length}/>
      <Card label="Revenue" value={`₹${revenue}`}/>
      <Card label="Vehicles" value={[...new Set(rows.map(r=>r.car))].length}/>
    </div>
  );
};

const Card = ({ label, value }) => (
  <div className="bg-blue-50 p-4 rounded-xl">
    <p className="text-sm text-gray-600">{label}</p>
    <h3 className="text-xl font-bold text-blue-700">{value}</h3>
  </div>
);

const User360 = ({ user, bookings }) => {
  const totalSpent = bookings.reduce((a,b)=>a+b.amount,0);
  return (
    <div className="bg-gray-50 p-4 rounded-xl space-y-2">
      {user && (
        <>
          <p>📞 {user.phone}</p>
          <p>📧 {user.email}</p>
          <p>📅 Joined: {user.joinDate}</p>
          <p>🚗 Vehicles: {user.vehicles.join(", ")}</p>
        </>
      )}
      <p className="font-semibold">💰 Total Spent: ₹{totalSpent}</p>
    </div>
  );
};

const Parking360 = ({ name, bookings }) => {
  const revenue = bookings.reduce((a,b)=>a+b.amount,0);
  return (
    <div className="bg-gray-50 p-4 rounded-xl space-y-2">
      <p className="font-semibold">{name}</p>
      <p>Total Slots: 500</p>
      <p>Revenue: ₹{revenue}</p>
    </div>
  );
};

const Table = ({ rows }) => (
  <div className="overflow-x-auto mt-4 border rounded-xl">
    <table className="w-full text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">User</th>
          <th className="p-3 text-left">Parking</th>
          <th className="p-3 text-left">Car</th>
          <th className="p-3 text-left">Amount</th>
          <th className="p-3 text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id} className="border-t">
            <td className="p-3">{r.user}</td>
            <td className="p-3">{r.parking}</td>
            <td className="p-3">{r.car}</td>
            <td className="p-3 text-green-600">₹{r.amount}</td>
            <td className="p-3">{new Date(r.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);