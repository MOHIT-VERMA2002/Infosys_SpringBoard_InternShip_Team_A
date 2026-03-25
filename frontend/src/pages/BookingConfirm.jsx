import { useLocation, useNavigate } from "react-router-dom";
import { createOrder, verifyPayment } from "@/api/paymentApi";

const BookingConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  const handlePayment = async () => {
    try {
      const orderResponse = await createOrder(booking);

      const orderData =
        typeof orderResponse === "string"
          ? JSON.parse(orderResponse)
          : orderResponse;

      const options = {
        key: "YOUR_RAZORPAY_KEY",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ParkEasy",
        description: "Parking Booking",
        order_id: orderData.id,

        handler: async function (response) {
          await verifyPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id
          ); // ❌ removed extra comma

          alert("Payment Successful ✅");
          navigate("/my-bookings");
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment Failed ❌");
    }
  };

  if (!booking) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-semibold text-red-600">
          No Booking Data Found
        </h2>
        <button
          onClick={() => navigate("/my-bookings")}
          className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
        >
          Back to My Bookings
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6 text-black">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Booking Confirmation
        </h1>

        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {booking.name}</p>
          <p><strong>Phone:</strong> {booking.phone}</p>
          <p><strong>Vehicle:</strong> {booking.vehicleNumber}</p>
          <p><strong>Parking ID:</strong> {booking.parkingId}</p>
          <p><strong>Amount:</strong> ₹{booking.amount}</p>
          <p><strong>Starting Time:</strong> {new Date(booking.startDate).toLocaleString()}</p>
          <p><strong>Ending Time:</strong> {new Date(booking.endDate).toLocaleString()}</p>
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
        >
          Pay Now
        </button>
        <button
          onClick={() => navigate(-1)}
          className="w-full mt-2 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-semibold text-lg py-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BookingConfirm;