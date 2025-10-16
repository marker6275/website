"use client";

import { useState, useEffect } from "react";
import {
  NumberButton,
  OperatorButton,
} from "../../../components/misc/calculator";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState("");
  const [currentOperation, setCurrentOperation] = useState("");
  const [newValue, setNewValue] = useState(true);
  const [view, setView] = useState("Number");

  const [textDisplay, setTextDisplay] = useState("");
  const [textNumber, setTextNumber] = useState(0);

  const writeNumber = (value) => {
    if (newValue) {
      setDisplay(value);
      setNewValue(false);
      return;
    }

    setDisplay(display + value);
  };

  const clearDisplay = () => {
    setDisplay("0");
    setCurrentOperation("");
    setCurrentValue("");
    setNewValue(true);
  };

  function onOperationClick(display, operation) {
    if (operation === "+/-") {
      setDisplay(-display);
      return;
    }

    if (operation === "%") {
      setDisplay(display / 100);
      return;
    }

    if (operation === "sqr") {
      setDisplay(display * display);
      return;
    }

    let result = display;
    if (currentOperation) {
      const a = parseFloat(result); // the value we just entered
      const b = parseFloat(currentValue); // whatever the running total is

      switch (currentOperation) {
        case "+":
          result = Math.round((a + b) * 10000) / 10000;
          break;
        case "-":
          result = Math.round((b - a) * 10000) / 10000;
          break;
        case "*":
          result = Math.round(a * b * 10000) / 10000;
          break;
        case "/":
          result = Math.round((b / a) * 10000) / 10000;
          break;
      }
    }

    if (operation === "=") {
      setDisplay(result);
      setCurrentOperation("");
      setCurrentValue("");
      setNewValue(true);
      return;
    }

    setCurrentOperation(operation);
    setDisplay(result);
    setCurrentValue(result);
    setNewValue(true);
  }

  function calculateText(A, B, operation) {
    const first = parseFloat(A);

    if (!B) {
      return first;
    }

    const second = parseFloat(B);

    switch (operation) {
      case "plus":
        if (A == 9 && second == 10) {
          return 21;
        }

        return first + second;
      case "minus":
        return first - second;
      case "times":
        return first * second;
      case "divided by":
        return first / second;
    }
  }

  const textToNumber = (text) => {
    const numbers = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      zero: 0,
      ten: 10,
      eleven: 11,
      twelve: 12,
      thirteen: 13,
      fourteen: 14,
      fifteen: 15,
      sixteen: 16,
      seventeen: 17,
      eighteen: 18,
      nineteen: 19,
      twenty: 20,
      thirty: 30,
      forty: 40,
      fifty: 50,
      sixty: 60,
      seventy: 70,
      eighty: 80,
      ninety: 90,
    };

    const multipliers = {
      hundred: 100,
      thousand: 1000,
      million: 1000000,
      billion: 1000000000,
      trillion: 1000000000000,
      quadrillion: 1000000000000000,
      quintillion: 1000000000000000000,
      sextillion: 1000000000000000000000,
      septillion: 1000000000000000000000000,
      octillion: 1000000000000000000000000000,
    };

    const operations = ["plus", "minus", "times", "divided by"];

    let total = 0;
    let group = 0;
    let hasOperation = false;
    let currentOperation = "";
    let A = 0;
    let B = 0;

    const stringList = text.split(" ");
    for (let i = 0; i < stringList.length; i++) {
      const word = stringList[i];

      if (word in numbers) {
        group += numbers[word];
      } else if (word === "hundred") {
        group *= 100;
      } else if (word in multipliers) {
        group *= multipliers[word];
        total += group;
        group = 0;
      } else if (operations.includes(word)) {
        if (!hasOperation) {
          A = total + group;
          hasOperation = true;
          currentOperation = word;
        }
        total = 0;
        group = 0;
      } else if (
        word === "divided" &&
        i + 1 < stringList.length &&
        stringList[i + 1] === "by"
      ) {
        if (!hasOperation) {
          A = total + group;
          hasOperation = true;
          currentOperation = "divided by";
        }
        total = 0;
        group = 0;
        i++;
      }
    }

    if (hasOperation) {
      B = total + group;
    } else {
      return total + group;
    }

    return calculateText(A, B, currentOperation);
  };

  useEffect(() => {
    if (textDisplay === "") {
      return;
    }

    setTextNumber(textToNumber(textDisplay));
  }, [textDisplay]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <button
        onClick={() => setView(view === "Number" ? "Text" : "Number")}
        className="bg-gray-400 p-4 rounded-lg text-center text-2xl mb-10 w-32 cursor-pointer hover:bg-gray-500 duration-300"
      >
        {view}
      </button>

      {view === "Text" && (
        <div className="flex flex-col gap-10">
          <div className="bg-gray-400 p-4 rounded-lg">
            <input
              type="text"
              className="w-full p-4 bg-gray-100 text-5xl overflow-x-hidden"
              value={textDisplay}
              onChange={(e) => setTextDisplay(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  calculateText();
                }
              }}
            />
          </div>

          <div className="text-5xl flex justify-center items-center bg-gray-300 h-20 rounded-full">
            {textNumber}
          </div>
        </div>
      )}

      {view === "Number" && (
        <div className="bg-gray-400 p-4 rounded-lg w-100 h-150">
          <div className="w-full p-4 bg-gray-100 text-5xl text-right overflow-x-hidden">
            {display}
          </div>
          <div className="grid grid-cols-4 gap-4 py-4">
            <OperatorButton onClick={clearDisplay}>C</OperatorButton>
            <OperatorButton onClick={() => onOperationClick(display, "sqr")}>
              x²
            </OperatorButton>
            <OperatorButton onClick={() => onOperationClick(display, "%")}>
              %
            </OperatorButton>
            <OperatorButton onClick={() => onOperationClick(display, "/")}>
              /
            </OperatorButton>
            <NumberButton onClick={() => writeNumber("7")}>7</NumberButton>
            <NumberButton onClick={() => writeNumber("8")}>8</NumberButton>
            <NumberButton onClick={() => writeNumber("9")}>9</NumberButton>
            <OperatorButton onClick={() => onOperationClick(display, "+")}>
              +
            </OperatorButton>

            <NumberButton onClick={() => writeNumber("6")}>6</NumberButton>
            <NumberButton onClick={() => writeNumber("5")}>5</NumberButton>
            <NumberButton onClick={() => writeNumber("4")}>4</NumberButton>
            <OperatorButton onClick={() => onOperationClick(display, "-")}>
              -
            </OperatorButton>

            <NumberButton onClick={() => writeNumber("3")}>3</NumberButton>
            <NumberButton onClick={() => writeNumber("2")}>2</NumberButton>
            <NumberButton onClick={() => writeNumber("1")}>1</NumberButton>
            <OperatorButton onClick={() => onOperationClick(display, "*")}>
              *
            </OperatorButton>

            <OperatorButton onClick={() => onOperationClick(display, "+/-")}>
              +/-
            </OperatorButton>
            <NumberButton onClick={() => writeNumber("0")}>0</NumberButton>
            <OperatorButton onClick={() => writeNumber(".")}>.</OperatorButton>
            <OperatorButton onClick={() => onOperationClick(display, "=")}>
              =
            </OperatorButton>
          </div>
        </div>
      )}
    </div>
  );
}
