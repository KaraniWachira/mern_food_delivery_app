// validation logic for all our request
import {body, validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body('county').isString().notEmpty().withMessage("County must be a string"),
    handleValidationErrors,
];

//validate my restaurant post request
export const validateMyRestaurantRequest = [
    body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
    body("city").notEmpty().withMessage("city name is required"),
    body("county").notEmpty().withMessage("county name is required"),
    body("deliveryPrice").isFloat({ min:0 }).withMessage("Delivery price must be a positive number"),
    body("cuisines").isArray().withMessage("cuisines must be an array").not().isEmpty().withMessage("cuisines array cannot be empty"),
    body("menuItems").isArray().withMessage("Menu items must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
    body("menuItems.*.price").isFloat({ min:0 }).withMessage("Menu item price is required and must be a positive number"),
    handleValidationErrors,
];


















