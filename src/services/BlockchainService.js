const { tokenConfig } = require("../config");
const { Encryption } = require("../libs")
const axios = require('axios');

const Axios = axios.create();

class BlockchainService {
  static async createAccountWallet() {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await Axios.post(`${tokenConfig.baseURL}/user/register`);
        resolve(data.AccountCreated);
      } catch (error) {
        console.log(error.response)
        reject(error);
      }
    });
  }
  static async mintToken(mintTo, amount) {
    return new Promise(async (resolve, reject) => {
     
      try {
        const payload = {mintTo, amount};
        const checksum = Encryption.encryptTokenPayload(payload);
        const { data } = await Axios.post(`${tokenConfig.baseURL}/txn/mint/${amount}/${mintTo}`, null, {
          headers: {
            'X-CHECKSUM': checksum
          }
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async approveToSpend(ngoAddress, ngoPassword, benWallet, amount) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Axios.post(`${tokenConfig.baseURL}/txn/approve/${ngoAddress}/${ngoPassword}/${benWallet}/${amount}`);
        if(res.data)resolve(res.data);
      } catch (error) {
        reject(error.response.data);
      }
    });
  }

  static async transferFrom(
    ngoAdress,
    beneficiaryAddress,
    beneficiaryPassword,
    reciepientAdress,
    amount
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await Axios
        .post(`${tokenConfig.baseURL}/txn/transferfrom/${ngoAdress}/${reciepientAdress}/${beneficiaryAddress}/${beneficiaryPassword}/${amount}`);
        resolve(data);
      } catch (error) {

        reject(error);
      }
    });
  }

  static async transferTo( senderAddress, senderPass, reciepientAddress, amount ) {
    return new Promise(async (resolve, reject) => {
      try {
        const {data} = await Axios.post(`${tokenConfig.baseURL}/txn/transfer/${senderAddress}/${senderPass}/${reciepientAddress}/${amount}`);
        resolve(data);
      } catch (error) {
        reject(error.response.data);
      }
    });
  }
}

module.exports = BlockchainService;
