import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Stock = sequelize.define('Stock',
{
  name: DataTypes.STRING,
  last: DataTypes.FLOAT,
  buy: DataTypes.FLOAT,
  sell: DataTypes.FLOAT,
  volume: DataTypes.FLOAT,
  base_unit: DataTypes.STRING
});
sequelize.sync({force: true})

export default Stock