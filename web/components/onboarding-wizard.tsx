'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const PREVIEW_EXAMPLES = [
  {
    cmd: '/blair:cold-outbound VP of Sales',
    label: 'Cold email',
    preview: '"Hey [First] — most VPs I talk to are still having reps Google ChatGPT prompts. We built a structured system for exactly that. Worth 15 min?"',
  },
  {
    cmd: '/blair:campaigns Q3 acquisition',
    label: 'Campaign brief',
    preview: '"Q3 Acquisition: 500 subscribers by Sept 30. Channel: LinkedIn organic + cold outbound. Core message: Give your reps the system that actually works..."',
  },
  {
    cmd: '/blair:linkedin thought leadership',
    label: 'LinkedIn post',
    preview: '"Most sales AI tools are built for marketers. Your reps need prompts for discovery calls, objection scripts, and follow-ups that don\'t sound like ChatGPT."',
  },
];

function OnboardingPreview({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="text-neutral-400 text-sm font-medium">Blair — AI CMO</span>
        </div>

        <h1 className="text-2xl font-semibold text-neutral-100 mb-3">Here&apos;s what Blair produces for you.</h1>
        <p className="text-neutral-500 text-sm mb-8">
          Answer 7 questions about your brand. Blair reads them automatically in every future session.
        </p>

        <div className="space-y-3 mb-8">
          {PREVIEW_EXAMPLES.map(({ cmd, label, preview }) => (
            <div key={cmd} className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-violet-400 font-mono bg-violet-950 px-2 py-0.5 rounded">{label}</span>
                <code className="text-xs text-neutral-600 font-mono truncate">{cmd}</code>
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed italic">{preview}</p>
            </div>
          ))}
        </div>

        <Button
          onClick={onStart}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3"
        >
          Start setup — takes 3 minutes →
        </Button>

        <p className="text-neutral-600 text-xs text-center mt-4">
          Requires an Anthropic API key. Estimated cost: $3–50/month.{' '}
          <a
            href="https://console.anthropic.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-400 underline transition-colors"
          >
            Get your key →
          </a>
        </p>
      </div>
    </div>
  );
}

type StepId = 'name' | 'product' | 'icp' | 'differentiation' | 'goal' | 'competitors' | 'voice';

interface Step {
  id: StepId;
  number: number;
  question: string;
  hint: string;
  placeholder: string;
  multiline: boolean;
}

const STEPS: Step[] = [
  {
    id: 'name',
    number: 1,
    question: "What's your company or product name?",
    hint: 'Just the name — exactly as you want Blair to reference it.',
    placeholder: 'e.g. "Selling with AI" or "Dispatch" or "Acme Corp"',
    multiline: false,
  },
  {
    id: 'product',
    number: 2,
    question: 'What does it do, and who is it for?',
    hint: 'One sentence. What it is, who uses it.',
    placeholder: 'e.g. "Selling with AI teaches sales reps how to use AI tools to prospect faster and close more deals — for B2B salespeople who know AI is changing their job but don\'t know where to start."',
    multiline: true,
  },
  {
    id: 'icp',
    number: 3,
    question: 'Who is your ideal customer?',
    hint: "Be specific — role, company size, the problem they're dealing with right now.",
    placeholder: 'e.g. "B2B SaaS AEs at companies with 10–200 employees, quota-carrying, using ChatGPT ad hoc but with no real system for it."',
    multiline: true,
  },
  {
    id: 'differentiation',
    number: 4,
    question: "How are you different from what your ICP is using today?",
    hint: "What's the one thing you lead with?",
    placeholder: 'e.g. "Built for sellers, not marketers. Every framework is designed for the actual sales motion — prospecting, discovery, objection handling, follow-up."',
    multiline: true,
  },
  {
    id: 'goal',
    number: 5,
    question: "What's your #1 marketing priority right now?",
    hint: 'Pick one: awareness, acquisition, retention, or revenue.',
    placeholder: 'e.g. "Acquisition — get the first 500 email subscribers actively selling in B2B SaaS."',
    multiline: true,
  },
  {
    id: 'competitors',
    number: 6,
    question: 'Who are your top 2–3 competitors?',
    hint: 'What do people use instead of you? Include indirect alternatives.',
    placeholder: 'e.g. "Lavender, Humanlinker, generic AI newsletter content. Also just reps Googling ChatGPT prompts."',
    multiline: true,
  },
  {
    id: 'voice',
    number: 7,
    question: "What's your brand voice — and what would you never sound like?",
    hint: '3 words for your tone. A brand you sound like. Anything you\'d never say.',
    placeholder: 'e.g. "Straight-talking, practical, no hype. Sounds like a top-performing rep. Would never say \'leverage AI to unlock synergies\'."',
    multiline: true,
  },
];

export function OnboardingWizard() {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<StepId, string>>({
    name: '',
    product: '',
    icp: '',
    differentiation: '',
    goal: '',
    competitors: '',
    voice: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (showPreview) return <OnboardingPreview onStart={() => setShowPreview(false)} />;

  const step = STEPS[currentStep];
  const isLast = currentStep === STEPS.length - 1;
  const currentAnswer = answers[step.id];
  const canProceed = currentAnswer.trim().length > 0;

  function handleChange(value: string) {
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
  }

  function handleNext() {
    if (!canProceed) return;
    setCurrentStep((s) => s + 1);
  }

  function handleBack() {
    setCurrentStep((s) => Math.max(0, s - 1));
  }

  async function handleSubmit() {
    if (!canProceed) return;
    setIsSubmitting(true);
    setError('');

    try {
      const competitorLines = answers.competitors
        .split(/[,\n]/)
        .map((c) => c.trim())
        .filter(Boolean)
        .map((name) => ({ name, differentiation: 'see positioning notes' }));

      const trunc = (s: string, max: number) => s.slice(0, max);

      const firstSentence = answers.voice.split(/[.!?]/)[0]?.trim() ?? answers.voice;

      const PRIORITIES = ['awareness', 'acquisition', 'retention', 'revenue'] as const;
      type Priority = typeof PRIORITIES[number];
      const lower = answers.goal.toLowerCase();
      const currentPriority = PRIORITIES.find((k) => lower.includes(k)) as Priority | undefined;

      const payload = {
        companyName: trunc(answers.name.trim(), 200),
        oneLiner: trunc(answers.product, 500),
        category: '',
        stage: 'launched',
        audience: {
          primaryIcp: trunc(answers.icp, 1000),
          secondarySegments: 'none',
          notFor: '[ASK WHEN NEEDED]',
        },
        positioning: {
          keyDifferentiator: trunc(answers.differentiation, 1000),
          proofPoints: ['[ASK WHEN NEEDED]'],
        },
        voice: {
          personality: trunc(firstSentence, 200),
          hardBans: trunc(answers.voice, 500),
          referenceBrand: undefined,
        },
        competitors: competitorLines,
        goals: {
          currentPriority,
          activeChannels: '[ASK WHEN NEEDED]',
          constraints: trunc(answers.goal, 500),
        },
      };

      const res = await fetch('/api/brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save brand profile.');
      router.push('/chat');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-neutral-400 text-sm font-medium">Blair — AI CMO</span>
          </div>
          <p className="text-neutral-500 text-sm">
            ({step.number}/{STEPS.length}) — Answer once. Blair remembers it in every session.
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-neutral-800 rounded-full h-1 mb-10">
          <div
            className="bg-violet-600 h-1 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-100 mb-2 leading-tight">
            {step.question}
          </h1>
          <p className="text-neutral-500 text-sm">{step.hint}</p>
        </div>

        {/* Input */}
        {step.multiline ? (
          <Textarea
            value={currentAnswer}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={step.placeholder}
            className="w-full bg-neutral-900 border-neutral-700 text-neutral-100 placeholder:text-neutral-600 resize-none min-h-[120px] text-base focus:border-violet-500 focus:ring-0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                isLast ? handleSubmit() : handleNext();
              }
            }}
          />
        ) : (
          <input
            type="text"
            value={currentAnswer}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={step.placeholder}
            autoFocus
            className="w-full bg-neutral-900 border border-neutral-700 text-neutral-100 placeholder:text-neutral-600 rounded-md px-4 py-3 text-base focus:outline-none focus:border-violet-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && canProceed) handleNext();
            }}
          />
        )}

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

        {/* Actions */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="text-neutral-500 hover:text-neutral-300"
          >
            Back
          </Button>

          <div className="flex items-center gap-3">
            <span className="text-neutral-600 text-xs hidden sm:block">
              {isLast ? '⌘↵ to submit' : step.multiline ? '⌘↵ to continue' : '↵ to continue'}
            </span>
            {isLast ? (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed || isSubmitting}
                className="bg-violet-600 hover:bg-violet-500 text-white px-6"
              >
                {isSubmitting ? 'Setting up Blair…' : 'Start using Blair →'}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="bg-violet-600 hover:bg-violet-500 text-white px-6"
              >
                Continue →
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
