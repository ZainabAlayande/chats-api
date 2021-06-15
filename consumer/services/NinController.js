const api = require("../../convexity-backend/libs/Axios");
const headers = {
  userid: "1615376263809",
  "api-key": "7dx_$Ak'b_wc_uGi",
};
async function ninVerification(user) {
  return new Promise(async (resolve, reject) => {
    await api
      .post(
        "https://app.verified.ng/sfx-verify/v2/nimc/search-by-nin",
        {
          nin: user.nin,
        },
        { headers: headers }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err.message);
        reject(err);
      });
  });
}

module.exports = ninVerification;
