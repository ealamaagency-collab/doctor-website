export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "د. إيهاب ياسين",
    description: "جراحة واستبدال مفاصل الورك والركبة والخلايا الجذعية",
    url: "https://DrEhabYassin.com",
    telephone: "+201234567890",
    email: "info@drehabyassin.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "القاهرة",
      addressCountry: "EG",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "10:00",
        closes: "20:00",
      },
    ],
    medicalSpecialty: "Orthopedic Surgery",
    sameAs: [
      "https://facebook.com/drehabyassin",
      "https://instagram.com/drehabyassin",
      "https://youtube.com/@drehabyassin",
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
