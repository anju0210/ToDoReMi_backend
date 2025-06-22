const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/index');
require('dotenv').config();

router.post('/signup', async (req, res)=>{
  const {name, password} = req.body;
  try{
    const user = await User.findOne({where :{name}});
    if(user){
      return res.status(400).json({error: '이미 존재하는 이름입니다.'});
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({name, password: hashed});

    res.status(201).json({message: '회원가입 성공', user: newUser});
  }catch(err){
    res.status(500).json({error: '회원가입 실패'});
    console.error(err);
  }
});

router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ where: { name } });
    if (!user){
      return res.status(401).json({ error: '이름 또는 비밀번호가 맞지 않습니다.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match){
      return res.status(401).json({ error: '이름 또는 비밀번호가 맞지 않습니다.' });
    }

    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ message: '로그인 성공', token });
  } catch (err) {
    res.status(500).json({ error: '로그인 실패' });
    console.error(err);
  }
});

module.exports = router;