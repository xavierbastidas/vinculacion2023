
import * as CryptoJS from 'crypto-js';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


export const environment = {
    production: true,
    SECRET: '7lLtLYkLJbsUqOAVGjYqN76O4PQtQrNt',
    apiUrlForm:"http://localhost:3000/api/v1/form/",
    apiUrlImage : "http://localhost:3000/api/v1/images/",
    apiUrlAuth : "http://localhost:3000/api/v1/users/",
    apiUrlGetForm:"http://localhost:3000/api/v1/getform/"
  };
  
  export const decryptData = (encryptedData: string, key: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  };


 export const  encryptData =(data: string, key: string): string =>{
    return CryptoJS.AES.encrypt(data, key).toString();
  }

 export const  handleExpiredTokenError= (error: HttpErrorResponse) =>{
    if (error.status === 401) {
      return throwError(401);
    }
    return throwError(error);
  }

 