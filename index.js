const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-clearbit')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')()
]);

const got = require('got');

const targetUrl = 'https://www.cnn.com/2019/12/13/uk/uk-election-boris-johnson-win-ge19-intl-gbr/index.html';

(async () => {
  const { body: html, url } = await got(targetUrl)
  const metadata = await metascraper({ html, url })
  console.log(metadata)
})();
