"use client";
import { useState, useEffect } from "react";

export default function Rating() {
  const [rating, setRating] = useState(0); // rating yang dipilih user
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);

  const fetchRatings = async () => {
    const res = await fetch("/api/ratings");
    const data = await res.json();
    setAverage(data.average);
    setCount(data.total);
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const submitRating = async (value: number) => {
    setRating(value);
    await fetch("/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: value }),
    });
    fetchRatings();
  };

  return (
    <div className="text-center mt-10">
      <p className="text-lg font-semibold mb-2">⭐️ Rating {average.toFixed(1)} (from {count} voters)</p>
      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => submitRating(star)}
            className={`text-3xl ${
              rating >= star ? "text-yellow-400" : "text-gray-400"
            } hover:scale-125 transition-transform`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}
