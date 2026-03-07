import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SiPaytm, SiPhonepe, SiAmazon } from "react-icons/si";
import { FaCheckCircle } from "react-icons/fa";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking;
  const mode = location.state?.mode;

  const [method, setMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [wallet, setWallet] = useState("");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        No booking details found.
      </div>
    );
  }

  const price =
    mode === "HOURLY"
      ? `₹${booking.hourly} / hr`
      : `₹${booking.monthly} / month`;

  const handlePay = () => {
    if (!method) {
      alert("Please select a payment method");
      return;
    }
    setPaymentSuccess(true);
  };

  /* PAYMENT SUCCESS SCREEN */
  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-xl bg-white rounded-2xl p-10 shadow-xl text-center space-y-6">
          <FaCheckCircle className="text-green-600 text-6xl mx-auto" />

          <h2 className="text-2xl font-bold text-gray-900">
            Payment Successful
          </h2>

          <p className="text-gray-600">
            Your parking has been booked successfully.
          </p>

          <button
            onClick={() =>
              navigate("/my-booking", {
                state: {
                  newBooking: {
                    ...booking,
                    mode,
                    paymentMethod: method,
                    wallet,
                    status: "Active",
                  },
                },
              })
            }
            className="mt-4 w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
          >
            View Booking Details
          </button>
        </div>
      </div>
    );
  }

  /* PAYMENT FORM */
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow-md space-y-8">
        
        {/* HEADER */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Payment
          </h1>
          <p className="text-gray-600">
            Complete your payment to confirm booking.
          </p>
        </div>

        {/* BOOKING DETAILS */}
        <div className="border rounded-xl p-5 text-gray-700 space-y-2">
          <p><strong>Location:</strong> {booking.name}</p>
          <p><strong>Address:</strong> {booking.address}</p>
          <p>
            <strong>Plan:</strong> {mode === "HOURLY" ? "Hourly" : "Monthly"}
          </p>
          <p className="text-green-600 font-semibold text-lg">{price}</p>
        </div>

        {/* PAYMENT METHODS */}
        <div className="space-y-4">
          <h2 className="font-semibold text-gray-900 text-lg">
            Select Payment Method
          </h2>

          {/* UPI */}
          <label className="block border rounded-lg p-4 cursor-pointer text-black hover:border-green-500">
            <input
              type="radio"
              name="payment"
              onChange={() => setMethod("UPI")}
              className="mr-2"
            />
            UPI
          </label>

          {method === "UPI" && (
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}

          {/* CARD */}
          <label className="block border rounded-lg p-4 cursor-pointer text-black hover:border-green-500">
            <input
              type="radio"
              name="payment"
              onChange={() => setMethod("CARD")}
              className="mr-2"
            />
            Debit / Credit Card
          </label>

          {method === "CARD" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
              <input
                placeholder="Card Number"
                className="border rounded-lg px-4 py-3 md:col-span-2"
                value={card.number}
                onChange={(e) => setCard({ ...card, number: e.target.value })}
              />
              <input
                placeholder="Name on Card"
                className="border rounded-lg px-4 py-3 md:col-span-2"
                value={card.name}
                onChange={(e) => setCard({ ...card, name: e.target.value })}
              />
              <input
                placeholder="MM/YY"
                className="border rounded-lg px-4 py-3"
                value={card.expiry}
                onChange={(e) => setCard({ ...card, expiry: e.target.value })}
              />
              <input
                placeholder="CVV"
                className="border rounded-lg px-4 py-3"
                value={card.cvv}
                onChange={(e) => setCard({ ...card, cvv: e.target.value })}
              />
            </div>
          )}

          {/* WALLET */}
          <label className="block border rounded-lg p-4 cursor-pointer text-black hover:border-green-500">
            <input
              type="radio"
              name="payment"
              onChange={() => setMethod("WALLET")}
              className="mr-2"
            />
            Wallet
          </label>

          {method === "WALLET" && (
            <div className="space-y-3 text-black">
              <button
                onClick={() => setWallet("Paytm")}
                className="w-full flex items-center gap-3 border rounded-lg px-4 py-3 hover:bg-gray-50"
              >
                <SiPaytm className="text-blue-600 text-xl" /> Paytm
              </button>

              <button
                onClick={() => setWallet("PhonePe")}
                className="w-full flex items-center gap-3 border rounded-lg px-4 py-3 hover:bg-gray-50"
              >
                <SiPhonepe className="text-purple-600 text-xl" /> PhonePe
              </button>

              <button
                onClick={() => setWallet("Amazon Pay")}
                className="w-full flex items-center gap-3 border rounded-lg px-4 py-3 hover:bg-gray-50"
              >
                <SiAmazon className="text-yellow-600 text-xl" /> Amazon Pay
              </button>
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="w-full md:w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium"
          >
            Back
          </button>

          <button
            onClick={handlePay}
            className="w-full md:w-1/2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
          >
            Pay & Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;