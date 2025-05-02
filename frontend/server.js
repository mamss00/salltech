const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  console.log(`Environnement: ${process.env.NODE_ENV}`);
  console.log('Démarrage du serveur Next.js...');
  
  createServer((req, res) => {
    // Analyser l'URL
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    
    // Log pour débogage (à commenter en production)
    if (!pathname.includes('/_next/static/')) {
      console.log(`Requête: ${req.method} ${pathname}`);
    }
    
    // Tenter de gérer la requête avec Next.js
    try {
      handle(req, res, parsedUrl);
    } catch (error) {
      console.error(`Erreur de traitement: ${pathname}`, error);
      res.statusCode = 500;
      res.end('Erreur interne du serveur');
    }
  }).listen(3000, (err) => {
    if (err) {
      console.error('Erreur au démarrage du serveur:', err);
      throw err;
    }
    console.log('> Serveur prêt sur http://localhost:3000');
  });
}).catch(err => {
  console.error('Erreur lors de la préparation de Next.js:', err);
  process.exit(1);
});