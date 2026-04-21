'use client';

interface CommandChipsProps {
  onSelect: (command: string) => void;
}

const COMMANDS = [
  { label: '/strategy', description: 'Positioning + ICP' },
  { label: '/competitor', description: 'Research + battle card' },
  { label: '/calendar', description: '90-day content plan' },
  { label: '/cold-outbound', description: '7-touch email sequence' },
  { label: '/audit', description: 'Score my marketing' },
  { label: '/launch', description: 'Full launch kit' },
  { label: '/headline', description: '10 headline variations' },
  { label: '/email-sequence', description: 'Email sequence' },
];

export function CommandChips({ onSelect }: CommandChipsProps) {
  return (
    <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: 'none' }}>
      {COMMANDS.map((cmd) => (
        <button
          key={cmd.label}
          onClick={() => onSelect(cmd.label + ' ')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 transition-colors text-xs group"
        >
          <span className="text-violet-400 font-mono font-medium">{cmd.label}</span>
          <span className="text-neutral-500 group-hover:text-neutral-400">{cmd.description}</span>
        </button>
      ))}
    </div>
  );
}
