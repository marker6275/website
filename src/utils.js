import {
  ComingSoon,
  NotBopIt,
  PythonRedex,
  TextClassifier,
  Website,
  IntermittentComputing,
  SustainabilityWorkshop,
  Verdra,
} from "./projects";

const projects = [
  Verdra,
  SustainabilityWorkshop,
  IntermittentComputing,
  NotBopIt,
  TextClassifier,
  PythonRedex,
  Website,
  ComingSoon,
];

const validSearches = ["projects", "music", "resume", "bets", "misc"];

const validMiscSearches = ["tic tac toe"];

const miscSearchesMap = {
  "tic tac toe": "tic-tac-toe",
};

function getSearchLink(search) {
  if (search === "home") {
    return "/";
  }

  if (validSearches.includes(search.toLowerCase())) {
    return `/${search.toLowerCase()}`;
  }

  if (validMiscSearches.includes(search.toLowerCase())) {
    const endpoint = miscSearchesMap[search.toLowerCase()];
    return `/misc/${endpoint}`;
  }

  return null;
}

// TO UPDATE COLORS
// update index 0
// [color, hover, border]
// [prev color + 0xBE1, prev hover + 0x1FC, same as color]
const colors = [
  ["text-[#1C49FF]", "hover:bg-[#E3E8FF]", "hover:border-[#1C49FF]"],
  ["text-[#1C55E0]", "hover:bg-[#E3EAFB]", "hover:border-[#1C55E0]"],
  ["text-[#1C61C1]", "hover:bg-[#E3ECF7]", "hover:border-[#1C61C1]"],
  ["text-[#1C6DA2]", "hover:bg-[#E3EEF3]", "hover:border-[#1C6DA2]"],
  ["text-[#1C7983]", "hover:bg-[#E3F0EF]", "hover:border-[#1C7983]"],
  ["text-[#1C8564]", "hover:bg-[#E3F2EB]", "hover:border-[#1C8564]"],
  ["text-[#1C9145]", "hover:bg-[#E3F4E7]", "hover:border-[#1C9145]"],
  ["text-[#1C9D26]", "hover:bg-[#E3F6E3]", "hover:border-[#1C9D26]"],
  ["text-[#1CA907]", "hover:bg-[#E3F8DF]", "hover:border-[#1CA907]"],
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export { projects, colors, months, getSearchLink };
