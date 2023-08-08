import fs from 'fs/promises'
import cheerio from 'cheerio'
import puppeteer from 'puppeteer'
import { config } from './config.js'
import { Parser } from '@json2csv/plainjs'

export const initFunc = async (config) => {
    try {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto(config.link, { waitUntil: 'domcontentloaded' })

        const html = await page.evaluate(() => document.body.innerHTML)
        const wordlistsCrawl = extractWords(cheerio.load(html))

        await saveData(wordlistsCrawl)

        await browser.close()
        return wordlistsCrawl
    } catch (error) {
        console.error('Error during web scraping:', error)
    }
}

const extractWords = ($) => {
    const wordlist = $('.top-g li')
    return wordlist
        .map((index, element) => ({
            word: $(element).find('a').text(),
            meaning: $(element).find('a').text(),
            pos: $($(element).find('span')[0]).text(),
            belong: $(element).find('span.belong-to').text(),
            pron_uk:
                config.mainURL +
                $(element).find('.pron-uk').attr('data-src-ogg'),
            pron_us:
                config.mainURL +
                $(element).find('.pron-us').attr('data-src-ogg'),
        }))
        .toArray()
}

const saveData = async (data) => {
    try {
        await fs.writeFile('./data.json', JSON.stringify(data))
        console.log('json Saved!')

        const csv = new Parser().parse(data)
        await fs.writeFile('./data.csv', csv)
        console.log('csv Saved!')
    } catch (error) {
        console.error('Error saving data:', error)
    }
}

initFunc(config).then((response) => {
    console.log('crawler finished', response)
})
