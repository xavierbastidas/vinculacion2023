import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const Admin = db.define('administrador', {
  id_administrador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Apellido: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  id_usuario_pertenece: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'administrador',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default Admin