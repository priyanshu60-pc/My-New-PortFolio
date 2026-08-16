export async function askGeminiAssistant(userQuery, conversationHistory = []) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userQuery,
        history: conversationHistory,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Unable to contact the AI server');
    }

    const data = await response.json();
    return {
      text: data.text,
      sources: data.sources || [],
    };
  } catch (error) {
    console.error('AI chat request failed:', error);
    throw new Error(error.message || 'AI service unavailable');
  }
}

export function getGeminiApiKey() {
  return null;
}

export function saveGeminiApiKey() {
  return null;
}
