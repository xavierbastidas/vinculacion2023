import  jwt  from "jsonwebtoken"
export const  generateToken = (id_usuario) =>{
  const expiresIn = 60*15;
  try {
    const token = jwt.sign({id_usuario},process.env.JWT,{expiresIn});
    return {token}
  } catch (error) {
    throw new Error(error)
  }  
};


