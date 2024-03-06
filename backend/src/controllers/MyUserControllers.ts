import { Request, Response } from "express";
import User from "../models/user";


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
            message: "Error creatong user"
        });
        
    };
};


export default {
    createCurrentUser,

};























