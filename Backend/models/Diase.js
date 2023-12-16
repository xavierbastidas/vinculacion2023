import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const Diase= db.define('enfermedad', {
  id_enfermedad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  nombre_enfermedad: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  id_trabajador_pertenece: {
    type: DataTypes.STRING(10),
    allowNull: false,
  }
}, {
  tableName: 'enfermedad',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default Diase
