import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AETIER Case Study | CTRL+BUILD Brand Platform',
  description: 'Explore how CTRL+BUILD created a sophisticated brand strategy platform for AETIER. See our brand strategy, digital experience design, and UI/UX development process.',
  keywords: 'AETIER case study, brand strategy platform, digital experience design, brand building website, UI/UX design case study, brand strategy development',
};

export default function AetierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
