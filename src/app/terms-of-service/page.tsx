import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'CTRL+BUILD terms governing the use of this website and services.',
  alternates: { canonical: '/terms-of-service' },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-alabaster">
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-tiempos text-charcoal text-5xl font-bold mb-8">Terms of Service</h1>
          <p className="font-satoshi text-charcoal text-base leading-relaxed">
            These terms govern the use of the CTRL+BUILD website. By accessing this site, you agree to use it responsibly
            and in accordance with applicable laws. For questions, contact
            <span className="whitespace-pre"> </span>
            <a href="mailto:contact@ctrl-build.com" className="underline">contact@ctrl-build.com</a>.
          </p>
        </div>
      </section>
    </div>
  )
}


