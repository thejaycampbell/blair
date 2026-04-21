import { OnboardingWizard } from '@/components/onboarding-wizard';

export const metadata = {
  title: 'Set Up Your AI CMO',
  description:
    'Answer 7 questions about your brand. Blair reads your profile automatically in every marketing session — forever.',
};

export default function OnboardingPage() {
  return <OnboardingWizard />;
}
