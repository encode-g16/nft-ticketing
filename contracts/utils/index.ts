import * as ethers from "ethers";
import "dotenv/config";

const signerMnemonic = process.env.MNEMONIC;
const privateKey = process.env.PRIVATE_KEY;
const ropstenUrl = process.env.ROPSTEN_URL;

export function getWallet(): ethers.Wallet {
  if (signerMnemonic) {
    return ethers.Wallet.fromMnemonic(signerMnemonic);
  }
  if (privateKey) {
    return new ethers.Wallet(privateKey);
  }
  throw new Error(
    "MNEMONIC or PRIVATE_KEY environment variable must be set to initialize wallet"
  );
}

export function getRopstenProvider(): ethers.providers.BaseProvider {
  if (ropstenUrl) {
    return new ethers.providers.JsonRpcProvider(ropstenUrl);
  }
  return ethers.providers.getDefaultProvider("ropsten");
}
