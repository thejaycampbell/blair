'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Brand } from '@/lib/db/schema';

interface EditProfileFormProps {
  brand: Brand;
}

function Field({
  label,
  hint,
  value,
  onChange,
  multiline = true,
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div>
        <label className="text-neutral-200 text-sm font-medium">{label}</label>
        {hint && <p className="text-neutral-500 text-xs mt-0.5">{hint}</p>}
      </div>
      {multiline ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-neutral-900 border-neutral-700 text-neutral-100 placeholder:text-neutral-600 resize-none min-h-[80px] text-sm focus:border-violet-500 focus:ring-0"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-neutral-900 border border-neutral-700 text-neutral-100 placeholder:text-neutral-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
        />
      )}
    </div>
  );
}

export function EditProfileForm({ brand }: EditProfileFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const audience = brand.audience as Record<string, string> | null ?? {};
  const positioning = brand.positioning as Record<string, unknown> | null ?? {};
  const voice = brand.voice as Record<string, string> | null ?? {};
  const goals = brand.goals as Record<string, string> | null ?? {};
  const rawCompetitors = brand.competitors;
  const competitors: { name: string }[] = Array.isArray(rawCompetitors) ? rawCompetitors : [];

  const [fields, setFields] = useState({
    companyName: brand.companyName ?? '',
    oneLiner: brand.oneLiner ?? '',
    primaryIcp: audience.primaryIcp ?? '',
    keyDifferentiator: (positioning as Record<string, string>).keyDifferentiator ?? '',
    currentPriority: goals.currentPriority ?? '',
    competitorNames: competitors.map((c) => c.name).join(', '),
    personality: voice.personality ?? '',
    hardBans: voice.hardBans ?? '',
  });

  function set(key: keyof typeof fields) {
    return (value: string) => setFields((f) => ({ ...f, [key]: value }));
  }

  async function handleSave() {
    if (!fields.companyName.trim()) { setError('Company name is required.'); return; }
    setIsSaving(true);
    setError('');
    setSaved(false);

    const competitorLines = fields.competitorNames
      .split(/[,\n]/)
      .map((c) => c.trim())
      .filter(Boolean)
      .map((name) => ({ name, differentiation: 'see positioning notes' }));

    const payload = {
      companyName: fields.companyName.trim(),
      oneLiner: fields.oneLiner,
      audience: { ...audience, primaryIcp: fields.primaryIcp },
      positioning: { ...positioning, keyDifferentiator: fields.keyDifferentiator },
      voice: { ...voice, personality: fields.personality, hardBans: fields.hardBans },
      goals: { ...goals, currentPriority: fields.currentPriority },
      competitors: competitorLines,
    };

    try {
      const res = await fetch('/api/brand', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Save failed.');
      setSaved(true);
      setTimeout(() => router.push('/chat'), 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-neutral-100 mb-1">Edit brand profile</h1>
        <p className="text-neutral-500 text-sm">
          Changes apply to every future Blair session immediately.
        </p>
      </div>

      <Field
        label="Company / product name"
        hint="Exactly as you want Blair to reference it."
        value={fields.companyName}
        onChange={set('companyName')}
        multiline={false}
        placeholder="e.g. Selling with AI"
      />

      <Field
        label="One-liner"
        hint="What it does and who it's for."
        value={fields.oneLiner}
        onChange={set('oneLiner')}
        placeholder="e.g. Selling with AI teaches sales reps how to use AI to close more deals."
      />

      <Field
        label="Ideal customer (ICP)"
        hint="Role, company size, the problem they're dealing with right now."
        value={fields.primaryIcp}
        onChange={set('primaryIcp')}
        placeholder="e.g. B2B SaaS AEs at 10–200 person companies, quota-carrying, using ChatGPT ad hoc."
      />

      <Field
        label="Key differentiator"
        hint="The one thing you lead with."
        value={fields.keyDifferentiator}
        onChange={set('keyDifferentiator')}
        placeholder="e.g. Built for sellers, not marketers — every framework maps to the actual sales motion."
      />

      <Field
        label="#1 marketing priority"
        hint="Awareness, acquisition, retention, or revenue."
        value={fields.currentPriority}
        onChange={set('currentPriority')}
        placeholder="e.g. Acquisition — get first 500 email subscribers."
      />

      <Field
        label="Competitors"
        hint="Comma-separated. Include indirect alternatives."
        value={fields.competitorNames}
        onChange={set('competitorNames')}
        multiline={false}
        placeholder="e.g. Lavender, Humanlinker, generic AI newsletters"
      />

      <Field
        label="Brand voice"
        hint="3 words for your tone. A brand you sound like."
        value={fields.personality}
        onChange={set('personality')}
        multiline={false}
        placeholder="e.g. Straight-talking, practical, no hype. Sounds like a top-performing rep."
      />

      <Field
        label="What you'd never say"
        hint="Words, phrases, or tones that are off-limits."
        value={fields.hardBans}
        onChange={set('hardBans')}
        multiline={false}
        placeholder='e.g. "leverage AI to unlock synergies", corporate jargon, press-release tone'
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => router.push('/chat')}
          className="text-neutral-500 hover:text-neutral-300 text-sm transition-colors"
        >
          ← Back to chat
        </button>
        <Button
          onClick={handleSave}
          disabled={isSaving || saved}
          className="bg-violet-600 hover:bg-violet-500 text-white px-6"
        >
          {saved ? 'Saved ✓' : isSaving ? 'Saving…' : 'Save changes'}
        </Button>
      </div>
    </div>
  );
}
