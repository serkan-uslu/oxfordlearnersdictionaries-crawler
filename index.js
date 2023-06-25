import puppeteer from "puppeteer";
import cheerio from "cheerio";
import fs from "fs";
import { Parser } from '@json2csv/plainjs';

export const initFunc = async (config, callback) => {
    const browser = await puppeteer.launch({
        "headless": true,
    });

    const page = await browser.newPage();
    await page.goto(config.link, {
        waitUntil: "domcontentloaded",
    });
    const html = await page.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(html);

    var wordlist = $(".top-g li");
    var wordlistsCrawl = [];
    wordlist.each((index, element) => {
        var model = {
            word: $(element).find("a").text(),
            pos: $(element).find("span").text(),
            belong: $(element).find("span.belong-to").text(),
        }
        wordlistsCrawl.push(model);
    });

    fs.writeFile('./data.json', JSON.stringify(wordlistsCrawl), function (err) {
        if (err) throw err;
        console.log('json Saved!');
    });

    // convert csv
    try {
        const parser = new Parser();
        const csv = parser.parse(wordlistsCrawl);

        fs.writeFile('./data.csv', csv, function (err) {
            if (err) throw err;
            console.log('csv Saved!');
        });

    } catch (err) {
        console.error(err);
    }
    // convert csv

    callback(wordlistsCrawl);
    await browser.close();
}

const config = {
    link: "https://www.oxfordlearnersdictionaries.com/wordlists/oxford3000-5000"
}

initFunc(config, function (response) {
    console.log("bitti")
})