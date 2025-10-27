declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackConversion = (conversionType: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'G-RWE7TFWDRQ',
      event_category: 'Lead Generation',
      event_label: conversionType,
    });
  }
};

export const trackEmailClick = () => {
  trackConversion('Email Click');
  trackEvent('click', 'Contact', 'Email Link');
};

export const trackProjectStart = () => {
  trackConversion('Project Start');
  trackEvent('click', 'CTA', 'Start Your Project');
};

export const trackCaseStudyView = (projectName: string) => {
  trackEvent('view', 'Case Study', projectName);
};

export const trackWorkPageView = () => {
  trackEvent('view', 'Portfolio', 'Work Page');
};

export const trackContactPageView = () => {
  trackEvent('view', 'Contact', 'Contact Page');
};
