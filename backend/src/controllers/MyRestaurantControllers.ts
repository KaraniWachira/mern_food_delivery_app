import express, {Request, Response} from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";


// get my restaurant controller
const getMyRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findOne({ user: req.userId});
        if(!restaurant) {
            return res.status(404).json({message: "restaurant not found" });

        }
        res.json(restaurant);

    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "Error fetching restaurant"
        });
    };
};



// create my restaurant controller
const createMyRestaurant = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurant.findOne({ user: req.userId});

        if (!existingRestaurant) {
            return res.status(409).json({message: "User restaurant already exists"});
        }

        // data uri string that represents the image from the request
        //  const image = req.file as Express.Multer.File;
        //  const base64Image= Buffer.from(image.buffer).toString("base64");
        //  const dataURI =`data:${image.mimetype};base64,${base64Image}`;
        //
        //  // upload image to cloudinary
        // const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

        const imageUrl = await uploadImage(req.file as Express.Multer.File)

        // create a new restaurant in our db based on the model
        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = imageUrl;
        restaurant.user = new mongoose.Types.ObjectId(req.userId);
        restaurant.lastUpdated = new Date();

        await restaurant.save();
        res.status(201).send(restaurant);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "something went wrong"});
    }
};

// updating restaurant details
const updateMyRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findOne({
            user: req.userId,
        });

        if(!restaurant) {
            return res.status(404).json({message:"something went wrong!"});
        }

        restaurant.restaurantName = req.body.restaurantName;
        restaurant.city = req.body.city;
        restaurant.county = req.body.county;
        restaurant.deliveryPrice = req.body.deliveryPrice;
        restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
        restaurant.cuisines = req.body.cuisines;
        restaurant.menuItems = req.body.menuItems;
        restaurant.lastUpdated = new Date();

        if(req.file) {
            const imageUrl = await uploadImage(req.file as Express.Multer.File)
            restaurant.imageUrl = imageUrl;
        }

        await restaurant.save();
        res.status(200).send(restaurant);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({message: "failed to update restaurant info!"});
    }
};

const uploadImage = async (file: Express.Multer.File) => {
    const image = file;
    const base64Image= Buffer.from(image.buffer).toString("base64");
    const dataURI =`data:${image.mimetype};base64,${base64Image}`;

    // upload image to cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    return uploadResponse.url;
}


export default {
    getMyRestaurant,
    createMyRestaurant,
    updateMyRestaurant
};