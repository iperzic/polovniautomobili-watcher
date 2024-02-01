import { createPlaywrightRouter, Dataset } from 'crawlee';

export const router = createPlaywrightRouter();

router.addHandler('DETAIL', async ({ request, page, log }) => {
    log.debug(`Extracting data: ${request.url}`);

    const generalInfoBox = page.locator('#classified-content > div.uk-width-1-1 > section > section > div > div > div > div > div > div')
    const rightPanel = generalInfoBox.locator('div.uk-width-medium-1-2')
    const leftPanel = generalInfoBox.locator('div.uk-width-large-1-2.uk-width-medium-1-1.uk-width-1-1')

    const condition = await leftPanel.locator('div:nth-child(1) > div > div.uk-width-1-2.uk-text-bold').textContent()
    const make = await leftPanel.locator('div:nth-child(2) > div > div.uk-width-1-2.uk-text-bold').textContent()
    const model = await leftPanel.locator('div:nth-child(3) > div > div.uk-width-1-2.uk-text-bold').textContent()
    const year = await leftPanel.locator('div:nth-child(4) > div > div.uk-width-1-2.uk-text-bold').textContent()
    const kms = await leftPanel.locator('div:nth-child(5) > div > div.uk-width-1-2.uk-text-bold').textContent()
    const bodyType = await leftPanel.locator('div:nth-child(6) > div > div.uk-width-1-2.uk-text-bold').textContent()
    const fuel = await leftPanel.locator('div:nth-child(7) > div > div.uk-width-1-2.uk-text-bold').textContent()

    const cc = await rightPanel.locator('div:nth-child(1) > div > div.uk-width-1-2.uk-text-bold').textContent()
    const engine = await rightPanel.locator('div:nth-child(2) > div > div.uk-width-1-2.uk-text-bold').textContent()
    const fixedPrice = await rightPanel.locator('div:nth-child(3) > div > div.uk-width-1-2.uk-text-bold').textContent()
    const swap = await rightPanel.locator('div:nth-child(4) > div > div.uk-width-1-2.uk-text-bold').textContent()
    const id = await rightPanel.locator('div:nth-child(5) > div > div.uk-width-1-2.uk-text-bold').textContent();

    const descriptionBlock = await page.$('#classifiedReplaceDescription > div')
    let description = ''

        if(descriptionBlock) {
            description = await descriptionBlock.innerText()
        }


    const results = {
        url: request.url,
        condition,
        make,
        model,
        year,
        kms,
        bodyType,
        fuel,
        cc,
        engine,
        fixedPrice,
        swap,
        id,
        description
    };

    log.debug(`Saving data: ${request.url}`);
    await Dataset.pushData(results);
});

router.addDefaultHandler(async ({ request, page, enqueueLinks, log }) => {
    log.debug(`Enqueueing pagination for: ${request.url}`);

    await page.waitForSelector('#search-results  article.classified.ordinaryClassified > div.textContentHolder > div.textContent a[href*="/auto-oglasi/"]');
    await enqueueLinks({
        selector: '#search-results  article.classified.ordinaryClassified > div.textContentHolder > div.textContent a',
        label: 'DETAIL',
    });

    const nextButton = await page.$('a.js-pagination-next');
    if (nextButton) {
        await enqueueLinks({
            selector: 'a.js-pagination-next',
        });
    }
});
