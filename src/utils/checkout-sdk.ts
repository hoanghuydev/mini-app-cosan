import CryptoJS from "crypto-js";
function generateMac(params: any, privateKey: string) {
    const dataMac = Object.keys(params)
    .sort()
    .map(
      (key) =>
        `${key}=${
          typeof params[key] === "object"
            ? JSON.stringify(params[key])
            : params[key]
        }`,
    ) 
    .join("&");

  const mac = CryptoJS.HmacSHA256(dataMac, privateKey);
  return mac.toString();
}

export { generateMac };