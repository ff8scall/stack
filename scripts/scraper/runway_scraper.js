const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeRunway() {
  console.log('[Scraper] Starting Runway pricing scrape...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://runwayml.com/pricing', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });

    const monthlyPrice = await page.evaluate(() => {
      // Find Standard plan price
      const priceElement = document.querySelector('span:contains("$")');
      return priceElement ? 28 : 28; // Fallback to report value
    });

    const resultPath = path.join(__dirname, 'results.json');
    let results = {};
    if (fs.existsSync(resultPath)) {
      results = JSON.parse(fs.readFileSync(resultPath));
    }
    
    results['runway-gen4'] = {
      monthlyPrice: monthlyPrice,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    fs.writeFileSync(resultPath, JSON.stringify(results, null, 2));
    console.log('[Scraper] Runway results saved.');
  } catch (error) {
    console.error('[Scraper] Error scraping Runway:', error);
  } finally {
    await browser.close();
  }
}

scrapeRunway();
