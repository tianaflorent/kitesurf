/**
 * JSON-LD Structured Data Components
 * Server Components — rendered at build time, injected in <head>
 */

const BASE_URL = "https://purewindkiteschool.vercel.app";

/** LocalBusiness + SportsActivityLocation — for homepage */
export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SportsActivityLocation"],
    "@id": BASE_URL,
    name: "Pure Wind Kite School Madagascar",
    alternateName: "Pure Wind Kite School Mada",
    description:
      "École de kitesurf professionnelle à la Baie de Sakalava, Antsiranana (Diego Suarez), Nord de Madagascar. Cours pour tous niveaux, matériel certifié fourni.",
    url: BASE_URL,
    telephone: "+261377147300",
    email: "purewindmadakiteschool@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Baie de Sakalava",
      addressLocality: "Antsiranana",
      addressRegion: "Diana",
      postalCode: "201",
      addressCountry: "MG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -12.2501,
      longitude: 49.3512,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "MGA, EUR",
    paymentAccepted: "Cash, Credit Card",
    image: `${BASE_URL}/images/IMG-20260304-WA0043.jpg`,
    logo: `${BASE_URL}/favicon.ico`,
    sameAs: [
      "https://www.facebook.com/tianaflorent.5",
      "https://www.instagram.com/flo_tour_guide/",
      `https://wa.me/261377147300`,
    ],
    hasMap: "https://maps.google.com/?q=Baie+de+Sakalava+Diego+Suarez+Madagascar",
    areaServed: {
      "@type": "City",
      name: "Antsiranana",
    },
    knowsAbout: ["Kitesurf", "Kiteboarding", "Water sports", "Madagascar tourism"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** FAQPage schema — for FAQ and À propos pages */
export function FAQJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Comment réserver un cours de kitesurf à la Baie de Sakalava ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vous pouvez réserver directement sur notre site via le formulaire de réservation, ou nous contacter par téléphone au +261 37 71 473 00 ou par email à purewindmadakiteschool@gmail.com.",
        },
      },
      {
        "@type": "Question",
        name: "Faut-il savoir nager pour commencer le kitesurf ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Non, nos instructeurs encadrent les débutants et fournissent toutes les instructions pour évoluer en toute sécurité, même si vous ne savez pas nager parfaitement.",
        },
      },
      {
        "@type": "Question",
        name: "Le matériel de kitesurf est-il fourni ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, tout le matériel nécessaire (kite, planche, harnais, gilet, combinaison) est fourni et adapté à chaque niveau pour votre confort et sécurité.",
        },
      },
      {
        "@type": "Question",
        name: "À partir de quel âge peut-on suivre les cours de kitesurf ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nos cours sont adaptés aux enfants dès 10 ans et aux adultes. Chaque session est personnalisée selon le niveau et l'âge de l'élève.",
        },
      },
      {
        "@type": "Question",
        name: "Quelle est la saison idéale pour faire du kitesurf à Diego Suarez ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La Baie de Sakalava bénéficie de vents constants quasi toute l'année. La saison principale est de mai à décembre avec des vents réguliers et soutenus.",
        },
      },
      {
        "@type": "Question",
        name: "Proposez-vous des hébergements près de la Baie de Sakalava ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, nous proposons des services d'hébergement à proximité du spot. Contactez-nous pour plus d'informations.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** CourseList schema — for /cours page */
export function CourseListJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cours de Kitesurf – Pure Wind Kite School Madagascar",
    description:
      "Liste des cours de kitesurf disponibles à la Baie de Sakalava, Diego Suarez, Madagascar.",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Course",
          name: "Cours de Kitesurf Débutant",
          description:
            "Initiation au kitesurf pour débutants complets. Sécurité, théorie du vent, maniement du kite de traction.",
          provider: {
            "@type": "Organization",
            name: "Pure Wind Kite School Madagascar",
            url: BASE_URL,
          },
          url: `${BASE_URL}/cours`,
          courseMode: "onsite",
          educationalLevel: "Beginner",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Course",
          name: "Cours de Kitesurf Intermédiaire",
          description:
            "Perfectionnement pour riders ayant déjà les bases. Navigation autonome, virages, gestion des situations.",
          provider: {
            "@type": "Organization",
            name: "Pure Wind Kite School Madagascar",
            url: BASE_URL,
          },
          url: `${BASE_URL}/cours`,
          courseMode: "onsite",
          educationalLevel: "Intermediate",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Course",
          name: "Cours de Kitesurf Avancé",
          description:
            "Maîtrise des figures, jumps et tricks. Pour riders expérimentés souhaitant progresser en freestyle.",
          provider: {
            "@type": "Organization",
            name: "Pure Wind Kite School Madagascar",
            url: BASE_URL,
          },
          url: `${BASE_URL}/cours`,
          courseMode: "onsite",
          educationalLevel: "Advanced",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
