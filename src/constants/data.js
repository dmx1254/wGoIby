import { FcFeedback } from "react-icons/fc";
import { FcPrivacy } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { FcVoicePresentation } from "react-icons/fc";

export const carousel = [
  {
    id: 1,
    title: "Réputation",
    titleEn: "Reputation",
    contentEn: `Since 2019, we have earned the trust of our community and always take their feedback into account. We're looking forward to welcoming new members among us.
    `,
    content: `Depuis 2019, nous avons gagné la confiance de notre communauté et prenons toujours en compte leurs remarques. Nous sommes impatients d’accueillir de nouveaux membres parmi nous.`,
    icon: <FcFeedback />,
  },
  {
    id: 2,
    title: "Paiements sécurisés",
    titleEn: "Secure payments",
    contentEn: `We offer different payment methods that can reach you in the shortest possible time. We are optimized to give you a simple, secure and fast payment experience.`,
    content: `Nous vous offrons diverses méthodes de paiement pouvant vous parvenir dans les plus brefs délais. Nous sommes optimisés pour votre offrir une expérience simple, sécurisée et rapide.`,
    icon: <FcCurrencyExchange />,
  },
  {
    id: 3,
    title: "Sécurité",
    titleEn: "Security",
    contentEn: `We respect the right of digital privacy of each of our users. All personal data provided on the site is  confidential. Your security is our main priority.`,
    content: `Nous respectons le droit d’intimité numérique de chacun de nos utilisateurs. Toutes les données personnelles renseignées sur le site sont strictement confidentielles. Votre sécurité est notre priorité.
    `,
    icon: <FcPrivacy />,
  },
  {
    id: 4,
    title: "Service client",
    titleEn: "Customer service",
    contentEn: `Our agents will accompany you whenever you want, to offer you the best experience on our website. The support, remains at your disposal 24/7 for all your requests.`,
    content: `
    Nos agents vous accompagneront dès que vous le désirez pour vous offrir la meilleure expérience sur notre site. Le support reste à votre disposition 24/7 pour toutes vos demandes.
    `,
    icon: <FcVoicePresentation />,
  },
];
