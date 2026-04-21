'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Badge } from '@/components/ui/badge';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  specialist?: string;
}

const SPECIALIST_LABELS: Record<string, string> = {
  orchestrator: 'Blair',
  strategist: 'Strategist',
  researcher: 'Research',
  campaigns: 'Campaigns',
  content: 'Content',
  copy: 'Copy',
  audit: 'Audit',
  calendar: 'Calendar',
  repurpose: 'Repurpose',
  seo: 'SEO',
  email: 'Email',
  paid: 'Paid',
  pr: 'PR',
  'sales-enablement': 'Sales',
  analytics: 'Analytics',
  outbound: 'Outbound',
  partnerships: 'Partnerships',
  learn: 'Learn',
  brief: 'Onboarding',
};

export function MessageBubble({ role, content, specialist }: MessageBubbleProps) {
  if (role === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[75%] bg-violet-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </div>
    );
  }

  const label = specialist ? (SPECIALIST_LABELS[specialist] ?? 'Blair') : 'Blair';

  return (
    <div className="flex gap-3 mb-6">
      <div className="w-7 h-7 bg-violet-600 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5">
        <span className="text-white font-bold text-xs">B</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-neutral-400 text-xs font-medium">Blair</span>
          {specialist && specialist !== 'orchestrator' && (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-4 border-neutral-700 text-neutral-500 bg-neutral-900"
            >
              {label}
            </Badge>
          )}
        </div>
        <div className="prose prose-invert prose-sm max-w-none
          prose-p:text-neutral-200 prose-p:leading-relaxed prose-p:my-2
          prose-headings:text-neutral-100 prose-headings:font-semibold
          prose-h1:text-lg prose-h2:text-base prose-h3:text-sm
          prose-strong:text-neutral-100 prose-strong:font-semibold
          prose-em:text-neutral-300
          prose-code:text-violet-300 prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-lg prose-pre:p-4
          prose-ul:text-neutral-200 prose-ul:my-2 prose-ul:space-y-1
          prose-ol:text-neutral-200 prose-ol:my-2 prose-ol:space-y-1
          prose-li:my-0.5
          prose-blockquote:border-violet-500 prose-blockquote:text-neutral-400 prose-blockquote:not-italic
          prose-hr:border-neutral-800
          prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline
          prose-table:text-sm prose-th:text-neutral-300 prose-td:text-neutral-400
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
