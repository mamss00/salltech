// Modifiez le début du fichier scripts/inject-service-data.js
const axios = require('axios');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

// Vérification et affichage des informations de débogage
console.log('Chemin du fichier .env:', path.resolve(__dirname, '..', '.env'));
console.log('Le fichier .env existe:', fs.existsSync(path.resolve(__dirname, '..', '.env')));
console.log('URL Strapi:', process.env.STRAPI_URL);
console.log('Token API défini:', !!process.env.STRAPI_API_TOKEN);

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'https://api.sall.technology';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Le reste du code reste inchangé

// Données du service à injecter
const siteWebServiceData = {
  publishedAt: new Date().toISOString(),
  Titre: "Sites Internet Professionnels en Mauritanie",
  titre_page: "Création de Sites Web Professionnels à Nouakchott",
  Description: [
    {
      type: "paragraph",
      children: [
        {
          text: "Des sites web performants, sécurisés et parfaitement adaptés aux entreprises mauritaniennes pour renforcer votre présence numérique et développer votre activité à Nouakchott et dans toute la Mauritanie."
        }
      ]
    }
  ],
  Emoji: "🌐",
  Couleur: "from-blue/20 to-blue/5",
  Ordreaffichage: 1,
  slug: "sites-internet-professionnels",
  
  introduction: [
    {
      type: "paragraph",
      children: [
        {
          text: "Un site internet professionnel est aujourd'hui indispensable pour toute entreprise mauritanienne souhaitant développer sa visibilité et son activité. Chez SALLTECH, implantés à Nouakchott, nous concevons des sites web sur mesure qui répondent parfaitement à vos objectifs commerciaux et aux attentes de vos clients mauritaniens et internationaux."
        }
      ]
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Notre équipe d'experts mauritaniens utilise les technologies les plus avancées (React, Next.js, Node.js) pour développer des applications web performantes, ainsi que WordPress pour les sites qui nécessitent une gestion de contenu simplifiée. Nous créons des solutions personnalisées qui allient design moderne, performance technique et optimisation pour les moteurs de recherche."
        }
      ]
    }
  ],
  
  // Les caractéristiques du service
  caracteristiques: [
    {
      titre: "Design Moderne et Local",
      description: "Interfaces élégantes et professionnelles adaptées aux attentes des consommateurs mauritaniens",
      icone: "🎨"
    },
    {
      titre: "Performance sur Tous Appareils",
      description: "Sites parfaitement optimisés pour les smartphones et les réseaux mobiles mauritaniens",
      icone: "📱"
    },
    {
      titre: "Visibilité Maximale",
      description: "Architecture et contenu optimisés pour les recherches locales en Mauritanie et dans la sous-région",
      icone: "🔍"
    }
  ],
  
  // Types de services
  types_services: [
    {
      titre: "Site Vitrine Professionnel",
      description: "Présentez votre entreprise mauritanienne avec élégance et efficacité pour attirer de nouveaux clients locaux et internationaux",
      icone: "🏢",
      fonctionnalites: [
        { texte: "Design moderne adapté à votre image de marque" },
        { texte: "Présentation claire de vos produits et services" },
        { texte: "Site multilingue (français, arabe) adapté au marché local" },
        { texte: "Formulaires de contact et informations pratiques" }
      ]
    },
    {
      titre: "Boutique en Ligne",
      description: "Vendez vos produits en ligne en Mauritanie et à l'international avec une solution e-commerce complète et adaptée au marché local",
      icone: "🛒",
      fonctionnalites: [
        { texte: "Catalogue produits attractif et facile à gérer" },
        { texte: "Paiements sécurisés adaptés au marché mauritanien" },
        { texte: "Gestion des commandes et des stocks simplifiée" },
        { texte: "Options de livraison pour Nouakchott et tout le pays" }
      ]
    },
    {
      titre: "Site Web Sur Mesure",
      description: "Solutions personnalisées pour les besoins spécifiques de votre entreprise mauritanienne avec des fonctionnalités avancées",
      icone: "⚙️",
      fonctionnalites: [
        { texte: "Fonctionnalités spécifiques à votre secteur d'activité" },
        { texte: "Espace membres et portails clients sécurisés" },
        { texte: "Intégration avec vos systèmes existants" },
        { texte: "Applications web accessibles sur ordinateurs et mobiles" }
      ]
    }
  ],
  
  // Méthodologie
  methodologie: [
    {
      numero: 1,
      titre: "Découverte et analyse des besoins",
      description: "Nous commençons par comprendre vos objectifs commerciaux, votre public cible mauritanien et vos attentes spécifiques pour votre site web.",
      tags: [
        { texte: "Étude de marché locale" },
        { texte: "Analyse concurrentielle" },
        { texte: "Définition des objectifs" }
      ]
    },
    {
      numero: 2,
      titre: "Conception adaptée au contexte local",
      description: "Nous créons une architecture de site et des maquettes visuelles qui correspondent à votre image de marque et aux attentes des utilisateurs mauritaniens.",
      tags: [
        { texte: "Wireframes" },
        { texte: "Maquettes" },
        { texte: "Expérience utilisateur locale" }
      ]
    },
    {
      numero: 3,
      titre: "Développement optimisé",
      description: "Notre équipe développe votre site avec les technologies les plus adaptées à vos besoins et aux contraintes techniques locales (bande passante, appareils).",
      tags: [
        { texte: "Code optimisé" },
        { texte: "Compatibilité mobile" },
        { texte: "Performance réseau" }
      ]
    },
    {
      numero: 4,
      titre: "Tests et déploiement local",
      description: "Nous testons rigoureusement votre site dans les conditions réelles d'utilisation en Mauritanie avant de le mettre en ligne sur un hébergement fiable.",
      tags: [
        { texte: "Tests sur réseaux locaux" },
        { texte: "Compatibilité navigateurs" },
        { texte: "Mise en production" }
      ]
    },
    {
      numero: 5,
      titre: "Suivi et maintenance",
      description: "Après le lancement, nous assurons le bon fonctionnement de votre site depuis nos bureaux de Nouakchott et proposons des améliorations continues.",
      tags: [
        { texte: "Support technique local" },
        { texte: "Sécurité" },
        { texte: "Évolution" }
      ]
    }
  ],
  
  // Technologies
  technologies: [
    {
      nom: "React & Next.js",
      description: "Frameworks JavaScript modernes pour des interfaces dynamiques et réactives"
    },
    {
      nom: "Node.js",
      description: "Environnement d'exécution JavaScript côté serveur pour des APIs performantes"
    },
    {
      nom: "WordPress & WooCommerce",
      description: "CMS et solution e-commerce personnalisables pour une gestion de contenu simplifiée"
    },
    {
      nom: "TailwindCSS",
      description: "Framework CSS utilitaire pour des designs responsives personnalisés"
    },
    {
      nom: "MongoDB & MySQL",
      description: "Solutions de bases de données adaptées à vos besoins spécifiques"
    },
    {
      nom: "Docker & CI/CD",
      description: "Déploiement conteneurisé et intégration continue pour une fiabilité maximale"
    }
  ],
  
  // FAQ
  faq: [
    {
      question: "Combien coûte la création d'un site web professionnel en Mauritanie?",
      reponse: [
        {
          type: "paragraph",
          children: [
            {
              text: "Les tarifs pour la création d'un site web en Mauritanie varient selon la complexité du projet et les technologies utilisées. Un site vitrine démarre à 150 000 MRU, tandis qu'une boutique en ligne ou une application web personnalisée démarre à 300 000 MRU. Nous établissons un devis détaillé après analyse de vos besoins spécifiques."
            }
          ]
        }
      ]
    },
    {
      question: "Quelle est la différence entre un site WordPress et un développement sur mesure?",
      reponse: [
        {
          type: "paragraph",
          children: [
            {
              text: "WordPress est une solution idéale pour les sites nécessitant une gestion de contenu régulière par votre équipe, avec un excellent rapport qualité-prix. Le développement sur mesure offre quant à lui des fonctionnalités totalement personnalisées, des performances supérieures et une liberté totale de conception. Nous recommandons la solution la plus adaptée à vos besoins réels et à votre budget."
            }
          ]
        }
      ]
    },
    {
      question: "Proposez-vous des services de maintenance et d'hébergement adaptés au marché mauritanien?",
      reponse: [
        {
          type: "paragraph",
          children: [
            {
              text: "Oui, nous proposons plusieurs formules de maintenance spécialement conçues pour les entreprises mauritaniennes, avec un support technique local en français et en arabe. Nos forfaits incluent les mises à jour de sécurité, les sauvegardes régulières, les corrections de bugs et les petites modifications de contenu. Nous offrons également des solutions d'hébergement optimisées pour garantir des performances optimales sur les réseaux mauritaniens."
            }
          ]
        }
      ]
    },
    {
      question: "Comment assurez-vous la visibilité de mon site sur les moteurs de recherche en Mauritanie?",
      reponse: [
        {
          type: "paragraph",
          children: [
            {
              text: "Nous intégrons les bonnes pratiques SEO dès la conception de votre site, avec une attention particulière au référencement local en Mauritanie. Cela inclut l'optimisation pour Google.mr, l'utilisation de mots-clés pertinents pour le marché mauritanien, le référencement local (Nouakchott et autres villes), et des contenus adaptés aux recherches locales. Nous proposons également des prestations de référencement avancées et de marketing digital adaptées au contexte mauritanien."
            }
          ]
        }
      ]
    }
  ],
  
  // SEO
  seo: {
    metaTitle: "Création de Sites Web Professionnels à Nouakchott | SALLTECH Mauritanie",
    metaDescription: "Agence web à Nouakchott spécialisée dans la création de sites internet professionnels et e-commerce adaptés aux entreprises mauritaniennes. Devis gratuit!",
    keywords: "site web Mauritanie, création site internet Nouakchott, développement web Mauritanie, site e-commerce Mauritanie, agence web Nouakchott, WordPress Mauritanie, WooCommerce Nouakchott"
  }
};

// Fonction principale pour injecter les données
async function injectServiceData() {
  try {
    console.log('Début de l\'injection des données...');
    
    // Configuration pour les requêtes axios
    const config = {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };
    
    // 1. Vérifier si le service existe déjà
    const checkResponse = await axios.get(
      `${STRAPI_URL}/api/services?filters[slug][$eq]=sites-internet-professionnels`,
      config
    );
    
    if (checkResponse.data.data.length > 0) {
      const existingId = checkResponse.data.data[0].id;
      console.log(`Le service existe déjà avec l'ID: ${existingId}, mise à jour...`);
      
      // Mise à jour du service existant
      const updateResponse = await axios.put(
        `${STRAPI_URL}/api/services/${existingId}`,
        { data: siteWebServiceData },
        config
      );
      
      console.log('Service mis à jour avec succès!');
      return updateResponse.data;
    } else {
      console.log('Création d\'un nouveau service...');
      
      // Création d'un nouveau service
      const createResponse = await axios.post(
        `${STRAPI_URL}/api/services`,
        { data: siteWebServiceData },
        config
      );
      
      console.log('Service créé avec succès!');
      return createResponse.data;
    }
  } catch (error) {
    console.error('Erreur lors de l\'injection des données:', error.message);
    
    if (error.response) {
      console.error('Détails de l\'erreur:', error.response.data);
    }
    
    throw error;
  }
}

// Exécuter la fonction principale
injectServiceData()
  .then((result) => {
    console.log('Processus terminé avec succès!');
    console.log('ID du service:', result.data.id);
  })
  .catch((error) => {
    console.error('Le script a échoué:', error);
    process.exit(1);
  });