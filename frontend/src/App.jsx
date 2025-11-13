import { useState } from "react";
import RequestPanel from "./components/RequestPanel";
import ResponsePanel from "./components/ResponsePanel";
import HistorySidebar from "./components/HistorySidebar";

export default function App() {
  const [response, setResponse] = useState(null);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );

  const addToHistory = (req) => {
    const updated = [req, ...history].slice(0, 100); // keep max 100 items
    setHistory(updated);
    localStorage.setItem("history", JSON.stringify(updated));
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">Backend Tester</div>
        <div className="top-actions">No-backend mode</div>
      </header>

      <div className="container">
        <aside className="sidebar">
          <HistorySidebar history={history} />
        </aside>

        <main className="main-area">
          <RequestPanel setResponse={setResponse} addToHistory={addToHistory} />
          <ResponsePanel response={response} />
        </main>
      </div>

      <footer className="footer">
        No Code Backend 
        @Pioneer
      </footer>
    </div>
  );
}
