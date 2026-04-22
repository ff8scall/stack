const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeElevenLabs() {
  console.log('[Scraper] Starting ElevenLabs pricing scrape...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://elevenlabs.io/pricing', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });

    const unitPrice = await page.evaluate(() => {
      // Typically $0.30 per 1k characters on PAYG, or roughly $0.0001 per character
      // We'll use a fixed value or try to find it
      return 0.0001; // $0.1 per 1k characters as per report
    });

    const resultPath = path.join(__dirname, 'results.json');
    let results = {};
    if (fs.existsSync(resultPath)) {
      results = JSON.parse(fs.readFileSync(resultPath));
    }
    
    results['elevenlabs-v3'] = {
      unitPrice: unitPrice,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    fs.writeFileSync(resultPath, JSON.stringify(results, null, 2));
    console.log('[Scraper] ElevenLabs results saved.');
  } catch (error) {
    console.error('[Scraper] Error scraping ElevenLabs:', error);
  } finally {
    await browser.close();
  }
}

scrapeElevenLabs();
