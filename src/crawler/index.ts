import { CheerioCrawler, Dataset, log } from 'crawlee';

import { configSchema } from '../config.js';
import type { Config } from '../config.js';
import { router } from './router.js';

function buildSearchParamsFromConfig(config: Config) {
  const params = new URLSearchParams();

  for (let key in config) {
    const value = config[key as keyof Config];

    if (Array.isArray(value)) {
      (value as Array<any>).forEach((arrayValue: string) =>
        params.append(`${key}[]`, encodeURIComponent(arrayValue)),
      );
    } else {
      params.append(key, encodeURIComponent(value ?? ''));
    }
  }

  return params.toString();
}

export default async function crawl(config: Config) {
  configSchema.parse(config);

  log.setLevel(log.LEVELS.DEBUG);

  log.debug('Setting up crawler.');
  const crawler = new CheerioCrawler({
    requestHandler: router,
    persistCookiesPerSession: false,
    maxRequestsPerCrawl: 50,
  });

  await crawler.run([
    `https://www.polovniautomobili.com/auto-oglasi/pretraga?${buildSearchParamsFromConfig(config)}`,
  ]);

  await Dataset.exportToJSON(`${Date.now()}`, { toKVS: 'output' });
}
