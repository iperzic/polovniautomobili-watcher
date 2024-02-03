import { createCheerioRouter, Dataset } from 'crawlee';

export const router = createCheerioRouter();

router.addHandler('DETAIL', async ({ request, $, log }) => {
  log.debug(`Extracting data: ${request.url}`);

  const generalInfoBox = $(
    '#classified-content > div.uk-width-1-1 > section > section > div > div > div > div > div > div',
  );
  const rightPanel = $('div.uk-width-medium-1-2', generalInfoBox);
  const leftPanel = $(
    'div.uk-width-large-1-2.uk-width-medium-1-1.uk-width-1-1',
    generalInfoBox,
  );

  const condition = $(
    'div:nth-child(1) > div > div.uk-width-1-2.uk-text-bold',
    leftPanel,
  ).text();
  const make = $(
    'div:nth-child(2) > div > div.uk-width-1-2.uk-text-bold',
    leftPanel,
  ).text();
  const model = $(
    'div:nth-child(3) > div > div.uk-width-1-2.uk-text-bold',
    leftPanel,
  ).text();
  const year = $(
    'div:nth-child(4) > div > div.uk-width-1-2.uk-text-bold',
    leftPanel,
  ).text();
  const kms = $(
    'div:nth-child(5) > div > div.uk-width-1-2.uk-text-bold',
    leftPanel,
  ).text();
  const bodyType = $(
    'div:nth-child(6) > div > div.uk-width-1-2.uk-text-bold',
    leftPanel,
  ).text();
  const fuel = $(
    'div:nth-child(7) > div > div.uk-width-1-2.uk-text-bold',
    leftPanel,
  ).text();

  const cc = $(
    'div:nth-child(1) > div > div.uk-width-1-2.uk-text-bold',
    rightPanel,
  ).text();
  const engine = $(
    'div:nth-child(2) > div > div.uk-width-1-2.uk-text-bold',
    rightPanel,
  ).text();
  const fixedPrice = $(
    'div:nth-child(3) > div > div.uk-width-1-2.uk-text-bold',
    rightPanel,
  ).text();
  const swap = $(
    'div:nth-child(4) > div > div.uk-width-1-2.uk-text-bold',
    rightPanel,
  ).text();
  const id = $(
    'div:nth-child(5) > div > div.uk-width-1-2.uk-text-bold',
    rightPanel,
  ).text();

  const descriptionBlock = $('#classifiedReplaceDescription > div');
  let description = '';

  if (descriptionBlock) {
    description = descriptionBlock.text();
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
    description,
  };

  log.debug(`Saving data: ${request.url}`);
  await Dataset.pushData(results);
});

router.addDefaultHandler(async ({ request, $, enqueueLinks, log }) => {
  log.debug(`Enqueueing pagination for: ${request.url}`);

  await enqueueLinks({
    selector:
      '#search-results  article.classified.ordinaryClassified > div.textContentHolder > div.textContent a[href*="/auto-oglasi/"]',
    label: 'DETAIL',
  });

  const nextButton = $('a.js-pagination-next');
  if (nextButton) {
    await enqueueLinks({
      selector: 'a.js-pagination-next',
    });
  }
});
