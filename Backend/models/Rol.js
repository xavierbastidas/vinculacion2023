import db from "../database/connection.js";
import { DataTypes } from 'sequelize';

const Rol = db.define('roles', {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre_rol: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
    },
  }, {
    tableName: 'roles',
    timestamps: false,
    charset: 'latin1',
    engine: 'InnoDB',
    collate: 'latin1_swedish_ci', 
  });
  

export default Rol;
