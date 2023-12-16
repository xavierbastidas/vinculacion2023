import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const GripFeatures= db.define('caracterisitcas_agarre', {
  id_caracterisiticas_agarre: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  id_tipo_agarre: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_actividad_pertenece: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'caracterisitcas_agarre',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default GripFeatures
