// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

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
    <div className="bg-emerald-500 rounded-lg">
      <div className="box">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled={isLoading}
          className="mb-3 p-1 rounded-sm bg-amber-500"
        />
        <br />
        <span className="m-3 mx-0 ">
          <select
            value={fromCur}
            onChange={(e) => setFromCur(e.target.value)}
            disabled={isLoading}
            className="rounded-sm bg-amber-500"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>
        </span>
        <span className="m-3">
          <select
            value={toCur}
            onChange={(e) => setToCur(e.target.value)}
            disabled={isLoading}
            className="rounded-sm bg-amber-500"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>
        </span>
        <p className="font-medium mt-2">
          {converted} {toCur}
        </p>
      </div>
    </div>
  );
}
