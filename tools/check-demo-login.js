/*
  Headless check for demo login on deployed site.
  Usage:
    node tools/check-demo-login.js
    DEMO_URL=https://your-app.vercel.app node tools/check-demo-login.js
    DEMO_EMAIL=... DEMO_PASSWORD=... node tools/check-demo-login.js
*/

const puppeteer = require('puppeteer');

async function run() {
  const baseUrl = (process.env.DEMO_URL || 'https://automation-platform-khaki.vercel.app').replace(/\/$/, '');
  const loginUrl = `${baseUrl}/login`;
  const email = process.env.DEMO_EMAIL || 'demo@automation-platform.com';
  const password = process.env.DEMO_PASSWORD || 'demo123';

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(30000);

  try {
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });

    // Wait for either demo or regular login inputs
    await page.waitForSelector('input[type="email"], input[name="email"]', { timeout: 15000 });

    const emailSelector = (await page.$('input[type="email"]')) ? 'input[type="email"]' : 'input[name="email"]';
    const passSelector = (await page.$('input[type="password"]')) ? 'input[type="password"]' : 'input[name="password"]';

    await page.click(emailSelector, { clickCount: 3 });
    await page.type(emailSelector, email, { delay: 20 });
    await page.click(passSelector, { clickCount: 3 });
    await page.type(passSelector, password, { delay: 20 });

    // Try to submit form
    let clicked = false;
    const submitByType = await page.$('button[type="submit"]');
    if (submitByType) {
      await submitByType.click();
      clicked = true;
    } else {
      // Try button with text
      const clickedByText = await page.evaluate(() => {
        const labels = ['Sign In to Demo', 'Sign In', 'Login', 'Sign in'];
        const btns = Array.from(document.querySelectorAll('button'));
        for (const b of btns) {
          const t = (b.innerText || '').trim();
          if (labels.some(l => t.includes(l))) {
            b.click();
            return true;
          }
        }
        return false;
      });
      clicked = clickedByText;
    }
    if (!clicked) {
      // Press Enter as fallback
      await page.keyboard.press('Enter');
    }

    // Wait for demo/local user to be set or route change
    const loginResult = await Promise.race([
      page.waitForFunction(() => !!(localStorage.getItem('demoUser') || localStorage.getItem('user')), { timeout: 12000 }).then(() => 'LOCALSTORAGE'),
      page.waitForFunction(() => location.pathname.includes('/dashboard'), { timeout: 12000 }).then(() => 'ROUTE')
    ]).catch(() => null);

    const path = await page.evaluate(() => location.pathname).catch(() => '');
    const stored = await page.evaluate(() => ({
      demoUser: localStorage.getItem('demoUser'),
      user: localStorage.getItem('user')
    }));

    let parsedUser = null;
    if (stored.demoUser) {
      try { parsedUser = JSON.parse(stored.demoUser); } catch {}
    } else if (stored.user) {
      try { parsedUser = JSON.parse(stored.user); } catch {}
    }

    if (loginResult && parsedUser) {
      console.log('LOGIN_OK');
      console.log(`mode=${stored.demoUser ? 'demo' : 'regular'}`);
      console.log(`path=${path}`);
      console.log(`email=${parsedUser.email}`);
      console.log(`role=${parsedUser.role || ''}`);
      process.exit(0);
    }

    console.log('LOGIN_FAILED');
    console.log(`path=${path}`);
    console.log(`reason=${loginResult === null ? 'timeout/no state change' : 'no user stored'}`);
    process.exit(2);
  } catch (err) {
    console.error('ERROR', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();

