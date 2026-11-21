import { useEffect } from 'react';
import { useCms } from '../context/CmsContext';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function usePageSeo(pageKey: string, override?: { title?: string; description?: string; image?: string }) {
  const { seoPages, resolveMediaUrl } = useCms();
  const config = seoPages[pageKey];

  const title = override?.title || config?.title || 'Akande Olalekan (Lekzy) | Product, Brand & Web Designer';
  const description =
    override?.description ||
    config?.description ||
    'Akande Olalekan is a multidisciplinary designer specialising in brand identity, graphic design, social media design, website development and digital experiences.';
  const keywords = config?.keywords || '';
  const image = resolveMediaUrl(override?.image || config?.ogImageUrl);

  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    if (keywords) upsertMeta('name', 'keywords', keywords);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', window.location.origin + window.location.pathname);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    if (image) {
      upsertMeta('property', 'og:image', image);
      upsertMeta('name', 'twitter:image', image);
    }
  }, [title, description, keywords, image]);
}
