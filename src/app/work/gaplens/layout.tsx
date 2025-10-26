import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GapLens Case Study | CTRL+BUILD Visual Arts Photography Platform',
  description: 'Discover how CTRL+BUILD built an immersive online gallery for GapLens visual arts studio. See our bespoke UI/UX design and headless development approach.',
  keywords: 'GapLens case study, visual arts photography website, photography studio platform, bespoke gallery design, UI/UX design case study, headless development',
};

export default function GaplensLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
