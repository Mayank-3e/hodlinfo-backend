import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'
import * as pg from 'pg'
dotenv.config()

console.log(process.env.POSTGRES_USER);
const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.PASSWORD,
{
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
  dialectModule: pg
});

async function verifyConnection()
{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
verifyConnection()

export default sequelize