const express = require('express');

require('dotenv').config();

const app = express();

app.get('/', (req, res)=> {
    res.send('Hello ToDoReMi');
});

app.listen(process.env.PORT, ()=>{
    console.log(`서버 실행 PORT : ${process.env.PORT}`);
});