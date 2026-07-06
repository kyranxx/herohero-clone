/**
 * Puppeteer Console Error Checker
 * Runs through all pages and reports any console errors
 */

import fs from 'node:fs';
import puppeteer from 'puppeteer';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const SHOULD_CAPTURE_SCREENSHOTS = process.env.SKIP_SCREENSHOTS !== '1';

// Pages to test
const PAGES = [
    { path: '/', name: 'Homepage' },
    { path: '/login', name: 'Login Page' },
    { path: '/creator/sarahcreates', name: 'Creator Profile' },
];

async function checkConsoleErrors() {
    console.log('🚀 Starting Puppeteer Console Error Check...\n');

    const executablePath = resolveBrowserExecutablePath();
    const browser = await puppeteer.launch({
        headless: true,
        ...(executablePath ? { executablePath } : {}),
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const results = {
        passed: [],
        failed: [],
        warnings: [],
    };

    for (const pageConfig of PAGES) {
        const page = await browser.newPage();
        const errors = [];
        const warnings = [];

        // Collect console messages
        page.on('console', (msg) => {
            const type = msg.type();
            const text = msg.text();

            if (type === 'error') {
                errors.push(text);
            } else if (type === 'warning') {
                warnings.push(text);
            }
        });

        // Collect page errors
        page.on('pageerror', (error) => {
            errors.push(error.message);
        });

        // Collect request failures
        page.on('requestfailed', (request) => {
            const failure = request.failure()?.errorText;
            if (failure === 'net::ERR_ABORTED') {
                return;
            }
            errors.push(`Failed to load${failure ? ` (${failure})` : ''}: ${request.url()}`);
        });

        try {
            const url = `${BASE_URL}${pageConfig.path}`;
            console.log(`📄 Testing: ${pageConfig.name} (${url})`);

            await page.goto(url, {
                waitUntil: 'domcontentloaded',
                timeout: 30000
            });

            // Wait a bit for any async errors
            await new Promise(r => setTimeout(r, 2000));

            if (SHOULD_CAPTURE_SCREENSHOTS) {
                const screenshotPath = `./scripts/screenshots/${pageConfig.name.replace(/\s+/g, '_').toLowerCase()}.png`;
                await page.screenshot({ path: screenshotPath, fullPage: true });
            }

            if (errors.length === 0) {
                console.log(`   ✅ No errors found\n`);
                results.passed.push(pageConfig.name);
            } else {
                console.log(`   ❌ ${errors.length} error(s) found:`);
                errors.forEach((err, i) => console.log(`      ${i + 1}. ${err}`));
                console.log('');
                results.failed.push({ page: pageConfig.name, errors });
            }

            if (warnings.length > 0) {
                console.log(`   ⚠️  ${warnings.length} warning(s):`);
                warnings.forEach((warn, i) => console.log(`      ${i + 1}. ${warn}`));
                console.log('');
                results.warnings.push({ page: pageConfig.name, warnings });
            }

        } catch (error) {
            console.log(`   ❌ Failed to load page: ${error.message}\n`);
            results.failed.push({ page: pageConfig.name, errors: [error.message] });
        }

        await page.close();
    }

    await browser.close();

    // Summary
    console.log('═'.repeat(50));
    console.log('📊 SUMMARY');
    console.log('═'.repeat(50));
    console.log(`✅ Passed: ${results.passed.length}/${PAGES.length}`);
    console.log(`❌ Failed: ${results.failed.length}/${PAGES.length}`);
    console.log(`⚠️  Pages with warnings: ${results.warnings.length}/${PAGES.length}`);
    console.log('═'.repeat(50));

    if (results.failed.length > 0) {
        console.log('\n❌ FAILED PAGES:');
        results.failed.forEach(({ page, errors }) => {
            console.log(`\n  ${page}:`);
            errors.forEach((err) => console.log(`    - ${err}`));
        });
        process.exit(1);
    } else {
        console.log('\n🎉 All pages passed! No console errors found.');
        process.exit(0);
    }
}

function resolveBrowserExecutablePath() {
    const programFiles = process.env.ProgramFiles;
    const programFilesX86 = process.env['ProgramFiles(x86)'];
    const localAppData = process.env.LOCALAPPDATA;
    const candidates = [
        process.env.PUPPETEER_EXECUTABLE_PATH,
        process.env.CHROME_PATH,
        programFiles ? `${programFiles}\\Google\\Chrome\\Application\\chrome.exe` : null,
        programFilesX86 ? `${programFilesX86}\\Google\\Chrome\\Application\\chrome.exe` : null,
        localAppData ? `${localAppData}\\Google\\Chrome\\Application\\chrome.exe` : null,
        programFiles ? `${programFiles}\\Microsoft\\Edge\\Application\\msedge.exe` : null,
        programFilesX86 ? `${programFilesX86}\\Microsoft\\Edge\\Application\\msedge.exe` : null,
    ].filter(Boolean);

    return candidates.find((candidate) => fs.existsSync(candidate));
}

// Create screenshots directory
if (!fs.existsSync('./scripts/screenshots')) {
    fs.mkdirSync('./scripts/screenshots', { recursive: true });
}

checkConsoleErrors().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
