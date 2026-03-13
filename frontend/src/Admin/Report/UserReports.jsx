import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import ReportCard from "./ReportCard";
import Chart from "react-apexcharts";
import { Search, Crown } from "lucide-react";

export default function UserReports() {

  const [bookings, setBookings] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [search, setSearch] = useState("");

  const usersMaster = [{
    name:"Rahul",
    phone:"9876543210",
    joinDate:"2025-01-10",
    address:"Lucknow",
    card:"****4587",
    type:"Premium"
  }];

  useEffect(()=>{

    const data = Array.from({ length: 12 }, (_, i) => ({
      user:["Rahul","Amit","Sara"][i%3],
      amount:100+i*20,
      date:`2026-02-${10+i}`
    }));

    setBookings(data);
    setSelectedUser("Rahul");

  },[]);

  const users = [...new Set(bookings.map(b=>b.user))];

  const filtered = users.filter(u=>u.toLowerCase().includes(search.toLowerCase()));
  const data = bookings.filter(b=>b.user===selectedUser);
  const profile = usersMaster.find(u=>u.name===selectedUser);
  const totalSpent = data.reduce((a,b)=>a+b.amount,0);

  const chart = {
    series: data.map(d=>d.amount),
    options:{ labels:data.map(d=>d.date) }
  };

  return (
    <AdminLayout>

      <div className="sticky top-0 bg-white p-3 shadow flex gap-2">
        <Search size={18}/>
        <input placeholder="Search user..." onChange={e=>setSearch(e.target.value)} />
      </div>

      <div className="flex gap-2 flex-wrap p-4">
        {filtered.map(u => (
          <button key={u} onClick={()=>setSelectedUser(u)} className="bg-gray-200 px-3 py-2 rounded flex gap-1">
            {u==="Rahul" && <Crown size={14}/>} {u}
          </button>
        ))}
      </div>

      <ReportCard title={`User 360° – ${selectedUser}`}>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-4">

            {profile && (
              <div className="bg-gray-100 p-4 rounded">
                <p>📅 {profile.joinDate}</p>
                <p>📞 {profile.phone}</p>
                <p>🏠 {profile.address}</p>
                <p>💳 {profile.card}</p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <Stat label="Bookings" value={data.length}/>
              <Stat label="Spent" value={`₹${totalSpent}`}/>
              <Stat label="Last Visit" value={data.at(-1)?.date}/>
            </div>

            <Table rows={data}/>

          </div>

          <Chart options={chart.options} series={chart.series} type="donut" height={300}/>

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
    <thead><tr><th>Amount</th><th>Date</th></tr></thead>
    <tbody>{rows.map((r,i)=>(<tr key={i}><td>₹{r.amount}</td><td>{r.date}</td></tr>))}</tbody>
  </table>
);