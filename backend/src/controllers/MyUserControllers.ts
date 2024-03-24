import { Request, Response } from "express";
import User from "../models/user";

// get current user
const getCurrentUser = async (req: Request, res:Response) => {
    try {
        const currentUser = await User.findOne({ _id: req.userId });
        if(!currentUser) {
            return res.status(404).json({message:"user not found" });
        }

        res.json(currentUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong" });
    }
};

const createCurrentUser = async (req: Request, res: Response) => {
    // 1. check if the user exists
    // 2. create the user if doesn't exist
    // 3. return the user object to the calling client
    try {
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({ auth0Id });
        
        // user already existing
        if (existingUser) {
            return res.status(200).send();
        }

        // create new user
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser.toObject());

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating user"
        }); 
    }
};

// Update current user
const updateCurrentUser = async (req: Request, res: Response) => {
    try {
        const { name, addressLine1, county, city } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.county = county;

        await user.save();
        res.send(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error updating user" });
        
    }
};

export default {
    getCurrentUser,
    createCurrentUser,
    updateCurrentUser
};























