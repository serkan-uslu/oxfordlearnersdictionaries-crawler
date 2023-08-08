# Web Scraper Application

This application is a simple web scraper designed to extract specific word-related information from a web page and then save it to JSON and CSV files. The application leverages `puppeteer` for web scraping, `cheerio` for HTML parsing, and `@json2csv/plainjs` to transform JSON data to CSV format.

## Features

-   Automated web scraping using Puppeteer.
-   HTML parsing using Cheerio.
-   Save extracted data as JSON and CSV formats.

## How it Works

1. **Initialization (`initFunc` function):** The application initiates the web scraping process by navigating to a specific URL (defined in `config.link`).
2. **HTML Extraction:** Once the page is fully loaded, it fetches the entire body's inner HTML.
3. **Word Extraction (`extractWords` function):** Using Cheerio, the application parses the fetched HTML and extracts word data based on specific selectors. The extracted data includes the word itself, its meaning, POS (part of speech), belonging group, and pronunciation links (both UK and US).
4. **Saving Data (`saveData` function):** The parsed word data is then saved in two formats: JSON and CSV. The data is saved locally with filenames `data.json` and `data.csv` respectively.

## Usage

Make sure you have all necessary dependencies installed. You can run the scraper by executing the script. After completion, you can find the scraped data in the root directory named `data.json` and `data.csv`.

---

# Web Scraper Uygulaması

Bu uygulama, bir web sayfasından belirli kelimeyle ilgili bilgileri çıkarmak ve sonra bunu JSON ve CSV dosyalarına kaydetmek üzere tasarlanmış basit bir web kazıyıcısıdır. Uygulama, web kazıma için `puppeteer`, HTML ayrıştırma için `cheerio` ve JSON verilerini CSV formatına dönüştürmek için `@json2csv/plainjs`'i kullanır.

## Özellikler

-   Puppeteer kullanarak otomatik web kazıma.
-   Cheerio kullanarak HTML ayrıştırma.
-   Çıkarılan veriyi JSON ve CSV formatlarında kaydedin.

## Nasıl Çalışır

1. **Başlatma (`initFunc` fonksiyonu):** Uygulama, web kazıma işlemini başlatarak belirli bir URL'ye (config.link'te tanımlandığı gibi) giderek başlatır.
2. **HTML Çıkarma:** Sayfa tamamen yüklendikten sonra, tüm gövdenin iç HTML'sini alır.
3. **Kelime Çıkarma (`extractWords` fonksiyonu):** Cheerio kullanarak, uygulama alınan HTML'yi ayrıştırır ve belirli seçicilere dayalı kelime verilerini çıkarır. Çıkarılan verilere kelimenin kendisi, anlamı, POS (kelime türü), ait olduğu grup ve telaffuz bağlantıları (hem UK hem de US) dahildir.
4. **Veri Kaydetme (`saveData` fonksiyonu):** Ayrıştırılan kelime verileri ardından iki formatta kaydedilir: JSON ve CSV. Veriler, sırasıyla `data.json` ve `data.csv` adında dosyalarla yerel olarak kaydedilir.

## Kullanım

Gerekli tüm bağımlılıkların kurulu olduğundan emin olun. Kazıyıcıyı çalıştırmak için betiği çalıştırabilirsiniz. Tamamlandıktan sonra, kök dizinde `data.json` ve `data.csv` adında kaydedilen kazınmış verileri bulabilirsiniz.
