import db from "../../db/dbCon.js"

export const availableCars=async(req,res)=>{
    const result= await db.collection('car').find({model:req.query.model,rental_status:"available"}).toArray()
    res.json({message:"success" ,result})
} 

export const carmodel=async(req,res)=>{
    const result= await db.collection('car').find({model:{$in:['honda','toyota']}}).toArray()
    res.json({message:"success" ,result})
} 

export const rentedCars=async(req,res)=>{
    const {model}=req.query
    let result
    if(model){
        result= await db.collection('car').find({model:req.query.model}).toArray()
    }
    else{
       result = await  db.collection('car').find({rental_status:"rented"}).toArray()
    }
    res.json({message:"success" ,result})
} 

export const rentedOrAvailable=async(req,res)=>{
    const{rental_status}=req.query
    if(rental_status==="available")
    {
        const result= await db.collection('car').find({model:req.query.model,rental_status:"available"}).toArray()
        res.json({message:"success" ,result}) 
    }
    else{
        const result= await db.collection('car').find({model:req.query.model,rental_status:"rented"}).toArray()
        res.json({message:"success" ,result})
    }


}