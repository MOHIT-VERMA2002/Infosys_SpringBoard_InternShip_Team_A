import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import ReportCard from "./ReportCard";
import Chart from "react-apexcharts";
import { Search } from "lucide-react";

export default function ParkingReports() {

  const [bookings, setBookings] = useState([]);
  const [selectedParking, setSelectedParking] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {

    const parkings = ["Phoenix Mall","Airport","Lulu Mall"];

    const data = Array.from({ length: 12 }, (_, i) => ({
      parking: parkings[i % parkings.length],
      user: ["Rahul","Amit","Sara"][i % 3],
      amount: 100 + i * 20,
      date: `2026-02-${10 + i}`
    }));

    setBookings(data);
    setSelectedParking(parkings[0]);

  }, []);

  const parkings = [...new Set(bookings.map(b => b.parking))];

  const filtered = parkings.filter(p =>
    p.toLowerCase().includes(search.toLowerCase())
  );

  const data = bookings.filter(b => b.parking === selectedParking);
  const revenue = data.reduce((a,b)=>a+b.amount,0);

  const chart = {
    series: [{ name:"Revenue", data: data.map(d=>d.amount) }],
    options: {
      chart: { toolbar: { show:false }},
      xaxis: { categories: data.map(d=>d.date) }
    }
  };

  return (
    <AdminLayout>

      {/* Sticky Search */}
      <div className="sticky top-0 bg-white p-3 shadow flex gap-2">
        <Search size={18}/>
        <input placeholder="Search parking..." onChange={e=>setSearch(e.target.value)} />
      </div>

      {/* Parking Buttons */}
      <div className="flex gap-2 flex-wrap p-4">
        {filtered.map(p => (
          <button key={p} onClick={()=>setSelectedParking(p)}
            className={`px-3 py-2 rounded ${selectedParking===p?"bg-blue-600 text-white":"bg-gray-200"}`}>
            {p}
          </button>
        ))}
      </div>

      <ReportCard title={`Parking 360° – ${selectedParking}`}>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-4">

            <div className="grid grid-cols-3 gap-4">
              <Stat label="Bookings" value={data.length}/>
              <Stat label="Revenue" value={`₹${revenue}`}/>
              <Stat label="Users" value={[...new Set(data.map(d=>d.user))].length}/>
            </div>

            <Table rows={data}/>

          </div>

          <Chart options={chart.options} series={chart.series} type="bar" height={300}/>

        </div>

      </ReportCard>

    </AdminLayout>
  );
}

const Stat = ({label,value}) => (
  <div className="bg-blue-50 p-4 rounded"><p>{label}</p><h3>{value}</h3></div>
);

const Table = ({ rows }) => (
  <table className="w-full text-sm">
    <thead><tr><th>User</th><th>Amount</th><th>Date</th></tr></thead>
    <tbody>{rows.map((r,i)=>(<tr key={i}><td>{r.user}</td><td>₹{r.amount}</td><td>{r.date}</td></tr>))}</tbody>
  </table>
);