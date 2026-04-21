'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { Conversation } from '@/lib/db/schema';

interface ConversationListProps {
  activeId: string;
}

export function ConversationList({ activeId }: ConversationListProps) {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [archived, setArchived] = useState<Conversation[]>([]);
  const [showArchived, setShowArchived] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  const loadActive = useCallback(() => {
    fetch('/api/conversations')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setConversations(data); })
      .catch(() => {});
  }, []);

  const loadArchived = useCallback(() => {
    fetch('/api/conversations?archived=true')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setArchived(data); })
      .catch(() => {});
  }, []);

  useEffect(() => { loadActive(); }, [loadActive]);
  useEffect(() => { if (showArchived) loadArchived(); }, [showArchived, loadArchived]);

  // Focus rename input when it appears
  useEffect(() => {
    if (renamingId) setTimeout(() => renameInputRef.current?.focus(), 30);
  }, [renamingId]);

  async function handleNew() {
    const res = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'New chat' }),
    });
    const conv: Conversation = await res.json();
    router.push(`/chat?c=${conv.id}`);
    setTimeout(loadActive, 200);
  }

  async function handleRenameSubmit(id: string) {
    if (!renameValue.trim()) { setRenamingId(null); return; }
    await fetch(`/api/conversations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: renameValue.trim() }),
    });
    setRenamingId(null);
    loadActive();
    if (showArchived) loadArchived();
  }

  async function handleArchive(id: string, currentlyArchived: boolean) {
    await fetch(`/api/conversations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ archived: !currentlyArchived }),
    });
    loadActive();
    if (showArchived) loadArchived();
    // If we archived the active conversation, navigate away
    if (!currentlyArchived && id === activeId) {
      const remaining = conversations.filter((c) => c.id !== id);
      if (remaining.length > 0) router.push(`/chat?c=${remaining[0].id}`);
      else router.push('/chat');
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/conversations/${id}`, { method: 'DELETE' });
    setConfirmDeleteId(null);
    loadActive();
    if (showArchived) loadArchived();
    if (id === activeId) {
      const remaining = conversations.filter((c) => c.id !== id);
      if (remaining.length > 0) router.push(`/chat?c=${remaining[0].id}`);
      else router.push('/chat');
    }
  }

  function formatDate(d: Date | string) {
    const date = typeof d === 'string' ? new Date(d) : d;
    const diff = Date.now() - date.getTime();
    if (diff < 60_000) return 'just now';
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function ConvItem({ c, isArchived }: { c: Conversation; isArchived: boolean }) {
    const isActive = c.id === activeId;
    const isRenaming = renamingId === c.id;
    const isConfirmingDelete = confirmDeleteId === c.id;

    return (
      <div
        className={`group relative rounded transition-colors ${
          isActive ? 'bg-neutral-800' : 'hover:bg-neutral-900'
        }`}
      >
        {isRenaming ? (
          <div className="px-2 py-1.5">
            <input
              ref={renameInputRef}
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRenameSubmit(c.id);
                if (e.key === 'Escape') setRenamingId(null);
              }}
              onBlur={() => handleRenameSubmit(c.id)}
              className="w-full bg-neutral-700 text-neutral-100 text-xs rounded px-1.5 py-0.5 outline-none focus:ring-1 focus:ring-violet-500"
            />
            <p className="text-neutral-600 text-xs mt-0.5">↵ save · esc cancel</p>
          </div>
        ) : isConfirmingDelete ? (
          <div className="px-2 py-1.5">
            <p className="text-neutral-300 text-xs mb-1.5">Delete this chat?</p>
            <div className="flex gap-1.5">
              <button
                onClick={() => handleDelete(c.id)}
                className="text-xs bg-red-600 hover:bg-red-500 text-white rounded px-2 py-0.5 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => router.push(`/chat?c=${c.id}`)}
            className="w-full text-left px-2 py-1.5 pr-16"
          >
            <p className={`text-xs truncate leading-snug ${isActive ? 'text-neutral-100' : 'text-neutral-400'}`}>
              {c.title}
            </p>
            <p className="text-neutral-600 text-xs mt-0.5">{formatDate(c.updatedAt)}</p>
          </button>
        )}

        {/* Hover action icons — shown unless renaming/confirming */}
        {!isRenaming && !isConfirmingDelete && (
          <div className="absolute right-1 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-0.5">
            {/* Rename */}
            <button
              onClick={(e) => { e.stopPropagation(); setRenameValue(c.title); setRenamingId(c.id); }}
              className="p-1 text-neutral-600 hover:text-neutral-300 transition-colors rounded"
              title="Rename"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            {/* Archive / Unarchive */}
            <button
              onClick={(e) => { e.stopPropagation(); handleArchive(c.id, isArchived); }}
              className="p-1 text-neutral-600 hover:text-neutral-300 transition-colors rounded"
              title={isArchived ? 'Unarchive' : 'Archive'}
            >
              {isArchived ? (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.87" />
                </svg>
              ) : (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" /><line x1="10" y1="12" x2="14" y2="12" />
                </svg>
              )}
            </button>
            {/* Delete */}
            <button
              onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(c.id); }}
              className="p-1 text-neutral-600 hover:text-red-400 transition-colors rounded"
              title="Delete"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between mb-2">
        <p className="text-neutral-600 text-xs uppercase tracking-wider font-medium">Chats</p>
        <button
          onClick={handleNew}
          className="text-neutral-500 hover:text-violet-400 text-xs transition-colors px-1"
          title="New chat"
        >
          + New
        </button>
      </div>

      {conversations.length === 0 && !showArchived && (
        <p className="text-neutral-700 text-xs italic">No chats yet</p>
      )}

      {conversations.map((c) => (
        <ConvItem key={c.id} c={c} isArchived={false} />
      ))}

      {/* Archived section toggle */}
      {(archived.length > 0 || showArchived) && (
        <button
          onClick={() => setShowArchived((v) => !v)}
          className="mt-2 text-neutral-700 hover:text-neutral-500 text-xs flex items-center gap-1 transition-colors"
        >
          <svg
            width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-transform ${showArchived ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          Archived {archived.length > 0 ? `(${archived.length})` : ''}
        </button>
      )}

      {showArchived && archived.map((c) => (
        <ConvItem key={c.id} c={c} isArchived={true} />
      ))}
    </div>
  );
}
