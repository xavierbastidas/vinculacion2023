import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const FunctionalMeasurements= db.define('mediciones_funcionales', {
  id_medicion: {
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey: true,
    allowNull: false,
  },
  alcance_agarre: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitud_codo_munieca: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitud_agarre_codo: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  altura_punio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  profundidad_asiento: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitud_rodilla_gluteo: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  circunferencia_cintura: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  circunferencia_munieca: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  id_trabajador_pertenece: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'mediciones_funcionales',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default FunctionalMeasurements
