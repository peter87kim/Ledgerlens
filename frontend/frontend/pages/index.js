import { useState } from 'react';

export default function Home() {
  const [industry, setIndustry] = useState('');
  const [vibe, setVibe] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry, vibe })
      });
      const data = await res.json();
      setImages(data.images);
    } catch (err) {
      setError('Failed to generate logos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">HueCraft</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4">
        <input
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="Industry (e.g. coffee shop)"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
          placeholder="Vibe (e.g. vibrant)"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Logos'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      <div className="w-full max-w-4xl mt-10 grid grid-cols-3 gap-6">
        {images.length > 0 ? (
          images.map((src, idx) => (
            <div key={idx} className="flex justify-center">
              <img src={src} alt={`Logo ${idx + 1}`} className="h-32 object-contain" />
            </div>
          ))
        ) : (
          [1,2,3].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
          ))
        )}
      </div>
    </div>
  );
}
