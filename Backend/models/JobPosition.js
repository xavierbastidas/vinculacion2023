import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const JobPosition = db.define('puesto_trabajo', {
  id_puesto_trabajo: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false,
  },
  departamento_area: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  id_campus_pertenece: {
    type: DataTypes.INTEGER,
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
