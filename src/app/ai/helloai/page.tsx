"use client";
import { useState } from "react";

const fetchData = async (query: string) => {
  try {
    const response = await fetch("/.netlify/functions/query", {
      method: "POST",
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default function Helloai() {
  const [inputData, setInputData] = useState<string>('');
  const [respondData, setRespondData] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchData(inputData);
      setRespondData(result.answer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-3 text-center">
      <div className="col-span-3 mb-4">
        <h2>Smart Travel Buddy</h2>
        <input 
          type="text" 
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="What do you want to do in San Francisco..."
          className="bg-black p-2 border border-gray-500 mt-4 min-w-80 w-[40%]" 
        />
      </div>

      <div className="col-span-3 mb-4">
        <button 
          onClick={handleFetchData}
          disabled={loading}
          className="bg-gray-700 hover:bg-gray-800 text-gray-300 font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Ask'}
        </button>

        {error && (
          <p className="mt-4 text-red-500">
            Error: {error}
          </p>
        )}

        {respondData && (
          <p className="mt-6 max-w-[70%] m-auto">
            {respondData}
          </p>
        )}
      </div>
    </div>
  )
}
