import React, { useState, useEffect, useRef } from "react";

const validCommands = ["", "about", "clear", "help", "cd"];

export const ShellComponent = () => {
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState("");
  const historyRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      processCommand();
    }
  };

  const evaluateCommand = (command) => {
    switch (command) {
      case "about":
        return "I am a software developer, also an amateur musician. ";
      case "help":
        return "Available commands: about, clear, help";
      default:
        return "";
    }
  };

  const processCommand = () => {
    let color = "text-gray-300";
    let output = "";

    try {
      if (!validCommands.includes(command)) {
        throw new Error();
      } else if (command === "clear") {
        setHistory([]);
        setCommand("");
        return;
      }
      output = evaluateCommand(command);
      if (output === undefined) output = "";
    } catch (err) {
      output = "Invalid command: " + command;
      color = "text-red-500";
    }

    setHistory([...history, { command, output, color }]);
    setCommand("");
  };

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="hidden md:block bg-gray-800 text-white p-2 rounded-lg max-w-xl mx-10 md:mx-20 h-72 relative overflow-scroll flex flex-col border-2 border-solid border-black">
      <div ref={historyRef} className="overflow-auto h-5/6">
        {history.map((item, index) => (
          <div key={index} className="mb-2">
            <div>
              <span className={`${item.color} inline-block align-middle`}>
                &gt;
              </span>{" "}
              {item.command}
            </div>
            {item.output !== "" && (
              <div className="ml-4 text-gray-300">{String(item.output)}</div>
            )}
          </div>
        ))}
      </div>
      <div className="left-0 right-0">
        <div className="flex items-center">
          <span className="text-gray-300">&gt;</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-gray-800 pl-2 focus:outline-none"
            placeholder="_"
          />
        </div>
      </div>
    </div>
  );
};
