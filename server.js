import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { retrieveContext } from './src/utils/ragEngine.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body || {};

    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message is required.' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'OPENAI_API_KEY is not set on the server.' });
    }

    const { contextText, sources } = retrieveContext(message, 4);
    const systemPrompt = `You are Priyanshu AI, a professional AI portfolio assistant for Priyanshu Chakraborty.
Use only the information in the provided portfolio context. Be concise, friendly, and helpful.
If the user asks something unrelated, gently redirect back to Priyanshu's portfolio and work.

Portfolio context:
${contextText}`;

    const client = new OpenAI({ apiKey });

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      max_tokens: 700,
      messages: [
        { role: 'system', content: systemPrompt },
        ...history.slice(-6).map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        })),
        { role: 'user', content: message },
      ],
    });

    const text = completion.choices?.[0]?.message?.content || 'No response generated.';

    return res.json({
      text,
      sources,
    });
  } catch (error) {
    console.error('Server AI error:', error);
    return res.status(500).json({
      message: error.message || 'Server AI request failed',
    });
  }
});

app.listen(port, () => {
  console.log(`Portfolio AI server running on http://localhost:${port}`);
});
