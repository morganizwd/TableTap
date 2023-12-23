import express from 'express';
import mongoose from 'mongoose'; 
import multer from 'multer';
import cors from 'cors';

import {
    UserController,
    RestraurantController,
    ReviewController,
    ReservationController,
    RestaurantAdminController, } from './controllers/index.js';

import { 
    loginValidation,
    registerValidation,
    reviewCreateValidation,
    reviewUpdateValidation,
    restarauntCreateValidation,
    restarauntUdateValidation,
    reservationCreateValidation,
    reservationUpdateValidation,
    restaurantAdmimCreation, } from './validations.js'

import { handleValidationErrors, highRolesAuth, allRolesAuth, adminOnlyAuth } from './utils/index.js';

mongoose 
    .connect('mongodb+srv://admin:Hesus2016@cluster0.vgtv5yo.mongodb.net/TableTap')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB ERROR', err)); 

const app = express();

const storage = multer.diskStorage({ 
    destination: (_, __, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (_, file, cb) => { 
        cb(null, file.originalname) 
    }, 
});

const upload = multer({ storage });

app.use(express.json()); 
app.use(cors());
// app.use('/uploads', express.static('uploads')); 

// //media upload pathes
// app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
//     res.json({
//         url: `/uploads/${req.file.originalname}`,
//     });
// });

// auth pathes 
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login); 
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register); 
app.get('/auth/me', allRolesAuth, UserController.getMe);

// Restaurant pathes
app.post('/restaurant-create', 
    highRolesAuth, 
    restarauntCreateValidation, 
    handleValidationErrors, 
    RestraurantController.create
);
app.delete('/restaurant-delete/:id',
    highRolesAuth,
    RestraurantController.remove
);
app.patch('/restaurant-edit/:id',
    highRolesAuth,
    restarauntUdateValidation,
    handleValidationErrors,
    RestraurantController.update
);
app.get('/restaurants', RestraurantController.getAll);
app.get('/restaurant/:id', RestraurantController.getOne);

// review pathes
app.post('/restaurant/:id/review-create', 
    allRolesAuth,
    reviewCreateValidation,
    handleValidationErrors,
    ReviewController.create
);
app.delete('/restaurant/:id/review-delete/:id',
    allRolesAuth,
    ReviewController.remove
);
app.patch('/restaurant/:id/review-edit/:id',
    allRolesAuth,
    reviewUpdateValidation,
    handleValidationErrors,
    ReviewController.update
);
app.get('/restaurant/:id/reviews',
    ReviewController.getAll
);
app.get('/reviews/user/:userId', allRolesAuth, ReviewController.getAllByUser);

// Reservation pathes
app.post('/restaurant/:id/reservation-create',
    allRolesAuth,
    reservationCreateValidation,
    handleValidationErrors,
    ReservationController.create
);
app.delete('/restaurant/:restaurantId/reservation-delete/:reservationId',
    highRolesAuth,
    ReservationController.remove
);
app.get('/restaurant/:restaurantId/reservations', highRolesAuth, ReservationController.getAll);
app.get('/reservations/user/:userId', allRolesAuth, ReservationController.getAllByUser);

// Restaurant Admin creation
app.post('/restaurantadmin-create',
    adminOnlyAuth,
    restaurantAdmimCreation,
    handleValidationErrors,
    RestaurantAdminController.create
);
app.delete('/restaurantadmin-delete/:id',
    adminOnlyAuth,
    RestaurantAdminController.remove
);
app.get('/restaurantadmins',
    adminOnlyAuth,
    RestaurantAdminController.getAll
);
app.get('/restaurant-admin/:restaurantId', 
    adminOnlyAuth, 
    RestaurantAdminController.getByRestaurantId
);


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});