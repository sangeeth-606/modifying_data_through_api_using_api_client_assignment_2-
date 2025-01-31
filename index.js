import express from 'express';
import { resolve } from 'path';
import connectDb from './db.js';
import menuRoutes from './Routes/menuRoutes.js';

const app = express();
const port = 3011;
connectDb();

app.use(express.static('static'));
app.use(express.json());
app.use('/',menuRoutes);

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
