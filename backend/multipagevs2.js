const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const port = 3810;

mongoose.connect("mongodb://0.0.0.0:27017/imgstore")

app.use(cors());
app.use(express.json());

let schema = new mongoose.Schema({
    name:String,
    contact:Number,
    email:String,
    password:String
})
let copydata = mongoose.model('imgdata1', schema)

app.get('/', async (req, res) => {
    let data = await copydata.find()
    res.send(data);
})
app.post('/post', async (req, res) => {
    let bodydata = new copydata(req.body);
    let savedata = await bodydata.save();
    res.send(savedata);
})

app.listen(port, () => {
    console.log('data is send on http://localhost:' + port);
})
