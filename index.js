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

const bestBuyBot = () => {
  setInterval(
    () =>
      checkStock(
        "https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p"
      ),
    10000
  );
};

bestBuyBot();
