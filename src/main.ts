import { log, CheerioCrawler } from 'crawlee';
import { router } from './router.js';

log.setLevel(log.LEVELS.DEBUG);

log.debug('Setting up crawler.');
const crawler = new CheerioCrawler({
    requestHandler: router,
    persistCookiesPerSession: false
});

await crawler.run(['https://www.polovniautomobili.com/auto-oglasi/pretraga?brand=ford&model%5B%5D=b-max&brand2=&price_from=&price_to=&year_from=&year_to=&flywheel=&atest=&door_num=&submit_1=&without_price=1&date_limit=&showOldNew=all&modeltxt=&engine_volume_from=&engine_volume_to=&power_from=&power_to=&mileage_from=&mileage_to=&emission_class=&seat_num=&wheel_side=&registration=&country=&country_origin=&city=&registration_price=&page=&sort=']);
