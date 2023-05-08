//imports

require('dotenv').config;
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Config JSON response
app.use(express.json());

// Models
const User = require('./models/User');

// Open Route - Public Route
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Bem vindo a nossa API' });
});

// Register User
app.post('/auth/register', async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  //validadtions
  if (!name) {
    return res.status(422).json({ msg: 'O nome é obrigatório' });
  }

  if (!email) {
    return res.status(422).json({ msg: 'O email é obrigatório' });
  }

  if (!password) {
    return res.status(422).json({ msg: 'A senha é obrigatória' });
  }

  if (password !== confirmpassword) {
    return res.status(422).json({ msg: 'As senhas nao conferem!' });
  }

  //check if user exists
  const userExists = await user.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ msg: 'Por favor, utilize outro email!' });
  }

  //create password
  const salt = await bycrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  //create user
  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();

    res.status(500).json({
      msg: 'Usuario criado com sucesso!',
    });

    console.log(error);
  } catch (error) {
    res.status(500).json({
      msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!',
    });
  }
});

// Login User
app.post('./auth/login', async (req, res) => {
  const { email, password } = req.body;

  //validations
  if (!email) {
    return res.status(422).json({ msg: 'O email é obrigatório' });
  }

  if (!password) {
    return res.status(422).json({ msg: 'A senha é obrigatória' });
  }
});

//Credentials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://tiagoc0sta:TNIXBqnDrywOxhAb@cluster0.zjyrcvm.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log('Conectou ao banco!');
  })
  .catch((err) => console.log(err));
