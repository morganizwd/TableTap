import RestaurantAdminModel from "../models/RestaurantAdmin.js";

import UserModel from '../models/user.js'; // Убедитесь, что путь к модели User верный

export const create = async (req, res) => {
    try {
        const { userId, restaurantId } = req.body;

        // Создаем нового администратора ресторана
        const doc = new RestaurantAdminModel({
            user: userId,
            restaurant: restaurantId,
        });

        const restaurantAdmin = await doc.save();

        // Обновляем роль пользователя на 'restaurantAdmin'
        await UserModel.findByIdAndUpdate(userId, {
            $set: { role: 'restaurantAdmin' }
        });

        res.json(restaurantAdmin);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Create attempt failed',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const restaurantAdminId = req.params.id;

        const restaurantAdmin = await RestaurantAdminModel.findById(restaurantAdminId);

        if (!restaurantAdmin) {
            return res.status(404).json({
                message: 'Restaurant admin doesn\'t exist',
            });
        }

        // Обновляем роль пользователя обратно на 'user'
        await UserModel.findByIdAndUpdate(restaurantAdmin.user, {
            $set: { role: 'user' }
        });

        // Удаляем запись администратора ресторана
        await RestaurantAdminModel.findByIdAndDelete(restaurantAdminId);

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Remove attempt failed',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const restaurantAdmins = await RestaurantAdminModel.find().populate('restaurant');
        res.json(restaurantAdmins);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve restaurant admins',
        });
    }
};

export const getByRestaurantId = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        const restaurantAdmin = await RestaurantAdminModel.findOne({ restaurant: restaurantId });

        if (!restaurantAdmin) {
            return res.status(404).json({
                message: 'Restaurant admin for the specified restaurant does not exist',
            });
        }

        res.json(restaurantAdmin);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve the restaurant admin',
        });
    }
};
