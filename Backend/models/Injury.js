import db from "../database/connection.js"
import { DataTypes } from 'sequelize';
const Injury= db.define('lesiones', {
  id_tipo_lesion : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  respuesta: {
    type: DataTypes.STRING(2),
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
  tableName: 'lesiones',
  timestamps: false,
  charset: 'latin1',
  engine: 'InnoDB',
  collate: 'latin1_swedish_ci', 
});


export default Injury
