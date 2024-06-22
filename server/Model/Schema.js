const mongoose=require('mongoose')                         // import the mongoose 

const useSchema=new mongoose.Schema                       // create the new instance for schema 
({
    idno:Number,
    Task:String

})
const data=mongoose.model("Todo",useSchema)             // Schema name and store the data variable
module.exports=data;  