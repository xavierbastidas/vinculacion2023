
import * as CryptoJS from 'crypto-js';
export const environment = {
    production: true,
    SECRET: '7lLtLYkLJbsUqOAVGjYqN76O4PQtQrNt',
  };
  
  export const decryptData = (encryptedData: string, key: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  };


 export const  encryptData =(data: string, key: string): string =>{
    return CryptoJS.AES.encrypt(data, key).toString();
  }
 