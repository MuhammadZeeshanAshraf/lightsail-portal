import dotenv from 'dotenv';

dotenv.config();

// const knexConfigrations = {
//   client: 'pg',
//   connection: {
//     host: 'localhost',
//     user: 'postgres',
//     password: 'root',
//     database: 'postgres'
//   }
// };

const knexConfigrations = {
  client: 'mysql2',
  connection: {
    host: '194.233.89.214',
    port: 3306,
    user: 'gqowoizl_logistics',
    password: '4*zx7#r?ESaI',
    database: 'gqowoizl_logistics'
  }
};

// const knexConfigrations = {
//   client: 'mysql2',
//   connection: {
//     host: '194.233.89.214',
//     port: 3306,
//     user: 'examin_logistic',
//     password: '4*zx7#r?ESaI',
//     database: 'examin_logistic'
//   }
// };

export default knexConfigrations;
