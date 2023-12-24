import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const ForceType= db.define('tipo_fuerza', {
  id_tipo_fuerza: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  menor_cinco_kilo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  entre_cinco_diez_kilo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  mayor_diez_kilo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  id_actividad_pertenece: {
    type: DataTypes.INTEGER,
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


