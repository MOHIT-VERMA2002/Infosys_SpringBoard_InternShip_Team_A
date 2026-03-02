import { useState } from 'react';
import { MapPin, Calendar, CreditCard, Navigation, LayoutDashboard, BarChart3 } from 'lucide-react';
import FeatureCard from '../components/features/FeatureCard';

export default function WhyChoose() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: MapPin,
      title: 'Real-Time Parking Availability',
      description: 'Find available parking instantly with live updates.',
    },
    {
      icon: Calendar,
      title: 'Advance Slot Reservation',
      description: 'Reserve your parking spot before you arrive.',
    },
    {
      icon: CreditCard,
      title: 'Secure Online Payment',
      description: 'Safe digital payment with instant confirmation.',
    },
    {
      icon: Navigation,
      title: 'Smart Location Detection',
      description: 'Automatically find the nearest parking spots.',
    },
    {
      icon: LayoutDashboard,
      title: 'User Dashboard',
      description: 'Track active bookings and view parking history.',
    },
    {
      icon: BarChart3,
      title: 'Admin Analytics Panel',
      description: 'Monitor parking occupancy and revenue insights.',
    },
  ];
  return (
  <div className="relative h-screen bg-white w-full overflow-hidden  py-20 px-6">

    {/* Overlay */}
    {/* <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div> */}

    {/* Content */}
    <div className="relative z-10 max-w-6xl mx-auto">

      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-3">
          Why Choose ParkEase?
        </h1>
        <p className="text-base sm:text-lg text-mist-500 max-w-2xl mx-auto">
          Experience seamless parking with our comprehensive suite of features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            isHovered={hoveredCard === index}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          />
        ))}
      </div>

    </div>
  </div>
);

}
