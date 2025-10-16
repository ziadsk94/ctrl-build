import ContactClient from '@/components/ContactClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us - Let's Build Together",
  description: "Get in touch with CTRL+BUILD for your digital architecture needs. Direct contact, no forms - real conversations for real projects.",
  keywords: [
    "contact web design",
    "web development inquiry",
    "digital architecture consultation",
    "Romania web design",
    "Craiova web development",
    "direct contact",
    "project inquiry"
  ],
  openGraph: {
    title: "Contact Us - Let's Build Together | CTRL+BUILD",
    description: "Get in touch with CTRL+BUILD for your digital architecture needs. Direct contact, no forms - real conversations for real projects.",
    url: "https://ctrlbuild.com/contact",
    type: "website",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}