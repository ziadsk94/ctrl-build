import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact CTRL+BUILD | Let\'s Build Together',
  description: 'Ready to build something definitive? Contact CTRL+BUILD for bespoke web design and development. We partner with select clients in Romania and worldwide.',
  keywords: 'contact web design agency, Romania web design contact, bespoke website development contact, custom web design consultation, CTRL+BUILD contact',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
