import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const FlootMeasurements= db.define('mediciones_de_pie', {
  id_medicion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
    allowNull: false,
  },
  masa: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  estatura: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  altura_ojo: {
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
  altura_entre_pierna: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  profundidad_cuerpo_de_pie: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  anchura_cadera_pie: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  id_trabajador_pertenece: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
}, {
  tableName: 'mediciones_de_pie',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default FlootMeasurements
