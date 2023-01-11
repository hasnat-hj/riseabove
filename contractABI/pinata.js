const key = "cc05fe7d73ca2d0c9fcd";

const secret =
  "0b573320b17e8bca46c6f197d7db5f3c5e474754a2b42ff11226dc8d394ed444";
const axios = require("axios");

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret
      }
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message
      };
    });
};
