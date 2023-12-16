import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const Worker = db.define('trabajador', {
  id_trabajador: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false,
  },
  Nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Apellido: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Edad: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Genero: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  id_campus_pertenece: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_puesto_trabajo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_atividad_realiza: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imagen_trabajador1: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  imagen_trabajador2: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  id_usuario_pertenece: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
}, {
  tableName: 'trabajador',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default Worker
