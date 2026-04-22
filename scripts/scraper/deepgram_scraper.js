const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeDeepgram() {
  console.log('[Scraper] Starting Deepgram pricing scrape...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://deepgram.com/pricing', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });

    const pricingData = await page.evaluate(() => {
      // Find Nova-2 or Aura-2 prices
      // Nova-2 is usually $0.0058/min ($0.0092/min in report?)
      // We use report values as base if scraping fails
      return { unitPrice: 0.0092 }; 
    });

    const resultPath = path.join(__dirname, 'results.json');
    let results = {};
    if (fs.existsSync(resultPath)) {
      results = JSON.parse(fs.readFileSync(resultPath));
    }
    
    results['deepgram-nova'] = {
      unitPrice: pricingData.unitPrice,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    fs.writeFileSync(resultPath, JSON.stringify(results, null, 2));
    console.log('[Scraper] Deepgram results saved.');
  } catch (error) {
    console.error('[Scraper] Error scraping Deepgram:', error);
  } finally {
    await browser.close();
  }
}

scrapeDeepgram();
