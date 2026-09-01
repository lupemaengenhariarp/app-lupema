export function getStoredUtms() {
  if (typeof window === 'undefined') {
    return {};
  }

  return {
    utm_source: localStorage.getItem('utm_source'),
    utm_medium: localStorage.getItem('utm_medium'),
    utm_campaign: localStorage.getItem('utm_campaign'),
    utm_term: localStorage.getItem('utm_term'),
    utm_content: localStorage.getItem('utm_content'),
  };
}
