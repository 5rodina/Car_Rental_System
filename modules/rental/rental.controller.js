import { ObjectId } from "mongodb"
import db from "../../db/dbCon.js"


export const getRental=async(req,res)=>{
    const result= await db.collection('rental').find().toArray()
    res.json({message:'success',result})
}

export const addRental= async(req,res)=>{
    const user=await db.collection('customer').findOne({_id:new ObjectId(req.body.customerId)})
    if(!user) return res.json({message:"customer not found"})

    const car=await db.collection('car').findOne({_id: new ObjectId(req.body.carId)})
    if(!car) return res.json({message:"car is not found"})

    if(car.rental_status != 'available') return res.json({message:"car is already rented"})
    
    await db.collection('car').updateOne({_id: new ObjectId(req.body.carId)},{$set:{rental_status:'rented'}})

    const result =await db.collection('rental').insertOne(req.body)
    res.json({message:"car rental is done", result})

}

export const getRentalById=async(req,res)=>{
    const result= await db.collection('rental').findOne({_id:new ObjectId(req.params.id)})
    if(!result) return res.json({message:"rental is not found"})
    return res.json({message:'success' ,result})
}

export const updateRental=async(req,res)=>{
    const {return_date}=req.body
    const result= await db.collection('rental').updateOne({_id:new ObjectId(req.params.id)},{$set:{return_date}})
    if(!result.modifiedCount) return res.json({message:"rental is not found"})
    return res.json({message:'rental is updated' ,result})
}


export const deleteRental=async(req,res)=>{
    const updated= await db.collection('rental').findOne({_id:new ObjectId(req.params.id)}) 
    if(!updated) return res.json({message:"rental is not found"})
    const result= await db.collection('rental').deleteOne({_id:new ObjectId(req.params.id)})
    await db.collection('car').updateOne({_id:new ObjectId(updated.carId)},{$set:{rental_status:'available'}})
    res.json({message:"success",result})
    
}
/*1- Get all cars whose model is ‘Honda’ and ‘Toyota’ (using query params)
2- Get Available Cars of a Specific Model.
3- Get Cars that are Either rented or of a Specific Model.
4- Get Available Cars of Specific Models or Rented Cars of a Specific Model*/
