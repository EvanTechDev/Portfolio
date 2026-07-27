import { DATA } from "@/data/resume";

export function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Evan Huang",
          alternateName: ["Evan"],
          description: DATA.description,
          image: `${DATA.url}/me.png`,
          url: DATA.url,
          sameAs: [
            DATA.contact.social.GitHub.url,
            DATA.contact.social.Youtube.url,
            DATA.contact.social.Instagram.url,
          ],
          jobTitle: "Frontend Developer",
          worksFor: {
            "@type": "Organization",
            name: "Student"
          },
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: ""
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Shanghai",
            addressCountry: "China"
          },
          email: DATA.contact.email,
          telephone: DATA.contact.tel,
          knowsAbout: DATA.skills
        })
      }}
    />
  );
}
