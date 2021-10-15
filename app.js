import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnection from './dbConnection';
import routes from './routes';

// config dotenv
dotenv.config();

// create app
const app = express();

// initialize port number
const port = process.env.PORT || 8000;

// connect database
dbConnection();

// middleware handler
app.use(express.json());
app.use(cors());

// auth  routes config
app.use('/auth', routes.authRoutes);

// feature routes config
app.use('/feature', routes.featureRoutes);

// form routes config
app.use('/form', routes.formRoutes);

// root response
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// server start
app.listen(port, () => {
  console.log(`Listening port:${port}`);
});
