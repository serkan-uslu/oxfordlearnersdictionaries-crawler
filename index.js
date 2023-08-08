import fs from 'fs'
import cheerio from 'cheerio'
import puppeteer from 'puppeteer'
import { config } from './config.js'
import { Parser } from '@json2csv/plainjs'

export const initFunc = async (config, callback) => {
    const browser = await puppeteer.launch({})

    const page = await browser.newPage()
    await page.goto(config.link, {
        waitUntil: 'domcontentloaded',
    })
    const html = await page.evaluate(() => document.body.innerHTML)
    const $ = cheerio.load(html)

    var wordlist = $('.top-g li')
    var wordlistsCrawl = []

    wordlist.each((index, element) => {
        var model = {
            word: $(element).find('a').text(),
            meaning: $(element).find('a').text(),
            pos: $($(element).find('span')[0]).text(),
            belong: $(element).find('span.belong-to').text(),
            pron_uk:
                config.mainURL +
                $(element).find('.pron-uk').attr('data-src-ogg'),
            pron_us:
                'https://www.oxfordlearnersdictionaries.com' +
                $(element).find('.pron-us').attr('data-src-ogg'),
        }
        wordlistsCrawl.push(model)
    })

    // save JSON
    fs.writeFile('./data.json', JSON.stringify(wordlistsCrawl), function (err) {
        if (err) throw err
        console.log('json Saved!')
    })

    // convert CSV
    try {
        const parser = new Parser()
        const csv = parser.parse(wordlistsCrawl)

        fs.writeFile('./data.csv', csv, function (err) {
            if (err) throw err
            console.log('csv Saved!')
        })
    } catch (err) {
        console.error(err)
    }

    callback(wordlistsCrawl)
    await browser.close()
}

initFunc(config, function (response) {
    console.log('crawler finished', response)
})
