const axios = require("axios");
const chalk = require("chalk");
require("dotenv").config({ path: "./.env" });
const { fetchHTML, parseHTML } = require("./utilities");

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
