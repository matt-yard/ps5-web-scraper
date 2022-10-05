const axios = require("axios");
const { parse } = require("node-html-parser");
const chalk = require("chalk");

const fetchHTML = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log("UH OH IT WENT HORRIBLY WRONG");
  }
};

const parseHTML = (html) => {
  const root = parse(html);
  return root;
};

const fetchAndParse = async (url) => {
  const result = await fetchHTML(url);

  let body = parseHTML(result).getElementsByTagName("body")[0];
  let buttonContainer = body.querySelector(".fulfillment-add-to-cart-button");
  const button = buttonContainer.getElementsByTagName("button")[0];

  return button.text;
};

const checkStock = async (url) => {
  const result = await fetchAndParse(url);

  let ts = Date.now();
  let dateObj = new Date(ts);

  if (result == "Sold Out") {
    console.log(chalk.red(`${dateObj.toLocaleString()} || SOLD OUT`));
  } else {
    console.log(
      chalk.green(`${dateObj.toLocaleString()} || IN STOCK || ${url}`)
    );
  }
};

// This should work with any best buy product url, but I've only tested 4 or 5
// different products

const bestBuyProductUrl =
  "https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p";

const bestBuyBot = () => {
  setInterval(() => checkStock(bestBuyProductUrl), 10000);
};

bestBuyBot();
