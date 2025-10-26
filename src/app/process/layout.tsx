import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Process | CTRL+BUILD Digital Discipline',
  description: 'Discover CTRL+BUILD\'s two-phase process: Control and Build. Learn how we create bespoke web design solutions with technical precision and Digital Discipline.',
  keywords: 'web design process, digital discipline methodology, bespoke web development process, custom website design process, Romania web design agency process',
};

export default function ProcessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
