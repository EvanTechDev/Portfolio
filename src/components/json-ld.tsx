export function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Prasenjit Nayak',
    givenName: 'Prasenjit',
    familyName: 'Nayak',
    url: 'https://prasen.dev',
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Self-Employed'
    },
    sameAs: [
      'https://github.com/Star-Knight',
      'https://www.linkedin.com/in/prasenjit-nayak-1b5b3b1b0/',
      'https://twitter.com/Star_Knight12'
    ],
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Full Stack Development'
    ],
    description: 'Prasenjit Nayak is a Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js. Creating modern web applications with clean, efficient code.'
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
