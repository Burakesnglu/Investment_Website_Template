import Head from 'next/head';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: 'website' | 'article';
}

const defaultOgImage = '/images/og-image.jpg'; // Varsayılan paylaşım görseli

export default function MetaTags({
  title,
  description,
  keywords,
  ogImage = defaultOgImage,
  ogUrl,
  ogType = 'website'
}: MetaTagsProps) {
  // Base title
  const siteTitle = 'Bal & Fora Yatırım';
  // Full title with format: "Page Title | Site Title"
  const fullTitle = `${title} | ${siteTitle}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      {ogUrl && <link rel="canonical" href={ogUrl} />}
    </Head>
  );
} 