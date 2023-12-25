import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 

import RestaurantAdmin from '../models/RestaurantAdmin.js';
import UserModel from '../models/user.js'

export const register = async (req, res) => {
    try{
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            role: req.body.role,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
            role: user.role, // Добавьте роль пользователя
        }, 'secret123', {
            expiresIn: '30d',
        });        

        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...user._doc,
            token,
        });
    }
    catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: 'User undefined' });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);
        if (!isValidPass) { 
            return res.status(400).json({ message: 'Wrong login or password' });
        }

        // Данные для JWT
        const tokenData = {
            _id: user._id,
            role: user.role
        };

        // Добавляем restaurantId в токен для администраторов ресторана
        if (user.role === 'restaurantAdmin') {
            const adminData = await RestaurantAdmin.findOne({ user: user._id });
            if (adminData) {
                tokenData.restaurantId = adminData.restaurant;
            }
        }

        const token = jwt.sign(tokenData, 'secret123', { expiresIn: '30d' });

        const { passwordHash, ...userData } = user._doc;
        res.json({ ...userData, token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Не удалось авторизоваться' });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { passwordHash, ...userData } = user._doc;

        // Если пользователь - администратор ресторана, найдите связанный ресторан
        if (user.role === 'restaurantAdmin') {
            const adminData = await RestaurantAdmin.findOne({ user: req.userId }).populate('restaurant');
            if (adminData) {
                userData.restaurantId = adminData.restaurant._id;
            }
        }

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Access denied' });
    }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let responseData = {
      // Стандартные поля пользователя
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      createdAt: user.createdAt
      // Другие поля
    };

    // Если пользователь - администратор ресторана, добавляем ID ресторана
    if (user.role === 'restaurantAdmin') {
      responseData.restaurantId = user.restaurantId; // Предполагая, что поле называется restaurantId
    }

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
    try {
        const { fullName, avatarUrl } = req.body;
        const userId = req.userId; // ID пользователя берется из токена

        // Ищем пользователя в базе данных
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let updateData = {};

        // Обновляем имя пользователя, если оно предоставлено
        if (fullName) {
            updateData.fullName = fullName;
        }

        // Обновляем аватар пользователя, если он предоставлен
        if (avatarUrl) {
            updateData.avatarUrl = avatarUrl;
        }

        // Обновляем пользователя в базе данных
        const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });

        const { passwordHash, ...userData } = updatedUser._doc;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating user data' });
    }
};