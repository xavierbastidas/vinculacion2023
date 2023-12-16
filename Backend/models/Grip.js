import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const Grip= db.define('agarre', {
  id_tipo_agarre: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  agarre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(250),
    allowNull: false,
  }
}, {
  tableName: 'agarre',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default Grip
