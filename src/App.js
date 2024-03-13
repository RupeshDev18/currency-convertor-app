// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";
import "./App.css";
export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        setConverted(data.rates[toCur]);
        setIsLoading(false);
      }
      if (fromCur === toCur) return setConverted(amount);
      convert();
    },
    [amount, fromCur, toCur]
  );
  return (
    <>
      <div className="container">
        <div className="from">
          <h3>Currency</h3>
          <div className="box">
            <input
              autoFocus
              type="text"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              disabled={isLoading}
              className="mb-3 p-1 rounded-sm "
            />
            <select
              value={fromCur}
              onChange={(e) => setFromCur(e.target.value)}
              disabled={isLoading}
              className=""
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>
        <div className="to">
          <div className="box">
            <div className="temp">
              <p className="font-medium mt-2">{converted}</p>
              <select
                value={toCur}
                onChange={(e) => setToCur(e.target.value)}
                disabled={isLoading}
                className=""
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
