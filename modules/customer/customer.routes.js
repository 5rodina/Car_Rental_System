import { Router } from "express"
import { deleteUser, getAllUsers, getUserById, signin, signup, updateuser } from "./customer.controller.js"

const customerRouter=Router()

customerRouter.post('/signin',signin)
customerRouter.post('/signup',signup)

customerRouter.get('/',getAllUsers)
customerRouter.route('/:userId').get(getUserById).put(updateuser).delete(deleteUser)


export default customerRouter