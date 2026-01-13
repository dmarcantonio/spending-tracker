import React, { useEffect, useState } from 'react';
import './App.css';
import { TransactionComponent } from './Transactions/TransactionComponent';
import { loadAllTransactions } from './Transactions/loadTransactions';
import { Transaction } from './Transactions/Transaction';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    loadAllTransactions()
      .then(txs => {
        if (mounted) setTransactions(txs);
        if (mounted) {
          // derive unique months (YYYY-MM) in the order transactions are returned (loader sorts desc)
          const monthKeys = Array.from(new Set(txs.map(t => `${t.date.getFullYear()}-${String(t.date.getMonth()+1).padStart(2,'0')}`)));
          setMonths(monthKeys);
          if (monthKeys.length > 0) setSelectedMonth(prev => prev || monthKeys[0]);
        }
      })
      .catch(err => console.error(err));
    return () => {
      mounted = false;
    };
  }, []);

  const formatMonthLabel = (key: string) => {
    const [y, m] = key.split('-').map(Number);
    const d = new Date(y, m - 1, 1);
    return d.toLocaleString(undefined, { month: 'long', year: 'numeric' });
  };

  const byMonth = selectedMonth
    ? transactions.filter(t => `${t.date.getFullYear()}-${String(t.date.getMonth()+1).padStart(2,'0')}` === selectedMonth)
    : transactions;

  const filtered = selectedCategory ? byMonth.filter(t => (t.category || 'Uncategorized') === selectedCategory) : byMonth;

  const categoryTotals = (() => {
    const map = new Map<string, number>();
    for (const t of byMonth) {
      const key = t.category || 'Uncategorized';
      map.set(key, (map.get(key) || 0) + t.amount);
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  })();

  // Calculate total for the month ignoring category TRANS
  const monthTotal = byMonth
    .filter(t => t.category !== 'TRANS')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="App p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Spending Tracker</h1>

      {months.length > 0 && (
        <div className="mb-4">
          <label htmlFor="month-select" className="mr-2">Select month:</label>
          <select id="month-select" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="border rounded px-2 py-1">
            <option value="">All</option>
            {months.map(m => (
              <option key={m} value={m}>{formatMonthLabel(m)}</option>
            ))}
          </select>
        </div>
      )}

      {transactions.length === 0 ? (
        <p>No transactions loaded.</p>
      ) : (
        <div>
          <section className="mb-6">
            <h2 className="text-xl font-medium">
              Category summary {selectedMonth ? `— ${formatMonthLabel(selectedMonth)}` : ''}
              {selectedMonth && (
                <span className="ml-2 text-sm text-gray-600">(Total: ${monthTotal.toFixed(2)})</span>
              )}
            </h2>
            {categoryTotals.length === 0 ? (
              <p>No transactions for this month.</p>
            ) : (
              <div className="max-h-[50vh] overflow-y-auto">
                <div className="grid grid-cols-1 gap-2">
                  {categoryTotals.map(([cat, total]) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(prev => (prev === cat ? '' : cat))}
                      className={`text-left p-3 rounded border ${selectedCategory === cat ? 'bg-orange-50 border-blue-200' : 'bg-blue-50 border-blue-200'}`}
                    >
                      <div className="flex justify-between">
                        <span className="font-semibold">{cat}</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </button>
                  ))}
                </div>
                {selectedCategory && (
                  <div className="mt-3">
                    <button onClick={() => setSelectedCategory('')} className="text-sm text-blue-600">Show all categories</button>
                  </div>
                )}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-medium mb-3">
              Transactions {selectedMonth ? `— ${formatMonthLabel(selectedMonth)}` : ''} {selectedCategory ? `— Category: ${selectedCategory}` : ''}
            </h2>
            {filtered.length === 0 && (
              <p>No transactions match the selected filters.</p>
            )}
            <div className="space-y-3">
              {filtered.map(transaction => (
                <TransactionComponent key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
