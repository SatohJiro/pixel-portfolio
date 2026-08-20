import { siteConfig } from "./site";

export function generatePersonJsonLd(lang: 'en' | 'vi' = 'en') {
  const isEn = lang === 'en';
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nguyen Tran Anh",
    "alternateName": ["Nguyễn Trần Anh", "SatohJiro"],
    "jobTitle": isEn ? "Software Engineer (Full-Stack & Frontend)" : "Kỹ sư Phần mềm (Full-Stack & Frontend)",
    "description": isEn ? siteConfig.description : siteConfig.vietnameseDescription,
    "url": siteConfig.url,
    "image": `${siteConfig.url}/avatar.png`,
    "sameAs": [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.portfolio
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Nong Lam University - Ho Chi Minh City",
      "sameAs": "https://hcmuaf.edu.vn"
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Degree of Engineer in Information Technology (Excellent GPA 3.6/4.0)",
        "credentialCategory": "degree",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": "Nong Lam University"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Valedictorian of Class 2019",
        "credentialCategory": "honor"
      }
    ],
    "knowsAbout": [
      "Software Engineering",
      "ReactJS",
      "Next.js",
      "Vue.js",
      "TypeScript",
      "JavaScript",
      "Java Spring Boot",
      "Python FastAPI",
      "OpenAI GPT-4",
      "Micro-frontend",
      "RabbitMQ",
      "PostgreSQL",
      "Docker"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ho Chi Minh City",
      "addressCountry": "VN"
    },
    "email": siteConfig.contact.email,
    "telephone": siteConfig.contact.phone
  };
}

export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "description": siteConfig.description,
    "author": {
      "@type": "Person",
      "name": "Nguyen Tran Anh"
    }
  };
}
