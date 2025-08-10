const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 🔧 CONFIGURATION - Modifie ici ou passe en paramètre
const config = {
  // Site à capturer (peut être passé en argument : node script.js https://monsite.com)
  siteUrl: process.argv[2] || 'https://lagence-mr.com',
  
  // Dossier de sortie
  outputDir: 'screenshots',
  
  // Devices à capturer
  devices: {
    mobile: {
      name: 'iPhone 16 Pro Max',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/20A362 Safari/605.1.15',
      viewport: { width: 430, height: 932, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
    },
    desktop: {
      name: 'MacBook Pro 16',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      viewport: { width: 1920, height: 1080, deviceScaleFactor: 2, isMobile: false, hasTouch: false },
    }
  },
  
  // Options de capture
  options: {
    scrollToBottom: true,        // Scroll automatique pour charger le contenu
    waitForImages: true,         // Attendre les images
    disableAnimations: true,     // Désactiver les animations
    timeout: 60000,             // Timeout navigation
    delay: 3000,                // Délai après chargement
    fullPageDesktop: true,      // Page complète sur desktop
    linkSelectors: [            // Sélecteurs pour trouver les liens
      'nav a',
      'header a', 
      '.menu a',
      '.navigation a',
      '.navbar a',
      'footer a'
    ]
  }
}

// 📝 Fonction pour générer automatiquement une config SEO
async function generateSeoConfig() {
  console.log('🔧 === APERÇU GÉNÉRATION AUTOMATIQUE ===\n');
  
  let browser = null;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    const desktop = config.devices.desktop;
    await page.setUserAgent(desktop.userAgent);
    await page.setViewport(desktop.viewport);
    
    console.log(`🔍 Analyse de ${config.siteUrl}...`);
    await loadPageCompletely(page, config.siteUrl);
    const links = await discoverLinks(page, config.siteUrl);
    
    // Extraire nom du site pour affichage
    const siteName = new URL(config.siteUrl).hostname.replace(/^www\./, '').replace(/\.[^.]+$/, '');
    
    console.log('📁 Structure qui sera générée:\n');
    
    links.forEach(link => {
      const pathname = new URL(link).pathname;
      const folderName = generateFolderName(link);
      const mobileImageName = generateImageName(link, 'mobile');
      const desktopImageName = generateImageName(link, 'desktop');
      
      console.log(`📂 ${folderName}/`);
      console.log(`   📱 ${mobileImageName}`);
      console.log(`   💻 ${desktopImageName}`);
      console.log('');
    });
    
    console.log('✨ TOUT EST AUTOMATIQUE - Aucune configuration manuelle nécessaire !');
    console.log('🚀 Lance simplement: node script.js');
    
  } catch (error) {
    console.error('❌ Erreur génération aperçu:', error.message);
  } finally {
    if (browser) await browser.close();
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 📝 Fonction pour générer le nom d'image dynamique
function generateImageName(url, device) {
  try {
    const urlObj = new URL(url);
    
    // 🌐 Extraction du nom du site
    let siteName = urlObj.hostname
      .replace(/^www\./, '') // Supprimer www.
      .replace(/\.[^.]+$/, '') // Supprimer l'extension (.com, .fr, etc.)
      .replace(/[^a-z0-9\-]/gi, '-') // Remplacer caractères spéciaux par tirets
      .replace(/-+/g, '-') // Supprimer tirets multiples
      .toLowerCase();
    
    // 📄 Extraction du nom de la page (automatique)
    const pathname = urlObj.pathname;
    let pageName = pathname
      .replace(/^\/+|\/+$/g, '') // Supprimer slashes début/fin
      || 'accueil'; // Page d'accueil si vide
    
    // Nettoyage du nom de page
    pageName = pageName
      .replace(/[^a-z0-9\-]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase()
      .substring(0, 30) // Limiter la longueur
      .replace(/-$/, '');
    
    // 🏗️ Construction du nom final pour l'image
    const finalName = `projet_salltech_nouakchott_${siteName}_creer_${pageName}_${device}.png`;
    
    return finalName;
    
  } catch (error) {
    console.warn(`⚠️  Erreur nom image pour ${url}:`, error.message);
    return `projet_salltech_nouakchott_site_creer_page_${device}_${Math.random().toString(36).substr(2, 5)}.png`;
  }
}

// 🔄 Fonction de scroll automatique pour charger tout le contenu
async function autoScroll(page) {
  if (!config.options.scrollToBottom) return;
  
  console.log('🔄 Scroll automatique pour charger le contenu...');
  
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if(totalHeight >= scrollHeight){
          clearInterval(timer);
          // Revenir en haut
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });
}

// 🖼️ Fonction d'attente des images
async function waitForImages(page) {
  if (!config.options.waitForImages) return;
  
  try {
    await page.evaluate(() => {
      const images = Array.from(document.images);
      return Promise.all(
        images.slice(0, 20).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            const timeout = setTimeout(resolve, 5000);
            img.onload = img.onerror = () => {
              clearTimeout(timeout);
              resolve();
            };
          });
        })
      );
    });
  } catch (error) {
    console.warn('⚠️  Timeout images:', error.message);
  }
}

// 📄 Fonction de chargement complet d'une page
async function loadPageCompletely(page, url) {
  try {
    console.log(`🔗 Navigation: ${url}`);
    
    await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: config.options.timeout 
    });

    // Attendre que le body soit présent
    await page.waitForSelector('body', { timeout: 10000 });
    
    // Scroll pour charger le contenu lazy-loading
    await autoScroll(page);
    
    // Attendre les images
    await waitForImages(page);
    
    // Délai final
    await sleep(config.options.delay);
    
    return true;
  } catch (error) {
    console.error(`❌ Erreur chargement ${url}:`, error.message);
    return false;
  }
}

// 📸 Fonction de capture
async function takeScreenshot(page, url, outputDir, device) {
  try {
    const deviceName = device.viewport.isMobile ? 'mobile' : 'desktop';
    const imageName = generateImageName(url, deviceName);
    const filePath = path.join(outputDir, imageName);
    
    const screenshotOptions = {
      path: filePath,
      type: 'png',
      fullPage: device.viewport.isMobile ? false : config.options.fullPageDesktop,
    };

    if (device.viewport.isMobile) {
      screenshotOptions.clip = {
        x: 0, y: 0,
        width: device.viewport.width,
        height: device.viewport.height
      };
    }

    await page.screenshot(screenshotOptions);
    console.log(`✅ ${imageName}`);
    return true;
  } catch (error) {
    console.error(`❌ Erreur capture:`, error.message);
    return false;
  }
}

// 🔍 Fonction de découverte des liens
async function discoverLinks(page, siteUrl) {
  try {
    const selector = config.options.linkSelectors.join(', ');
    const foundLinks = await page.$$eval(selector, (links) =>
      links
        .map(a => a.href)
        .filter(href => href && href.startsWith('http') && !href.includes('#') && !href.includes('mailto'))
    );
    
    const uniqueLinks = [...new Set([siteUrl, ...foundLinks])];
    console.log(`✅ ${foundLinks.length} liens trouvés`);
    return uniqueLinks;
  } catch (error) {
    console.warn('⚠️  Erreur découverte liens:', error.message);
    return [siteUrl]; // Fallback sur page d'accueil uniquement
  }
}

// 🚀 Fonction principale
async function captureWebsite() {
  const startTime = Date.now();
  let browser = null;
  
  try {
    console.log('🎯 === CAPTURE UNIVERSELLE DE SITE WEB ===');
    console.log(`🌐 Site: ${config.siteUrl}`);
    console.log(`📁 Sortie: ${config.outputDir}`);
    console.log('');

    // 📝 Option pour générer une config SEO automatique
    if (process.argv.includes('--generate-seo-config')) {
      await generateSeoConfig();
      return;
    }

    // Lancement navigateur
    console.log('🚀 Lancement navigateur...');
    browser = await puppeteer.launch({ 
      headless: true,
      timeout: config.options.timeout,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox', 
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--no-first-run',
        '--disable-gpu'
      ]
    });
    
    const page = await browser.newPage();
    
    // Désactiver animations si demandé
    if (config.options.disableAnimations) {
      await page.evaluateOnNewDocument(() => {
        const style = document.createElement('style');
        style.textContent = `
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-delay: 0.01ms !important;
            transition-duration: 0.01ms !important;
            transition-delay: 0.01ms !important;
          }
        `;
        document.head.appendChild(style);
      });
    }

    // Configuration desktop pour découverte
    const desktop = config.devices.desktop;
    await page.setUserAgent(desktop.userAgent);
    await page.setViewport(desktop.viewport);

    // Chargement page d'accueil et découverte des liens
    console.log('🔍 Découverte des pages...');
    if (await loadPageCompletely(page, config.siteUrl)) {
      var links = await discoverLinks(page, config.siteUrl);
    } else {
      var links = [config.siteUrl];
    }

    console.log(`📋 ${links.length} pages à capturer:`);
    links.forEach((link, i) => {
      const mobileImageName = generateImageName(link, 'mobile');
      const desktopImageName = generateImageName(link, 'desktop');
      const pathname = new URL(link).pathname;
      console.log(`  ${i + 1}. ${pathname}`);
      console.log(`      📱 ${mobileImageName}`);
      console.log(`      💻 ${desktopImageName}`);
    });
    console.log('');

    // Création dossier
    if (!fs.existsSync(config.outputDir)) {
      fs.mkdirSync(config.outputDir, { recursive: true });
    }

    // Capture de chaque page
    let successCount = 0;
    for (const [index, link] of links.entries()) {
      console.log(`📍 Page ${index + 1}/${links.length}: ${new URL(link).pathname}`);

      let pageSuccess = true;

      // Capture mobile
      console.log(`📱 Mobile...`);
      const mobile = config.devices.mobile;
      await page.setUserAgent(mobile.userAgent);
      await page.setViewport(mobile.viewport);
      
      if (await loadPageCompletely(page, link)) {
        await takeScreenshot(page, link, config.outputDir, mobile);
      } else {
        pageSuccess = false;
      }

      await sleep(1000);

      // Capture desktop
      console.log(`💻 Desktop...`);
      await page.setUserAgent(desktop.userAgent);
      await page.setViewport(desktop.viewport);
      
      if (await loadPageCompletely(page, link)) {
        await takeScreenshot(page, link, config.outputDir, desktop);
      } else {
        pageSuccess = false;
      }

      if (pageSuccess) successCount++;
      await sleep(1000);
      console.log('');
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`🎉 TERMINÉ en ${duration}s !`);
    console.log(`📊 ${successCount}/${links.length} pages capturées avec succès`);

  } catch (error) {
    console.error('❌ Erreur globale:', error.message);
  } finally {
    if (browser) await browser.close();
    
    // Résumé final
    if (fs.existsSync(config.outputDir)) {
      const files = fs.readdirSync(config.outputDir);
      console.log(`\n📁 Fichiers créés dans ${config.outputDir}/:`);
      files.forEach(file => {
        console.log(`  📄 ${file}`);
      });
      console.log(`📊 Total: ${files.length} images générées`);
    }
  }
}

// 🚀 LANCEMENT
// 
// 💡 MODES D'UTILISATION :
//
// 1. Capture automatique (TOUT EST AUTOMATIQUE) :
//    node script.js
//
// 2. Capture d'un autre site :  
//    node script.js https://monsite.com
//
// 3. Aperçu de ce qui sera généré :
//    node script.js https://monsite.com --generate-seo-config
//
// 📁 STRUCTURE GÉNÉRÉE :
// screenshots/
// ├── projet_salltech_nouakchott_site_creer_accueil_mobile.png
// ├── projet_salltech_nouakchott_site_creer_accueil_desktop.png
// ├── projet_salltech_nouakchott_site_creer_contact_mobile.png
// ├── projet_salltech_nouakchott_site_creer_contact_desktop.png
// └── ...
//
captureWebsite();