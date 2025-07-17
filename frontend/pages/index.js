import { useState } from 'react';

export default function Home() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/forecast', { method: 'POST' });
      const data = await res.json();
      setChartData(data);
    } catch {
      setError('Failed to fetch forecast');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">LedgerLens Dashboard</h1>
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-indigo-600 text-white rounded mb-6"
        disabled={loading}
      >
        {loading ? 'Forecasting…' : 'Generate Forecast'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {chartData && (
        <div>
          <h2 className="text-xl font-semibold mb-2">MRR Forecast</h2>
          {/* Placeholder for chart */}
          <pre className="bg-white p-4 rounded shadow">{JSON.stringify(chartData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
