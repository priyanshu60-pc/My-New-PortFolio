import { useState, useEffect, useRef } from 'react';
import { askGeminiAssistant, getGeminiApiKey, saveGeminiApiKey } from '../../utils/geminiService';
import styles from './AIAssistant.module.scss';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hi! I'm **Priyanshu AI**, powered by **Google Gemini** & **RAG** (Retrieval-Augmented Generation).\n\nAsk me anything about Priyanshu's projects, AI/ML skills, Java backend experience, or availability!",
      sources: ['Profile & Contact Info', 'Technical Skills Overview'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [keyError, setKeyError] = useState('');
  const [hasCustomKey, setHasCustomKey] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    const key = getGeminiApiKey();
    setHasCustomKey(!!key);
  }, []);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    const key = getGeminiApiKey();
    if (!key) {
      setShowKeyModal(true);
    }
  };

  const handleSaveKey = (e) => {
    e?.preventDefault();
    if (!apiKeyInput.trim()) {
      setKeyError('Please enter a valid Gemini API key.');
      return;
    }
    saveGeminiApiKey(apiKeyInput.trim());
    setHasCustomKey(true);
    setShowKeyModal(false);
    setApiKeyInput('');
    setKeyError('');
  };

  const handleClearKey = () => {
    saveGeminiApiKey(null);
    setHasCustomKey(false);
    setShowKeyModal(true);
  };

  const handleSend = async (queryToSend = null) => {
    const query = queryToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const currentKey = getGeminiApiKey();
    if (!currentKey) {
      setShowKeyModal(true);
      return;
    }

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryToSend) setInputQuery('');
    setIsLoading(true);

    try {
      const response = await askGeminiAssistant(userMsg.text, messages);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.text,
        sources: response.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      if (err.message === 'API_KEY_MISSING' || err.message === 'API_KEY_INVALID') {
        setShowKeyModal(true);
        setKeyError('Your Gemini API key appears to be invalid or missing. Please enter a valid key.');
      } else {
        const errorMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `⚠️ Oops! Encountered an error: ${err.message || 'Unable to connect to Gemini API'}. Please try again.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "What are Priyanshu's top technical skills?",
    "Tell me about the 'Pick Up' delivery project",
    "What is Priyanshu's educational background?",
    "Is Priyanshu open for hire?",
  ];

  return (
    <div className={styles.container}>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          className={styles.fab}
          onClick={handleOpenToggle}
          title="Open Priyanshu AI Assistant"
          aria-label="Open AI Assistant"
        >
          <div className={styles.fabGlow} />
          <div className={styles.fabIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
              <path d="M4 11a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7z" />
              <path d="M9 16v1" />
              <path d="M15 16v1" />
              <path d="M8 12h.01" />
              <path d="M16 12h.01" />
            </svg>
          </div>
          <span className={styles.fabLabel}>Ask AI</span>
          <span className={styles.pulseDot} />
        </button>
      )}

      {/* Chat Drawer / Window */}
      {isOpen && (
        <div className={styles.chatDrawer}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.avatar}>🤖</div>
              <div>
                <h3 className={styles.title}>Priyanshu AI</h3>
                <span className={styles.subtitle}>
                  <span className={styles.onlineDot} /> RAG + Gemini 2.5
                </span>
              </div>
            </div>
            <div className={styles.headerActions}>
              <button
                className={styles.iconBtn}
                onClick={() => setShowKeyModal(true)}
                title="Gemini API Key Settings"
              >
                🔑
              </button>
              <button
                className={styles.iconBtn}
                onClick={() => setIsOpen(false)}
                title="Close Assistant"
              >
                ✕
              </button>
            </div>
          </div>

          {/* API Key Modal Popup */}
          {showKeyModal && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <h4>Gemini API Key</h4>
                <p>
                  Enter your Google Gemini API key to interact with Priyanshu AI.
                  Your key is stored locally in your browser session.
                </p>
                <form onSubmit={handleSaveKey}>
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    className={styles.keyInput}
                  />
                  {keyError && <div className={styles.errorText}>{keyError}</div>}
                  <div className={styles.modalBtns}>
                    <button type="submit" className={styles.saveBtn}>
                      Save Key
                    </button>
                    {hasCustomKey && (
                      <button
                        type="button"
                        className={styles.clearBtn}
                        onClick={handleClearKey}
                      >
                        Remove Key
                      </button>
                    )}
                    <button
                      type="button"
                      className={styles.cancelBtn}
                      onClick={() => setShowKeyModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </form>
                <div className={styles.apiHelp}>
                  Need a key?{' '}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get a free Gemini API Key from Google AI Studio ↗
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Messages Body */}
          <div className={styles.messagesContainer}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageWrapper} ${
                  msg.sender === 'user' ? styles.userWrapper : styles.botWrapper
                }`}
              >
                <div className={styles.messageBubble}>
                  <div className={styles.messageText}>{msg.text}</div>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className={styles.ragSources}>
                      <span className={styles.ragLabel}>🔍 Grounded RAG Sources:</span>
                      <div className={styles.sourcesList}>
                        {msg.sources.map((src, i) => (
                          <span key={i} className={styles.sourceTag}>
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <span className={styles.timestamp}>{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className={`${styles.messageWrapper} ${styles.botWrapper}`}>
                <div className={styles.messageBubble}>
                  <div className={styles.typingIndicator}>
                    <span>Searching Knowledge Base & Generating...</span>
                    <div className={styles.dots}>
                      <div className={styles.dot} />
                      <div className={styles.dot} />
                      <div className={styles.dot} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 2 && !isLoading && (
            <div className={styles.quickPrompts}>
              <span className={styles.quickLabel}>Suggested questions:</span>
              <div className={styles.chips}>
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    className={styles.chip}
                    onClick={() => handleSend(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar */}
          <div className={styles.inputArea}>
            <textarea
              className={styles.textarea}
              placeholder="Ask Priyanshu AI..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              rows={1}
            />
            <button
              className={styles.sendBtn}
              onClick={() => handleSend()}
              disabled={isLoading || !inputQuery.trim()}
              title="Send Message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
