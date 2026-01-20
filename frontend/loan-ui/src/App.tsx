import { useEffect, useState } from "react";

type LoanRequest = {
  amount: number;
  interestPerMonth: number;
  startDate: string;
  endDate: string;
};

type LoanResponse = LoanRequest & {
  totalDays: number;
  totalInterest: number;
  totalAmount: number;
};

function App() {
  // Change this after backend hosting (Render/Railway)
  const API = "http://localhost:8080/api/loans";

  const [form, setForm] = useState<LoanRequest>({
    amount: 0,
    interestPerMonth: 0,
    startDate: "",
    endDate: "",
  });

  const [result, setResult] = useState<LoanResponse | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const loadHistory = async () => {
    const res = await fetch(`${API}/all`);
    const data = await res.json();
    setHistory(data);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const calculate = async () => {
    const res = await fetch(`${API}/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setResult(data);
  };

  const save = async () => {
    if (!result) return;

    await fetch(`${API}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });

    setResult(null);
    loadHistory();
    alert("Saved Successfully!");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Loan / Borrow Calculator</h2>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Interest per month (%)"
          value={form.interestPerMonth}
          onChange={(e) =>
            setForm({ ...form, interestPerMonth: Number(e.target.value) })
          }
        />
        <input
          type="date"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        />
        <input
          type="date"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <button onClick={calculate}>Calculate</button>
        {result && (
          <button onClick={save} style={{ marginLeft: 10 }}>
            Save
          </button>
        )}
      </div>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Result</h3>
          <p>Total Days: {result.totalDays}</p>
          <p>Total Interest: {result.totalInterest}</p>
          <p>Total Amount: {result.totalAmount}</p>
        </div>
      )}

      <hr style={{ marginTop: 30 }} />

      <h3>History</h3>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Interest%</th>
            <th>Start</th>
            <th>End</th>
            <th>Total Days</th>
            <th>Total Interest</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h.id}>
              <td>{h.id}</td>
              <td>{h.amount}</td>
              <td>{h.interestPerMonth}</td>
              <td>{h.startDate}</td>
              <td>{h.endDate}</td>
              <td>{h.totalDays}</td>
              <td>{h.totalInterest}</td>
              <td>{h.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
