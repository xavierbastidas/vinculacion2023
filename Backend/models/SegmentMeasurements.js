import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const SegmentMeasurements= db.define('mediciones_segmentos_corporales', {
  id_medicion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
    allowNull: false,
  },
  longitud_mano: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitud_palma: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  amplitud_mano_metacarpios: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitud_dedo_indice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  anchura_dedo_indice_proximal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ancho_dedo_indice_distal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitud_pie: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ancho_pie: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitud_cabeza: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ancho_cabeza: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  circunferencia_cabeza: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  arco_bitragion: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitud_pulgar: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ancho_pulgar: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  circunferencia_brazo_flexionado: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  circunferencia_antebrazo_flexionado: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  
  id_trabajador_pertenece: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'mediciones_segmentos_corporales',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default SegmentMeasurements
