const axios = require('axios');

// Configuration
const STRAPI_URL = 'https://api.sall.technology';
const STRAPI_API_TOKEN = '171dbf0211f374a22ed97a1655dd6f814ca5ce235495bd518349f325b1fe45ca2b007eba8399fdb570271785de56a06b96455cb887555db203ad85c15450b24546a80089e046758c8dadca07334f67a06f92bab9c5e808ef3ec40e0e5acb0eafd830ce92d6663de364915c4b0dd2863e30dd5756b5053727d0aea4bac81ea2c3';

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
    
    // Préparation des données avec un slug unique
    const timestamp = Date.now();
    const slug = `applications-mobiles-${timestamp}`;
    
    // Données du service avec format corrigé pour Strapi 5
    const serviceData = {
      publishedAt: new Date().toISOString(),
      Titre: "Applications Mobiles en Mauritanie",
      titre_page: "Développement d'Applications Mobiles à Nouakchott",
      // Format corrigé pour rich text fields
      Description: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Des applications mobiles innovantes, performantes et parfaitement adaptées aux besoins des entreprises et utilisateurs mauritaniens, développées par notre équipe d'experts à Nouakchott."
            }
          ]
        }
      ],
      Emoji: "U+1F4F1", // 📱
      Couleur: "from-purple/20 to-purple/5",
      Ordreaffichage: 2,
      slug: slug,
      // Format corrigé pour rich text fields
      introduction: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Dans un marché mauritanien où plus de 90% des utilisateurs accèdent à internet via leur smartphone, disposer d'une application mobile performante est devenu essentiel pour les entreprises souhaitant se démarquer et offrir une expérience optimale à leurs clients. SALLTECH, basée à Nouakchott, est votre partenaire privilégié pour concevoir et développer des applications mobiles sur mesure, adaptées aux spécificités du marché local."
            }
          ]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Notre équipe de développeurs mauritaniens maîtrise les technologies mobiles les plus avancées (React Native, Flutter, iOS natif, Android natif) pour créer des applications performantes, intuitives et adaptées à tous les appareils. Que vous souhaitiez digitaliser vos services, fidéliser vos clients ou conquérir de nouveaux marchés en Mauritanie et dans la sous-région, nous concevons des solutions mobiles qui répondent précisément à vos objectifs business."
            }
          ]
        }
      ],
      caracteristiques: [
        {
          titre: "Applications Cross-Platform",
          description: "Développement d'applications compatibles avec iOS et Android pour une couverture maximale du marché mauritanien",
          icone: "U+1F310" // 🌐
        },
        {
          titre: "Interfaces Intuitives",
          description: "Design UX/UI adapté aux habitudes des utilisateurs mauritaniens et aux spécificités culturelles locales",
          icone: "U+1F3A8" // 🎨
        },
        {
          titre: "Performance Optimisée",
          description: "Applications légères et rapides, parfaitement adaptées aux contraintes de réseau et aux appareils utilisés localement",
          icone: "U+26A1" // ⚡
        }
      ],
      types_services: [
        {
          titre: "Applications Professionnelles",
          description: "Solutions mobiles pour les entreprises mauritaniennes souhaitant digitaliser leurs services et optimiser leurs processus",
          icone: "U+1F4BC", // 💼
          fonctionnalites: [
            { texte: "Digitalisation des services et processus internes" },
            { texte: "Applications d'entreprise sur mesure" },
            { texte: "Outils de gestion et de productivité mobile" },
            { texte: "Solutions adaptées à votre secteur d'activité" }
          ]
        },
        {
          titre: "Applications E-commerce",
          description: "Boutiques mobiles performantes pour vendre vos produits et services sur smartphones et tablettes en Mauritanie",
          icone: "U+1F6D2", // 🛒
          fonctionnalites: [
            { texte: "Catalogues produits optimisés pour mobile" },
            { texte: "Systèmes de paiement adaptés au marché mauritanien" },
            { texte: "Gestion des commandes et notifications" },
            { texte: "Solutions de livraison intégrées pour Nouakchott" }
          ]
        },
        {
          titre: "Applications Services & Médias",
          description: "Applications innovantes pour les entreprises de services, médias et startups mauritaniennes visant à transformer leur secteur",
          icone: "U+1F4F2", // 📲
          fonctionnalites: [
            { texte: "Applications de services à la demande" },
            { texte: "Plateformes médias et de contenu" },
            { texte: "Solutions de réservation et de billetterie" },
            { texte: "Applications sociales et communautaires" }
          ]
        }
      ],
      methodologie: [
        {
          numero: 1,
          titre: "Analyse des besoins et du marché local",
          description: "Nous étudions en profondeur votre projet, vos objectifs commerciaux et les spécificités du marché mobile mauritanien pour définir la stratégie optimale.",
          tags: [
            { texte: "Étude utilisateurs" },
            { texte: "Benchmark concurrentiel" },
            { texte: "Spécifications fonctionnelles" }
          ]
        },
        {
          numero: 2,
          titre: "Conception UX/UI adaptée",
          description: "Nous créons des interfaces intuitives et attrayantes, parfaitement adaptées aux habitudes des utilisateurs mauritaniens et aux contraintes locales.",
          tags: [
            { texte: "Wireframes" },
            { texte: "Prototypes interactifs" },
            { texte: "Design responsive" }
          ]
        },
        {
          numero: 3,
          titre: "Développement technique",
          description: "Notre équipe développe votre application avec les technologies les plus adaptées à vos besoins et optimisées pour les réseaux et appareils mauritaniens.",
          tags: [
            { texte: "React Native" },
            { texte: "Flutter" },
            { texte: "Développement natif" }
          ]
        },
        {
          numero: 4,
          titre: "Tests et assurance qualité",
          description: "Nous testons rigoureusement votre application sur différents appareils et dans les conditions réelles d'utilisation en Mauritanie pour garantir une expérience parfaite.",
          tags: [
            { texte: "Tests fonctionnels" },
            { texte: "Tests de performance" },
            { texte: "Tests utilisateurs locaux" }
          ]
        },
        {
          numero: 5,
          titre: "Déploiement et suivi",
          description: "Nous assurons la publication de votre application sur les stores, la formation de vos équipes, et proposons un accompagnement continu pour faire évoluer votre solution.",
          tags: [
            { texte: "Publication App Store/Play Store" },
            { texte: "Support technique local" },
            { texte: "Mises à jour régulières" }
          ]
        }
      ],
      technologies: [
        {
          nom: "React Native",
          description: "Framework JavaScript pour développer des applications iOS et Android à partir d'une seule base de code"
        },
        {
          nom: "Flutter",
          description: "Framework Google pour créer des applications mobiles natives multi-plateformes"
        },
        {
          nom: "Swift & Kotlin",
          description: "Langages de programmation natifs pour les applications iOS et Android haute performance"
        },
        {
          nom: "Firebase",
          description: "Plateforme de développement mobile offrant base de données temps réel, authentification et analytics"
        },
        {
          nom: "API REST & GraphQL",
          description: "Technologies d'intégration pour connecter vos applications mobiles à vos systèmes existants"
        },
        {
          nom: "UI/UX Mobile Avancé",
          description: "Design d'interfaces innovantes et adaptées aux spécificités du marché mauritanien"
        }
      ],
      faq: [
        {
          question: "Quel est le coût de développement d'une application mobile en Mauritanie?",
          reponse: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "Le coût de développement d'une application mobile en Mauritanie varie selon sa complexité et les fonctionnalités souhaitées. Une application simple démarre autour de 300 000 MRU, tandis qu'une application complexe avec backend personnalisé peut atteindre 800 000 MRU ou plus. Nous établissons un devis détaillé et transparent après avoir analysé précisément vos besoins, avec des options adaptées à différents budgets."
                }
              ]
            }
          ]
        },
        {
          question: "Quelle technologie est la plus adaptée pour mon projet d'application mobile?",
          reponse: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "Le choix de la technologie dépend de vos objectifs, de votre budget et des spécificités de votre projet. React Native et Flutter sont idéales pour des applications multi-plateformes (iOS et Android) avec un budget maîtrisé, tout en offrant d'excellentes performances. Le développement natif (Swift pour iOS, Kotlin pour Android) est recommandé pour des applications nécessitant des performances optimales ou des fonctionnalités avancées spécifiques à chaque plateforme. Nous vous conseillons la solution la mieux adaptée à vos besoins réels et au contexte mauritanien."
                }
              ]
            }
          ]
        },
        {
          question: "Combien de temps faut-il pour développer une application mobile complète?",
          reponse: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "Le délai de développement d'une application mobile varie généralement de 2 à 6 mois selon sa complexité. Une application simple peut être développée en 2-3 mois, tandis qu'une solution plus élaborée avec backend personnalisé, intégrations multiples et fonctionnalités avancées nécessitera 4 à 6 mois. Notre méthodologie agile permet de livrer rapidement des versions intermédiaires fonctionnelles pour recueillir vos retours et ajuster le développement en conséquence, assurant ainsi un résultat final parfaitement aligné avec vos attentes."
                }
              ]
            }
          ]
        },
        {
          question: "Comment gérez-vous la maintenance et les mises à jour de l'application après son lancement?",
          reponse: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "Nous proposons plusieurs formules de maintenance adaptées aux besoins des entreprises mauritaniennes, avec un support technique local. Nos forfaits incluent les mises à jour de sécurité, la compatibilité avec les nouvelles versions d'iOS et Android, les corrections de bugs et les petites améliorations. Nous assurons également un monitoring continu pour garantir la performance et la stabilité de votre application. Vous pouvez également opter pour un contrat évolutif permettant d'ajouter régulièrement de nouvelles fonctionnalités à votre application pour suivre l'évolution de vos besoins et du marché."
                }
              ]
            }
          ]
        }
      ],
      seo: {
        metaTitle: "Développement d'Applications Mobiles à Nouakchott | SALLTECH Mauritanie",
        metaDescription: "Agence de développement d'applications mobiles iOS et Android à Nouakchott. Solutions sur mesure pour entreprises mauritaniennes. Devis gratuit!",
        keywords: "applications mobiles Mauritanie, développement app Nouakchott, React Native Mauritanie, Flutter Mauritanie, applications iOS Nouakchott, applications Android Mauritanie, développeurs mobile Nouakchott"
      }
    };
    
    // Création du service
    console.log('Création d\'un nouveau service avec slug:', slug);
    try {
      const createResponse = await axios.post(
        `${STRAPI_URL}/api/services`,
        { data: serviceData },
        config
      );
      
      console.log('Service créé avec succès!');
      console.log('ID du nouveau service:', createResponse.data.data.id);
      console.log('Slug du nouveau service:', slug);
      
      return { success: true, serviceId: createResponse.data.data.id };
    } catch (error) {
      console.error('Erreur lors de l\'injection des données:', error.message);
      
      if (error.response && error.response.data) {
        console.error('Détails de l\'erreur:', JSON.stringify(error.response.data, null, 2));
        
        if (error.response.data?.error?.details?.errors) {
          console.error('Erreurs spécifiques:', JSON.stringify(error.response.data.error.details.errors, null, 2));
        }
      }
      
      throw error;
    }
  } catch (error) {
    console.error('Le script a échoué:', error.message);
    return { success: false, error };
  }
}

// Exécuter la fonction principale
injectServiceData()
  .then((result) => {
    if (result.success) {
      console.log('Processus terminé avec succès!');
    } else {
      console.error('Le script a échoué');
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('Erreur finale:', error);
    process.exit(1);
  });