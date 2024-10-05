const {MongoClient}=require("mongodb");

const URI='mongodb://127.0.0.1:27017';
const client=new MongoClient(URI);
let db;
module.exports={
    connectTodb:async (cb)=>{
        try{
        const connection=await MongoClient.connect(URI);
        db=connection.db('full-quiz');
        return cb()
        }
        catch(e){
            return cb(e)
        }
    },
    getDb:()=>db
}