const axios = require("axios");
const chalk = require("chalk");
require("dotenv").config({ path: "./.env" });
const { fetchHTML, parseHTML } = require("./utilities");

// Target's stock and add to cart button are added with a JS script,
// so they dont show up on the HTML file that loads with the get request,
// going to attept to use their API directly to access stock information
const fetchAndParseTarget = async (url) => {
  const result = await fetchHTML(url);

  console.log(result);
  try {
  } catch (error) {
    console.log("Error in parsing....", error);
    return false;
  }
};

const checkStockTarget = async () => {};

fetchAndParseTarget();
