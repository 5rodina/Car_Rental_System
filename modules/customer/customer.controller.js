import bcrypt from 'bcrypt'
import db from '../../db/dbCon.js'
import { ObjectId } from 'mongodb'


export const signup= async (req,res)=>{
    const {name,email,password,phone}=req.body
    const result = await db.collection('customer').findOne({email})
    if(result) return res.json({message:'email already exists'})
    const hashed=await bcrypt.hash(password,5)
    await db.collection('customer').insertOne({name,email,password:hashed,phone})
    res.json({message:'signed up successfully'})
}

export const signin=async(req,res)=>{
    const {email,password}=req.body

    const user=await db.collection('customer').findOne({email})
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Signed in successfully' });

}

export const getAllUsers= async(req,res)=>{
    const result=await db.collection('customer').find().toArray()
    res.json({message:'success' ,result})
}

export const getUserById= async(req,res)=>{
    const result=await db.collection('customer').findOne({_id: new ObjectId(req.params.userId)})
    if(!result) return res.json({message:"customer is not found"})
    return res.json({message:'success' ,result})
}

export const updateuser = async (req,res)=>{
    
    if(req.params.userId!= req.body.id) return res.json({message:'you are not the owner!'})
    const result = await db.collection('customer').updateOne({_id: new ObjectId(req.params.userId)},{$set:req.body})
    if(!result.modifiedCount) return res.json({message:"customer is not found"})
    return res.json({message:'updated successfully' ,result})
}

export const deleteUser= async(req,res)=>{
    if(req.params.userId!= req.body.id) return res.json({message:'you are not the owner!'})
    const result = await db.collection('customer').deleteOne({_id: new ObjectId(req.params.userId)})
    if(!result.modifiedCount) return res.json({message:"customer is not found"})
    return res.json({message:'deleted successfully' ,result})
}
