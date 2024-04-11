import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { config } from './config'
import cors from 'cors';
import productRoutes from './handlers/product';
import userRoutes from './handlers/user';
import * as fs from 'fs';
import orderRoutes from './handlers/order';

const app: express.Application = express()
const address: string = `0.0.0.0:${config.PORT}`

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const myHTML = fs.readFileSync('./public/views/index.html');
  res.end(myHTML);
})

userRoutes(app);
productRoutes(app);
orderRoutes(app);


const corsOption = {
  origin: config.BASE_URL,
  optionsSuccessStatus: 200
}

app.use(cors(corsOption));
app.listen(config.PORT, function () {
  console.log(`Start the App and Listening on PORT: ${address}`)
})

export default app;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhaWJlbzEyMyJ9.IjblD4XeZgeNOz9IX1cOwJ8KLzaEi_uk4eQI1PIVXjA
