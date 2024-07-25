import db from "../../db/dbCon"
import { ObjectId } from "mongodb"

export const addCar= async (req,res)=>{
    const result=await db.collection('car').insertOne(req.body)
    res.json({message:'added' ,result})
}

export const getAllCars= async (req,res)=>{
    const result= await db.collection('car').find().toArray()
    res.json({message:'success' ,result})
}

export const getCarById= async (req,res)=>{
    const result=await db.collection('car').findOne({_id: new ObjectId(req.params.carId)})
    if(!result) return res.json({message:"car is not found"})
    return res.json({message:'success' ,result})
}

export const updateCar= async (req,res)=>{
    const result=await db.collection('car').updateOne({_id: new ObjectId(req.params.carId)},{$set: req.body})
    if(!result.modifiedCount) return res.json({message:"car is not found"})
    return res.json({message:'updated' ,result})
}

export const deleteCar= async (req,res)=>{
    const result=await db.collection('car').deleteOne({_id: new ObjectId(req.params.carId)})
    if(!result.modifiedCount) return res.json({message:"car is not found"})
    return res.json({message:'deleted' ,result})

}

