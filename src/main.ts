import express, { type Request, type Response } from 'express';

const ferdShopApplicationExpress = express();

ferdShopApplicationExpress.use(express.json());
ferdShopApplicationExpress.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello World!' });
});
ferdShopApplicationExpress.listen(3001, () => {
  console.log('Server listening on port 3001');
});
