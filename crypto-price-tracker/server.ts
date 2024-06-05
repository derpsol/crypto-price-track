import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { getPriceHistory } from './prices'

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

app.get('/price/:coin', (req: Request, res: Response) => {
  const { coin } = req.params;
  const { minutes } = req.query;
  const min = minutes ? parseInt(minutes as string, 10) : 60;

  if (!['bitcoin', 'ethereum', 'dogecoin'].includes(coin)) {
    return res.status(400).send({ error: 'Invalid coin symbol' });
  }

  const data = getPriceHistory(coin as 'bitcoin' | 'ethereum' | 'dogecoin', min);
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});