const puppeteer = require('puppeteer');

async function convertToPdf(pageContentSetter) {
    const browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();

    await page.setViewport({width: 1200, height: 900});
    await pageContentSetter(page);

    const buffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
            top: 20,
            bottom: 20
        }
    });

    await browser.close();

    return buffer;
}

module.exports = convertToPdf;