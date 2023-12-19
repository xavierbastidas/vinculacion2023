import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const Activity = db.define('actividad', {
  id_actividad: {
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey: true,
    allowNull: false,
  },
  nombre_actividad: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(250),
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
  },
  id_trabajador_pertenece: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'actividad',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default Activity
