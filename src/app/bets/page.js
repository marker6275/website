"use client";

import { useState, useEffect } from "react";
import {
  BetCard,
  SportDataCard,
  BetResults,
  AddBetModal,
} from "../../components/bets";
import config from "../../config/bets.js";
import Image from "next/image";

const spreadsheetId = config.spreadsheetId;
const apikey = config.apikey;

export default function BetsPage() {
  const [data, setData] = useState({ values: [], loading: true, error: null });
  const [last10Bets, setLast10Bets] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [uniqueSports, setUniqueSports] = useState([]);
  const [showAddBetModal, setShowAddBetModal] = useState(false);
  const [mode, setMode] = useState("Edit");
  const [editedBets, setEditedBets] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("password_input")) {
      setAuthorized(true);
    }
  }, []);

  useEffect(() => {
    const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
      "Bets!A:G"
    )}?key=${apikey}`;
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
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

  const getWonBets = (bets) => {
    return bets.filter((bet) => bet[3] === BetResults.Won).length;
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

  const getNetProfit = (bets) => {
    const completedBets = bets.filter((bet) => bet[3] !== BetResults.Open);
    const amountSpent = completedBets.reduce(
      (acc, bet) => acc + parseFloat(bet[1].replace(/^\$/, "")),
      0
    );
    const amountReturned = completedBets.reduce(
      (acc, bet) => acc + parseFloat(bet[4].replace(/^\$/, "")),
      0
    );
    return (amountReturned - amountSpent).toFixed(2);
  };

  const getTotalSpent = (bets) => {
    return bets
      .reduce((acc, bet) => acc + parseFloat(bet[1].replace(/^\$/, "")), 0)
      .toFixed(2);
  };

  const getBetsBySport = (sport) => {
    return data.values.filter(
      (bet) =>
        bet[5]
          .split(",")
          .map((s) => s.trim())
          .includes(sport) && bet[3]
    );
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
      console.log("Network Error:", error);
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

  function handlePasswordSubmit(e) {
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
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      <div
        className={`flex flex-col gap-6 items-center min-h-screen transition-all duration-300 ease-in-out ${
          showAddBetModal ? "w-[78vw]" : "w-screen"
        }`}
      >
        <div className="flex items-center justify-between gap-5 w-full px-10 pt-10">
          <div className="flex items-center gap-4">
            <div
              className="text-4xl font-semibold cursor-pointer"
              onClick={() => setAuthorized(false)}
            >
              Bets Dashboard
            </div>
            <div className="flex items-center relative">
              <Image
                src="/assets/icons/information.png"
                alt="Bets"
                width={15}
                height={15}
                className="cursor-pointer"
                onClick={() => setShowInfoModal(!showInfoModal)}
              />
              {showInfoModal && (
                <div className="w-60 h-25 bg-blue-50 flex items-center justify-center absolute z-50 ml-10 mt-4 border-1 border-blue-200 rounded-md text-sm font-light p-4">
                  If you found this, welcome to my journey to lose money in the
                  worst way possible. Enjoy!
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div
              className="text-xl font-semibold bg-green-200 flex items-center p-2 rounded-md cursor-pointer border-1 border-green-400 hover:bg-green-300 hover:shadow-sm"
              onClick={() => setShowAddBetModal(!showAddBetModal)}
            >
              Add Bet
            </div>
            <div
              className="text-xl font-semibold bg-green-200 flex items-center p-2 rounded-md cursor-pointer border-1 border-green-400 hover:bg-green-300 hover:shadow-sm"
              onClick={() => handleEditSave()}
            >
              {mode}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 w-full p-6">
          <div className="flex flex-col gap-4">
            <span className="text-center py-2 rounded-lg font-semibold text-lg border-3 border-blue-400 bg-blue-100">
              Last 10 Bets ({getWonBets(last10Bets)} /{" "}
              {getCompletedBets(last10Bets).length})
              {getCompletedBets(last10Bets).length < 10 && (
                <span>
                  {" "}
                  - [{10 - getCompletedBets(last10Bets).length} open]
                </span>
              )}
            </span>
            <div className="space-y-3 max-h-[75vh] overflow-y-auto">
              {last10Bets.length > 0 ? (
                last10Bets.map((value, index) => (
                  <BetCard
                    key={index}
                    date={value[0]}
                    amount={value[1]}
                    odds={value[2]}
                    result={value[3]}
                    payout={value[4]}
                    league={value[5]}
                    line={value[6]}
                    index={value[7]}
                    editable={mode === "Save"}
                    editedBets={editedBets}
                    setEditedBets={setEditedBets}
                  />
                ))
              ) : (
                <div className="text-gray-500 text-center py-8">
                  No bets found
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-center py-2 rounded-lg font-semibold text-lg border-3 border-yellow-400 bg-yellow-100">
              Open Bets ({openBets.length})
            </span>
            <div className="space-y-3 max-h-[75vh] overflow-y-scroll">
              {openBets.length > 0 ? (
                openBets.map((value, index) => (
                  <BetCard
                    key={index}
                    date={value[0]}
                    amount={value[1]}
                    odds={value[2]}
                    result={value[3]}
                    payout={value[4]}
                    league={value[5]}
                    line={value[6]}
                    editable={mode === "Save"}
                    index={value[7]}
                    editedBets={editedBets}
                    setEditedBets={setEditedBets}
                  />
                ))
              ) : (
                <div className="text-gray-500 text-center py-8">
                  No open bets
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-center py-2 rounded-lg font-semibold text-lg border-3 border-green-400 bg-green-100">
              Profits & Statistics
            </span>

            <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">
                    ${profits.totalWagered.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Total Wagered</div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">
                    ${profits.totalReturn.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Total Return</div>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-center gap-20">
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold ${
                      profits.profit >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {profits.profit >= 0 ? "+" : ""}${profits.profit.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Net Profit/Loss</div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold ${
                      profits.lastDayProfit >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {profits.lastDayProfit >= 0 ? "+" : ""}$
                    {profits.lastDayProfit.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">{profits.lastDay}</span>{" "}
                    Profit/Loss
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-800">
                    {profits.winRate}%
                  </div>
                  <div className="text-sm text-gray-600">Win Rate</div>
                </div>

                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-800">
                    {profits.totalBets}
                  </div>
                  <div className="text-sm text-gray-600">Total Bets</div>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-lg py-2 px-4 shadow-sm border cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="text-center py-1">Data by Sport</div>
              {showDropdown && (
                <div className="flex flex-col gap-2 mt-2 max-h-[36vh] overflow-y-scroll">
                  {uniqueSports
                    .sort(
                      (a, b) =>
                        getNetProfit(getBetsBySport(b)) -
                        getNetProfit(getBetsBySport(a))
                    )
                    .map((sport) => (
                      <SportDataCard
                        key={sport}
                        bets={getBetsBySport(sport)}
                        sport={sport}
                        netProfit={getNetProfit(getBetsBySport(sport))}
                        totalSpent={getTotalSpent(getBetsBySport(sport))}
                        profit={getNetProfit(getBetsBySport(sport)) >= 0}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
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
                  handlePasswordSubmit(e);
                }
              }}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
              onClick={(e) => handlePasswordSubmit(e)}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
