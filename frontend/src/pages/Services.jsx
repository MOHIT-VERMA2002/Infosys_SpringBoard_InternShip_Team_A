import { FaCar, FaMotorcycle, FaChargingStation, FaShieldAlt, FaClock } from "react-icons/fa";

const services = [
  {
    icon: <FaCar className="text-4xl text-green-600" />,
    title: "Car Parking",
    desc: "Secure parking spaces available for cars with real-time slot availability.",
  },
  {
    icon: <FaMotorcycle className="text-4xl text-green-600" />,
    title: "Bike Parking",
    desc: "Affordable parking spots specially designed for motorcycles and scooters.",
  },
  {
    icon: <FaClock className="text-4xl text-green-600" />,
    title: "Hourly Parking",
    desc: "Flexible hourly parking for quick visits and short stops.",
  },
  {
    icon: <FaChargingStation className="text-4xl text-green-600" />,
    title: "EV Charging",
    desc: "Electric vehicle charging stations available at selected parking locations.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-green-600" />,
    title: "24/7 Security",
    desc: "CCTV monitoring and security guards to keep your vehicle safe.",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 text-black">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            Our Parking Services
          </h1>
          <p className="text-gray-600">
            ParkEase provides smart, secure, and convenient parking solutions
            for every type of vehicle.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
            >
              <div className="mb-4 flex justify-center">
                {service.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {service.title}
              </h3>

              <p className="text-gray-600">
                {service.desc}
              </p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Services;