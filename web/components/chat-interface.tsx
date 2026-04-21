'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import { MessageBubble } from './message-bubble';
import { CommandChips } from './command-chips';
import { SlashPalette } from './slash-palette';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInterfaceProps {
  conversationId: string;
}

export function ChatInterface({ conversationId }: ChatInterfaceProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputWrapRef = useRef<HTMLDivElement>(null);
  const [specialist, setSpecialist] = useState<string>('orchestrator');
  const [historyLoaded, setHistoryLoaded] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput, setMessages, error } =
    useChat({
      api: '/api/chat',
      body: { conversationId },
      onResponse: (response) => {
        const s = response.headers.get('X-Blair-Specialist');
        if (s) setSpecialist(s);
      },
    });

  // Slash palette state
  const showPalette = input.startsWith('/') && !input.includes(' ');
  const paletteQuery = showPalette ? input.slice(1) : '';

  function handlePaletteSelect(command: string) {
    setInput(command + ' ');
    textareaRef.current?.focus();
  }

  function handlePaletteDismiss() {
    // Add a space so the palette hides — keeps the slash command text intact
    setInput((v) => (v.endsWith(' ') ? v : v + ' '));
    textareaRef.current?.focus();
  }

  // Load message history from DB on mount / conversation switch
  useEffect(() => {
    setHistoryLoaded(false);
    setMessages([]);
    fetch(`/api/messages?conversationId=${conversationId}`)
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setMessages(data); })
      .catch(() => {})
      .finally(() => setHistoryLoaded(true));
  }, [conversationId, setMessages]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleCommandSelect(command: string) {
    setInput(command);
    textareaRef.current?.focus();
  }

  const isEmpty = historyLoaded && messages.length === 0;

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {!historyLoaded ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-neutral-600 text-sm">Loading…</span>
          </div>
        ) : isEmpty ? (
          <EmptyState />
        ) : (
          <>
            {messages.map((m) => (
              <MessageBubble
                key={m.id}
                role={m.role as 'user' | 'assistant'}
                content={m.content}
                specialist={m.role === 'assistant' ? specialist : undefined}
              />
            ))}
            {isLoading && <TypingIndicator />}
          </>
        )}
        {error && (
          <div className="px-6 py-3 bg-red-950 border border-red-800 rounded-lg mx-6 mb-4 text-red-300 text-sm">
            <span className="font-medium">Error:</span> {error.message}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-neutral-800 bg-neutral-950">
        {/* Only show chips when palette is not open */}
        {!showPalette && <CommandChips onSelect={handleCommandSelect} />}

        {/* Relative wrapper so palette can position absolutely above */}
        <div ref={inputWrapRef} className="relative px-4 pb-4 flex gap-3 items-end">
          {showPalette && (
            <SlashPalette
              query={paletteQuery}
              onSelect={handlePaletteSelect}
              onDismiss={handlePaletteDismiss}
            />
          )}

          <form onSubmit={handleSubmit} className="flex-1 flex gap-3 items-end">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              placeholder="Ask Blair anything, or type / for commands…"
              className="flex-1 bg-neutral-900 border-neutral-700 text-neutral-100 placeholder:text-neutral-600 resize-none min-h-[52px] max-h-[200px] text-sm focus:border-violet-500 focus:ring-0"
              rows={1}
              onKeyDown={(e) => {
                // Let palette intercept ↑ ↓ Enter Tab Escape when open
                if (showPalette && ['ArrowUp', 'ArrowDown', 'Enter', 'Tab', 'Escape'].includes(e.key)) {
                  e.preventDefault();
                  return;
                }
                // Enter sends — Shift+Enter inserts a newline
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (!isLoading && input.trim()) {
                    handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                  }
                }
              }}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              onClick={(e) => {
                if (showPalette) { e.preventDefault(); return; }
              }}
              className="bg-violet-600 hover:bg-violet-500 text-white h-[52px] px-5 flex-shrink-0"
            >
              {isLoading ? (
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin block" />
              ) : (
                '↑'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20">
      <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center mb-4">
        <span className="text-white font-bold text-lg">B</span>
      </div>
      <h2 className="text-neutral-200 text-lg font-semibold mb-2">Blair is ready.</h2>
      <p className="text-neutral-500 text-sm max-w-sm leading-relaxed">
        Ask anything marketing — or type{' '}
        <span className="text-violet-400 font-mono">/</span> to see all commands.
      </p>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-6">
      <div className="w-7 h-7 bg-violet-600 rounded-lg flex-shrink-0 flex items-center justify-center">
        <span className="text-white font-bold text-xs">B</span>
      </div>
      <div className="flex items-center gap-1 mt-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
