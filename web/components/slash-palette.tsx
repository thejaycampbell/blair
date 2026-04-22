'use client';

import { useEffect, useRef, useState } from 'react';

export interface SlashCommand {
  command: string;
  label: string;
  description: string;
  example?: string;
}

export const SLASH_COMMANDS: SlashCommand[] = [
  {
    command: '/strategy',
    label: 'Strategy',
    description: 'Full positioning framework, ICP definition, messaging hierarchy, and GTM plan.',
    example: '/strategy',
  },
  {
    command: '/research',
    label: 'Research',
    description: 'Market landscape, category trends, and competitive intelligence report.',
    example: '/research [market or topic]',
  },
  {
    command: '/competitor',
    label: 'Competitor',
    description: 'Deep dive on a single competitor — real weaknesses, your advantages, trap questions, and a battle card.',
    example: '/competitor [name]',
  },
  {
    command: '/campaign',
    label: 'Campaign',
    description: 'Full campaign architecture — objectives, audience, channels, messaging, asset list, and timeline.',
    example: '/campaign [goal or product]',
  },
  {
    command: '/launch',
    label: 'Launch',
    description: 'Coordinated launch kit: positioning angle, campaign, launch-day copy, press release, and journalist pitches.',
    example: '/launch [product or feature]',
  },
  {
    command: '/audit',
    label: 'Audit',
    description: 'Score your existing marketing across 6 dimensions. Specific line-by-line diagnosis with fixes.',
    example: '/audit [URL or paste copy]',
  },
  {
    command: '/calendar',
    label: 'Content Calendar',
    description: '30, 60, or 90-day publishing plan with topics, formats, CTAs, and channel assignments.',
    example: '/calendar 90',
  },
  {
    command: '/headline',
    label: 'Headlines',
    description: '10 headline variations for any surface — homepage, ad, email subject, social post.',
    example: '/headline [product or page]',
  },
  {
    command: '/email-sequence',
    label: 'Email Sequence',
    description: 'Full email sequence for any trigger — welcome, post-demo, nurture, re-engagement, or win-back.',
    example: '/email-sequence post-demo',
  },
  {
    command: '/cold-outbound',
    label: 'Cold Outbound',
    description: '7-touch cold email + 5-touch LinkedIn DM sequence optimized for reply rate, not brand polish.',
    example: '/cold-outbound VP of Sales at Series B SaaS',
  },
  {
    command: '/repurpose',
    label: 'Repurpose',
    description: 'Take one source asset and adapt it into platform-native content across every active channel.',
    example: '/repurpose [paste or describe source]',
  },
  {
    command: '/review',
    label: 'Copy Review',
    description: 'Scored review of any copy asset with line-by-line diagnosis and rewrites. No softening.',
    example: '/review [paste copy]',
  },
  {
    command: '/swot',
    label: 'SWOT',
    description: 'Marketing SWOT with strategic synthesis and 90-day priorities ranked by impact.',
    example: '/swot',
  },
  {
    command: '/pipeline-impact',
    label: 'Pipeline Impact',
    description: 'Connect marketing activity to revenue — leads generated, pipeline attributed, CAC by channel.',
    example: '/pipeline-impact',
  },
  {
    command: '/weekly-brief',
    label: 'Weekly Brief',
    description: 'Monday CMO standup — what shipped, what\'s performing, what needs attention this week.',
    example: '/weekly-brief',
  },
  {
    command: '/brief',
    label: 'Morning Brief',
    description: 'Live competitive check + what your top competitors did this week + what needs your attention today.',
    example: '/brief',
  },
  {
    command: '/brief-agency',
    label: 'Agency Brief',
    description: 'Complete creative brief for agencies, freelancers, or internal creative teams.',
    example: '/brief-agency',
  },
];

interface SlashPaletteProps {
  query: string; // everything after the `/`
  onSelect: (command: string) => void;
  onDismiss: () => void;
}

export function SlashPalette({ query, onSelect, onDismiss }: SlashPaletteProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  const filtered = SLASH_COMMANDS.filter(
    (c) =>
      c.command.toLowerCase().includes(query.toLowerCase()) ||
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  // Reset active index when filter changes
  useEffect(() => { setActiveIndex(0); }, [query]);

  // Scroll active item into view
  useEffect(() => {
    activeItemRef.current?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  // Keyboard navigation — attached to window so it intercepts while textarea is focused
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (filtered.length === 0) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        onSelect(filtered[activeIndex].command);
      } else if (e.key === 'Escape') {
        onDismiss();
      }
    }
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [filtered, activeIndex, onSelect, onDismiss]);

  if (filtered.length === 0) return null;

  const focusedItem = filtered[hoveredIndex ?? activeIndex];

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 mx-4 z-50 flex gap-2">
      {/* Command list */}
      <div
        ref={listRef}
        className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden shadow-2xl"
        style={{ maxHeight: '280px' }}
      >
        <div className="overflow-y-auto" style={{ maxHeight: '280px' }}>
          {filtered.map((cmd, i) => {
            const isActive = i === activeIndex;
            const isHovered = i === hoveredIndex;
            return (
              <button
                key={cmd.command}
                ref={isActive && hoveredIndex === null ? activeItemRef : undefined}
                onMouseEnter={() => { setHoveredIndex(i); setActiveIndex(i); }}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onSelect(cmd.command)}
                className={`w-full text-left px-3 py-2.5 flex items-center gap-3 transition-colors border-b border-neutral-800 last:border-0 ${
                  isActive || isHovered ? 'bg-neutral-800' : ''
                }`}
              >
                <span className={`font-mono text-xs font-semibold min-w-[110px] ${
                  isActive || isHovered ? 'text-violet-400' : 'text-violet-500'
                }`}>
                  {cmd.command}
                </span>
                <span className="text-neutral-400 text-xs truncate">{cmd.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Description panel — shown for hovered/active item */}
      {focusedItem && (
        <div className="w-56 flex-shrink-0 bg-neutral-900 border border-neutral-700 rounded-xl p-3 shadow-2xl flex flex-col gap-2 self-end">
          <div>
            <p className="text-violet-400 font-mono text-xs font-semibold mb-1">{focusedItem.command}</p>
            <p className="text-neutral-300 text-xs leading-relaxed">{focusedItem.description}</p>
          </div>
          {focusedItem.example && (
            <div className="mt-auto pt-2 border-t border-neutral-800">
              <p className="text-neutral-600 text-xs mb-1 uppercase tracking-wider">Example</p>
              <p className="text-neutral-500 font-mono text-xs">{focusedItem.example}</p>
            </div>
          )}
          <p className="text-neutral-700 text-xs">↑↓ navigate · ↵ select · esc dismiss</p>
        </div>
      )}
    </div>
  );
}
