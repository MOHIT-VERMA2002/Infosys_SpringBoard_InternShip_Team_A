import AdminLayout from "@/layouts/AdminLayout";
import { useState } from "react";

export default function AdminProfile() {

  const [image, setImage] = useState(
    localStorage.getItem("adminImage") || ""
  );

  const [form, setForm] = useState({
    name: "Amit Admin",
    email: "admin@mail.com",
    phone: "9876543210",
    city: "Lucknow",
    department: "Operations",
    organization: "Smart Parking Pvt Ltd",
    password: ""
  });

  const staticData = {
    adminId: "ADM-1025",
    role: "Admin",
    createdAt: "10 Jan 2025",
    lastLogin: "21 Feb 2026, 10:45 AM",
    status: "Active"
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImage(url);
    localStorage.setItem("adminImage", url);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <AdminLayout>

      <div className="max-w-6xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold text-gray-800">Admin Profile</h1>

        {/* PROFILE HEADER */}
        <div className="bg-white p-6 rounded-2xl shadow flex flex-col md:flex-row gap-6 items-center">

          <div className="text-center">
            <img
              src={image || "https://i.pravatar.cc/150?img=12"}
              className="w-32 h-32 rounded-full object-cover border-4 border-teal-500"
            />

            <label className="block mt-3 text-sm text-blue-600 cursor-pointer">
              Change Photo
              <input type="file" hidden onChange={handleImage}/>
            </label>
          </div>

          <div>
            <h2 className="text-xl font-semibold">{form.name}</h2>
            <p className="text-gray-500">{staticData.role}</p>
            <p className="text-gray-400 text-sm">{form.email}</p>

            <span className="inline-block mt-2 text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
              {staticData.status}
            </span>
          </div>

        </div>

        {/* ADMIN INFO (READ ONLY) */}
        <Section title="Admin Information">
          <ReadOnly label="Admin ID" value={staticData.adminId}/>
          <ReadOnly label="Role" value={staticData.role}/>
          <ReadOnly label="Account Created" value={staticData.createdAt}/>
          <ReadOnly label="Last Login" value={staticData.lastLogin}/>
        </Section>

        {/* PERSONAL INFO */}
        <Section title="Personal Information">
          <Input label="Full Name" name="name" value={form.name} onChange={handleChange}/>
          <Input label="Email" name="email" value={form.email} onChange={handleChange}/>
          <Input label="Phone" name="phone" value={form.phone} onChange={handleChange}/>
          <Input label="City" name="city" value={form.city} onChange={handleChange}/>
        </Section>

        {/* ORGANIZATION */}
        <Section title="Organization Details">
          <Input label="Department" name="department" value={form.department} onChange={handleChange}/>
          <Input label="Organization" name="organization" value={form.organization} onChange={handleChange}/>
        </Section>

        {/* SECURITY */}
        <Section title="Security">
          <Input label="New Password" name="password" value={form.password} onChange={handleChange}/>
        </Section>

        <button className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700">
          Save Changes
        </button>

      </div>

    </AdminLayout>
  );
}

const Section = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow space-y-4">
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <div className="grid md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-sm text-gray-500">{label}</label>
    <input
      {...props}
      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
    />
  </div>
);

const ReadOnly = ({ label, value }) => (
  <div className="space-y-1">
    <label className="text-sm text-gray-500">{label}</label>
    <input
      value={value}
      readOnly
      className="w-full border bg-gray-100 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed"
    />
  </div>
);