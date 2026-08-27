import { products } from '../data/products.js';
import { reviews, reviewAggregate, siteConfig } from '../data/catalog.js';

/**
 * Inject Product and Review JSON-LD for local SEO rich results.
 */
export function injectSchema() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      ...products.slice(0, 8).map((p) => ({
        '@type': 'Product',
        name: p.name,
        description: p.description,
        image: p.image,
        offers: {
          '@type': 'Offer',
          price: p.price,
          priceCurrency: 'RUB',
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Florist', name: siteConfig.name },
        },
      })),
      {
        '@type': 'AggregateRating',
        itemReviewed: { '@type': 'Florist', name: siteConfig.name },
        ratingValue: reviewAggregate.rating,
        reviewCount: reviewAggregate.count,
        bestRating: 5,
      },
      ...reviews.map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.name },
        reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
        reviewBody: r.text,
        datePublished: r.date,
        itemReviewed: { '@type': 'Florist', name: siteConfig.name },
      })),
    ],
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(productSchema);
  document.head.appendChild(script);
}
