import React, {useEffect, useState} from 'react';
import { loadAllTransactions } from '../Transactions/loadTransactions';
import { Transaction } from '../Transactions/Transaction';
import { getTransactionCount } from './aggregate';

function Trends() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedView, setSelectedView] = useState<'month' | 'all'>('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllTransactions().then(txs => {
      setTransactions(txs);
      // derive unique months (YYYY-MM) in the order transactions are returned (loader sorts desc)
      const monthKeys = Array.from(new Set(txs.map(t => `${t.date.getFullYear()}-${String(t.date.getMonth()+1).padStart(2,'0')}`)));
      setMonths(monthKeys);
      if (monthKeys.length > 0) setSelectedMonth(prev => prev || monthKeys[0]);
      setLoading(false);
    });
  }, []);

  

  return (
    <section className="p-4 border rounded bg-white">
      <h2 className="text-xl font-medium mb-2">Trends </h2>
      <p className="text-sm text-gray-600">Total transactions: {getTransactionCount(transactions)}</p>
      {loading && <p>Loading...</p>}
        {!loading && months.length === 0 && <p>No transactions available.</p>}
        {!loading && months.length > 0 && (
          <div className="mt-4">
            <label className="mr-2 font-medium">View:</label>
            <select
              value={selectedView}
              onChange={e => setSelectedView(e.target.value as 'month' | 'all')}
              className="border rounded p-1"
            >
              <option value="month">By Month</option>
              <option value="all">All Time</option>
            </select>

            {selectedView === 'month' && (
              <>
                <label className="ml-4 mr-2 font-medium">Month:</label>
                <select
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(e.target.value)}
                  className="border rounded p-1"
                >
                  {months.map(m => (
                    <option key={m} value={m}>
                      {new Date(Number(m.split('-')[0]), Number(m.split('-')[1]) - 1).toLocaleString(undefined, { month: 'long', year: 'numeric' })}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        )} 
    </section>
  );
}

export default Trends;