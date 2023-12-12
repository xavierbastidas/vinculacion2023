import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const Pollster = db.define('encuestador', {
  id_encuestador: {
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
  tableName: 'encuestador',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});

export default Pollster;
