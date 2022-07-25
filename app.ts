import express from "express"
import userRouter from "./userRouter"
import CookieParser from 'cookie-parser' 
const app = express()
const port = 5000
app.use(express.json())
app.use(CookieParser())
app.use('/', userRouter)
app.listen(port, ()=> console.log(`Running on port ${port}`))


// const express = require('express');
// const app = express();
// const path = require('path');
// app.use(express.static(path.join(__dirname,'css'));
// app.use('/html',(req,res,next)=>{
// res.sendFile(path.join(__dirname,'HTML','text.html');
// });
// app.listen(3000);

// const express = require('express');
// const app = express();
// const path = require('path'); 
// app.use(express.static(path.join(__dirname,'css'));
// app.use('/html',(req,res,next)=>{ res.sendFile(path.join(__dirname,'HTML','text.html'); });
// app.listen(3000);

// const express = require('express');
// const app = express();
// const path = require('path');
// app.use(express.static(path.join(__dirname,'css'));
// app.use('/html',(req,res,next)=>{
// res.sendFile(path.join(__dirname,'HTML','text.html');
// });
// app.listen(3000);