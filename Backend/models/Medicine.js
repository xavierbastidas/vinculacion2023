import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const Medicine= db.define('medicamento', {
  id_medicamento : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  nombre_medicamento: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  id_trabajador_pertenece:{
    type: DataTypes.STRING(10),
    allowNull: false,
  }
}, {
  tableName: 'medicamento',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default Medicine
