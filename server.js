import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from 'cors';

// App config

const app = express();
const port = process.env.PORT || 8081;
const connection_url = "mongodb+srv://admin_nitin:Ljd2WVw1CKL8sQtf@cluster0.yj9af.mongodb.net/tinderdb?retryWrites=true&w=majority"

// middle ware 

app.use(express.json());
app.use(Cors());

//db config 

mongoose.connect (connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})


//end points 

app.get('/',(req,res)=>res.status(200).send("HEllo backend word "));
app.post('/tinder/cards',(req,res)=>{
    const dbCard = req.body;
    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    })
});
app.get('/tinder/cards',(req,res)=>{
    
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
});

//listener

app.listen(port ,()=>console.log(`listing on port : ${port}`));