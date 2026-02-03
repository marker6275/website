"use client";

import { useState, useEffect } from "react";
import {
  BetResults,
  AddBetModal,
  BetsHeader,
  Last10BetsSection,
  OpenBetsSection,
  ProfitsAndStatisticsSection,
} from "../../components/bets";
import config from "../../config/bets.js";

const spreadsheetId = config.spreadsheetId;
const apikey = config.apikey;

export default function BetsPage() {
  const [data, setData] = useState({ values: [], loading: true, error: null });
  const [last10Bets, setLast10Bets] = useState([]);
  const [showDropdown, setShowDropdown] = useState(true);
  const [uniqueSports, setUniqueSports] = useState([]);
  const [showAddBetModal, setShowAddBetModal] = useState(false);
  const [mode, setMode] = useState("Edit");
  const [editedBets, setEditedBets] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("password_input")) {
      setAuthorized(true);
    }
  }, []);

  useEffect(() => {
    if (!spreadsheetId || !apikey) {
      setData({
        values: [],
        loading: false,
        error: `Missing environment variables: ${!spreadsheetId ? 'NEXT_PUBLIC_SPREADSHEET_ID' : ''} ${!apikey ? 'NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY' : ''}`.trim(),
      });
      return;
    }

    const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
      "Bets!A:G"
    )}?key=${apikey}`;
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((json) => {
            throw new Error(`HTTP ${res.status}: ${json.error?.message || res.statusText}`);
          }).catch(() => {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          });
        }
        return res.json();
      })
      .then((json) => {
        const values = json.values || [];

        const betsData =
          values.length > 0 && isNaN(parseFloat(values[0][1]))
            ? values.slice(1).map((value, index) => [...value, index + 2])
            : values;

        setData({ values: betsData, loading: false, error: null });
        setLast10Bets(betsData.slice(-10).reverse());
        getUniqueSports(betsData);
      })
      .catch((err) =>
        setData({ values: [], loading: false, error: err.message })
      );
  }, []);

  const getUniqueSports = (bets) => {
    const sports = bets
      .map((bet) => bet[5])
      .filter((bet) => !bet.includes(","))
      .map((bet) => bet.trim());

    setUniqueSports([...new Set(sports)]);
  };

  const getOpenBets = () => {
    return data.values
      .filter((bet) => bet[3] === BetResults.Open)
      .sort((a, b) => b[7] - a[7]);
  };

  const getCompletedBets = (bets) => {
    return bets.filter((bet) => bet[3] !== BetResults.Open);
  };

  const calculateProfits = () => {
    const completed = getCompletedBets(data.values);
    const totalWagered = completed.reduce(
      (sum, bet) => sum + parseFloat(bet[1].replace(/^\$/, "")),
      0
    );
    const totalReturn = completed.reduce(
      (sum, bet) => sum + parseFloat(bet[4].replace(/^\$/, "")),
      0
    );
    const profit = totalReturn - totalWagered;
    const winRate =
      completed.length > 0
        ? (
            (completed.filter((bet) => bet[3] === BetResults.Won).length /
              completed.length) *
            100
          ).toFixed(1)
        : 0;
    const lastDay =
      completed.length > 0 ? completed[completed.length - 1][0] : null;
    const lastDayProfit = completed
      .filter((bet) => bet[0] === lastDay)
      .reduce(
        (sum, bet) =>
          sum +
          (parseFloat(bet[4].replace(/^\$/, "")) -
            parseFloat(bet[1].replace(/^\$/, ""))),
        0
      );
    return {
      totalWagered,
      totalReturn,
      profit,
      winRate,
      totalBets: completed.length,
      lastDay,
      lastDayProfit,
    };
  };

  async function handleSave() {
    if (editedBets.length === 0) {
      return;
    }

    try {
      await fetch("/bets/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          values: editedBets,
          update: true,
          password: sessionStorage.getItem("password_input"),
        }),
      });
    } catch (error) {
      console.error("Network Error:", error);
      alert(`Network Error: ${error.message}`);
    }

    setEditedBets([]);
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }

  function handleEditSave() {
    if (mode === "Save") {
      handleSave();
    }
    setMode(mode === "Edit" ? "Save" : "Edit");
  }

  function handlePasswordSubmit() {
    if (password === "") {
      return;
    }

    sessionStorage.setItem("password_input", password);
    setAuthorized(true);
  }

  const openBets = getOpenBets();
  const profits = calculateProfits();

  if (data.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading betting data...</div>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-600">Error: {data.error}</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50 lg:overflow-hidden">
      <div
        className={`flex flex-col gap-6 items-center min-h-screen transition-all duration-300 ease-in-out ${
          showAddBetModal ? "w-[78vw]" : "w-screen"
        }`}
      >
        <BetsHeader
          titleOnClick={() => setAuthorized(false)}
          addOnClick={() => setShowAddBetModal(!showAddBetModal)}
          editOnClick={() => handleEditSave()}
          mode={mode}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full p-6">
          <Last10BetsSection
            getCompletedBets={getCompletedBets}
            last10Bets={last10Bets}
            editable={mode === "Save"}
            editedBets={editedBets}
            setEditedBets={setEditedBets}
          />

          <OpenBetsSection
            openBets={openBets}
            editable={mode === "Save"}
            editedBets={editedBets}
            setEditedBets={setEditedBets}
          />

          <ProfitsAndStatisticsSection
            profits={profits}
            dropdownClick={() => setShowDropdown(!showDropdown)}
            showDropdown={showDropdown}
            uniqueSports={uniqueSports}
            data={data.values}
          />
        </div>
      </div>
      <AddBetModal
        isOpen={showAddBetModal}
        onClose={() => setShowAddBetModal(false)}
      />
      {!authorized && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-50 flex items-center justify-center">
          <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-md gap-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlePasswordSubmit();
                }
              }}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
              onClick={() => handlePasswordSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
