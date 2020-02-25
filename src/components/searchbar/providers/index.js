import metascraper from 'metascraper';
import { BookProvider } from './bookprovider';

export class MetaProvider {
  /* A class which handles getting data from the right
   * Provider. Abstracts out loading of Providers.
   */
  providerMap = new Map();
  providers = [
    BookProvider
  ];

  constructor() {
    for (let provider of this.providers) {
      this.providerMap.set(provider.provides, new provider());
    }
    console.log("providerMap generated", this.providerMap);
  }
};
