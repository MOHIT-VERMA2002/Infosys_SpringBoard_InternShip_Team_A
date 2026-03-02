import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import BookParking from "./pages/BookParking";
import ParkingStatus from "./pages/ParkingStatus";
import MyBooking from "./pages/MyBooking";
import BookingConfirm from "./pages/BookingConfirm";
import Profile from "./pages/Profile";
import { useAuth } from "./context/AuthContext";
import Help from "./pages/Help";
import Feedback from "./pages/Feedback";
import WhyChoose from './pages/WhyChoose.jsx';
import FAQ from './pages/FAQ.jsx';
import ForgotPassword from "./pages/ForgotPassword";
import Features from "./pages/Features";
import About from "./pages/About";
import Payment from "./pages/Payment";
import PaymentHistory from "./pages/PaymentHistory";
import ParkingRates from './pages/ParkingRates';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* PROTECTED WITH MAIN LAYOUT */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/book-parking" element={<BookParking />} />
          <Route path="/parking-status" element={<ParkingStatus />} />
          <Route path="/my-booking" element={<MyBooking />} />
          <Route path="/booking-confirm" element={<BookingConfirm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/why-choose" element={<WhyChoose />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/parking-rates" element={<ParkingRates />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
