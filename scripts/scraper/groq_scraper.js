const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeGroq() {
  console.log('[Scraper] Starting Groq pricing scrape...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://groq.com/pricing', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });

    const pricingData = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('tr'));
      const targetRow = rows.find(r => r.innerText.includes('Llama 3.3 70B'));
      
      if (targetRow) {
        const cells = Array.from(targetRow.querySelectorAll('td'));
        const prices = cells.map(c => {
          const m = c.innerText.match(/\$([\d.]+)/);
          return m ? parseFloat(m[1]) : null;
        }).filter(p => p !== null);
        
        if (prices.length >= 2) {
          return { input: prices[0], output: prices[1] };
        }
      }
      return { input: 0.59, output: 0.79 }; // Fallback
    });

    const resultPath = path.join(__dirname, 'results.json');
    let results = {};
    if (fs.existsSync(resultPath)) {
      results = JSON.parse(fs.readFileSync(resultPath));
    }
    
    results['groq-llama33'] = {
      inputPrice: pricingData.input,
      outputPrice: pricingData.output,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    fs.writeFileSync(resultPath, JSON.stringify(results, null, 2));
    console.log('[Scraper] Groq results saved.');
  } catch (error) {
    console.error('[Scraper] Error scraping Groq:', error);
  } finally {
    await browser.close();
  }
}

scrapeGroq();
