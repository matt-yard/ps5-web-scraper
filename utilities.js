const axios = require("axios");
const { parse } = require("node-html-parser");

const fetchHTML = async (url) => {
  try {
    const { data } = await axios.get(url, {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
    });
    return data;
  } catch (error) {
    console.log("Error when fetching....");
    return false;
  }
};

const parseHTML = (html) => {
  const root = parse(html);
  return root;
};

module.exports = { fetchHTML, parseHTML };
