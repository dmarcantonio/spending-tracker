import React, { useState } from 'react';
import './App.css';
import Summary from './Summary/Summary';
import Trends from './Trends/Trends';

function App() {
  const [tab, setTab] = useState<'summary' | 'trends'>('summary');

  return (
    <div className="App p-6 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Vancity Spending Tracker</h1>
        <nav className="space-x-2">
          <button onClick={() => setTab('summary')} className={`px-3 py-1 rounded ${tab === 'summary' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Summary</button>
          <button onClick={() => setTab('trends')} className={`px-3 py-1 rounded ${tab === 'trends' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Trends</button>
        </nav>
      </header>

      <main>
        {tab === 'summary' && <Summary />}
        {tab === 'trends' && <Trends />}
      </main>
    </div>
  );
}
export default App;
