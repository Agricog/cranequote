import { Helmet } from 'react-helmet-async';

export interface FAQ {
  q: string;
  a: string;
}

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  ogImage?: string;
  ogImageAlt?: string;
  articleDatePublished?: string;
  articleDateModified?: string;
  faqs?: FAQ[];
  howToSteps?: { name: string; text: string }[];
  breadcrumbs?: { name: string; url: string }[];
  calculatorName?: string;
  aggregateRating?: { value: string; count: string };
}

const SITE_NAME = 'CraneQuote';
const SITE_URL = 'https://cranequote.co.uk';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;
const TWITTER_HANDLE = '@CraneQuoteUK';

export default function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = 'CraneQuote - UK Crane Hire Cost Calculator',
  articleDatePublished = '2025-01-01',
  articleDateModified = '2025-01-01',
  faqs = [],
  howToSteps = [],
  breadcrumbs = [],
  calculatorName,
  aggregateRating,
}: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const fullCanonicalUrl = `${SITE_URL}${canonicalUrl}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

  // Build JSON-LD structured data
  const jsonLdGraph: object[] = [];

  // 1. BreadcrumbList Schema
  if (breadcrumbs.length > 0) {
    jsonLdGraph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url.startsWith('http') ? crumb.url : `${SITE_URL}${crumb.url}`,
      })),
    });
  }

  // 2. SoftwareApplication Schema (for calculators)
  if (calculatorName) {
    jsonLdGraph.push({
      '@type': 'SoftwareApplication',
      name: calculatorName,
      description: description,
      url: fullCanonicalUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
      },
      ...(aggregateRating && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: aggregateRating.value,
          ratingCount: aggregateRating.count,
          bestRating: '5',
          worstRating: '1',
        },
      }),
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    });
  }

  // 3. FAQPage Schema
  if (faqs.length > 0) {
    jsonLdGraph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    });
  }

  // 4. HowTo Schema
  if (howToSteps.length > 0) {
    jsonLdGraph.push({
      '@type': 'HowTo',
      name: `How to Use the ${calculatorName || title}`,
      description: description,
      totalTime: 'PT3M',
      step: howToSteps.map((step) => ({
        '@type': 'HowToStep',
        name: step.name,
        text: step.text,
      })),
    });
  }

  // 5. Article Schema
  jsonLdGraph.push({
    '@type': 'Article',
    headline: title,
    description: description,
    datePublished: articleDatePublished,
    dateModified: articleDateModified,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    image: fullOgImage,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
  });

  // 6. Organization Schema
  jsonLdGraph.push({
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Free crane hire cost calculators for UK construction professionals',
    sameAs: [
      'https://twitter.com/CraneQuoteUK',
      'https://www.linkedin.com/company/cranequote',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'hello@cranequote.co.uk',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
    },
  });

  // 7. WebPage Schema with Speakable
  jsonLdGraph.push({
    '@type': 'WebPage',
    name: title,
    description: description,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.quick-answer'],
    },
    url: fullCanonicalUrl,
    lastReviewed: articleDateModified,
  });

  // 8. DefinedTermSet for industry terminology
  jsonLdGraph.push({
    '@type': 'DefinedTermSet',
    name: 'UK Crane Hire Terminology',
    hasDefinedTerm: [
      {
        '@type': 'DefinedTerm',
        name: 'CPA Hire',
        description: 'Construction Plant-hire Association standard hire where the customer is responsible for lift planning, supervision and insurance.',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Contract Lift',
        description: 'A fully managed lifting service where the crane hire company takes responsibility for all aspects of the lift including planning, insurance and supervision.',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Appointed Person',
        description: 'A qualified individual responsible for planning lifting operations under BS 7121 regulations.',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Slinger/Banksman',
        description: 'Personnel responsible for attaching loads to the crane and guiding the crane operator during lifting operations.',
      },
    ],
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': jsonLdGraph,
  };

  return (
    <Helmet>
      {/* 1. Title Tag */}
      <title>{fullTitle}</title>

      {/* 2. Meta Description */}
      <meta name="description" content={description} />

      {/* 3. Keywords Meta */}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* 4. Author Meta */}
      <meta name="author" content={SITE_NAME} />

      {/* 5. Robots Meta */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* 6. Google-specific Robots */}
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* 7. Viewport Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />

      {/* 8. Theme Color */}
      <meta name="theme-color" content="#1a365d" />

      {/* 9. Apple Mobile Web App */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* 10. Open Graph Type */}
      <meta property="og:type" content="website" />

      {/* 11. Open Graph Site Name */}
      <meta property="og:site_name" content={SITE_NAME} />

      {/* 12. Open Graph Locale */}
      <meta property="og:locale" content="en_GB" />

      {/* 13. Open Graph Complete */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt} />

      {/* 14. Twitter Card Complete */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* 15. Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Alternate hreflang */}
      <link rel="alternate" hrefLang="en-GB" href={fullCanonicalUrl} />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}
