
export type  User = {
    _id: string;
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    county: string;
};

export type MenuItem = {
    _id: string;
    name: string;
    price: number;
};

export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    county: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItems: MenuItem[];
    imageUrl: string;
    lastUpdated: string;
};






