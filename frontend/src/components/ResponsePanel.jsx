export default function ResponsePanel({ response }) {
  if (!response) {
    return (
      <section className="response-panel card empty">
        <div className="empty-msg">Awaiting response — send a request.</div>
      </section>
    );
  }

  return (
    <section className="response-panel card">
      <div className="response-header">
        <div><strong>Status:</strong> {response.status}</div>
        {response.time !== undefined && <div><strong>Time:</strong> {response.time} ms</div>}
      </div>

      <div className="response-section">
        <h4>Body</h4>
        <pre className="pre">{JSON.stringify(response.data, null, 2)}</pre>
      </div>

      <div className="response-section">
        <h4>Headers</h4>
        <pre className="pre">{JSON.stringify(response.headers, null, 2)}</pre>
      </div>
    </section>
  );
}
