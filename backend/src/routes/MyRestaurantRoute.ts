import express from "express";
import multer from "multer";
import MyRestaurantControllers from "../controllers/MyRestaurantControllers";
import {jwtCheck, jwtParse} from "../middleware/auth";
import {validateMyUserRequest} from "../middleware/validation";

const router = express.Router();

// add multer middleware
const storage =multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5mb
    },
});

// get /api/my/restaurant
router.get("/", jwtCheck, jwtParse, MyRestaurantControllers.getMyRestaurant);


// /api/my/restaurant
router.post("/",
    upload.single("imageFile"),
    validateMyUserRequest,
    jwtCheck,
    jwtParse,
    MyRestaurantControllers.createMyRestaurant);


export default router;






