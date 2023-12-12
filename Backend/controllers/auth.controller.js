import User from '../models/User.js';
import bcryptjs from 'bcryptjs'
import {generateToken } from '../helpers/tokenManager.js';
import Admin from '../models/Admin.js';
import Pollster from '../models/Pollster.js';

export const register = async (req,res)=>{
    const {correo_usuario,contrasenia,id_rol_pertenece}=req.body
    try {
        const email = await User.findOne({ where: { correo_usuario } });
        if (email) {
            return res.status(404).json({ error: 'User already exists' });
        }
        const new_User = new User({correo_usuario,contrasenia,id_rol_pertenece});
        await new_User.save();
        const { id_usuario } = new_User.toJSON();
        res.json(id_usuario);
    } catch (error) {
        console.log(error)
        res.json({error:error.name})
    }
};

export const registerAdmin = async (req,res)=>{
    const {Nombre,Apellido,id_usuario_pertenece}=req.body
    try {
        const admin = new Admin({Nombre,Apellido,id_usuario_pertenece});
        await admin.save();
        res.json({admin:admin})
    } catch (error) {
        console.log(error)
        res.json({error:error.name})
    }
};
export const registerPollster = async (req,res)=>{
    const {Nombre,Apellido,id_usuario_pertenece}=req.body
    try {
        const pollster = new Pollster({Nombre,Apellido,id_usuario_pertenece});
        await pollster.save();
        res.json({pollster:pollster})
    } catch (error) {
        console.log(error)
        res.json({error:error.name})
    }
};


export const login = async (req, res) => {
    const { correo_usuario, contrasenia } = req.body;
    try {
        const user = await User.findOne({ where: { correo_usuario} });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const passwordMatch = await bcryptjs.compare(contrasenia, user.contrasenia);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect username or password' });
        }
        const { token } = generateToken(user.id_usuario);
        const id_rol = user.id_rol_pertenece;
        const id_usuario_pertenece = user.id_usuario;
        let obj = null;
        let nombre = null; 
        if (id_rol == 1) {
            obj = await Admin.findOne({ where: { id_usuario_pertenece } });
        } else   {
            obj = await Pollster.findOne({ where: { id_usuario_pertenece } });
        }
        if (obj) {
            nombre = obj.Nombre; 
        }
        res.json({ token, id_rol, nombre });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const getIdRole = async (req, res) => {
    const { id_usuario } = req.params;
    try {
      const user = await User.findOne({ where: { id_usuario } });
      if (user) {
        return res.json(user.id_rol_pertenece);
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  

 export const checkEmailBD  = async (req,res)=>{
    const { correo_usuario } = req.body;

    try {
        const email = await User.findOne({ where: { correo_usuario } });

        if (email) {
            return res.json(true); 
        } else {
            return res.json(false); 
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: '"Error verifying the email' });
    }
 }
   