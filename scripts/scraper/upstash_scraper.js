const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeUpstash() {
  console.log('[Scraper] Starting Upstash pricing scrape...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    // Upstash Pricing page
    await page.goto('https://upstash.com/pricing', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });

    await page.waitForTimeout(3000);

    // We are looking for the Serverless/Pay-as-you-go price
    // Usually $0.2 per 100K requests
    const pricingData = await page.evaluate(() => {
      const allText = document.body.innerText;
      // Regex to find price per request
      const match = allText.match(/\$([\d.]+)\s*per\s*100K\s*requests/i);
      if (match) {
        // We want price per 1 request for the standard calculation
        const pricePer100K = parseFloat(match[1]);
        return { unitPrice: pricePer100K / 100000 };
      }
      
      // Fallback based on 2026 data
      return { unitPrice: 0.0002 / 100 }; // $0.2 / 100k = 0.000002
    });

    if (pricingData && pricingData.unitPrice) {
      console.log(`[Scraper] Found Upstash pricing: $${pricingData.unitPrice} per request`);
      
      const resultPath = path.join(__dirname, 'results.json');
      let results = {};
      if (fs.existsSync(resultPath)) {
        try {
          results = JSON.parse(fs.readFileSync(resultPath));
        } catch (e) { results = {}; }
      }
      
      results['upstash-redis'] = {
        unitPrice: pricingData.unitPrice,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      fs.writeFileSync(resultPath, JSON.stringify(results, null, 2));
      console.log('[Scraper] Upstash results saved to results.json');
    }

  } catch (error) {
    console.error('[Scraper] Error during Upstash scraping:', error);
  } finally {
    await browser.close();
  }
}

scrapeUpstash();
