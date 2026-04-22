const fs = require('fs');
const path = require('path');

const bricksPath = path.join(__dirname, '../../src/data/bricks.ts');
const resultsPath = path.join(__dirname, 'results.json');

function updateData() {
  if (!fs.existsSync(resultsPath)) {
    console.log('[Updater] No results.json found. Skipping update.');
    return;
  }

  const results = JSON.parse(fs.readFileSync(resultsPath));
  let content = fs.readFileSync(bricksPath, 'utf8');
  let updatedCount = 0;

  for (const [id, data] of Object.entries(results)) {
    console.log(`[Updater] Processing updates for: ${id}`);
    
    // Validation: Skip if price is 0 (likely scraping error)
    if (data.unitPrice === 0 || data.inputPrice === 0) {
      console.warn(`[Updater] ⚠️ Skipping ${id}: Price is 0. Suspected scraping error.`);
      continue;
    }

    let itemUpdated = false;

    // 1. Token-based pricing (inputPrice, outputPrice)
    if (data.inputPrice !== undefined && data.outputPrice !== undefined) {
      const regex = new RegExp(
        `(id:\\s*"${id}"[\\s\\S]+?pricing:\\s*{[\\s\\S]+?inputPrice:)\\s*[\\d.]+,\\s*outputPrice:\\s*[\\d.]+(,[\\s\\S]+?lastUpdated:)\\s*"[\\d-]+"`,
        'g'
      );
      if (regex.test(content)) {
        content = content.replace(regex, `$1 ${data.inputPrice}, outputPrice: ${data.outputPrice}$2 "${data.lastUpdated}"`);
        updatedCount++;
        itemUpdated = true;
      }
    } 
    // 2. Infra/Unit-based pricing (unitPrice)
    else if (data.unitPrice !== undefined) {
      const regex = new RegExp(
        `(id:\\s*"${id}"[\\s\\S]+?pricing:\\s*{[\\s\\S]+?unitPrice:)\\s*[\\d.]+(,[\\s\\S]+?lastUpdated:)\\s*"[\\d-]+"`,
        'g'
      );
      if (regex.test(content)) {
        content = content.replace(regex, `$1 ${data.unitPrice}$2 "${data.lastUpdated}"`);
        updatedCount++;
        itemUpdated = true;
      }
    }

    if (itemUpdated) {
      console.log(`[Updater] ✅ Successfully mapped and updated: ${id}`);
    } else {
      console.warn(`[Updater] ❌ Could not find match for ID: ${id} in bricks.ts. Check if the ID or structure changed.`);
    }
  }

  if (updatedCount > 0) {
    fs.writeFileSync(bricksPath, content);
    console.log(`\n[Updater] 🎉 Final Report: Successfully updated ${updatedCount} items in bricks.ts.`);
  } else {
    console.log('\n[Updater] ℹ️ No changes were applied.');
  }
}

updateData();

