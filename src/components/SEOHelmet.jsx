import { useEffect } from 'react';
import { useSeo } from '../hooks/useSeo';

export default function SEOHelmet({ page = 'home', fallbackTitle = 'Muhamad Hendrik - Full Stack Developer' }) {
  const { seo, loading } = useSeo(page);

  useEffect(() => {
    if (loading) return;

    const title = seo?.title || fallbackTitle;
    const description = seo?.description || 'Portfolio of Muhamad Hendrik, Full Stack Developer';
    const keywords = seo?.keywords || 'full stack developer, web developer, react, node.js';
    const ogImage = seo?.og_image || 'https://muhamadhendrik.my.id/og-image.jpg';
    const twitterImage = seo?.twitter_image || ogImage;
    const canonicalUrl = seo?.canonical_url || `https://muhamadhendrik.my.id/${page === 'home' ? '' : page}`;

    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, property = null) => {
      let meta;
      if (property) {
        meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
      } else {
        meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
      }
      meta.setAttribute('content', content);
    };

    // Basic SEO meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph meta tags
    updateMetaTag(null, title, 'og:title');
    updateMetaTag(null, description, 'og:description');
    updateMetaTag(null, 'website', 'og:type');
    updateMetaTag(null, canonicalUrl, 'og:url');
    updateMetaTag(null, ogImage, 'og:image');

    // Twitter Card meta tags
    updateMetaTag(null, title, 'twitter:title');
    updateMetaTag(null, description, 'twitter:description');
    updateMetaTag(null, twitterImage, 'twitter:image');
    updateMetaTag(null, 'summary_large_image', 'twitter:card');

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

  }, [seo, loading, page, fallbackTitle]);

  return null; // This component doesn't render anything
}
