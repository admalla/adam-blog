const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const { initRoutes } = require('./routes');
const morgan = require('morgan');
const path = require('path');

require('dotenv').config({ path: './env' });

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('client/build'));
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'my-blog', 'blog-api', 'index.html')));

initRoutes(app);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Сервер запущен http://localhost:${process.env.PORT}`);
    });
  })
  .catch(console.log);

module.exports.app = app;
