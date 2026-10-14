/**
 * Helper utilities for authoritative Arabic dictionary search URLs
 * Rujukan resmi:
 * 1. مجمع الملك سلمان العالمي للغة العربية (KSAA): https://dictionary.ksaa.gov.sa
 * 2. معجم اللغة العربية المعاصرة: https://www.mujam.org
 * 3. قاموس المعاني: https://www.almaany.com
 */

export interface DictionarySource {
  id: 'ksaa' | 'mujam' | 'almaany';
  nameAr: string;
  nameId: string;
  url: string;
  badge: string;
  description: string;
  searchUrl: (term: string) => string;
}

// Clean text by stripping Arabic harakat / tasykil and extraneous punctuation for clean dictionary lookup
export function cleanArabicTerm(term: string): string {
  if (!term) return '';
  return term
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '') // remove fathah, dhammah, kasrah, sukun, shaddah, tanwin, tatweel
    .replace(/[ـ\.\,\?\!\:\;\(\)\[\]"'«»]/g, '')
    .trim();
}

export const DICTIONARY_SOURCES: DictionarySource[] = [
  {
    id: 'ksaa',
    nameAr: 'مجمع الملك سلمان العالمي للغة العربية',
    nameId: 'Kamus Riyadh KSAA (Akademi Bahasa Arab King Salman)',
    url: 'https://dictionary.ksaa.gov.sa',
    badge: 'Resmi KSA',
    description:
      'Portal leksikografi standar Kerajaan Arab Saudi (معجم الرياض للغة العربية المعاصرة) untuk perbendaharaan kosa kata modern dan istilah kontemporer terstandarisasi.',
    searchUrl: (term: string) => {
      const clean = cleanArabicTerm(term);
      return clean
        ? `https://dictionary.ksaa.gov.sa/`
        : 'https://dictionary.ksaa.gov.sa';
    },
  },
  {
    id: 'mujam',
    nameAr: 'معجم اللغة العربية المعاصرة',
    nameId: 'Mujam.org (Leksikon Fusha Kontemporer)',
    url: 'https://www.mujam.org',
    badge: 'Leksikon Fusha',
    description:
      'Kamus rujukan terkemuka karya Prof. Dr. Ahmad Mukhtar Umar untuk kosakata Arab fusha modern, contoh penggunaan tekstual, dan keabsahan derivasi wazan.',
    searchUrl: (term: string) => {
      const clean = cleanArabicTerm(term);
      return clean
        ? `https://www.mujam.org/search?q=${encodeURIComponent(clean)}`
        : 'https://www.mujam.org';
    },
  },
  {
    id: 'almaany',
    nameAr: 'قاموس المعاني لكل رسم معنى',
    nameId: 'Almaany.com (Kamus Makna & I\'rab Lengkap)',
    url: 'https://www.almaany.com',
    badge: 'Makna & I\'rab',
    description:
      'Kamus digital terlengkap dan paling populer untuk eksplorasi makna kontekstual, akar kata (جذور), sinonim (مرادفات), antonim (أضداد), dan tasrif.',
    searchUrl: (term: string) => {
      const clean = cleanArabicTerm(term);
      return clean
        ? `https://www.almaany.com/ar/dict/ar-ar/${encodeURIComponent(clean)}/`
        : 'https://www.almaany.com';
    },
  },
];

export function openDictionarySearch(sourceId: 'ksaa' | 'mujam' | 'almaany', term: string) {
  const source = DICTIONARY_SOURCES.find((s) => s.id === sourceId);
  if (!source) return;
  const targetUrl = source.searchUrl(term);
  window.open(targetUrl, '_blank', 'noopener,noreferrer');
}
