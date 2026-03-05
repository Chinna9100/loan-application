// import { useEffect, useState } from "react";
// import "./App.css";

// type LoanRequest = {
//   amount: number;
//   interestPerMonth: number;
//   startDate: string;
//   endDate: string;
// };

// type LoanResponse = LoanRequest & {
//   totalDays: number;
//   totalInterest: number;
//   totalAmount: number;
// };

// function App() {
//   // Change this after backend hosting (Render/Railway)
//   const API = "http://localhost:8080/api/loans";

//   const [form, setForm] = useState<LoanRequest>({
//     amount: 0,
//     interestPerMonth: 0,
//     startDate: "",
//     endDate: "",
//   });

//   const [result, setResult] = useState<LoanResponse | null>(null);
//   const [history, setHistory] = useState<any[]>([]);

//   const loadHistory = async () => {
//     const res = await fetch(`${API}/all`);
//     const data = await res.json();
//     setHistory(data);
//   };

//   useEffect(() => {
//     loadHistory();
//   }, []);

//   const calculate = async () => {
//     const res = await fetch(`${API}/calculate`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     setResult(data);
//   };

//   const save = async () => {
//     if (!result) return;

//     await fetch(`${API}/save`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(result),
//     });

//     setResult(null);
//     loadHistory();
//     alert("Saved Successfully!");
//   };

//   return (
//     <div style={{ padding: 20, fontFamily: "Arial" }}>
//       <h2>Loan / Borrow Calculator</h2>

//       <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//         <input
//           type="number"
//           placeholder="Amount"
//           value={form.amount}
//           onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
//         />
//         <input
//           type="number"
//           placeholder="Interest per month (%)"
//           value={form.interestPerMonth}
//           onChange={(e) =>
//             setForm({ ...form, interestPerMonth: Number(e.target.value) })
//           }
//         />
//         <input
//           type="date"
//           value={form.startDate}
//           onChange={(e) => setForm({ ...form, startDate: e.target.value })}
//         />
//         <input
//           type="date"
//           value={form.endDate}
//           onChange={(e) => setForm({ ...form, endDate: e.target.value })}
//         />
//       </div>

//       <div style={{ marginTop: 10 }}>
//         <button onClick={calculate}>Calculate</button>
//         {result && (
//           <button onClick={save} style={{ marginLeft: 10 }}>
//             Save
//           </button>
//         )}
//       </div>

//       {result && (
//         <div style={{ marginTop: 20 }}>
//           <h3>Result</h3>
//           <p>Total Days: {result.totalDays}</p>
//           <p>Total Interest: {result.totalInterest}</p>
//           <p>Total Amount: {result.totalAmount}</p>
//         </div>
//       )}

//       <hr style={{ marginTop: 30 }} />

//       <h3>History</h3>
//       <table border={1} cellPadding={8}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Amount</th>
//             <th>Interest%</th>
//             <th>Start</th>
//             <th>End</th>
//             <th>Total Days</th>
//             <th>Total Interest</th>
//             <th>Total Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {history.map((h) => (
//             <tr key={h.id}>
//               <td>{h.id}</td>
//               <td>{h.amount}</td>
//               <td>{h.interestPerMonth}</td>
//               <td>{h.startDate}</td>
//               <td>{h.endDate}</td>
//               <td>{h.totalDays}</td>
//               <td>{h.totalInterest}</td>
//               <td>{h.totalAmount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;

// import { useEffect, useState, useRef } from "react";
// import "./App.css";

// type LoanRequest = {
//   amount: number;
//   interestPerMonth: number;
//   startDate: string;
//   endDate: string;
// };

// type LoanResponse = LoanRequest & {
//   totalDays: number;
//   totalInterest: number;
//   totalAmount: number;
// };

// function App() {
//   const API = "http://localhost:8080/api/loans";

//   const [form, setForm] = useState<LoanRequest>({
//     amount: 0,
//     interestPerMonth: 0,
//     startDate: "",
//     endDate: "",
//   });

//   const [validations, setValidations] = useState({
//     amount: true,
//     interestPerMonth: true,
//     startDate: true,
//     endDate: true,
//   });

//   const [result, setResult] = useState<LoanResponse | null>(null);
//   const [history, setHistory] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const amountRef = useRef<HTMLInputElement | null>(null);
//   const interestRef = useRef<HTMLInputElement | null>(null);
//   const startDateRef = useRef<HTMLInputElement | null>(null);
//   const endDateRef = useRef<HTMLInputElement | null>(null);

//   const loadHistory = async () => {
//     setIsLoading(true);
//     try {
//       const res = await fetch(`${API}/all`);
//       const data = await res.json();
//       setHistory(data);
//     } catch (error) {
//       console.error("Error loading history:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadHistory();
//   }, []);


// const calculate = async () => {
//   // Create a new validation object
//   const newValidations = {
//     amount: !!form.amount,
//     interestPerMonth: !!form.interestPerMonth,
//     startDate: !!form.startDate,
//     endDate: !!form.endDate,
//   };

//   // Update validations state
//   setValidations(newValidations);

//   // Add/remove error classes
//   if (!newValidations.amount) {
//     amountRef.current?.classList.add("input-error");
//   } else {
//     amountRef.current?.classList.remove("input-error");
//   }

//   if (!newValidations.interestPerMonth) {
//     interestRef.current?.classList.add("input-error");
//   } else {
//     interestRef.current?.classList.remove("input-error");
//   }

//   if (!newValidations.startDate) {
//     startDateRef.current?.classList.add("input-error");
//   } else {
//     startDateRef.current?.classList.remove("input-error");
//   }

//   if (!newValidations.endDate) {
//     endDateRef.current?.classList.add("input-error");
//   } else {
//     endDateRef.current?.classList.remove("input-error");
//   }

//   // Check if all fields are valid
//   const allValid = Object.values(newValidations).every(Boolean);

//   if (!allValid) {
//     // Focus on the first invalid field
//     if (!newValidations.amount) {
//       amountRef.current?.focus();
//     } else if (!newValidations.interestPerMonth) {
//       interestRef.current?.focus();
//     } else if (!newValidations.startDate) {
//       startDateRef.current?.focus();
//     } else if (!newValidations.endDate) {
//       endDateRef.current?.focus();
//     }

//     // alert("Please fill in all fields correctly.");
//     return;
//   }

//     setIsLoading(true);
//     try {
//       const res = await fetch(`${API}/calculate`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();
//       setResult(data);
//     } catch (error) {
//       console.error("Error calculating:", error);
//       alert("Error calculating loan. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const save = async () => {
//     if (!result) return;

//     setIsLoading(true);
//     try {
//       await fetch(`${API}/save`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(result),
//       });

//       setResult(null);
//       loadHistory();
//       alert("Saved Successfully!");
//     } catch (error) {
//       console.error("Error saving:", error);
//       alert("Error saving calculation.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setForm({
//       amount: 0,
//       interestPerMonth: 0,
//       startDate: "",
//       endDate: "",
//     });
//     setResult(null);
//   };

//   const calculateDaysPreview = () => {
//     if (!form.startDate || !form.endDate) return 0;
//     const start = new Date(form.startDate);
//     const end = new Date(form.endDate);
//     const diffTime = Math.abs(end.getTime() - start.getTime());
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }).format(amount);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // SVG Icons
//   const CalculatorIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M7.5 3h9A1.5 1.5 0 0 1 18 4.5v15A1.5 1.5 0 0 1 16.5 21h-9A1.5 1.5 0 0 1 6 19.5v-15A1.5 1.5 0 0 1 7.5 3ZM9 18v-2h6v2H9Zm0-3v-2h6v2H9Zm0-3V7h6v5H9Z" />
//     </svg>
//   );

//   const HistoryIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm1-8.414V8a1 1 0 0 0-2 0v4a1 1 0 0 0 .293.707l2 2a1 1 0 0 0 1.414-1.414Z" />
//     </svg>
//   );

//   const MoneyIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm1-13a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0V9h1a1 1 0 0 0 0-2h-1V7Zm-1 6a3 3 0 1 0 3 3 3 3 0 0 0-3-3Zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z" />
//     </svg>
//   );

//   const CalendarIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M19 4h-2V3a1 1 0 0 0-2 0v1H9V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm1 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9h16v9Zm0-11H4V7a1 1 0 0 1 1-1h2v1a1 1 0 0 0 2 0V6h6v1a1 1 0 0 0 2 0V6h2a1 1 0 0 1 1 1v1Z" />
//     </svg>
//   );

//   const PercentIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M8.5 7a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 7Zm7 9a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Zm-9.207-1.293 12-12a1 1 0 0 1 1.414 1.414l-12 12a1 1 0 0 1-1.414-1.414Z" />
//     </svg>
//   );

//   return (
//     <div className="app-container">
//       <header className="header">
//         <h1>Loan Calculator</h1>
//         <p>Calculate your loan details with precision and ease</p>
//       </header>

//       <main className="main-content">
//         <div className="calculator-card">
//           <div className="section-title">
//             <CalculatorIcon />
//             <h2>Loan Details</h2>
//           </div>

//           <div className="form-grid">
//             <div className="input-group">
//               <label className="input-label">
//                 <MoneyIcon />
//                 Loan Amount
//               </label>
//               <input
//                 type="number"
//                 className="input-field"
//                 placeholder="Enter amount"
//                 value={form.amount || ""}
//                 onChange={(e) => { setForm({ ...form, amount: Number(e.target.value) })
//                     // Clear validation error when user starts typing
//                   if (!validations.amount) {
//                     setValidations(prev => ({ ...prev, amount: true }));
//                   }
//               }}
//                 ref={amountRef}
//               />
//               {!validations.amount && (
//                 <span className="input-error-message">Amount is required</span>
//               )}
//             </div>

//             <div className="input-group">
//               <label className="input-label">
//                 <PercentIcon />
//                 Monthly Interest Rate (%)
//               </label>
//               <input
//                 type="number"
//                 className="input-field"
//                 placeholder="Enter interest rate"
//                 step="0.1"
//                 value={form.interestPerMonth || ""}
//                 onChange={(e) => {
//                   // Clear validation error when user starts typing
//                   if (!validations.interestPerMonth) {
//                     setValidations(prev => ({ ...prev, interestPerMonth: true }));
//                   }
//                   setForm({ ...form, interestPerMonth: Number(e.target.value) })
//                 }}
//                 ref={interestRef}
//               />
//               {!validations.interestPerMonth && (
//                 <span className="input-error-message">Interest rate is required</span>
//               )}            </div>

//             <div className="input-group">
//               <label className="input-label">
//                 <CalendarIcon />
//                 Start Date
//               </label>
//               <input
//                 type="date"
//                 className="input-field"
//                 value={form.startDate}
//                 onChange={(e) => {
//                   // Clear validation error when user starts typing
//                   if (!validations.startDate) {
//                     setValidations(prev => ({ ...prev, startDate: true }));
//                   }
//                   setForm({ ...form, startDate: e.target.value })
//                 }}
//                 ref={startDateRef}
//               />
//               {!validations.startDate && (
//                 <span className="input-error-message">Start date is required</span>
//               )}
//             </div>

//             <div className="input-group">
//               <label className="input-label">
//                 <CalendarIcon />
//                 End Date
//               </label>
//               <input
//                 type="date"
//                 className="input-field"
//                 value={form.endDate}
//                 onChange={(e) => {
//                   // Clear validation error when user starts typing
//                   if (!validations.endDate) {
//                     setValidations(prev => ({ ...prev, endDate: true }));
//                   }
//                   setForm({ ...form, endDate: e.target.value })
//                 }}
//                 ref={endDateRef}
//               />
//               {!validations.endDate && (
//                 <span className="input-error-message">End date is required</span>
//               )}
//             </div>
//           </div>

//           <div className="preview-info">
//             <div className="preview-item">
//               <span className="preview-label">Days Duration</span>
//               <span className="preview-value">{calculateDaysPreview()}</span>
//             </div>
//             <div className="preview-item">
//               <span className="preview-label">Loan Amount</span>
//               <span className="preview-value">{formatCurrency(form.amount)}</span>
//             </div>
//             <div className="preview-item">
//               <span className="preview-label">Monthly Rate</span>
//               <span className="preview-value">{form.interestPerMonth}%</span>
//             </div>
//           </div>

//           <div className="button-group">
//             <button 
//               className="btn btn-primary" 
//               onClick={calculate}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <span className="spinner"></span>
//                   Calculating...
//                 </>
//               ) : (
//                 <>
//                   <CalculatorIcon />
//                   Calculate Loan
//                 </>
//               )}
//             </button>

//             {result && (
//               <button className="btn btn-success" onClick={save} disabled={isLoading}>
//                 Save Calculation
//               </button>
//             )}

//             <button className="btn btn-secondary" onClick={resetForm}>
//               Reset Form
//             </button>
//           </div>

//           {result && (
//             <div className="result-card">
//               <h3 className="result-title">Calculation Results</h3>
//               <div className="result-grid">
//                 <div className="result-item">
//                   <span className="result-label">Total Days</span>
//                   <span className="result-value">{result.totalDays}</span>
//                 </div>
//                 <div className="result-item">
//                   <span className="result-label">Total Interest</span>
//                   <span className="result-value">{formatCurrency(result.totalInterest)}</span>
//                 </div>
//                 <div className="result-item highlight">
//                   <span className="result-label">Total Amount</span>
//                   <span className="result-value">{formatCurrency(result.totalAmount)}</span>
//                 </div>
//                 <div className="result-item">
//                   <span className="result-label">Original Amount</span>
//                   <span className="result-value">{formatCurrency(result.amount)}</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="history-section">
//           <div className="section-title">
//             <HistoryIcon />
//             <h2>Calculation History</h2>
//           </div>

//           {isLoading ? (
//             <div className="loading-container">
//               <div className="spinner"></div>
//               <p>Loading history...</p>
//             </div>
//           ) : history.length === 0 ? (
//             <div className="empty-state">
//               <p>No calculation history yet. Start by calculating a loan!</p>
//             </div>
//           ) : (
//             <div className="history-table-container">
//               <table className="history-table">
//                 <thead>
//                   <tr>
//                     <th>Amount</th>
//                     <th>Interest</th>
//                     <th>Period</th>
//                     <th>Days</th>
//                     <th>Total Interest</th>
//                     <th>Total Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {history.map((h) => (
//                     <tr key={h.id} className="history-row">
//                       <td className="amount-cell">{formatCurrency(h.amount)}</td>
//                       <td className="interest-cell">{h.interestPerMonth}%</td>
//                       <td className="period-cell">
//                         <div>{formatDate(h.startDate)}</div>
//                         <div className="date-separator">to</div>
//                         <div>{formatDate(h.endDate)}</div>
//                       </td>
//                       <td className="days-cell">{h.totalDays}</td>
//                       <td className="interest-total-cell">{formatCurrency(h.totalInterest)}</td>
//                       <td className="total-cell">{formatCurrency(h.totalAmount)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;











// NEW

import { useEffect, useState, useRef } from "react";
import "./App.css";

type LoanRequest = {
  amount: number;
  interestPerMonth: number;
  startDate: string;
  endDate: string;
};

// type MonthlyBreakdown = {
//   monthName: string;
//   year: number;
//   daysInMonth: number;
//   monthlyInterest: number;
//   cumulativeInterest: number;
//   startDate: string;
//   endDate: string;
//   monthNumber: number;
// };

type MonthlyBreakdown = {
  monthName: string;
  year: number;
  
  // Actual values (based on real calendar)
  actualDaysInMonth: number;
  actualMonthlyInterest: number;
  actualCumulativeInterest: number;
  
  // Calculated values (based on 30-day month convention)
  calculatedDaysInMonth: number;
  calculatedMonthlyInterest: number;
  calculatedCumulativeInterest: number;
  
  // Differences
  daysDifference: number;
  interestDifference: number;
  
  // Metadata
  isFullMonthCharge: boolean;
  isPartialMonth: boolean;
  isTwoDaysOrLessRule: boolean;
  interestCalculationMethod: string;
  
  // For backward compatibility
  daysInMonth: number;
  monthlyInterest: number;
  cumulativeInterest: number;
  
  startDate: string;
  endDate: string;
  monthNumber: number;
};

// type LoanResponse = LoanRequest & {
//   totalDays: number;
//   totalInterest: number;
//   totalAmount: number;
//   monthlyBreakdown?: MonthlyBreakdown[];
// };

type LoanResponse = LoanRequest & {
  totalDays: number;
  totalInterest: number;
  totalAmount: number;
  monthlyBreakdown?: MonthlyBreakdown[];
  totalCalculatedDays?: number;  // Add this
  totalActualInterest?: number;   // Add this
  totalActualDays?: number;      // Add this
};

function App() {
  const API = "http://localhost:8080/api/loans";

  const [form, setForm] = useState<LoanRequest>({
    amount: 0,
    interestPerMonth: 0,
    startDate: "",
    endDate: "",
  });

  const [validations, setValidations] = useState({
    amount: true,
    interestPerMonth: true,
    startDate: true,
    endDate: true,
  });

  const [totalDays, setTotalDays] = useState(0);
  const [result, setResult] = useState<LoanResponse | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);
  const [showAllMonths, setShowAllMonths] = useState(false);

  const amountRef = useRef<HTMLInputElement | null>(null);
  const interestRef = useRef<HTMLInputElement | null>(null);
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const endDateRef = useRef<HTMLInputElement | null>(null);

  const [stats, setStats] = useState({
    totalCalculations: 862,
    totalLoans: 456,
    totalInterestPaid: 21200,
    avgInterestRate: 5.8,
  });

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API}/all`);
      const data = await res.json();
      setHistory(data);
      if (data.length > 0) {
        const totalInterest = data.reduce((acc: number, item: any) => acc + item.totalInterest, 0);
        const avgRate = data.reduce((acc: number, item: any) => acc + item.interestPerMonth, 0) / data.length;
        setStats({
          totalCalculations: data.length,
          totalLoans: data.reduce((acc: number, item: any) => acc + item.amount, 0),
          totalInterestPaid: totalInterest,
          avgInterestRate: avgRate,
        });
      }
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // const calculateMonthlyBreakdown = (): MonthlyBreakdown[] => {
  //   if (!form.startDate || !form.endDate || !form.amount || !form.interestPerMonth) {
  //     return [];
  //   }

  //   const start = new Date(form.startDate);
  //   const end = new Date(form.endDate);
  //   const breakdown: MonthlyBreakdown[] = [];
  //   let currentDate = new Date(start);
  //   let cumulativeInterest = 0;
  //   let monthCounter = 1;

  //   const monthNames = [
  //     "January", "February", "March", "April", "May", "June",
  //     "July", "August", "September", "October", "November", "December"
  //   ];

  //   while (currentDate <= end) {
  //     const year = currentDate.getFullYear();
  //     const month = currentDate.getMonth();
  //     // logs
  //     console.log("Processing month:", month);
  //     const monthStart = new Date(year, month, 1);
  //     const monthEnd = new Date(year, month + 1, 0);

  //     const periodStart = currentDate > start ? currentDate : start;
  //     const periodEnd = monthEnd < end ? monthEnd : end;

  //     const diffTime = Math.abs(periodEnd.getTime() - periodStart.getTime());
  //     const daysInPeriod = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  //     console.log("Period Start:", periodStart, "Period End:", periodEnd, "Diff Time:", diffTime, "Days in Period:", daysInPeriod);

  //     const dailyInterestRate = (form.interestPerMonth / 100) / 30;
  //     const monthlyInterest = form.amount * dailyInterestRate * daysInPeriod;
  //     console.log("Daily Interest Rate:", dailyInterestRate, "Monthly Interest:", monthlyInterest);
  //     cumulativeInterest += monthlyInterest;

  //     breakdown.push({
  //       monthName: monthNames[month],
  //       year: year,
  //       daysInMonth: daysInPeriod,
  //       monthlyInterest,
  //       cumulativeInterest,
  //       startDate: periodStart.toISOString().split('T')[0],
  //       endDate: periodEnd.toISOString().split('T')[0],
  //       monthNumber: monthCounter
  //     });

  //     monthCounter++;
  //     currentDate = new Date(year, month + 1, 1);
  //   }

  //   return breakdown;
  // };

const calculateMonthlyBreakdown = (): MonthlyBreakdown[] => {
  if (!form.startDate || !form.endDate || !form.amount || !form.interestPerMonth) {
    return [];
  }

  const start = new Date(form.startDate);
  const end = new Date(form.endDate);
  const breakdown: MonthlyBreakdown[] = [];
  let currentDate = new Date(start);
  let cumulativeInterest = 0;
  let cumulativeCalculatedInterest = 0;
  let monthCounter = 1;
  let totalCalculatedDays = 0;
  let totalActualInterest = 0;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Monthly interest amount (for full month)
  const monthlyInterestAmount = form.amount * (form.interestPerMonth / 100);
  const dailyInterestRate = (form.interestPerMonth / 100) / 30; // 30-day month convention

  while (currentDate <= end) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);

    const periodStart = currentDate > start ? currentDate : start;
    const periodEnd = monthEnd < end ? monthEnd : end;

    // ACTUAL DAYS - based on real calendar
    const diffTime = Math.abs(periodEnd.getTime() - periodStart.getTime());
    const actualDaysInPeriod = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // CALCULATED DAYS - based on 30-day month convention
    let calculatedDaysInPeriod = actualDaysInPeriod;
    let monthlyInterest = 0;
    let isFullMonthCharge = false;
    let isPartialMonth = false;
    let isTwoDaysOrLessRule = false;
    let interestCalculationMethod = '';

    // Check if this period crosses month boundary
    const crossesMonthBoundary = periodStart.getMonth() !== periodEnd.getMonth();
    
    // Check if this is a full month (from 1st to last day) - FIXED
    const daysInMonth = getDaysInMonth(periodEnd);
    const isFullCalendarMonth = periodStart.getDate() === 1 && 
                                periodEnd.getDate() === daysInMonth;
    
    // Check if remaining days are 2 or less at the end
    const isTwoDaysOrLess = actualDaysInPeriod <= 2;

    // *** KEY LOGIC: 30-day month convention rules ***
    if (isFullCalendarMonth || crossesMonthBoundary) {
      // Rule 1: Full month or crossing month boundary = charge full month interest (30 days)
      monthlyInterest = monthlyInterestAmount;
      calculatedDaysInPeriod = 30;
      isFullMonthCharge = true;
      isTwoDaysOrLessRule = isTwoDaysOrLess;
      interestCalculationMethod = crossesMonthBoundary 
        ? 'Month boundary crossed - charged as full month (30 days)' 
        : 'Full calendar month - charged as full month (30 days)';
    } else if (isTwoDaysOrLess && monthCounter > 1) {
      // Rule 2: 2 days or less at the end = charge full month interest
      monthlyInterest = monthlyInterestAmount;
      calculatedDaysInPeriod = 30;
      isFullMonthCharge = true;
      isTwoDaysOrLessRule = true;
      interestCalculationMethod = '2 days or less at end - charged as full month (30 days)';
    } else {
      // Rule 3: Partial month within same month = proportional interest based on 30-day month
      monthlyInterest = dailyInterestRate * actualDaysInPeriod * form.amount;
      calculatedDaysInPeriod = actualDaysInPeriod;
      isPartialMonth = true;
      interestCalculationMethod = 'Partial month - proportional interest based on 30-day month';
    }

    // Calculate actual interest if we used actual days (for comparison)
    const actualInterest = dailyInterestRate * actualDaysInPeriod * form.amount;
    
    cumulativeInterest += actualInterest;
    cumulativeCalculatedInterest += monthlyInterest;
    totalCalculatedDays += calculatedDaysInPeriod;
    totalActualInterest += actualInterest;

    breakdown.push({
      monthName: monthNames[month],
      year: year,
      // Actual values
      actualDaysInMonth: actualDaysInPeriod,
      actualMonthlyInterest: Math.round(actualInterest * 100) / 100,
      actualCumulativeInterest: Math.round(cumulativeInterest * 100) / 100,
      
      // Calculated values (using 30-day convention)
      calculatedDaysInMonth: calculatedDaysInPeriod,
      calculatedMonthlyInterest: Math.round(monthlyInterest * 100) / 100,
      calculatedCumulativeInterest: Math.round(cumulativeCalculatedInterest * 100) / 100,
      
      // Differences
      daysDifference: calculatedDaysInPeriod - actualDaysInPeriod,
      interestDifference: Math.round((monthlyInterest - actualInterest) * 100) / 100,
      
      // Metadata
      isFullMonthCharge,
      isPartialMonth,
      isTwoDaysOrLessRule,
      interestCalculationMethod,
      
      // For backward compatibility
      daysInMonth: actualDaysInPeriod,
      monthlyInterest: Math.round(monthlyInterest * 100) / 100,
      cumulativeInterest: Math.round(cumulativeCalculatedInterest * 100) / 100,
      
      startDate: periodStart.toISOString().split('T')[0],
      endDate: periodEnd.toISOString().split('T')[0],
      monthNumber: monthCounter
    });

    monthCounter++;
    currentDate = new Date(year, month + 1, 1);
  }

  // Store total calculated days in result
  if (result) {
    result.totalCalculatedDays = totalCalculatedDays;
    result.totalActualInterest = totalActualInterest;
  }

  return breakdown;
};

  const calculate = async () => {
    const newValidations = {
      amount: !!form.amount && form.amount > 0,
      interestPerMonth: !!form.interestPerMonth && form.interestPerMonth >= 0,
      startDate: !!form.startDate,
      endDate: !!form.endDate,
    };

    setValidations(newValidations);

    const allValid = Object.values(newValidations).every(Boolean);
    if (!allValid) {
      if (!newValidations.amount) amountRef.current?.focus();
      else if (!newValidations.interestPerMonth) interestRef.current?.focus();
      else if (!newValidations.startDate) startDateRef.current?.focus();
      else if (!newValidations.endDate) endDateRef.current?.focus();
      return;
    }

  //   
  
    setIsLoading(true);
  try {
    const res = await fetch(`${API}/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("API Response:", data);

    const monthlyBreakdown = calculateMonthlyBreakdown();
    
    // Calculate totals from monthly breakdown
    const totalCalculatedDays = monthlyBreakdown.reduce((sum, month) => sum + month.calculatedDaysInMonth, 0);
    const totalActualInterest = monthlyBreakdown.reduce((sum, month) => sum + month.actualMonthlyInterest, 0);
    const totalCalculatedInterest = monthlyBreakdown.reduce((sum, month) => sum + month.calculatedMonthlyInterest, 0);

    data.monthlyBreakdown = monthlyBreakdown;
    data.totalCalculatedDays = totalCalculatedDays;
    data.totalActualInterest = totalActualInterest;
    data.totalActualDays = data.totalDays;
    data.totalCalculatedInterest = totalCalculatedInterest;

    setResult(data);
  } catch (error) {
    console.error("Error calculating:", error);
    alert("Error calculating loan. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  const save = async () => {
    if (!result) return;

    setIsLoading(true);
    try {
      await fetch(`${API}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      });

      setResult(null);
      loadHistory();
      alert("Saved Successfully!");
    } catch (error) {
      console.error("Error saving:", error);
      alert("Error saving calculation.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      amount: 0,
      interestPerMonth: 0,
      startDate: "",
      endDate: "",
    });
    setResult(null);
    setValidations({
      amount: true,
      interestPerMonth: true,
      startDate: true,
      endDate: true,
    });
    setExpandedMonth(null);
    setShowAllMonths(false);
  };

  const calculateDaysPreview = () => {
    if (!form.startDate || !form.endDate) return 0;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Add this helper function at the top of your component, before calculateMonthlyBreakdown
const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDisplayedMonths = () => {
    if (!result?.monthlyBreakdown) return [];
    if (showAllMonths) return result.monthlyBreakdown;
    return result.monthlyBreakdown.slice(0, 3);
  };

  // SVG Icons
  const CalculatorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.5 3h9A1.5 1.5 0 0 1 18 4.5v15A1.5 1.5 0 0 1 16.5 21h-9A1.5 1.5 0 0 1 6 19.5v-15A1.5 1.5 0 0 1 7.5 3ZM9 18v-2h6v2H9Zm0-3v-2h6v2H9Zm0-3V7h6v5H9Z" />
    </svg>
  );

  const HistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm1-8.414V8a1 1 0 0 0-2 0v4a1 1 0 0 0 .293.707l2 2a1 1 0 0 0 1.414-1.414Z" />
    </svg>
  );

  const MoneyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm1-13a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0V9h1a1 1 0 0 0 0-2h-1V7Zm-1 6a3 3 0 1 0 3 3 3 3 0 0 0-3-3Zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z" />
    </svg>
  );

  const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 4h-2V3a1 1 0 0 0-2 0v1H9V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm1 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9h16v9Zm0-11H4V7a1 1 0 0 1 1-1h2v1a1 1 0 0 0 2 0V6h6v1a1 1 0 0 0 2 0V6h2a1 1 0 0 1 1 1v1Z" />
    </svg>
  );

  const PercentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.5 7a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 7Zm7 9a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Zm-9.207-1.293 12-12a1 1 0 0 1 1.414 1.414l-12 12a1 1 0 0 1-1.414-1.414Z" />
    </svg>
  );

  const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z" />
    </svg>
  );

  const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" />
    </svg>
  );

  const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22c5.523 0 10-4.477 10-10 0-.463-.694-.54-.933-.143a6.5 6.5 0 1 1-8.924-8.924C12.54 2.693 12.463 2 12 2 6.477 2 2 6.477 2 12s4.477 10 10 10z" />
    </svg>
  );

  // const ChevronDownIcon = () => (
  //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  //     <path d="M12 15.5l-5-5 1.41-1.41L12 12.67l3.59-3.58L17 10.5l-5 5z" />
  //   </svg>
  // );

  // const ChevronUpIcon = () => (
  //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  //     <path d="M12 8.5l5 5-1.41 1.41L12 11.33l-3.59 3.58L7 13.5l5-5z" />
  //   </svg>
  // );

  // Add this state variable after other state declarations
  const [showCalculationExplanation, setShowCalculationExplanation] = useState(false);

  // Add this icon component with other icons
  const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm0-13a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1Zm0 8a1 1 0 1 0 1 1 1 1 0 0 0-1-1Z" />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 15.5l-5-5 1.41-1.41L12 12.67l3.59-3.58L17 10.5l-5 5z" />
    </svg>
  );

  const ChevronUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 8.5l5 5-1.41 1.41L12 11.33l-3.59 3.58L7 13.5l5-5z" />
    </svg>
  );


  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <nav className="sidebar">
        <div className="sidebar-header">
          <h1>LOANCALC</h1>
          <p>Smart Loan Management</p>
        </div>

        <div className="nav-menu">
          <button
            className={`nav-item ${activeNav === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveNav('dashboard')}
          >
            <DashboardIcon />
            <span>Dashboard</span>
          </button>

          <button
            className={`nav-item ${activeNav === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveNav('calculator')}
          >
            <CalculatorIcon />
            <span>Calculator</span>
          </button>

          <button
            className={`nav-item ${activeNav === 'history' ? 'active' : ''}`}
            onClick={() => setActiveNav('history')}
          >
            <HistoryIcon />
            <span>History</span>
          </button>

          <button
            className="nav-item theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="ai-assistant">
            <div className="ai-header">
              <span>🤖 AI Assistant</span>
            </div>
            <p className="ai-message">Welcome back! Let's see today's updates.</p>
            <p className="ai-alert">High interest rate detected for loans over 12 months.</p>
            <button className="ai-action">Show details →</button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-header">
              <span>Today's Calculations</span>
              <span className="stat-change positive">+20%</span>
            </div>
            <div className="stat-value">{stats.totalCalculations}</div>
            <div className="stat-label">vs last week</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span>Total Loans</span>
              <span className="stat-change negative">-12%</span>
            </div>
            <div className="stat-value">{formatCurrency(stats.totalLoans)}</div>
            <div className="stat-label">vs last week</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span>Avg Interest Rate</span>
              <span className="stat-change positive">+5%</span>
            </div>
            <div className="stat-value">{stats.avgInterestRate.toFixed(1)}%</div>
            <div className="stat-label">vs last week</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span>Total Interest Paid</span>
            </div>
            <div className="stat-value">{formatCurrency(stats.totalInterestPaid)}</div>
            <div className="stat-label">all time</div>
          </div>
        </div>

        {activeNav === 'calculator' && (
          <div className="content-grid">
            <div className="calculator-card main-card">
              <div className="section-title">
                <CalculatorIcon />
                <h2>Loan Calculator</h2>
              </div>


              {result && (
                <div className="calculation-explanation">
                  <div
                    className="calculation-explanation-header"
                    onClick={() => setShowCalculationExplanation(!showCalculationExplanation)}
                  >
                    <h3>
                      <InfoIcon />
                      How This Calculation Works
                    </h3>
                    <span className="toggle-icon">
                      {showCalculationExplanation ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </span>
                  </div>

                  {showCalculationExplanation && (
                    <div className="calculation-content">
                      <div className="calculation-section">
                        <h4>📊 Calculation Formulas</h4>
                        <div className="calculation-formula">
                          Daily Interest Rate = Monthly Interest Rate ÷ 100 ÷ 30
                        </div>
                        <div className="calculation-formula">
                          Interest Per Month = Loan Amount × Monthly Interest Rate ÷ 100
                        </div>
                        <div className="calculation-formula highlight">
                          Total Interest = Interest Per Month × Number of Months
                        </div>
                      </div>

                      <div className="calculation-section">
                        <h4>🔢 Important Calculation Method</h4>
                        <div className="calculation-step" style={{ background: 'rgba(67, 97, 238, 0.05)' }}>
                          <div className="step-number" style={{ background: 'var(--warning-color)' }}>!</div>
                          <div className="step-content">
                            <p><strong>Key Method:</strong> Each month is calculated as exactly 30 days, regardless of actual calendar days.</p>
                          </div>
                        </div>

                        <div className="calculation-step">
                          <div className="step-number">1</div>
                          <div className="step-content">
                            <p><strong>Calculate total months:</strong> Divide total days by 30 to get number of months</p>
                            <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '4px' }}>
                              Example: 65 days ÷ 30 = 2.17 months
                            </p>
                          </div>
                        </div>

                        <div className="calculation-step">
                          <div className="step-number">2</div>
                          <div className="step-content">
                            <p><strong>Calculate monthly interest:</strong> Loan amount × monthly interest rate</p>
                            <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '4px' }}>
                              Example: $100,000 × 2% = $2,000 per month
                            </p>
                          </div>
                        </div>

                        <div className="calculation-step">
                          <div className="step-number">3</div>
                          <div className="step-content">
                            <p><strong>Calculate total interest:</strong> Monthly interest × number of months</p>
                            <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '4px' }}>
                              Example: $2,000 × 2.17 = $4,340
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="calculation-section">
                        <h4>📈 Example: $100,000 at 2% Monthly Interest</h4>
                        <div className="calculation-example">
                          <div className="example-header">
                            <span>💡 Scenario: Loan from Jan 15 to Mar 19 (64 days)</span>
                          </div>

                          <div className="example-row">
                            <span className="example-label">Loan Amount:</span>
                            <span className="example-value">$100,000.00</span>
                          </div>

                          <div className="example-row">
                            <span className="example-label">Monthly Interest Rate:</span>
                            <span className="example-value">2.0%</span>
                          </div>

                          <div className="example-row">
                            <span className="example-label">Total Days:</span>
                            <span className="example-value">64 days</span>
                          </div>

                          <div className="example-row">
                            <span className="example-label">Number of Months:</span>
                            <span className="example-value">
                              64 ÷ 30 = 2.133 months
                            </span>
                          </div>

                          <div className="example-row">
                            <span className="example-label">Monthly Interest:</span>
                            <span className="example-value">
                              $100,000 × 2% = $2,000
                            </span>
                          </div>

                          <div className="example-row">
                            <span className="example-label">Total Interest:</span>
                            <span className="example-value">
                              $2,000 × 2.133 = $4,266
                            </span>
                          </div>

                          <div className="example-row">
                            <span className="example-label">Total Amount:</span>
                            <span className="example-value highlight">$104,266.00</span>
                          </div>
                        </div>
                      </div>

                      <div className="calculation-section">
                        <h4>⚙️ Special Cases & Examples</h4>

                        <div className="calculation-step">
                          <div className="step-number" style={{ background: 'var(--success-color)' }}>A</div>
                          <div className="step-content">
                            <p><strong>Case A: Loan spans exactly 30 days</strong></p>
                            <p style={{ fontSize: '13px', color: 'var(--gray-600)', marginTop: '4px' }}>
                              Jan 1 - Jan 30 (30 days) = 1 month interest
                            </p>
                          </div>
                        </div>

                        <div className="calculation-step">
                          <div className="step-number" style={{ background: 'var(--success-color)' }}>B</div>
                          <div className="step-content">
                            <p><strong>Case B: Loan spans exactly 60 days</strong></p>
                            <p style={{ fontSize: '13px', color: 'var(--gray-600)', marginTop: '4px' }}>
                              Jan 1 - Mar 1 (60 days) = 2 months interest
                            </p>
                          </div>
                        </div>

                        <div className="calculation-step">
                          <div className="step-number" style={{ background: 'var(--warning-color)' }}>C</div>
                          <div className="step-content">
                            <p><strong>Case C: Loan spans partial month (15 days)</strong></p>
                            <p style={{ fontSize: '13px', color: 'var(--gray-600)', marginTop: '4px' }}>
                              Jan 1 - Jan 15 (15 days) = 0.5 month interest (15 ÷ 30)
                            </p>
                          </div>
                        </div>

                        <div className="calculation-step">
                          <div className="step-number" style={{ background: 'var(--warning-color)' }}>D</div>
                          <div className="step-content">
                            <p><strong>Case D: Loan spans 45 days</strong></p>
                            <p style={{ fontSize: '13px', color: 'var(--gray-600)', marginTop: '4px' }}>
                              Jan 1 - Feb 14 (45 days) = 1.5 months interest (45 ÷ 30)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="calculation-section">
                        <h4>✅ Calculation Assumptions</h4>
                        <ul className="assumption-list">
                          <li>Each month is considered as exactly 30 days</li>
                          <li>Interest calculated based on 30-day months</li>
                          <li>Partial months calculated proportionally (days ÷ 30)</li>
                          <li>Simple interest calculation (no compounding)</li>
                          <li>No processing fees or additional charges included</li>
                          <li>Interest calculated on original principal only</li>
                        </ul>
                      </div>

                      <div className="important-note">
                        <h5>📝 Important Note</h5>
                        <p>
                          <strong>Note:</strong> This calculator uses a standardized 30-day month calculation.
                          This means whether a loan starts on the 1st or 15th of a month, each 30-day period
                          is treated as one month. For partial months, interest is calculated proportionally
                          (e.g., 15 days = 0.5 month). This method provides consistent calculations regardless
                          of calendar month lengths.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}


              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">
                    <MoneyIcon />
                    Loan Amount
                  </label>
                  <input
                    type="number"
                    className={`input-field ${!validations.amount ? 'input-error' : ''}`}
                    placeholder="Enter amount"
                    value={form.amount || ""}
                    onChange={(e) => {
                      setForm({ ...form, amount: Number(e.target.value) });
                      if (!validations.amount) {
                        setValidations(prev => ({ ...prev, amount: true }));
                      }
                    }}
                    ref={amountRef}
                  />
                  {!validations.amount && (
                    <span className="input-error-message">Amount is required</span>
                  )}
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <PercentIcon />
                    Monthly Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    className={`input-field ${!validations.interestPerMonth ? 'input-error' : ''}`}
                    placeholder="Enter interest rate"
                    step="0.1"
                    value={form.interestPerMonth || ""}
                    onChange={(e) => {
                      setForm({ ...form, interestPerMonth: Number(e.target.value) });
                      if (!validations.interestPerMonth) {
                        setValidations(prev => ({ ...prev, interestPerMonth: true }));
                      }
                    }}
                    ref={interestRef}
                  />
                  {!validations.interestPerMonth && (
                    <span className="input-error-message">Interest rate is required</span>
                  )}
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <CalendarIcon />
                    Start Date
                  </label>
                  <input
                    type="date"
                    className={`input-field ${!validations.startDate ? 'input-error' : ''}`}
                    value={form.startDate}
                    onChange={(e) => {
                      setForm({ ...form, startDate: e.target.value });
                      if (!validations.startDate) {
                        setValidations(prev => ({ ...prev, startDate: true }));
                      }
                    }}
                    ref={startDateRef}
                  />
                  {!validations.startDate && (
                    <span className="input-error-message">Start date is required</span>
                  )}
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <CalendarIcon />
                    End Date
                  </label>
                  <input
                    type="date"
                    className={`input-field ${!validations.endDate ? 'input-error' : ''}`}
                    value={form.endDate}
                    onChange={(e) => {
                      setForm({ ...form, endDate: e.target.value });
                      if (!validations.endDate) {
                        setValidations(prev => ({ ...prev, endDate: true }));
                      }
                    }}
                    ref={endDateRef}
                  />
                  {!validations.endDate && (
                    <span className="input-error-message">End date is required</span>
                  )}
                </div>
              </div>

              <div className="preview-info">
                <div className="preview-item">
                  <span className="preview-label">Days Duration</span>
                  <span className="preview-value">{calculateDaysPreview()}</span>
                </div>
                <div className="preview-item">
                  <span className="preview-label">Loan Amount</span>
                  <span className="preview-value">{formatCurrency(form.amount)}</span>
                </div>
                <div className="preview-item">
                  <span className="preview-label">Monthly Rate</span>
                  <span className="preview-value">{form.interestPerMonth}%</span>
                </div>
              </div>

              <div className="button-group">
                <button
                  className="btn btn-primary"
                  onClick={calculate}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <CalculatorIcon />
                      Calculate Loan
                    </>
                  )}
                </button>

                {result && (
                  <button className="btn btn-success" onClick={save} disabled={isLoading}>
                    Save Calculation
                  </button>
                )}

                <button className="btn btn-secondary" onClick={resetForm}>
                  Reset Form
                </button>
              </div>

              {/* {result && (
                <div className="result-card">
                  <h3 className="result-title">Calculation Results</h3>
                  <div className="result-grid">
                    <div className="result-item">
                      <span className="result-label">Total Days</span>
                      <span className="result-value">{result.totalDays}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Total Interest</span>
                      <span className="result-value">{formatCurrency(result.totalInterest)}</span>
                    </div>
                    <div className="result-item highlight">
                      <span className="result-label">Total Amount</span>
                      <span className="result-value">{formatCurrency(result.totalAmount)}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Original Amount</span>
                      <span className="result-value">{formatCurrency(result.amount)}</span>
                    </div>
                  </div>
                </div>
              )} */}

{result && (
  <div className="result-card">
    <h3 className="result-title">Calculation Results</h3>
    
    {/* Summary Comparison */}
    <div className="comparison-summary">
      <div className="comparison-header">
        <span>📊 Actual vs Calculated (30-day month)</span>
      </div>
      <div className="comparison-grid">
        <div className="comparison-item">
          <span className="label">Total Days:</span>
          <span className="actual-value">{result.totalDays} days</span>
          <span className="calculated-value">
            ({result.totalCalculatedDays ?? result.totalDays} calc)
          </span>
          <span className="difference">
            {((result.totalCalculatedDays ?? result.totalDays) - result.totalDays) > 0 ? '+' : ''}
            {((result.totalCalculatedDays ?? result.totalDays) - result.totalDays)} days
          </span>
        </div>
        <div className="comparison-item">
          <span className="label">Total Interest:</span>
          <span className="actual-value">
            {formatCurrency(result.totalActualInterest ?? result.totalInterest)}
          </span>
          <span className="calculated-value">
            ({formatCurrency(result.totalInterest)} calc)
          </span>
          <span className="difference">
            {(result.totalInterest - (result.totalActualInterest ?? result.totalInterest)) > 0 ? '+' : ''}
            {formatCurrency(result.totalInterest - (result.totalActualInterest ?? result.totalInterest))}
          </span>
        </div>
      </div>
    </div>

    {/* Original result grid */}
    <div className="result-grid">
      {/* ... existing result items ... */}
    </div>
  </div>
)}

              
            </div>

            <div className="side-cards">
              <div className="info-card">
                <h3>Loan Summary</h3>
                <div className="summary-item">
                  <span>Total Months:</span>
                  <span className="summary-value">
                    {result?.monthlyBreakdown?.length || 0}
                  </span>
                </div>
                <div className="summary-item">
                  <span>Monthly Payment:</span>
                  <span className="summary-value">
                    {result ? formatCurrency(result.totalAmount / Math.ceil(result.totalDays / 30)) : formatCurrency(0)}
                  </span>
                </div>
                <div className="summary-item">
                  <span>Total Interest:</span>
                  <span className="summary-value interest-cost">
                    {result ? formatCurrency(result.totalInterest) : formatCurrency(0)}
                  </span>
                </div>
                <div className="summary-item">
                  <span>Daily Interest:</span>
                  <span className="summary-value">
                    {result ? formatCurrency(result.totalInterest / result.totalDays) : formatCurrency(0)}
                  </span>
                </div>
              </div>

              {result?.monthlyBreakdown && result.monthlyBreakdown.length > 0 && (
                <div className="info-card">
                  <div className="monthly-breakdown-header">
                    <h3>Monthly Breakdown</h3>
                    <span className="total-months">{result.monthlyBreakdown.length} months</span>
                  </div>
                  <div className="monthly-breakdown">
                    {getDisplayedMonths().map((month, index) => (
                      <div key={index} className="month-item">
                        <div
                          className="month-header"
                          onClick={() => setExpandedMonth(expandedMonth === index ? null : index)}
                        >
                          <div className="month-title">
                            <span className="month-name">{month.monthName} {month.year}</span>
                            <span className="month-number">Month {month.monthNumber}</span>
                          </div>
                          <div className="month-stats">
                            <span className="month-days">{month.daysInMonth} days</span>
                            <span className="month-interest">{formatCurrency(month.monthlyInterest)}</span>
                            <span className="expand-icon">
                              {expandedMonth === index ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            </span>
                          </div>
                        </div>
                        {/* {expandedMonth === index && (
                          <div className="month-details">
                            <div className="detail-row">
                              <span>Period:</span>
                              <span>{formatDate(month.startDate)} - {formatDate(month.endDate)}</span>
                            </div>
                            <div className="detail-row">
                              <span>Days in Period:</span>
                              <span className="days-count">{month.daysInMonth} days</span>
                            </div>
                            <div className="detail-row">
                              <span>Monthly Interest:</span>
                              <span className="interest-amount">{formatCurrency(month.monthlyInterest)}</span>
                            </div>
                            <div className="detail-row">
                              <span>Cumulative Interest:</span>
                              <span className="cumulative-interest">{formatCurrency(month.cumulativeInterest)}</span>
                            </div>
                            <div className="detail-row">
                              <span>Daily Interest:</span>
                              <span className="daily-interest">{formatCurrency(month.monthlyInterest / month.daysInMonth)}</span>
                            </div>
                          </div>
                        )} */}

                        {expandedMonth === index && (
  <div className="month-details">
    {/* Actual vs Calculated Days */}
    <div className="detail-row comparison-row">
      <span>📅 Actual Days:</span>
      <span className="days-count">{month.actualDaysInMonth} days</span>
    </div>
    <div className="detail-row comparison-row">
      <span>🧮 Calculated Days (30-day rule):</span>
      <span className={`days-count ${month.daysDifference !== 0 ? 'highlight-difference' : ''}`}>
        {month.calculatedDaysInMonth} days
        {month.daysDifference !== 0 && (
          <span className="difference-badge">
            ({month.daysDifference > 0 ? '+' : ''}{month.daysDifference} days)
          </span>
        )}
      </span>
    </div>
    
    {/* Actual vs Calculated Interest */}
    <div className="detail-row comparison-row">
      <span>💰 Actual Interest:</span>
      <span className="interest-amount">{formatCurrency(month.actualMonthlyInterest)}</span>
    </div>
    <div className="detail-row comparison-row">
      <span>🧮 Calculated Interest:</span>
      <span className={`interest-amount ${month.interestDifference !== 0 ? 'highlight-difference' : ''}`}>
        {formatCurrency(month.calculatedMonthlyInterest)}
        {month.interestDifference !== 0 && (
          <span className="difference-badge">
            ({month.interestDifference > 0 ? '+' : ''}{formatCurrency(month.interestDifference)})
          </span>
        )}
      </span>
    </div>
    
    {/* Interest Calculation Method */}
    <div className="detail-row method-row">
      <span>⚙️ Method:</span>
      <span className={`method-badge ${month.isFullMonthCharge ? 'full-month' : 'partial-month'}`}>
        {month.interestCalculationMethod}
      </span>
    </div>
    
    {/* Period */}
    <div className="detail-row">
      <span>📆 Period:</span>
      <span>{formatDate(month.startDate)} - {formatDate(month.endDate)}</span>
    </div>
    
    {/* Cumulative Comparison */}
    <div className="detail-row cumulative-row">
      <span>📊 Actual Cumulative:</span>
      <span>{formatCurrency(month.actualCumulativeInterest)}</span>
    </div>
    <div className="detail-row cumulative-row">
      <span>📊 Calculated Cumulative:</span>
      <span>{formatCurrency(month.calculatedCumulativeInterest)}</span>
    </div>
  </div>
)}
                      </div>


                    ))}



                    {result.monthlyBreakdown.length > 3 && !showAllMonths && (
                      <div className="more-months">
                        <p>+ {result.monthlyBreakdown.length - 3} more months...</p>
                        <button
                          className="btn-view-all"
                          onClick={() => setShowAllMonths(true)}
                        >
                          Show All {result.monthlyBreakdown.length} Months
                        </button>
                      </div>
                    )}

                    {showAllMonths && result.monthlyBreakdown.length > 3 && (
                      <div className="more-months">
                        <button
                          className="btn-view-all"
                          onClick={() => setShowAllMonths(false)}
                        >
                          Show Less
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="info-card">
                <h3>Quick Tips</h3>
                <ul className="tips-list">
                  <li>• Lower interest rates save money over time</li>
                  <li>• Shorter loan terms reduce total interest</li>
                  <li>• Always compare lenders for best rates</li>
                  <li>• Consider additional fees in calculations</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeNav === 'history' && (
          <div className="history-section main-card">
            <div className="section-title">
              <HistoryIcon />
              <h2>Calculation History</h2>
            </div>

            {isLoading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading history...</p>
              </div>
            ) : history.length === 0 ? (
              <div className="empty-state">
                <p>No calculation history yet. Start by calculating a loan!</p>
              </div>
            ) : (
              <div className="history-table-container">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Amount</th>
                      <th>Interest</th>
                      <th>Period</th>
                      <th>Days</th>
                      <th>Total Interest</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((h) => (
                      <tr key={h.id} className="history-row">
                        <td className="amount-cell">{formatCurrency(h.amount)}</td>
                        <td className="interest-cell">{h.interestPerMonth}%</td>
                        <td className="period-cell">
                          <div>{formatDate(h.startDate)}</div>
                          <div className="date-separator">to</div>
                          <div>{formatDate(h.endDate)}</div>
                        </td>
                        <td className="days-cell">{h.totalDays}</td>
                        <td className="interest-total-cell">{formatCurrency(h.totalInterest)}</td>
                        <td className="total-cell">{formatCurrency(h.totalAmount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeNav === 'dashboard' && (
          <div className="dashboard-content">
            <div className="content-grid">
              <div className="main-card">
                <h2>Recent Calculations</h2>
                <div className="recent-calculations">
                  {history.slice(0, 5).map((h, index) => (
                    <div key={h.id} className="recent-item">
                      <div className="recent-header">
                        <span className="recent-title">Calculation #{history.length - index}</span>
                        <span className="recent-date">{formatDate(h.createdAt || h.startDate)}</span>
                      </div>
                      <div className="recent-details">
                        <div className="recent-detail">
                          <span>Amount:</span>
                          <span className="recent-value">{formatCurrency(h.amount)}</span>
                        </div>
                        <div className="recent-detail">
                          <span>Interest:</span>
                          <span className="recent-value">{h.interestPerMonth}%</span>
                        </div>
                        <div className="recent-detail">
                          <span>Total:</span>
                          <span className="recent-value total">{formatCurrency(h.totalAmount)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="side-cards">
                <div className="info-card">
                  <h3>Loan Distribution</h3>
                  <div className="distribution-chart">
                    <div className="chart-bar">
                      <div className="bar-label">Short-term (≤90 days)</div>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: '40%' }}></div>
                      </div>
                      <div className="bar-value">40%</div>
                    </div>
                    <div className="chart-bar">
                      <div className="bar-label">Medium-term (91-180 days)</div>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: '35%' }}></div>
                      </div>
                      <div className="bar-value">35%</div>
                    </div>
                    <div className="chart-bar">
                      <div className="bar-label">Long-term (&gt;180 days)</div>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: '25%' }}></div>
                      </div>
                      <div className="bar-value">25%</div>
                    </div>
                  </div>
                </div>

                <div className="info-card">
                  <h3>Interest Rate Trends</h3>
                  <div className="trend-info">
                    <div className="trend-item">
                      <span>Current Avg:</span>
                      <span className="trend-value">{stats.avgInterestRate.toFixed(1)}%</span>
                    </div>
                    <div className="trend-item">
                      <span>Monthly High:</span>
                      <span className="trend-value high">8.5%</span>
                    </div>
                    <div className="trend-item">
                      <span>Monthly Low:</span>
                      <span className="trend-value low">3.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;