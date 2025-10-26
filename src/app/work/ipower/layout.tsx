import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'iPower Case Study | CTRL+BUILD Web Design',
  description: 'Explore how CTRL+BUILD created a bespoke electrical engineering platform for iPower, Lebanon\'s industry leader. See our UI/UX design and headless development process.',
  keywords: 'iPower case study, electrical engineering website, Lebanon web design, bespoke platform development, UI/UX design case study, headless development',
};

export default function IpowerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
