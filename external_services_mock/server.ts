import express, { Request, Response } from 'express';

const app = express();

const PORT: number = 3001;

const data1 = {
  message: 'Hello from endpoint 1!',
  success: true,
};

const data2 = {
  message: 'Hello from endpoint 2!',
  success: true,
};

app.get('/endpoint1', (req: Request, res: Response) => {
  res.json(data1);
});

app.get('/endpoint2', (req: Request, res: Response) => {
  res.json(data2);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
