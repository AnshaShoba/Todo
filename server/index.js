var express=require ('express')
const mongoose =require('mongoose')
const control=require('../server/Controllers/control')
const cors=require('cors')   

var app=express()
app.use(cors());  

let port=5000

app.use(express.json())                                            


let data = "mongodb+srv://anshashoba01:ansha01$@cluster0.nhyflva.mongodb.net/" ;               
mongoose.set ("strictQuery",false)                                                              
mongoose.connect(data, { useNewUrlParser:true, useUnifiedTopology:true}).then((res)=>{         
    console.log("connected")
})
.catch ((res)=>{
    console.log(res,"failed")
})

app.get("/get", control.get); 

app.post("/post", control.post);  

app.post("/update/:idno", control.update);  

app.post("/delete/:idno", control.delete);  


app.listen(port,(()=>{
    console.log(`Listening to ${port}`)
}))