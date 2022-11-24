const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { InitDB } = require('./models');
const authRouter = require('./routes/auth.routes');

const errorMiddleware = require('./middlewares/apiError.middlware');

require('dotenv').config({ path: './.env' });

const app = express();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.use('/api/auth', authRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('OK');
});

const start = async () => {
  try {
    await InitDB();
    app.listen(PORT, () => {
      console.log(`server is running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
