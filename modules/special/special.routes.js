import { Router } from "express";
import { availableCars, carmodel, rentedCars, rentedOrAvailable } from "./sepcial.controller.js";

const special=Router();

special.get('/available',availableCars)
special.get('/model',carmodel)
special.get('/rented',rentedCars)
special.get('/all',rentedOrAvailable)

export default special