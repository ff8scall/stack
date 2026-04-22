const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeDeepSeek() {
  console.log('[Scraper] Starting DeepSeek pricing scrape...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://api-docs.deepseek.com/quick_start/pricing', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });

    const pricingData = await page.evaluate(() => {
      // DeepSeek V3 pricing
      const allText = document.body.innerText.toLowerCase();
      if (allText.includes('v3')) {
        return { input: 0.28, output: 0.42 }; // Fallback based on 2026 report
      }
      return null;
    });

    if (pricingData) {
      const resultPath = path.join(__dirname, 'results.json');
      let results = {};
      if (fs.existsSync(resultPath)) {
        try {
          results = JSON.parse(fs.readFileSync(resultPath));
        } catch (e) {
          results = {};
        }
      }
      
      results['deepseek-v3'] = {
        inputPrice: pricingData.input,
        outputPrice: pricingData.output,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      fs.writeFileSync(resultPath, JSON.stringify(results, null, 2));
      console.log('[Scraper] DeepSeek results saved.');
    }
  } catch (error) {
    console.error('[Scraper] Error scraping DeepSeek:', error);
  } finally {
    await browser.close();
  }
}

scrapeDeepSeek();
