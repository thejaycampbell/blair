import Link from 'next/link';

const GITHUB_URL = 'https://github.com/thejaycampbell/blair';

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Brief Blair once',
    body: 'Answer 7 questions: your product, audience, differentiator, goals, competitors, voice. Takes 3 minutes.',
  },
  {
    step: '02',
    title: 'Blair stores your brand',
    body: 'Your profile is saved and injected automatically into every future session. No pasting. No re-briefing. Ever.',
  },
  {
    step: '03',
    title: 'Generate anything, on-brand',
    body: 'Strategy, campaigns, copy, cold email — all aligned to your brand from the first word. Try /blair:campaigns or /blair:cold-outbound.',
  },
];

const COMMANDS = [
  { cmd: '/blair:campaigns', desc: 'Full campaign briefs — channel strategy, messaging, creative direction' },
  { cmd: '/blair:cold-outbound', desc: 'Personalized cold email sequences that sound like you, not AI' },
  { cmd: '/blair:copy', desc: 'Landing pages, ads, and email copy written in your brand voice' },
  { cmd: '/blair:strategy', desc: 'Marketing strategy and positioning for your current growth stage' },
  { cmd: '/blair:competitor', desc: 'Competitive analysis and differentiation playbooks' },
  { cmd: '/blair:linkedin', desc: 'LinkedIn posts that build your audience without the generic hype' },
  { cmd: '/blair:content', desc: 'Blog posts, newsletters, and content calendars' },
  { cmd: '/blair:seo', desc: 'SEO content briefs and keyword strategies tailored to your ICP' },
];

const COMPARISON_ROWS = [
  { feature: 'Remembers your brand', chatgpt: '✗  Resets every session', blair: '✓  Stored permanently' },
  { feature: 'On-brand output by default', chatgpt: '✗  Must re-brief every time', blair: '✓  Automatic' },
  { feature: 'Marketing-specific commands', chatgpt: '✗  General purpose', blair: '✓  40+ specialized' },
  { feature: 'Cost', chatgpt: 'API costs only', blair: 'Free + API costs' },
];

const EXAMPLE_OUTPUTS = [
  {
    cmd: '/blair:cold-outbound VP of Sales at Series B SaaS',
    label: 'Cold email',
    preview: `"Hey [First] — saw you're scaling the AE team at [Company]. Most VPs I talk to are still having their reps Google ChatGPT prompts with no real system. We built a structured framework for exactly that. Worth 15 min?"`,
  },
  {
    cmd: '/blair:campaigns Q3 acquisition push',
    label: 'Campaign brief',
    preview: `"Q3 Acquisition Campaign\n\nGoal: 500 email subscribers by Sept 30\nPrimary channel: LinkedIn organic + cold outbound\nCore message: Your reps are already using AI — give them the system that actually works..."`,
  },
  {
    cmd: '/blair:linkedin thought leadership post',
    label: 'LinkedIn post',
    preview: `"Most sales AI tools are built for marketers.\n\nYour reps don't need another content calendar. They need prompts for discovery calls, objection scripts, and follow-ups that don't sound like ChatGPT.\n\nHere's what we built instead:"`,
  },
];

const FAQ_ITEMS = [
  {
    q: 'Do I need an Anthropic API key?',
    a: 'Yes. You bring your own key — Blair never stores or touches it. You pay Anthropic directly and control your own usage. Typical cost is $3–50/month.',
  },
  {
    q: 'Is my brand data safe?',
    a: "Your brand profile lives in your own database instance, not a shared cloud. You own and control your data. If you're self-hosting, it never leaves your infrastructure.",
  },
  {
    q: 'Why not just paste a brand doc into ChatGPT?',
    a: 'You can — and most founders do. Blair automates exactly that. Answer 7 questions once and your brand context is injected into every future session automatically. No pasting, no forgetting, no drift.',
  },
  {
    q: 'Does this work for agencies managing multiple brands?',
    a: 'Blair is designed for single-brand use today. Multi-brand support with isolated profiles per client is on the Blair Pro roadmap. Join the waitlist to get early access.',
  },
  {
    q: 'What AI model does Blair use?',
    a: 'Claude by Anthropic by default. You configure the model (Sonnet, Opus, Haiku) in your API settings based on your cost and quality preferences.',
  },
  {
    q: 'Can I self-host or contribute?',
    a: 'Yes on both. Blair is MIT-licensed. Fork it, self-host it, or submit a PR on GitHub.',
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Nav */}
      <nav className="border-b border-neutral-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-semibold text-neutral-100">Blair</span>
            <span className="text-neutral-600 text-sm hidden sm:inline">AI CMO</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-100 text-sm transition-colors hidden sm:inline"
            >
              GitHub ↗
            </a>
            <Link
              href="/onboarding"
              className="bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2 rounded-md transition-colors"
            >
              Get started free →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-violet-950 border border-violet-800 text-violet-300 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
            Free and open source — MIT License
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-neutral-100 mb-6 leading-[1.1]">
            Brief once.<br />Use forever.
          </h1>
          <p className="text-xl text-neutral-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            Most founders re-explain their brand to AI every single session. Blair stores your brand profile once and reads it automatically — in every chat, forever.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/onboarding"
              className="bg-violet-600 hover:bg-violet-500 text-white font-medium px-6 py-3 rounded-lg transition-colors w-full sm:w-auto text-center"
            >
              Set up Blair, it&apos;s free →
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 font-medium px-6 py-3 rounded-lg transition-colors w-full sm:w-auto text-center"
            >
              View on GitHub ↗
            </a>
          </div>
          <p className="text-neutral-600 text-sm mt-6">
            No account required. Free forever. ~$3–50/mo in Anthropic API costs.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How Blair works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map(({ step, title, body }) => (
              <div key={step} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                <div className="text-violet-500 font-mono text-sm font-bold mb-4">{step}</div>
                <h3 className="text-lg font-semibold mb-3">{title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">40+ specialized marketing commands</h2>
            <p className="text-neutral-400">Every command knows your brand. Every output is ready to use.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COMMANDS.map(({ cmd, desc }) => (
              <div key={cmd} className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex gap-4">
                <code className="text-violet-400 font-mono text-xs font-medium shrink-0 mt-0.5 break-all">
                  {cmd}
                </code>
                <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="px-6 py-20 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Built for founders who do their own marketing
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-violet-400">✓</span> Blair is for
              </h3>
              <ul className="space-y-3 text-neutral-400 text-sm">
                <li>Founders doing their own marketing</li>
                <li>Solo operators running lean without agency budgets</li>
                <li>Early-stage teams without a dedicated CMO</li>
                <li>Builders who want on-brand output without the overhead</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-neutral-600">✗</span>
                <span className="text-neutral-400">Blair is not</span>
              </h3>
              <ul className="space-y-3 text-neutral-500 text-sm">
                <li>A CRM or lead database</li>
                <li>A replacement for an enterprise content team</li>
                <li>A multi-brand agency tool (Blair Pro — coming soon)</li>
                <li>A design tool or ad platform</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Blair vs ChatGPT */}
      <section className="px-6 py-20 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Why not just use ChatGPT?</h2>
          <p className="text-neutral-400 text-center mb-12">
            You can. But you&apos;ll re-explain your brand every single time.
          </p>
          <div className="border border-neutral-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/50">
                  <th className="p-4 text-left text-neutral-500 font-medium" />
                  <th className="p-4 text-center text-neutral-400 font-medium">ChatGPT / Claude</th>
                  <th className="p-4 text-center text-violet-400 font-medium">Blair</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map(({ feature, chatgpt, blair }, i) => (
                  <tr key={feature} className={i < COMPARISON_ROWS.length - 1 ? 'border-b border-neutral-800/50' : ''}>
                    <td className="p-4 text-neutral-300 font-medium">{feature}</td>
                    <td className="p-4 text-center text-neutral-500">{chatgpt}</td>
                    <td className="p-4 text-center text-violet-400 font-medium">{blair}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Example Outputs */}
      <section className="px-6 py-20 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What Blair actually produces</h2>
          <p className="text-neutral-400 text-center mb-12">
            Real outputs, in your voice, from the first message.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXAMPLE_OUTPUTS.map(({ cmd, label, preview }) => (
              <div key={cmd} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col gap-3">
                <span className="text-xs text-violet-400 font-mono bg-violet-950 px-2 py-1 rounded self-start">
                  {label}
                </span>
                <code className="text-xs text-neutral-500 font-mono break-all">{cmd}</code>
                <p className="text-neutral-300 text-sm leading-relaxed italic">
                  {preview.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < preview.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 border-t border-neutral-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Transparent pricing</h2>
          <p className="text-neutral-400 mb-12">You pay Anthropic. Blair is free forever.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div className="bg-neutral-900 border border-violet-800 rounded-xl p-6">
              <div className="text-3xl font-bold mb-1">$0</div>
              <div className="text-neutral-400 text-sm mb-5">/ month to Blair</div>
              <ul className="space-y-2 text-sm text-neutral-400">
                {['Free forever', 'Open source (MIT)', '40+ marketing commands', 'No seat licenses'].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-violet-400">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <div className="text-3xl font-bold mb-1">~$3–50</div>
              <div className="text-neutral-400 text-sm mb-5">/ month in Anthropic API costs</div>
              <ul className="space-y-2 text-sm text-neutral-400 mb-4">
                {[
                  'You own your API key',
                  'Pay Anthropic directly',
                  'Light use: ~$3/mo',
                  'Heavy use: ~$50/mo',
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-neutral-600">→</span> {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://console.anthropic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 text-sm hover:text-violet-300 transition-colors"
              >
                Get your Anthropic API key →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Blair Pro Waitlist */}
      <section className="px-6 py-20 border-t border-neutral-800">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-violet-950 border border-violet-800 text-violet-300 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            Coming soon
          </div>
          <h2 className="text-3xl font-bold mb-4">Blair Pro</h2>
          <p className="text-neutral-400 mb-8">
            Advanced agents, multi-brand support, team profiles, and campaign memory that spans months — not sessions.
          </p>
          <a
            href="https://tally.so/r/KYByQX"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-violet-600 hover:bg-violet-500 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-block"
          >
            Join the Blair Pro waitlist →
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 border-t border-neutral-800">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-6">
            {FAQ_ITEMS.map(({ q, a }) => (
              <div key={q} className="border-b border-neutral-800 pb-6 last:border-0">
                <h3 className="text-base font-semibold text-neutral-100 mb-2">{q}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className="px-6 py-20 border-t border-neutral-800">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Free and open source, forever.</h2>
          <p className="text-neutral-400 mb-8 text-sm leading-relaxed">
            MIT licensed. Fork it, self-host it, contribute to it. No lock-in. No vendor risk. No subscription.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 font-medium px-6 py-3 rounded-lg transition-colors text-sm"
            >
              ★ Star on GitHub
            </a>
            <a
              href={`${GITHUB_URL}/blob/main/CONTRIBUTING.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-300 font-medium px-6 py-3 rounded-lg transition-colors text-sm"
            >
              Contribute ↗
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 border-t border-neutral-800 bg-neutral-900/40">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Brief Blair once.</h2>
          <p className="text-neutral-400 mb-10">Stop re-explaining your brand. Start generating.</p>
          <Link
            href="/onboarding"
            className="bg-violet-600 hover:bg-violet-500 text-white font-medium px-8 py-4 rounded-lg transition-colors inline-block text-lg"
          >
            Set up Blair, it&apos;s free →
          </Link>
          <p className="text-neutral-600 text-sm mt-4">3 minutes to set up. Free forever.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-violet-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">B</span>
            </div>
            <span className="text-neutral-400 text-sm">Blair — AI CMO</span>
            <span className="text-neutral-700 text-sm">·</span>
            <span className="text-neutral-600 text-sm">MIT License</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href={`${GITHUB_URL}/tree/main/docs`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-300 transition-colors"
            >
              Docs
            </a>
            <a
              href="https://tally.so/r/KYByQX"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-300 transition-colors"
            >
              Blair Pro
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
