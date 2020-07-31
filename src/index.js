const express = require('express');
const routes = require('./routes');
const app = express();
const cors = require('cors');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require("dotenv-safe").config();

var jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errors());


app.listen(PORT);