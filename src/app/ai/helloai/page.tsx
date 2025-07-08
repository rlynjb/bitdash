/**
 * Notes:
 * JS Vector Databases
 * https://www.npmjs.com/package/vectra
 * https://rxdb.info/articles/javascript-vector-database.html
 */
"use client";
import { useState } from "react";
/*
import { OpenAI } from 'openai';
import { Agent, tool, run, setDefaultOpenAIClient } from '@openai/agents';

const customClient = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: process.env.NEXT_PUBLIC_OPENAPI_KEY
});
setDefaultOpenAIClient(customClient);
*/

/**
 * Tools
 */
/*
const historyFunFact = tool({
  name: 'history_fun_fact',
  description: 'Give a fun fact about a historical event',
  execute: async () => {
    return 'Sharks are older than trees.';
  },
  parameters: undefined
});
*/

/**
 * Agents
 */
/*
const agent = new Agent({
  name: 'History Tutor',
  instructions:
    'You provide assistance with historical queries. Explain important events and context clearly.',
  //tools: [historyFunFact]
});
*/

const fetchData = async () => {
  try {
    const response = await fetch('/.netlify/functions/my-function');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

interface FunctionResponse {
  message: string;
}

export default function Helloai() {
  const [data, setData] = useState<FunctionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-3 text-left">
      {/**
      <div className="mb-4 col-span-3">
        add Mermaid diagram to convey what I learned throughout the course.
        <br></br>
        compare Langchain and OpenAPI Agent architecture based on usage.
      </div>

      <div className="mb-4">
        Exploring Prompting Techniques (enhances Context)
        <br />
        <ul>
          <li>Zero shots</li>
          <li>Few shots</li>
          <li>CoT</li>
          <li>ReAct</li>
        </ul>
      </div>

      <div className="mb-4">
        Tools to enhance Context:
        <ul>
          <li>Vector DB</li>
          <li>Web Search APIs</li>
          <li>other Apis</li>
          <li>In-memory (chat history)</li>
          <li>Documents</li>
        </ul>
      </div>

      <div className="mb-4">
        Various input methods:
        <ul>
          <li>Text</li>
          <li>Image</li>
          <li>Voice</li>
          <li>Documents</li>
        </ul>
      </div>

      <div className="col-span-3 mb-4">
        <button onClick={() => getAnswer()}>
          How old is the Universe?
        </button>

        <p className="mt-6">
          {answer}
        </p>
      </div>
       */}

      <div className="col-span-3 mb-4">
        <button 
          onClick={handleFetchData}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Test Netlify Function'}
        </button>

        {error && (
          <p className="mt-4 text-red-500">
            Error: {error}
          </p>
        )}

        {data && (
          <p className="mt-4 text-green-500">
            Success: {data.message}
          </p>
        )}
      </div>
    </div>
  )
}
