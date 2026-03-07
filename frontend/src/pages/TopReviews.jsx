import Pro1 from "../assets/Pro1.png";
import Pro2 from "../assets/Pro2.png";
import Pro3 from "../assets/Pro3.png";
import Pro4 from "../assets/Pro4.png";
import Pro5 from "../assets/Pro5.png";

const reviews = [
  {
    name: "Rahul Sharma",
    rating: 5,
    comment: "Very easy parking booking. Saved a lot of time!",
    image: Pro1,
  },
  {
    name: "Priya Singh",
    rating: 4,
    comment: "Clean parking area and good security.",
    image: Pro2,
  },
  {
    name: "Amit Kumar",
    rating: 5,
    comment: "Best parking app I have used so far.",
    image: Pro3,
  },
  {
    name: "Neha Verma",
    rating: 4,
    comment: "Real-time slot availability works great.",
    image: Pro4,
  },
  {
    name: "Rohit Mehta",
    rating: 5,
    comment: "Very convenient for daily office parking.",
    image: Pro5,
  },
];

const TopReviews = () => {
  return (
    <section className="bg-white py-16 overflow-hidden text-black">

      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-green-700">
          What Users Say
        </h2>
        <p className="text-gray-600 mt-2">
          Real feedback from ParkEase users
        </p>
      </div>

      {/* Scrolling container */}
      <div className="relative w-full overflow-hidden">

        <div className="flex gap-6 animate-scroll">

          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={index}
              className="min-w-[320px] bg-gray-50 shadow-md rounded-xl p-6 hover:shadow-lg transition"
            >

              {/* Profile Section */}
              <div className="flex items-center gap-4 mb-3">

                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />

                <div>
                  <h3 className="font-semibold text-black">
                    {review.name}
                  </h3>

                  <p className="text-green-600 text-sm">
                    {"⭐".repeat(review.rating)}
                  </p>
                </div>

              </div>

              {/* Comment */}
              <p className="text-gray-700 mt-2 leading-relaxed">
                {review.comment}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default TopReviews;