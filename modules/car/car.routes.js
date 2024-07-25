import { Router } from "express";
import { addCar, deleteCar, getAllCars, getCarById, updateCar } from "./car.controller.js";

const carRouter=Router()

carRouter.route('/').post(addCar).get(getAllCars)
carRouter.route('/:carId').get(getCarById).put(updateCar).delete(deleteCar)



export default carRouter