const { checkStockBestBuy } = require("./bestBuy");

const productUrls = {
  bestBuy: "https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p",
  targetDigital:
    "https://www.target.com/p/playstation-5-digital-edition-console/-/A-81114596#lnk=sametab",
  target:
    "https://www.target.com/p/playstation-5-console/-/A-81114595#lnk=sametab",
};

const bestBuyBot = () => {
  setInterval(() => checkStockBestBuy(productUrls.bestBuy), 10000);
};

bestBuyBot();
