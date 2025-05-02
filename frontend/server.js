const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';

// Configuration correcte pour l'hébergement avec un nom de domaine
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  console.log(`Environnement: ${process.env.NODE_ENV}`);
  console.log('Démarrage du serveur Next.js...');
  
  createServer((req, res) => {
    // Analyse l'URL de la requête
    const parsedUrl = parse(req.url, true);
    
    // Laisse Next.js gérer la requête
    try {
      handle(req, res, parsedUrl);
    } catch (error) {
      console.error('Erreur de traitement de la requête:', error);
      res.statusCode = 500;
      res.end('Erreur interne du serveur');
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Serveur prêt sur http://localhost:3000');
  });
}).catch(err => {
  console.error('Erreur lors de la préparation de Next.js:', err);
  process.exit(1);
});