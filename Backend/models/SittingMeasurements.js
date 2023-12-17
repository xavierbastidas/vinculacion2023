import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const SittingMeasurements= db.define('mediciones_sentado', {
  id_medicion: {
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey: true,
    allowNull: false,
  },
  altura_sentado: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  altura_ojo: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  altura_cervical: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  altura_hombro: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  altura_codo: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitud_hombro_codo: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ancho_hombro: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  amplitud_codos: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  amplitud_cadera: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  altura_pliegue_popliteo: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  altura_rodilla: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  id_trabajador_pertenece: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'mediciones_sentado',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default SittingMeasurements
