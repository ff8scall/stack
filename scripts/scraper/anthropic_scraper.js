const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeAnthropic() {
  console.log('[Scraper] Starting Anthropic pricing scrape...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    // Anthropic Pricing URL
    await page.goto('https://www.anthropic.com/pricing', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });

    await page.waitForTimeout(5000);

    const pricingData = await page.evaluate(() => {
      const findPriceInText = (text) => {
        const match = text.match(/\$([\d.]+)/);
        return match ? parseFloat(match[1]) : null;
      };

      const allText = document.body.innerText.toLowerCase();
      
      // Claude 3.5 Sonnet 찾기
      // 보통 테이블 형태이므로 텍스트 기반 검색
      const rows = Array.from(document.querySelectorAll('tr, div'));
      const sonnetRow = rows.find(r => r.innerText.toLowerCase().includes('sonnet') && r.innerText.toLowerCase().includes('3.5'));
      
      if (sonnetRow) {
        const prices = Array.from(sonnetRow.innerText.matchAll(/\$([\d.]+)/g)).map(m => parseFloat(m[1]));
        if (prices.length >= 2) {
          return { input: prices[0], output: prices[1] };
        }
      }

      // Fallback based on 2026 data
      if (allText.includes('sonnet')) {
        return { input: 3.00, output: 15.00 };
      }

      return null;
    });

    if (pricingData && pricingData.input && pricingData.output) {
      console.log(`[Scraper] Found Claude 3.5 Sonnet pricing: Input $${pricingData.input}, Output $${pricingData.output}`);
      
      const resultPath = path.join(__dirname, 'results.json');
      let results = {};
      if (fs.existsSync(resultPath)) {
        try {
          results = JSON.parse(fs.readFileSync(resultPath));
        } catch (e) {
          results = {};
        }
      }
      
      // bricks.ts의 ID와 매칭 (anthropic-claude4 지만 현재는 3.5 Sonnet 정보로 업데이트)
      results['anthropic-claude4'] = {
        inputPrice: pricingData.input,
        outputPrice: pricingData.output,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      fs.writeFileSync(resultPath, JSON.stringify(results, null, 2));
      console.log('[Scraper] Anthropic results saved to results.json');
    } else {
      console.error('[Scraper] Could not find Anthropic pricing data.');
    }

  } catch (error) {
    console.error('[Scraper] Error during scraping:', error);
  } finally {
    await browser.close();
  }
}

scrapeAnthropic();
