export default function HistorySidebar({ history }) {
  return (
    <div className="history">
      <h3 className="history-title">History</h3>
      {history.length === 0 && <div className="muted">No history yet. Send a request to see it here.</div>}
      <div className="history-list">
        {history.map((item, i) => (
          <div key={i} className="history-item">
            <div className="history-left">
              <div className="method-badge">{item.method}</div>
              <div className="url">{item.url}</div>
            </div>
            <div className="history-right">
              <div className="time">{item.time}</div>
              <div className="status">{item.status ?? "-"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
