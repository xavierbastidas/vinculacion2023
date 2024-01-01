import { DataTypes } from 'sequelize';
import db from '../database/connection.js';

const ViewJobPosition = db.define('view_puesto_trabajo', {
  puesto_trabajo: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  departamento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_campus : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre_campus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_encuestador : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre_apellido_encuestador: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'view_puesto_trabajo',
  timestamps: false,
});

export default ViewJobPosition ;
