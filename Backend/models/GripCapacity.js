import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const GripCapacity= db.define('capacidad_agarre', {
  id_capacidad_agarre: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement:true,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  id_trabajador_pertenece: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, {
  tableName: 'capacidad_agarre',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default GripCapacity
