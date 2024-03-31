// endpoints to interact will all restaurants in the app

import express from "express";
import {param} from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

router.get("/search/:city",
    param("city")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("city parameter must be a valid string"),
        RestaurantController.searchRestaurant
);


export default router;

















