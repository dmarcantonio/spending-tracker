import React, { useEffect, useState } from 'react';
import './App.css';
import { TransactionComponent } from './Transactions/TransactionComponent';
import { loadAllTransactions } from './Transactions/loadTransactions';
import { Transaction } from './Transactions/Transaction';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    let mounted = true;
    loadAllTransactions()
      .then(txs => {
        if (mounted) setTransactions(txs);
      })
      .catch(err => console.error(err));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="App">
      {transactions.length === 0 ? (
        <p>No transactions loaded.</p>
      ) : (
        transactions.map(transaction => (
          <TransactionComponent key={transaction.id} transaction={transaction} />
        ))
      )}
    </div>
  );
}

export default App;
