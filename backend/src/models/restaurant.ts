import mongoose, { InferSchemaType } from "mongoose";

// menu Items Schema
const menuItemsSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: () => new mongoose.Types.ObjectId(),
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
});

export type MenuItemType = InferSchemaType<typeof menuItemsSchema>;

// restaurant schema
const restaurantSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    restaurantName: { type: String, required: true },
    city: { type: String, required: true },
    county: { type: String, required: true },
    deliveryPrice: { type: Number, required: true },
    estimatedDeliveryTime: { type: Number, required: true },
    cuisines: [{ type: String, required: true }],
    menuItems: [menuItemsSchema],
    imageUrl: { type: String, required: true },
    lastUpdated: { type: Date, required: true },
});


// model based in the schema
const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;











































