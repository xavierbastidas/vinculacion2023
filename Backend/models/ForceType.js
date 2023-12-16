import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const ForceType= db.define('tipo_fuerza', {
  id_tipo_fuerza: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  tipo_fuerza: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  descripcion_fuerza: {
    type: DataTypes.STRING(250),
    allowNull: false,
  }
}, {
  tableName: 'tipo_fuerza',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default ForceType


