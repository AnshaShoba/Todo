const datas=require('../Model/Schema')


exports.get = async (req, res) => {                 //   get call back function        
    let data;                                        // variable declaration
 
    try {
            data = await datas.find(req.params.id );     //  datas store in data prefer users type dynamically
        res.send({
            message: "success",      
            statuscode: 200,
            data: data                                          // send the response frontend
        }); 
    } catch (error) {
        return res.send({ error: "error", statuscode: 400 });          // error
    }
 }


exports.post=(async(req,res)=>{
    const{idno,Task}=req.body
    try{

    let user=new datas({idno,Task});
    user.save()
    res.send({message:"Sucessfully posted",
      statuscode:200,
      data:user
    })
    }
    catch(error){
    res.send({message:"Not Posted",
        statuscode:500
    })
    }
    })

    
    exports.update=(async(req,res)=>{
        try{
        const{idno}=req.params;
        const{Task}=req.body;

           up =await datas.updateOne({"idno":idno},{$set:{Task:Task}})
           res.send({message:"Successfully updated"+" "+Task})
           console.log(up)
        }
        catch(error){
    res.send({message:"Not Updated"})
        console.log(error)
        }
    })

    
    exports.delete = async (req, res) => {
        
        try {
            const { idno } = req.params; 
            const del= await datas.deleteOne({ idno });
            res.send({ message: "Deleted" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Failed to delete task" });
        }
    };
    