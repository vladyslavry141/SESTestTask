"use strict";
const fetch = require("undici").fetch;

class Cryptocarency {
  async getRate(baseCarency, vsCarency) {
    const url = new URL("https://api.coingecko.com/api/v3/simple/price");
    const search = new URLSearchParams({
      ids: baseCarency,
      vs_currencies: vsCarency,
    });
    url.search = search.toString();

    const res = await fetch(url, {
      method: "GET",
    });

    const rate = await res.json().then((data) => data[baseCarency][vsCarency]);
    return rate;
  }
}

module.exports = Cryptocarency;
