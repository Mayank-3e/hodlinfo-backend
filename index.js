import express from 'express'
import Stock from './models.js';
import cors from 'cors'

const app = express();
const PORT = 4000;
app.use(express.json())
app.use(cors())

app.get('/', async(req,res)=>
{
  try { await Stock.destroy({truncate: true}); }
  catch(e) {return res.json({err: 'Error emptying database.'})}

  let currencies
  try
  {
    currencies=await fetch('https://api.wazirx.com/api/v2/tickers/',
    {
      headers: {'Content-Type':'application/json'}
    })
    currencies=await currencies.json()
  }
  catch (e)
  {return res.json({err: 'Error in fetching from API.'})}

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

app.listen(PORT, (error) =>
{
  if(!error)
    console.log("Server is Successfully Running,and App is listening on port "+ PORT)
  else 
    console.log("Error occurred, server can't start", error);
});