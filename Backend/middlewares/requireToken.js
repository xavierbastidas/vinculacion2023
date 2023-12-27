import jwt from "jsonwebtoken"
export const requireToken = (req,res,next)=>{
try {
    let token  = req.cookies['2J_JER'];
    if (!token) 
        throw new Error ('The token does not exist in the header , Use Bearer')
    const {id_usuario} = jwt.verify(token,process.env.JWT);
    req.id_usuario = id_usuario ;
    next()
} catch (error) {
   return res
   .status(401)
   .send({error:error.message});
}
};


