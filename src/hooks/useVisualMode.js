import { useState } from "react";

export default function useVisualMode(inital) {

  const [mode, setMode] = useState(inital);
  const [history, setHistory] = useState([inital]);
  
  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory((prev) => {
        const revisedHistory = prev.slice(0, -1);
        revisedHistory.push(newMode);
        return revisedHistory;
      });
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
    setMode(newMode);
  };

  const back = () => {
    if (history.length - 1) {
      setHistory(history.slice(0, -1));
      setMode(history[history.length - 2]);
    }
  };

  return { mode, transition, back };
}
