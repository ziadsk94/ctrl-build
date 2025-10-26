export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CTRL+BUILD",
  "url": "https://ctrl-build.com",
  "logo": "https://ctrl-build.com/assets/images/logo.png",
  "description": "CTRL+BUILD is a design studio in Romania creating high-performance, bespoke websites. We practice Digital Discipline to build platforms that drive results.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Craiova",
    "addressCountry": "Romania"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+40-xxx-xxx-xxx",
    "contactType": "customer service",
    "email": "contact@ctrl-build.com"
  },
  "sameAs": [
    "https://instagram.com/buildwithctrl"
  ],
  "foundingDate": "2025",
  "areaServed": "Worldwide",
  "serviceType": [
    "Web Design",
    "UI/UX Design", 
    "Headless Development",
    "Brand Strategy",
    "Digital Experience Design"
  ]
};

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Bespoke Web Design & Development",
  "description": "Custom website design and development services for ambitious brands",
  "provider": {
    "@type": "Organization",
    "name": "CTRL+BUILD"
  },
  "areaServed": "Worldwide",
  "serviceType": [
    "Bespoke UI/UX Design",
    "Headless Development", 
    "Brand Strategy",
    "Digital Experience Design",
    "Technical SEO Strategy"
  ],
  "offers": {
    "@type": "Offer",
    "description": "Custom web design and development solutions"
  }
};
