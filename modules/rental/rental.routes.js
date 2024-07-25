import { Router } from "express";
import { addRental, deleteRental, getRental, getRentalById, updateRental } from "./rental.controller.js";

const rentalRouter =Router()

rentalRouter.route('/').post(addRental).get(getRental)
rentalRouter.route('/:id').put(updateRental).get(getRentalById).delete(deleteRental)



export default rentalRouter