import express from 'express'
import Stock from './models.js';
import cors from 'cors'
import axios from 'axios';

const app = express();
const PORT = 4000;
app.use(express.json())
app.use(cors())

app.get('/', async(req,res)=>
{
  try { await Stock.sync({force: true}) }
  catch(e)
  {
    console.log(e);
    return res.json({err: 'Error emptying db.'})
  }

  let currencies
  try
  {
    currencies=await axios.get('https://api.wazirx.com/api/v2/tickers/')
    currencies=currencies.data
  }
  catch (e)
  {
    console.log(e);
    return res.json({err: 'Error in fetching from API.'})
  }

  const keys=Object.keys(currencies).slice(0,10)
  let data=[]
  keys.forEach(key=>
  {
    const {name,last,buy,sell,volume,base_unit}=currencies[key]
    data.push({name,last,buy,sell,volume,base_unit})
  })

  try
  {
    await Stock.bulkCreate(data)
  }
  catch (e)
  {
    return res.json({err: 'Inserting into database failed because of some issue from ElephantSQL side.'})
  }

  try
  {
    data=await Stock.findAll()
  }
  catch (e)
  {
    return res.json({err: 'Fetching from database failed.'})
  }

  res.json({data})
})

app.listen(PORT,()=>'app running on port '+PORT)