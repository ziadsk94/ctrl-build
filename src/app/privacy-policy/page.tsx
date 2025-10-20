import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'CTRL+BUILD privacy policy outlining how we handle data and privacy.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-alabaster">
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-tiempos text-charcoal text-5xl font-bold mb-8">Privacy Policy</h1>
          <p className="font-satoshi text-charcoal text-base leading-relaxed">
            This page describes how CTRL+BUILD handles information and privacy. We do not collect personal data beyond what is
            necessary to operate this website and analytics configured at the platform level. For inquiries, contact
            <span className="whitespace-pre"> </span>
            <a href="mailto:contact@ctrl-build.com" className="underline">contact@ctrl-build.com</a>.
          </p>
        </div>
      </section>
    </div>
  )
}


