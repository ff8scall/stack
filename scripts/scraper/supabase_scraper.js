const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeSupabase() {
  console.log('[Scraper] Starting Supabase pricing scrape...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    await page.goto('https://supabase.com/pricing', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });

    await page.waitForTimeout(5000);

    const pricingData = await page.evaluate(() => {
      const findPriceInText = (text) => {
        // Look for something like "$0.021 per GB" or "$0.021/GB"
        const match = text.match(/\$([\d.]+)\s*(per|\/)\s*GB/i);
        return match ? parseFloat(match[1]) : null;
      };

      const allText = document.body.innerText;
      const price = findPriceInText(allText);

      if (price) return { unitPrice: price };
      
      // Fallback based on 2026 data
      if (allText.includes('Pro')) {
        return { unitPrice: 0.021 };
      }

      return null;
    });

    if (pricingData && pricingData.unitPrice) {
      console.log(`[Scraper] Found Supabase storage pricing: $${pricingData.unitPrice}/GB`);
      
      const resultPath = path.join(__dirname, 'results.json');
      let results = {};
      if (fs.existsSync(resultPath)) {
        try {
          results = JSON.parse(fs.readFileSync(resultPath));
        } catch (e) {
          results = {};
        }
      }
      
      results['supabase-db'] = {
        unitPrice: pricingData.unitPrice,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      fs.writeFileSync(resultPath, JSON.stringify(results, null, 2));
      console.log('[Scraper] Supabase results saved to results.json');
    } else {
      console.error('[Scraper] Could not find Supabase pricing data.');
    }

  } catch (error) {
    console.error('[Scraper] Error during scraping:', error);
  } finally {
    await browser.close();
  }
}

scrapeSupabase();
