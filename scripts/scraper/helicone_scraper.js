const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeHelicone() {
  console.log('[Scraper] Starting Helicone pricing scrape...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.helicone.ai/pricing', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });

    const monthlyPrice = await page.evaluate(() => {
      const proCard = Array.from(document.querySelectorAll('div')).find(d => d.innerText.includes('Pro'));
      if (proCard) {
        const match = proCard.innerText.match(/\$([\d.]+)/);
        return match ? parseFloat(match[1]) : 79;
      }
      return 79;
    });

    const resultPath = path.join(__dirname, 'results.json');
    let results = {};
    if (fs.existsSync(resultPath)) {
      results = JSON.parse(fs.readFileSync(resultPath));
    }
    
    results['helicone'] = {
      monthlyPrice: monthlyPrice,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    fs.writeFileSync(resultPath, JSON.stringify(results, null, 2));
    console.log('[Scraper] Helicone results saved.');
  } catch (error) {
    console.error('[Scraper] Error scraping Helicone:', error);
  } finally {
    await browser.close();
  }
}

scrapeHelicone();
