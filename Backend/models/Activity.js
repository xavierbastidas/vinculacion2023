import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const Activity = db.define('actividad', {
  id_actividad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  nombre_actividad: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descripcion_1: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  descripcion_2: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  id_trabajador: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  imagen1:{
    type:DataTypes.BLOB,
    allowNull:false
  },
  imagen2:{
    type:DataTypes.BLOB,
    allowNull:false
  },
  imagen3:{
    type:DataTypes.BLOB,
    allowNull:false
  }
}, {
  tableName: 'puesto_trabajo',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default Activity
