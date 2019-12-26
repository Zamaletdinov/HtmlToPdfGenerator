const express = require('express');
const http = require('http');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

async function convertToPdf(pageContentSetter) {
    const browser = await puppeteer.launch({ headless: true });
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

function prepareResponse(res, buffer) {
    res.type('application/pdf');
    res.send(buffer);
}

router.route('/ping').get(async (req, res) => {
    res.send('Pong!');
});

router.route('/HtmlToPdf').post(async (req, res) => {
    const html = req.body['html'];
    const pageContentSetter = async page => await page.setContent(html, {waitUntil: 'networkidle2'});
    const buffer = await convertToPdf(pageContentSetter);
    prepareResponse(res, buffer);
});

router.route('/UrlToPdf').post(async (req, res) => {
    const url = req.query['url'];
    const pageContentSetter = async page => await page.goto(url, {waitUntil: 'networkidle2'});
    const buffer = await convertToPdf(pageContentSetter);
    prepareResponse(res, buffer);
});

app.use(bodyParser.json({
    limit: '10mb'
}));

app.use('/api', router);

const port = process.env.PORT || 3000;
http.createServer(app).listen(port);
console.log('Server listening on port ' + port);