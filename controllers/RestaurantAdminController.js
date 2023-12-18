import RestaurantAdminModel from "../models/RestaurantAdmin.js";

export const create = async (req, res) => {
    try{
        const doc = new RestaurantAdminModel({
            user: req.userId,
            restaurant: req.restaurantId,
        });

        const restaurantAdmin = await doc.save();

        res.json(restaurantAdmin);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Create attempt failed',
        });
    }
};

export const remove = async (req, res) => {
    try{
        const RestaurantAdminId = req.params.id;

        const doc = await RestaurantAdminModel.findByIdAndDelete(RestaurantAdminId);

        if (!doc) {
            return res.status(404).json({
                message: 'Restaurant admin doesn\'t exist',
            });
        }

        res.json({
            success: true,
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Remove attempt failed',
        });
    }
};

export const update = async (req, res) => {
    try{
        const RestaurantAdminId = req.params.id;

        await RestaurantAdminModel.updateOne(
            {
                _id: RestaurantAdminId,
            },
            {
                user: req.userId,
                restaurant: req.restaurantId,
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Update attempt failed',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const restaurantAdmins = await RestaurantAdminModel.find();
        
        res.json(restaurantAdmins);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve reservations',
        });
    }
};