import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const Campus = db.define('campus', {
  id_campus: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  nombre_campus: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  telefono_campus: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  
}, {
  tableName: 'campus',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default Campus
