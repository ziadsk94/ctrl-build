import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | CTRL+BUILD Data Protection',
  description: 'CTRL+BUILD privacy policy: Learn how we protect your data, use cookies, and maintain transparency in our web design and development services.',
  keywords: 'privacy policy, data protection, cookie policy, CTRL+BUILD privacy, web design agency privacy, Romania data protection',
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
