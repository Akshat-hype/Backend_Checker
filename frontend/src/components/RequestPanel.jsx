import { useState } from "react";
import axios from "axios";

export default function RequestPanel({ setResponse, addToHistory }) {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");

  const sendRequest = async () => {
    if (!url) {
      setResponse({ status: "ERROR", data: "Please enter a URL" });
      return;
    }

    try {
      const start = performance.now();
      let parsedHeaders = {};

      if (headers.trim()) {
        try {
          parsedHeaders = JSON.parse(headers);
        } catch (e) {
          setResponse({ status: "INVALID HEADERS", data: "Headers must be valid JSON." });
          return;
        }
      }

      let parsedBody = undefined;
      if (body.trim()) {
        try {
          parsedBody = JSON.parse(body);
        } catch (e) {
          setResponse({ status: "INVALID BODY", data: "Body must be valid JSON." });
          return;
        }
      }

      const res = await axios({
        url,
        method,
        headers: parsedHeaders,
        data: parsedBody,
        validateStatus: () => true, // always resolve to capture non-2xx
      });

      const time = Math.round(performance.now() - start);

      const responseData = {
        status: res.status,
        time,
        headers: res.headers,
        data: res.data,
      };

      setResponse(responseData);
      addToHistory({
        method,
        url,
        time: new Date().toLocaleString(),
        status: res.status,
      });
    } catch (error) {
      setResponse({
        status: "NETWORK ERROR",
        data: error.message,
      });
    }
  };

  const quickFill = () => {
    setUrl("https://jsonplaceholder.typicode.com/posts");
    setMethod("GET");
  };

  return (
    <section className="request-panel card">
      <div className="row top-row">
        <select className="method-select" value={method} onChange={(e) => setMethod(e.target.value)}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>PATCH</option>
          <option>DELETE</option>
        </select>

        <input
          className="url-input"
          type="text"
          placeholder="Enter request URL (e.g. https://api.example.com/resource)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button className="btn send" onClick={sendRequest}>Send</button>
        <button className="btn ghost" onClick={quickFill}>Quick Fill</button>
      </div>

      <div className="row">
        <div className="panel-col">
          <label className="label">Headers (JSON)</label>
          <textarea
            className="textarea"
            placeholder='{"Content-Type":"application/json"}'
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
          />
        </div>

        <div className="panel-col">
          <label className="label">Body (JSON)</label>
          <textarea
            className="textarea"
            placeholder='{"name":"Akshat"}'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
