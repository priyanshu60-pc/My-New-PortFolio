import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './AiChat.module.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const CONV_KEY = 'pc_conv_id';

// ── Message bubble component ───────────────────────────────────────────────────
function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`${styles.message} ${isUser ? styles.userMsg : styles.aiMsg}`}>
      {!isUser && (
        <div className={styles.avatar} aria-hidden="true">
          <span>PC</span>
        </div>
      )}
      <div className={styles.bubble}>
        <p className={styles.bubbleText}>{msg.content}</p>
      </div>
    </div>
  );
}

// ── Typing indicator ───────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className={`${styles.message} ${styles.aiMsg}`}>
      <div className={styles.avatar} aria-hidden="true">
        <span>PC</span>
      </div>
      <div className={styles.bubble}>
        <div className={styles.typing} aria-label="Priyanshu AI is typing">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

// ── Streaming message (live) ───────────────────────────────────────────────────
function StreamingMessage({ content }) {
  return (
    <div className={`${styles.message} ${styles.aiMsg}`}>
      <div className={styles.avatar} aria-hidden="true">
        <span>PC</span>
      </div>
      <div className={styles.bubble}>
        <p className={styles.bubbleText}>
          {content}
          <span className={styles.cursor} aria-hidden="true">▌</span>
        </p>
      </div>
    </div>
  );
}

// ── Main AiChat component ──────────────────────────────────────────────────────
export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [streamContent, setStreamContent] = useState('');
  const [error, setError] = useState(null);
  const [convId, setConvId] = useState(() => localStorage.getItem(CONV_KEY) || null);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "Hi! I'm Priyanshu's AI assistant 👋 Ask me about his skills, projects, or education — or say \"I'd like to send a message\" to contact him directly.",
      }]);
    }
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamContent]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  // Clean up on unmount
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;

    setInput('');
    setError(null);
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setStreaming(true);
    setStreamContent('');

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
        body: JSON.stringify({ message: text, conversation_id: convId }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `Server error ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // keep incomplete line

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;

          let evt;
          try { evt = JSON.parse(raw); } catch { continue; }

          if (evt.type === 'init' && evt.conversation_id) {
            setConvId(evt.conversation_id);
            localStorage.setItem(CONV_KEY, evt.conversation_id);
          } else if (evt.type === 'delta' && evt.content) {
            accumulated += evt.content;
            setStreamContent(accumulated);
          } else if (evt.type === 'done') {
            // commit streamed message
            if (accumulated) {
              setMessages(prev => [...prev, { role: 'assistant', content: accumulated }]);
            }
            setStreamContent('');
          } else if (evt.type === 'error') {
            throw new Error(evt.content || 'Unknown error');
          }
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('Chat error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
      setStreamContent('');
    } finally {
      setStreaming(false);
    }
  }, [input, streaming, convId]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleNewChat = () => {
    abortRef.current?.abort();
    localStorage.removeItem(CONV_KEY);
    setConvId(null);
    setMessages([{
      role: 'assistant',
      content: "Hi! I'm Priyanshu's AI assistant 👋 How can I help you today?",
    }]);
    setStreamContent('');
    setError(null);
    setStreaming(false);
  };

  return (
    <>
      {/* ── Floating trigger button ────────────────────────────────────────── */}
      <button
        className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close AI chat' : 'Open Ask Priyanshu AI'}
        id="ai-chat-fab"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {!open && <span className={styles.fabLabel}>Ask Priyanshu AI</span>}
      </button>

      {/* ── Chat panel ────────────────────────────────────────────────────── */}
      <div
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
        role="dialog"
        aria-label="Ask Priyanshu AI"
        aria-modal="true"
        id="ai-chat-panel"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerAvatar}>
              <span>PC</span>
              <span className={styles.onlineDot} aria-hidden="true" />
            </div>
            <div>
              <p className={styles.headerTitle}>Priyanshu AI</p>
              <p className={styles.headerSub}>Ask me anything about Priyanshu</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button
              className={styles.newChatBtn}
              onClick={handleNewChat}
              title="New conversation"
              aria-label="Start new conversation"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messages} role="log" aria-live="polite" aria-label="Chat messages">
          {messages.map((msg, i) => (
            <Message key={i} msg={msg} />
          ))}
          {streaming && streamContent && <StreamingMessage content={streamContent} />}
          {streaming && !streamContent && <TypingIndicator />}
          {error && (
            <div className={styles.errorMsg} role="alert">
              ⚠ {error}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions (shown when no user messages yet) */}
        {messages.filter(m => m.role === 'user').length === 0 && (
          <div className={styles.suggestions}>
            {[
              "What are his main skills?",
              "Tell me about his projects",
              "What's his educational background?",
              "I want to send him a message",
            ].map(q => (
              <button
                key={q}
                className={styles.suggestion}
                onClick={() => { setInput(q); setTimeout(sendMessage, 0); }}
                disabled={streaming}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className={styles.inputRow}>
          <textarea
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about skills, projects, experience…"
            rows={1}
            disabled={streaming}
            aria-label="Message input"
            maxLength={2000}
            id="ai-chat-input"
          />
          <button
            className={styles.sendBtn}
            onClick={sendMessage}
            disabled={!input.trim() || streaming}
            aria-label="Send message"
            id="ai-chat-send"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        <p className={styles.disclaimer}>
          AI-generated responses. For accurate info, contact Priyanshu directly.
        </p>
      </div>
    </>
  );
}
