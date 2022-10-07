const axios = require("axios");
const chalk = require("chalk");
require("dotenv").config({ path: "./.env" });
const { fetchHTML, parseHTML } = require("./utilities");

// This function makes a request to target.com, then parses the request
// cookies for a visitorId
// the visitorId can be used as a key to access the target API
// const getVisitorId = async () => {
//   const result = await axios.get("https://www.target.com");

//   let cookie = result.headers["set-cookie"];
//   const visitorIdIndex = cookie.indexOf("visitorId=");

//   let visitorId = cookie.slice(visitorIdIndex);
//   visitorId = visitorId.slice(
//     visitorId.indexOf("=") + 1,
//     visitorId.indexOf(";")
//   );
//   console.log(visitorId);
//   return visitorId;
// };

// const fetchAndParseTarget = async (key, productId, locationId) => {
//   try {
//     const url = `https://redsky.target.com/redsky_aggregations/v1/web_platform/product_fulfillment_v1`;

//     const { data } = await axios.get(url, {
//       params: {
//         key,
//         scheduled_delivery_store_id: locationId,
//         required_store_id: locationId,
//         has_required_store_id: true,
//         tcin: productId,
//         is_bot: false,
//       },
//     });

//     console.log(data.data);
//     return data;
//   } catch (error) {
//     console.log("Error in parsing....", error);
//     return false;
//   }
// };

// const checkStockTarget = async () => {
//   const visitorId = await getVisitorId();
//   const result = await fetchAndParseTarget(visitorId, "81114595", 1348);
// };

const fetchAndParseTarget = async (url) => {
  const result = await fetchHTML(url);
  let body = parseHTML(result).getElementsByTagName("body")[0];
  let button = body.getElementById("addToCartButtonOrTextIdFor81114595");
  console.log(button);
};

fetchAndParseTarget(
  "https://www.target.com/p/playstation-5-console/-/A-81114595"
);

// const checkStockTarget = () => {};
// checkStockTarget();
