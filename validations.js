import { body, param } from 'express-validator';

//auth validation
export const loginValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password shoud be at least 5 symbols').isLength({ min: 5 }), 
];

export const registerValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password should be at least 8 symbols').isLength({ min: 8 }),
    body('fullName', 'Name is too short').isLength({ min: 2 }),
    body('role', 'Invalid role').custom((value) => {
        const roles = ['user', 'restaurantAdmin', 'superAdmin'];
        if (!roles.includes(value)) {
            throw new Error('Invalid role');
        }
        return true;
    }),
    body('avatarUrl', 'Invalid url').optional().isURL(),
];

//review validation
export const reviewCreateValidation = [
    param('id', 'Invalid restaurant ID').isMongoId(),
    body('text', 'Отзыв слищком короткий').isLength({ min: 4 }).isString(),
    body('rating', 'Rate should be a number').isNumeric().isFloat({ min: 1, max: 5 }),
];

export const reviewUpdateValidation = [
    body('text', 'Отзыв слищком короткий').optional().isLength({ min: 4 }).isString(),
    body('rating', 'Rate should be a number').optional().isNumeric().isFloat({ min: 1, max: 5 }),
];

// restaurant validation
export const restarauntCreateValidation = [
    body('name', 'Имя слишком короткое').isLength(  { min: 1 } ).isString(),
    body('address', 'Адрес слишком короткий').isLength( { min: 5 } ).isString(),
    body('description', 'Описание слоищком корокое').isLength( { min: 5 } ).isString(),
    body('tables', 'Tables information is required').isArray(),
    body('tables.*.number', 'Table number must be a number').isNumeric(),
    body('tables.*.seats', 'Seats must be a number').isNumeric(),
    body('cuisine', 'Invalid cuisine type').custom((value) => {
        const allowedCuisines = [
            'Японская', 'Китайская', 'Русская', 'Беларуская', 'Грузинская',
            'Итальянская', 'Французская', 'Смешанная', 'Кавказская', 'Индийская'
        ];
        if (!allowedCuisines.includes(value)) {
            throw new Error('Invalid cuisine type');
        }
        return true;
    }),
    // body('menuUrl', 'Menu URL should be valid URL').optional().isURL(),
    // body('imageUrl', 'Image URL should be valid URL').optional().isURL(),
    body('images', 'Images should be an array').optional().isArray(),
    // body('images.*', 'Each image should be a valid URL').optional().isURL(),
];

export const restarauntUdateValidation = [
    body('name', 'Имя слишком короткое').optional().isLength(  { min: 1 } ).isString(),
    body('address', 'Адрес слишком короткий').optional().isLength( { min: 5 } ).isString(),
    body('description', 'Описание слоищком корокое').optional().isLength( { min: 5 } ).isString(),
    body('tables', 'Tables information is required').optional().isArray(),
    body('tables.*.number', 'Table number must be a number').optional().isNumeric(),
    body('tables.*.seats', 'Seats must be a number').optional().isNumeric(),
    body('cuisine', 'Invalid cuisine type').optional().custom((value) => {
        const allowedCuisines = [
            'Японская', 'Китайская', 'Русская', 'Беларуская', 'Грузинская',
            'Итальянская', 'Французская', 'Смешанная', 'Кавказская', 'Индийская'
        ];
        if (!allowedCuisines.includes(value)) {
            throw new Error('Invalid cuisine type');
        }
        return true;
    }),
    body('menuUrl', 'Menu URL should be valid URL').optional().isURL(),
    body('imageUrl', 'Image URL should be valid URL').optional().isURL(),
    body('images', 'Images should be an array').optional().isArray(),
    body('images.*', 'Each image should be a valid URL').optional().isURL(),
];

//reservation validation
export const reservationCreateValidation = [
    param('id', 'Invalid restaurant ID').isMongoId(),
    body('guestsAmount', 'Amount of guests must be a number').isNumeric(),
    body('date', 'Invalid date').isISO8601(),
    body('status', 'Invalid status').isIn(['pending', 'confirmed', 'cancelled', 'completed']),
    body('tableNumber', 'Table number must be a number').isNumeric(),
];

export const reservationUpdateValidation = [
    param('restaurantId', 'Invalid restaurant ID').isMongoId(),
    param('reservationId', 'Invalid reservation ID').isMongoId(),
    body('guestsAmount', 'Amount of guests must be a number').optional().isNumeric(),
    body('date', 'Invalid date').optional().isISO8601(),
    body('status', 'Invalid status').optional().isIn(['pending', 'confirmed', 'cancelled', 'completed']),
    body('tableNumber', 'Table number must be a number').optional().isNumeric(),
    body('timeSlots', 'Invalid time slots').optional().isArray(),
    body('timeSlots.*', 'Invalid time slot').optional().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
];


//restaurant admim validation
export const restaurantAdmimCreation = [
    body('userId', 'Invalid user ID').isMongoId(),
    body('restaurantId', 'Invalid restaurant ID').isMongoId(),
];