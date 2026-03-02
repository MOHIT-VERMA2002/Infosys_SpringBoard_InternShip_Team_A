import { useState } from "react";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState("Parking Experience");
  const [recommend, setRecommend] = useState("");
  const [checks, setChecks] = useState({
    easyBooking: false,
    clearNavigation: false,
    accurateAvailability: false,
    smoothEntry: false,
  });

  const [submittedFeedbacks, setSubmittedFeedbacks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleCheckChange = (e) => {
    setChecks({ ...checks, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      category,
      rating,
      comment,
      recommend,
      checks,
      date: new Date().toLocaleString(),
    };

    if (editIndex !== null) {
      const updated = [...submittedFeedbacks];
      updated[editIndex] = newFeedback;
      setSubmittedFeedbacks(updated);
      setEditIndex(null);
    } else {
      setSubmittedFeedbacks([newFeedback, ...submittedFeedbacks]);
    }

    // reset form
    setRating(0);
    setComment("");
    setCategory("Parking Experience");
    setRecommend("");
    setChecks({
      easyBooking: false,
      clearNavigation: false,
      accurateAvailability: false,
      smoothEntry: false,
    });
  };

  const handleEdit = (fb, index) => {
    setCategory(fb.category);
    setRating(fb.rating);
    setComment(fb.comment);
    setRecommend(fb.recommend);
    setChecks(fb.checks);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    setSubmittedFeedbacks(
      submittedFeedbacks.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="pb-24">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-xl max-w-4xl mx-auto space-y-10">

        {/* HEADER */}
        <section>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Feedback
          </h1>
          <p className="text-gray-600">
            Your feedback helps us improve the ParkEase experience.
          </p>
        </section>

        {/* FEEDBACK FORM */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* CATEGORY */}
          <section>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border rounded-md text-gray-900"
            >
              <option>Parking Experience</option>
              <option>App Usability</option>
              <option>Payment Process</option>
              <option>QR Entry & Exit</option>
              <option>Other</option>
            </select>
          </section>

          {/* RATING */}
          <section>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rate your overall experience
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </section>

          {/* CHECKBOXES */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              What did you like?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              {Object.entries({
                easyBooking: "Easy booking process",
                clearNavigation: "Clear app navigation",
                accurateAvailability: "Accurate parking availability",
                smoothEntry: "Smooth QR entry process",
              }).map(([key, label]) => (
                <label key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={key}
                    checked={checks[key]}
                    onChange={handleCheckChange}
                  />
                  {label}
                </label>
              ))}
            </div>
          </section>

          {/* RECOMMEND */}
          <section>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Would you recommend ParkEase to others?
            </label>
            <div className="flex gap-6 text-black">
              {["Yes", "No"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-black">
                  <input
                    type="radio"
                    name="recommend"
                    value={opt}
                    checked={recommend === opt}
                    onChange={(e) => setRecommend(e.target.value)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </section>

          {/* COMMENT */}
          <section>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-black">
              Additional Comments
            </label>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-3 border rounded-md text-black"
              required
            />
          </section>

          {/* SUBMIT */}
          <section className="flex justify-end text-black">
            <button
              type="submit"
              className={`px-6 py-3 ${
                editIndex !== null
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white rounded-lg`}
            >
              {editIndex !== null ? "Update Feedback" : "Submit Feedback"}
            </button>
          </section>

        </form>

        {/* SUBMITTED FEEDBACK */}
        {submittedFeedbacks.length > 0 && (
          <section className="space-y-6 text-black">
            <h2 className="text-2xl font-bold text-gray-900">
              Submitted Feedback
            </h2>

            <div className="grid gap-6">
              {submittedFeedbacks.map((fb, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-2xl shadow-lg p-6"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-blue-600 font-semibold">
                      {fb.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {fb.date}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-2xl ${
                          fb.rating >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="mb-3">{fb.comment}</p>

                  <p className="text-sm mb-1">
                    <strong>Recommend:</strong>{" "}
                    <span
                      className={
                        fb.recommend === "Yes"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {fb.recommend}
                    </span>
                  </p>

                  <p className="text-sm mb-4">
                    <strong>Liked:</strong>{" "}
                    {Object.keys(fb.checks)
                      .filter((k) => fb.checks[k])
                      .join(", ") || "—"}
                  </p>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleEdit(fb, index)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default Feedback;