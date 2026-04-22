const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

async function runAll() {
  const scripts = [
    'openai_scraper.js',
    'anthropic_scraper.js',
    'supabase_scraper.js',
    'upstash_scraper.js',
    'pinecone_scraper.js'
  ];

  console.log('🚀 Starting All Scrapers...');

  // results.json 초기화 (필요시)
  // const resultPath = path.join(__dirname, 'results.json');
  // if (fs.existsSync(resultPath)) fs.unlinkSync(resultPath);

  for (const script of scripts) {
    try {
      console.log(`\n--- Running ${script} ---`);
      execSync(`node ${path.join(__dirname, script)}`, { stdio: 'inherit' });
    } catch (error) {
      console.error(`❌ Error running ${script}:`, error.message);
    }
  }

  console.log('\n--- Running update_data.js ---');
  try {
    execSync(`node ${path.join(__dirname, 'update_data.js')}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Error running update_data.js:', error.message);
  }

  console.log('\n✅ All tasks completed.');
}

runAll();
