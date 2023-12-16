import { Sequelize } from 'sequelize';

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mariadb',
  port: 3306, 
});

db.authenticate()
  .then(() => {
    console.log('Successful connection to the MariaDB database!');
  })
  .catch((err) => {
    console.error('Cannot establish connection to MariaDB database: ' + err);
  });

export default db;


