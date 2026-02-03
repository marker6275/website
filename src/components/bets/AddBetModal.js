"use client";

import { useState } from "react";
import { leagueOptions } from "./BetUtils";

export function AddBetModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    odds: "",
    league: [],
    line: "",
    result: "Open",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submit, setSubmit] = useState({ success: false, error: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSubmit({ success: false, error: false });
  };

  const handleLeagueChange = (selectedLeague) => {
    setFormData((prev) => ({
      ...prev,
      league: prev.league.includes(selectedLeague)
        ? prev.league.filter((l) => l !== selectedLeague)
        : [...prev.league, selectedLeague],
    }));
  };

  const removeLeague = (leagueToRemove) => {
    setFormData((prev) => ({
      ...prev,
      league: prev.league.filter((l) => l !== leagueToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formData.league.length === 0) {
      alert("Please select at least one league/sport");
      setIsLoading(false);
      return;
    }

    const values = [
      formData.date,
      formData.amount === "" ? "" : parseFloat(formData.amount),
      formData.odds,
      formData.result,
      `$0.00`,
      formData.league.join(","),
      formData.line,
    ];

    try {
      const password = sessionStorage.getItem("password_input");
      if (!password) {
        alert("Please enter your password first");
        setIsLoading(false);
        return;
      }

      const response = await fetch("/bets/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values, update: false, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        alert(`Error: ${errorData.error || "Failed to add bet"}`);
        setIsLoading(false);
        setSubmit({ success: false, error: true });
        return;
      }

      await response.json();
    } catch (error) {
      console.error("Network Error:", error);
      alert(`Network Error: ${error.message}`);
      setIsLoading(false);
      setSubmit({ success: false, error: true });
      return;
    }

    setFormData({
      date: new Date().toISOString().split("T")[0],
      amount: "",
      odds: "",
      league: [],
      line: "",
      result: "Open",
    });

    setIsLoading(false);
    setSubmit({ success: true, error: false });
  };

  const handleClose = () => {
    setSubmit({ success: false, error: false });
    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {submit.error ? (
        <div className="flex items-center justify-between p-6 border-b bg-red-500/75 animate-pulse">
          <h2 className="text-xl font-bold text-gray-800">Error!</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-black hover:rotate-180 transition-all duration-300 cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ) : submit.success ? (
        <div className="flex items-center justify-between p-6 border-b bg-green-500/75 animate-pulse">
          <h2 className="text-xl font-bold text-gray-800">Success</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-black hover:rotate-180 transition-all duration-300 cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-6 border-b bg-green-100">
          <h2 className="text-xl font-bold text-gray-800">Add New Bet</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-black hover:rotate-180 transition-all duration-300 cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="p-6 h-full overflow-y-auto pb-20">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bet Amount ($)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="1.00"
              step="0.01"
              min="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Odds
            </label>
            <input
              type="number"
              name="odds"
              value={formData.odds}
              onChange={handleInputChange}
              placeholder="+100 or -100"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              League/Sport
            </label>

            {formData.league.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.league.map((league) => (
                  <span
                    key={league}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 cursor-pointer"
                  >
                    {league}
                    <button
                      type="button"
                      onClick={() => removeLeague(league)}
                      className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-600 focus:outline-none cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleLeagueChange(e.target.value);
                  e.target.value = "";
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled>
                {formData.league.length === 0
                  ? "Select leagues/sports..."
                  : "Add another league/sport..."}
              </option>
              {leagueOptions
                .filter((option) => !formData.league.includes(option))
                .map((league) => (
                  <option key={league} value={league}>
                    {league}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bet Description
            </label>
            <textarea
              name="line"
              value={formData.line}
              onChange={handleInputChange}
              placeholder="Player 25+ Points, Team ML"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["Open", "Won", "Lost", "Cashed"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, result: status }))
                  }
                  className={`px-3 py-2 border rounded-md transition-colors cursor-pointer ${
                    formData.result === status
                      ? "border-green-500 bg-green-100 text-green-800"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full border-2 py-3 px-4 rounded-md transition-colors font-medium cursor-pointer ${
                isLoading
                  ? "border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                  : "border-green-300 hover:border-green-400 hover:bg-green-100"
              }`}
            >
              {isLoading ? "Adding Bet..." : "Add Bet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
