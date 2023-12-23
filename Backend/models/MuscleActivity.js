import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const MuscleActivity = db.define('actividad_muscular', {
  id_datos_actividad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement:true
  },
  cuerpo_estatico: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  movimientos_repetitivos: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  cambios_postura: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  id_actividad_pertenece: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'actividad_muscular',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default MuscleActivity
