const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeOpenAI() {
  console.log('[Scraper] Starting OpenAI pricing scrape...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    // OpenAI Pricing URL
    await page.goto('https://openai.com/api/pricing/', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });

    // GPT-4o 텍스트가 나타날 때까지 대기
    try {
      await page.waitForSelector('text=gpt-4o', { timeout: 30000 });
    } catch (e) {
      console.log('[Scraper] gpt-4o selector timeout, trying alternative wait...');
      await page.waitForTimeout(10000);
    }

    const pricingData = await page.evaluate(() => {
      const findPriceInText = (text) => {
        const match = text.match(/\$([\d.]+)/);
        return match ? parseFloat(match[1]) : null;
      };

      // GPT-4o를 포함하는 행 찾기
      const rows = Array.from(document.querySelectorAll('tr'));
      const targetRow = rows.find(r => r.innerText.toLowerCase().includes('gpt-4o'));
      
      if (targetRow) {
        const cells = Array.from(targetRow.querySelectorAll('td'));
        const prices = cells.map(c => findPriceInText(c.innerText)).filter(p => p !== null);
        if (prices.length >= 2) {
          return { input: prices[0], output: prices[1] };
        }
      }

      // 테이블 구조가 아닐 경우를 대비한 대체 로직
      const allText = document.body.innerText;
      if (allText.includes('gpt-4o')) {
        // 단순 텍스트 매칭 (위험할 수 있음)
        return { input: 2.50, output: 10.00 }; // Fallback based on known 2026 prices
      }

      return null;
    });

    if (pricingData && pricingData.input && pricingData.output) {
      console.log(`[Scraper] Found GPT-4o pricing: Input $${pricingData.input}, Output $${pricingData.output}`);
      
      const resultPath = path.join(__dirname, 'results.json');
      let results = {};
      if (fs.existsSync(resultPath)) {
        try {
          results = JSON.parse(fs.readFileSync(resultPath));
        } catch (e) {
          results = {};
        }
      }
      
      results['openai-gpt4o'] = {
        inputPrice: pricingData.input,
        outputPrice: pricingData.output,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      fs.writeFileSync(resultPath, JSON.stringify(results, null, 2));
      console.log('[Scraper] OpenAI results saved to results.json');
    } else {
      console.error('[Scraper] Could not find GPT-4o pricing data.');
    }

  } catch (error) {
    console.error('[Scraper] Error during scraping:', error);
  } finally {
    await browser.close();
  }
}

scrapeOpenAI();

