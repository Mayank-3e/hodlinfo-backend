import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'
dotenv.config()

console.log(process.env.dburi);
const sequelize = new Sequelize(process.env.dburi,{
  logging: false
})

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