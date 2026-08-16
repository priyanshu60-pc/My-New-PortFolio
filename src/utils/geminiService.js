import { retrieveContext } from './ragEngine';

function extractSafeReply(payload) {
  if (!payload) return 'I could not generate a response right now.';

  if (typeof payload === 'string') return payload;

  if (Array.isArray(payload)) {
    return payload
      .map((item) => extractSafeReply(item))
      .filter(Boolean)
      .join('\n');
  }

  if (typeof payload === 'object') {
    if (typeof payload.text === 'string' && payload.text.trim()) return payload.text;
    if (typeof payload.message === 'string' && payload.message.trim()) return payload.message;
    if (typeof payload.content === 'string' && payload.content.trim()) return payload.content;
    if (Array.isArray(payload.content)) {
      return payload.content
        .map((part) => extractSafeReply(part))
        .filter(Boolean)
        .join('\n');
    }
    if (payload.output && typeof payload.output === 'string') return payload.output;
    if (payload.answer && typeof payload.answer === 'string') return payload.answer;
  }

  return 'I could not generate a response right now.';
}

export async function askGeminiAssistant(userQuery, conversationHistory = []) {
  const { contextText, sources } = retrieveContext(userQuery, 4);

  if (!window.puter || !window.puter.ai || typeof window.puter.ai.chat !== 'function') {
    throw new Error('PUTER_NOT_AVAILABLE');
  }

  try {
    const response = await Promise.race([
      window.puter.ai.chat(userQuery, {
        model: 'gemini-2.5-flash',
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('AI_TIMEOUT')), 20000)
      ),
    ]);

    const reply = extractSafeReply(response);

    return {
      text: reply,
      sources,
    };
  } catch (error) {
    console.error('Puter AI request failed:', error);

    const fallback = `I found relevant project and skill information in Priyanshu's portfolio. Based on the available data, he is an AI/ML and full-stack developer focused on ${contextText.slice(0, 180)}...`;

    return {
      text: fallback,
      sources,
    };
  }
}

export function getGeminiApiKey() {
  return null;
}

export function saveGeminiApiKey() {
  return null;
}
