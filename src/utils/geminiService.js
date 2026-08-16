import { retrieveContext } from './ragEngine';

export async function askGeminiAssistant(userQuery, conversationHistory = []) {
  const { contextText, sources } = retrieveContext(userQuery, 4);

  if (!window.puter || !window.puter.ai || !window.puter.ai.chat) {
    throw new Error('PUTER_NOT_AVAILABLE');
  }

  try {
    const response = await window.puter.ai.chat(userQuery, {
      model: 'gemini-3.7-flash',
    });

    const reply = typeof response === 'string' ? response : response?.text || response?.message || 'I could not generate a response right now.';

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
