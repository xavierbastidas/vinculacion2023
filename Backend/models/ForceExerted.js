import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const ForceExerted= db.define('fuerza_ejercida', {
  id_fuerza_ejercida: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  fuerza_brusca: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  id_tipo_fuerza: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_actividad_pertenece: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }

}, {
  tableName: 'fuerza_ejercida',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default ForceExerted
