const express=require("express");
const app=express();
const {connectTodb,getDb}=require('./mongo_server');
const cors=require('cors');
const PORT=5000;
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    methods:["GET","POST","PUT","PATCH","DELETE"],
    allowedHeaders:"Content-type"
}))

let dataBase;
connectTodb((err)=>{
    if(!err){
        app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
    }
    dataBase=getDb()
})

app.get('/questions',(req,res)=>{
    const Data=[]
    dataBase.collection("questions").find()
    .forEach(element => Data.push(element))
    .then(()=>res.status(200).json(Data))
    .catch(()=>res.status(500).json({"msg":"could not read"}))
})

app.post("/answers",(req,res)=>{
    const BODY=req.body;
    dataBase.collection("results")
    .insertOne(BODY)
    .then((stat)=>res.status(201).json(stat))
    .catch(()=>res.status(500).json({"msg":"answer could not added"}))
})

//app.listen(PORT,()=>console.log(`server running on port ${PORT}`))