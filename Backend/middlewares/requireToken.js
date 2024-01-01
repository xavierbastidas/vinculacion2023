import jwt from "jsonwebtoken"
import CryptoJS from 'crypto-js';
const decryptData = (encryptedData, key) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  };

export const requireToken = (req,res,next)=>{
try {
    let encryptedToken = req.cookies['2J_JER'];
    if (!encryptedToken ) {
        throw new Error ('The token does not exist in the header , Use Bearer')
    } 
    const decryptedToken = decryptData(encryptedToken,process.env.KEY);
    const {id_usuario} = jwt.verify(decryptedToken,process.env.JWT);
    req.id_usuario = id_usuario ;
    next()
} catch (error) {
   return res
   .status(401)
   .send({error:error.message});
}
};


