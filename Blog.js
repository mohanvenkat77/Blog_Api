const mongoose=require('mongoose')
const blogSchema=new mongoose.Schema({
    topic:{
        type: 'string',
    },
    description:{
        type:'string'
    },
    posted_at: {type: Date, default: Date.now()} ,
    posted_by:{
        type:'string',
    }
})
module.exports=mongoose.model('Blog',blogSchema)
