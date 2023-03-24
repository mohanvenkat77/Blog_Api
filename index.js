const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const Blog=require('./Blog')
app.use(express.json())
app.use(bodyParser.json())
const mongoose=require('mongoose')
const { findOne } = require('./Blog')
mongoose.connect("mongodb://localhost:27017/Blog").then(()=> console.log('mongoDB connectedddd')).catch((err)=> console.log(err))


app.get('/blog',async(req,res)=>{
    const {page,search} = req.query;
    const limit=5;
    const skip=(page-1)*limit
    const query= search ? {topic:{$regex:search,$options:'i'}}:{}
    try{
        const blogs=await Blog.find(query).skip(skip).limit(limit)
        res.send({
            status: "SUCCESS",
            results: {...blogs}
        })
    }
    catch(err){
        res.send({status:'ERROR',message:err.message})
    }
})



app.get('/blog', async(req, res) => {
    try{
        const data= await Blog.find()
    res.send({
        status:"SUCCESS",
        result:{
            ...data
        }
    })
    }
    catch(err) {
        res.send({
            status:"ERROR",
            message:err.message
        })
    }
})



app.post('/blog',async(req,res)=>{
    const {topic,description,posted_by}=req.body
    const newData=new Blog({topic,description,posted_by})
   await newData.save()
   res.send({
    status:'SUCCESS',
    result:{
        ...newData._doc
    }
   })

})

app.put('/blog/:id',async(req,res)=>{
    const {id}=req.params
    const {topic,description,posted_by}=req.body
try{
    const data= await Blog.findByIdAndUpdate(
        id,{
topic,description,posted_by
        },
        {new:true}
    );
    res.send({
        status:"SUCCESS",
        result:{...data}
    })
}
catch(err){
    res.status(400).json({status:'Error',message:err.message});
} 
})

app.delete('/blog/:id',async(req,res)=>{
    const {id}=req.params
    try{
        const data=await Blog.findById(id)
        await Blog.findByIdAndDelete(id)
        res.send({
            status: 'SUCCESS',
            result: {...data}
        })

    }
    catch(err){
res.send({status: 'ERROR',message:err.message});
    }
})

app.get('/',(req,res)=>{
    res.send("hiii")
})

app.listen(5001,(err)=>{
   if(!err){
    console.log("server running")
   }
   else{
    console.log("error", err)
   }
})