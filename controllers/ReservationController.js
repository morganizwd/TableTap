import ReservationModel from "../models/reservation.js";

export const create = async (req, res) => {
    try{
        const doc = new ReservationModel({
            user: req.userId,
            restaurant: req.restaurantId,
            guestsAmount: req.body.guestsAmount,
            date: req.body.date,
            status: req.body.status,
            tableNumber: req.body.tableNumber,
        });

        const reservation = await doc.save();

        res.json(reservation);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Create attempt failed',
        });
    }
};

export const remove = async (req, res) => {
    try{
        const reservationId = req.params.id;

        const doc = await ReservationModel.findByIdAndDelete(reservationId);

        if (!doc) {
            return res.status(404).json({
                message: 'Reservation doesn\'t exist',
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
        const reservationId = req.params.id;

        await ReservationModel.updateOne(
            {
                _id: reservationId,
            },
            {
                user: req.userId,
                restaurant: req.restaurantId,
                guestsAmount: req.body.guestsAmount,
                date: req.body.date,
                status: req.body.status,
                tableNumber: req.body.tableNumber,
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
        const reservations = await ReservationModel.find();
        
        res.json(reservations);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve reservations',
        });
    }
};