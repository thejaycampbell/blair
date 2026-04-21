'use client';

import { useEffect, useState } from 'react';
import type { Brand } from '@/lib/db/schema';
import { ConversationList } from './conversation-list';
import { SignOutButton } from './sign-out-button';

interface BrandSidebarProps {
  activeConversationId: string;
}

export function BrandSidebar({ activeConversationId }: BrandSidebarProps) {
  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    fetch('/api/brand')
      .then((r) => r.json())
      .then(setBrand)
      .catch(() => {});
  }, []);

  if (!brand) return null;

  const goals = brand.goals as Record<string, string> | null;
  const competitors = brand.competitors as { name: string }[] | null;

  return (
    <div className="w-56 flex-shrink-0 border-r border-neutral-800 p-4 flex flex-col gap-5 overflow-y-auto">
      {/* Brand identity */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-violet-600 rounded flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">{brand.companyName[0]}</span>
          </div>
          <span className="text-neutral-200 font-semibold text-sm truncate">{brand.companyName}</span>
        </div>
        {brand.oneLiner && (
          <p className="text-neutral-500 text-xs leading-relaxed line-clamp-3">{brand.oneLiner}</p>
        )}
      </div>

      {/* Priority */}
      {goals?.currentPriority && (
        <div>
          <p className="text-neutral-600 text-xs uppercase tracking-wider mb-1 font-medium">Priority</p>
          <p className="text-neutral-300 text-xs">{goals.currentPriority}</p>
        </div>
      )}

      {/* Competitors */}
      {competitors && competitors.length > 0 && (
        <div>
          <p className="text-neutral-600 text-xs uppercase tracking-wider mb-1 font-medium">
            Competing vs
          </p>
          <ul className="space-y-0.5">
            {competitors.slice(0, 4).map((c, i) => (
              <li key={i} className="text-neutral-400 text-xs truncate">
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-neutral-800" />

      {/* Conversations */}
      <ConversationList activeId={activeConversationId} />

      {/* Footer */}
      <div className="mt-auto pt-3 border-t border-neutral-800 flex flex-col gap-2">
        <a
          href="/edit-profile"
          className="text-neutral-600 hover:text-neutral-400 text-xs transition-colors"
        >
          Edit brand profile →
        </a>
        <SignOutButton />
      </div>
    </div>
  );
}
