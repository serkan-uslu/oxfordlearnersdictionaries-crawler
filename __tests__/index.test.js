// import { initFunc, extractWords, saveData } from '../index';
// import fs from 'fs/promises';
// import { config } from '../config';
// import { cheerio } from 'cheerio';

// jest.mock('fs/promises');

// describe('Web Scraper', () => {
//     beforeAll(() => {
//         jest.setTimeout(10000); // Web scraping işlemleri için daha uzun bir timeout süresi ayarlayabilirsiniz
//     });

//     describe('initFunc', () => {
//         it('should scrape and return word list', async () => {
//             const result = await initFunc(config);
//             expect(Array.isArray(result)).toBe(true);
//             expect(result[0]).toHaveProperty('word');
//             expect(result[0]).toHaveProperty('meaning');
//             expect(result[0]).toHaveProperty('pos');
//             // Diğer property'leri de kontrol edebilirsiniz...
//         });
//     });

//     describe('extractWords', () => {
//         it('should extract words from provided HTML', () => {
//             const mockHtml = `
//         <ul class="top-g">
//           <li>
//             <a>mockWord</a>
//             <span>mockPos</span>
//             <span class="belong-to">mockBelong</span>
//             <span class="pron-uk" data-src-ogg="mockUk.ogg"></span>
//             <span class="pron-us" data-src-ogg="mockUs.ogg"></span>
//           </li>
//         </ul>
//       `;
//             const $ = cheerio.load(mockHtml);
//             const result = extractWords($);
//             expect(result).toEqual([
//                 {
//                     word: 'mockWord',
//                     meaning: 'mockWord',
//                     pos: 'mockPos',
//                     belong: 'mockBelong',
//                     pron_uk: config.mainURL + 'mockUk.ogg',
//                     pron_us: config.mainURL + 'mockUs.ogg',
//                 },
//             ]);
//         });
//     });

//     describe('saveData', () => {
//         it('should save data to json and csv', async () => {
//             const mockData = [
//                 {
//                     word: 'mockWord',
//                     meaning: 'mockMeaning',
//                     pos: 'mockPos',
//                     belong: 'mockBelong',
//                     pron_uk: 'mockUk.ogg',
//                     pron_us: 'mockUs.ogg',
//                 },
//             ];
//             await saveData(mockData);
//             expect(fs.writeFile).toHaveBeenCalledTimes(2);
//         });
//     });
// });
