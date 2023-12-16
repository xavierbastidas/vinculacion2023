import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const JobPosition = db.define('puesto_trabajo', {
  id_puesto_trabajo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Descripcion: {
    type: DataTypes.STRING(250),
    allowNull: false,
  }
}, {
  tableName: 'puesto_trabajo',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default JobPosition
