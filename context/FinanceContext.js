import { createContext, useContext, useRef, useState } from 'react';
import { initialData, calculateTotals, saveEntry, deleteEntry, initialMonthlySavings, updateMonthlySavings } from '../data/financeData';

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [data, setData] = useState(initialData);
  const nextId = useRef(1);
  const [monthlySavings, setMonthlySavings] = useState(initialMonthlySavings);

  function saveMonth(monthIndex, amount) {
    setMonthlySavings(current => updateMonthlySavings(current, monthIndex, amount));
  }

  function save(group, values, id) {
    const entry = { ...values, id: id ?? `local-${nextId.current++}` };
    setData(current => saveEntry(current, group, entry));
  }

  function remove(group, id) {
    setData(current => deleteEntry(current, group, id));
  }

  return (
    <FinanceContext.Provider value={{ data, totals: calculateTotals(data), save, remove, monthlySavings, saveMonth }}>
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinances = () => useContext(FinanceContext);
