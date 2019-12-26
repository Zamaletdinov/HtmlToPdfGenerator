const express = require('express');
const http = require('http');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

router.route('/HtmlToPdf').post(async (req, res) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const html = req.body['html'];

    await page.setViewport({width: 1200, height: 900});
    await page.setContent(html, {waitUntil: 'networkidle2'});

    const buffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
            top: 20,
            bottom: 20
        }
    });

    res.type('application/pdf');
    res.send(buffer);

    await browser.close();
});

router.route('/UrlToPdf').post(async (req, res) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const url = req.query['url'];

    await page.setViewport({width: 1200, height: 900});
    await page.goto(url, {waitUntil: 'networkidle2'});
    const buffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
            top: 20,
            bottom: 20
        }
    });

    res.type('application/pdf');
    res.send(buffer);

    await browser.close();
});

app.use(bodyParser.json({
    limit: '10mb'
}));

app.use('/api', router);

const port = 3000;
http.createServer(app).listen(port);
console.log('Server listening on port ' + port);