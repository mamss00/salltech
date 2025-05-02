const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { join } = require('path');
const { existsSync } = require('fs');
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

// Fonction pour vérifier si un fichier existe dans le dossier .next/static
const staticFileExists = (pathname) => {
  if (!pathname.startsWith('/_next/static/')) return false;
  
  // Transforme /_next/static/chunks/app/page.js en .next/static/chunks/app/page.js
  const filePath = join(process.cwd(), pathname.replace('/_next', '.next'));
  return existsSync(filePath);
};

app.prepare().then(() => {
  console.log(`Environnement: ${process.env.NODE_ENV}`);
  console.log('Démarrage du serveur Next.js...');
  
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    
    // Log minimal pour le débogage des assets
    if (pathname.startsWith('/_next/static/') && !pathname.includes('/chunks/webpack')) {
      console.log(`Requête de fichier statique: ${pathname}`);
    }
    
    try {
      // Laisser Next.js gérer toutes les requêtes
      handle(req, res, parsedUrl);
    } catch (error) {
      console.error(`Erreur de traitement de la requête ${pathname}:`, error);
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