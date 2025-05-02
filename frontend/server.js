const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Sortie de débogage pour chaque requête
    console.log(`Requête reçue: ${req.method} ${req.url}`);
    
    // Intercepter une route spécifique pour vérifier que le serveur fonctionne
    const parsedUrl = parse(req.url, true);
    if (parsedUrl.pathname === '/api/hello') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Hello from Next.js Server' }));
      return;
    }
    
    // Route normale Next.js
    try {
      handle(req, res, parsedUrl);
    } catch (error) {
      console.error('Erreur lors du traitement de la requête:', error);
      res.statusCode = 500;
      res.end('Erreur interne du serveur');
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Prêt sur http://localhost:3000');
  });
});