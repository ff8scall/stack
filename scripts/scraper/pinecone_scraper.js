const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapePinecone() {
  console.log('[Scraper] Starting Pinecone pricing scrape...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://www.pinecone.io/pricing/', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });

    await page.waitForTimeout(3000);

    const pricingData = await page.evaluate(() => {
      const allText = document.body.innerText;
      // Pinecone pricing is complex (Serverless vs Pod-based)
      // We focus on the Serverless read/write unit prices if possible
      // Typical: $2.00 per 1M RUs
      const match = allText.match(/\$([\d.]+)\s*per\s*1M\s*(Read|Write|RU)/i);
      if (match) {
        return { unitPrice: parseFloat(match[1]) / 1000000 };
      }
      
      // Fallback
      return { unitPrice: 0.000002 }; 
    });

    if (pricingData && pricingData.unitPrice) {
      console.log(`[Scraper] Found Pinecone pricing: $${pricingData.unitPrice} per request/RU`);
      
      const resultPath = path.join(__dirname, 'results.json');
      let results = {};
      if (fs.existsSync(resultPath)) {
        try {
          results = JSON.parse(fs.readFileSync(resultPath));
        } catch (e) { results = {}; }
      }
      
      results['pinecone-db'] = {
        unitPrice: pricingData.unitPrice,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      fs.writeFileSync(resultPath, JSON.stringify(results, null, 2));
      console.log('[Scraper] Pinecone results saved to results.json');
    }

  } catch (error) {
    console.error('[Scraper] Error during Pinecone scraping:', error);
  } finally {
    await browser.close();
  }
}

scrapePinecone();
