/**
 * Notes:
 * JS Vector Databases
 * https://www.npmjs.com/package/vectra
 * https://rxdb.info/articles/javascript-vector-database.html
 */
"use client";
import { useState } from "react";
import { OpenAI } from 'openai';
import { Agent, tool, run, setDefaultOpenAIClient } from '@openai/agents';

const customClient = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: process.env.NEXT_PUBLIC_OPENAPI_KEY
});
setDefaultOpenAIClient(customClient);


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
const agent = new Agent({
  name: 'History Tutor',
  instructions:
    'You provide assistance with historical queries. Explain important events and context clearly.',
  //tools: [historyFunFact]
});

export default function Pet() {
  const [ answer, setAnswer] = useState<string | undefined>('')

  const getAnswer = async () => {
    const result = await run(agent, 'How old is the Universe?');
    setAnswer(result.finalOutput)
  }

  return (
    <div className="grid grid-cols-3 text-left">
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
    </div>
  )
}
