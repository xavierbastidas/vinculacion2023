import db from "../database/connection.js";
import { DataTypes } from 'sequelize';
import bcryptjs from 'bcryptjs';

const User = db.define('usuarios', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  correo_usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  contrasenia: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  id_rol_pertenece: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'usuarios',
  timestamps: false,
  charset: 'utf8mb4', 
  engine: 'InnoDB',
  collate: 'utf8mb4_general_ci', 
});

User.beforeCreate(async (user) => {
  if (user.contrasenia) {
    try {
      const hashedPassword = await bcryptjs.hash(user.contrasenia, 10);
      user.contrasenia = hashedPassword;
    } catch (error) {
      throw new Error('Password hashing error');
    }
  }
});


export default User;
