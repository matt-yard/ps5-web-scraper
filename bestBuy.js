const axios = require("axios");
const chalk = require("chalk");
require("dotenv").config({ path: "./.env" });
const { fetchHTML, parseHTML } = require("./utilities");

const fetchAndParseBestBuy = async (url) => {
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
    return false;
  }
};

let notificationSentBestBuy = false;

const checkStockBestBuy = async (url) => {
  const result = await fetchAndParseBestBuy(url);

  let ts = Date.now();
  let dateObj = new Date(ts);

  if (result && result == "Sold Out") {
    notificationSentBestBuy = false;
    console.log(chalk.red(`${dateObj.toLocaleString()} || SOLD OUT`));
  } else if (result && result !== "Sold Out") {
    if (!notificationSentBestBuy) {
      notificationSentBestBuy = true;
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
  } else {
    console.log(chalk.blue(`${dateObj.toLocaleString()} || ERROR PARSING`));
  }
};

module.exports = { fetchAndParseBestBuy, checkStockBestBuy };
