import Rol from '../models/Rol.js';
export const getRole = async (req,res)=>{
    try {
        const roles = await Rol.findAll(); 
        const rolesArray = roles.map(role => role.toJSON());
        res.json(rolesArray);
    } catch (error) {
        console.log(error)
        res.json({error:error.name})
    }
};

