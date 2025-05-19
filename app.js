const express = require('express');
const sequelize = require('./models/index')
require('dotenv').config();

const app = express();

sequelize.sync({force: false})
    .then(()=>{
        console.log("DB 연결 성공");
    }).catch((err)=>{
        console.error(err);
    });


app.get('/', (req, res)=> {
    res.send('Hello ToDoReMi');
});

app.listen(process.env.PORT, ()=>{
    console.log(`서버 실행 PORT : ${process.env.PORT}`);
});