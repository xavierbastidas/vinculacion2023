import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const GripFeatures= db.define('caracterisitcas_agarre', {
  id_tipo_agarre: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  bueno: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  regular: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  malo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  inaceptable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  id_actividad_pertenece: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

}, {
  tableName: 'caracterisitcas_agarre',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default GripFeatures
