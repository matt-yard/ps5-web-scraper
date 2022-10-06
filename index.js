const axios = require("axios");
const { parse } = require("node-html-parser");
const chalk = require("chalk");
require("dotenv").config({ path: "./.env" });

const fetchHTML = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log("Error when fetching....");
  }
};

const parseHTML = (html) => {
  const root = parse(html);
  return root;
};

const fetchAndParse = async (url) => {
  const result = await fetchHTML(url);

  //This grabs the "Add to Cart" button from the page
  try {
    // The scraper was crashing randomly when trying to parse, adding try catch
    // to see if i can figure out why

    let body = parseHTML(result).getElementsByTagName("body")[0];
    let buttonContainer = body.querySelector(".fulfillment-add-to-cart-button");
    const button = buttonContainer.getElementsByTagName("button")[0];
    return button.text;
  } catch (error) {
    console.log("Error in parsing....");
  }
};

let notificationSent = false;

const checkStock = async (url) => {
  const result = await fetchAndParse(url);

  let ts = Date.now();
  let dateObj = new Date(ts);

  if (result == "Sold Out") {
    notificationSent = false;
    console.log(chalk.red(`${dateObj.toLocaleString()} || SOLD OUT`));
  } else {
    if (!notificationSent) {
      notificationSent = true;
      await axios.post("https://api.pushover.net/1/messages.json", {
        token: process.env.API_TOKEN,
        user: process.env.USER_KEY,
        message: "PS5 In Stock Now at BestBuy!",
        url: "https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p",
      });
    }
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
