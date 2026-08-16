import { useState, useEffect, useRef } from 'react';
import { askGeminiAssistant } from '../../utils/geminiService';
import styles from './AIAssistant.module.scss';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hi! I'm **Priyanshu AI**, powered by a private OpenAI-backed RAG assistant.\n\nAsk me anything about Priyanshu's projects, AI/ML skills, Java backend experience, or availability!",
      sources: ['Profile & Contact Info', 'Technical Skills Overview'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (queryToSend = null) => {
    const query = queryToSend || inputQuery;
    if (!query.trim() || isLoading) return;

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
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `⚠️ The AI service is unavailable right now. Please make sure the server is running and the private OpenAI key is configured in the backend environment.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
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
      {!isOpen && (
        <button
          className={styles.fab}
          onClick={() => setIsOpen(true)}
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

      {isOpen && (
        <div className={styles.chatDrawer}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.avatar}>🤖</div>
              <div>
                <h3 className={styles.title}>Priyanshu AI</h3>
                <span className={styles.subtitle}>
                  <span className={styles.onlineDot} /> RAG + private OpenAI
                </span>
              </div>
            </div>
            <div className={styles.headerActions}>
              <button
                className={styles.iconBtn}
                onClick={() => setIsOpen(false)}
                title="Close Assistant"
              >
                ✕
              </button>
            </div>
          </div>

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
