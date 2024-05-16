const express =require('express');
const app=express();
const cors=require('cors');
const data = require('./miniprojectdata.json')
const port = 3300;

app.use(cors());
app.get('/',(req,res)=>{
    res.send(data);
})

app.listen(port,()=>{
    console.log("http://localhost:"+port)
})