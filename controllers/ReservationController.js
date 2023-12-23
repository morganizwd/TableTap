import ReservationModel from "../models/reservation.js";
import RestarauntModel from '../models/restaraunt.js';

export const create = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await RestarauntModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        const table = restaurant.tables.find(t => t.number === req.body.tableNumber);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        console.log('Date received:', req.body.date);
        const bookingDate = String(req.body.date).split('T')[0];
        const requestedTimeSlots = req.body.timeSlots;

        let booking = table.bookings.find(b => b.date === bookingDate);
        if (!booking) {
            booking = { date: bookingDate, times: [] };
            table.bookings.push(booking);
        }

        const isTimeSlotsAvailable = requestedTimeSlots.every(slot => !booking.times.includes(slot));
        if (!isTimeSlotsAvailable || table.seats < req.body.guestsAmount) {
            return res.status(400).json({
                message: 'Requested time slots are not available or the table does not have enough seats',
            });
        }

        booking.times.push(...requestedTimeSlots);

        const doc = new ReservationModel({
            user: req.userId,
            restaurant: restaurantId,
            guestsAmount: req.body.guestsAmount,
            date: req.body.date,
            status: req.body.status,
            tableNumber: req.body.tableNumber,
            timeSlots: requestedTimeSlots
        });

        const reservation = await doc.save();
        await restaurant.save();

        res.json(reservation);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Create attempt failed' });
    }
};

export const remove = async (req, res) => {
    try {
        const reservationId = req.params.reservationId;

        const reservation = await ReservationModel.findById(reservationId);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation doesn\'t exist' });
        }

        const restaurant = await RestarauntModel.findById(reservation.restaurant);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        const table = restaurant.tables.find(t => t.number === reservation.tableNumber);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        const bookingDate = new Date(reservation.date).toISOString().split('T')[0];
        const booking = table.bookings.find(b => b.date === bookingDate);
        if (booking) {
            // Удаление конкретных временных слотов, связанных с бронированием
            reservation.timeSlots.forEach(slot => {
                const index = booking.times.indexOf(slot);
                if (index !== -1) {
                    booking.times.splice(index, 1);
                }
            });
            // Удаление бронирования, если больше нет временных слотов
            if (booking.times.length === 0) {
                const index = table.bookings.indexOf(booking);
                table.bookings.splice(index, 1);
            }
        }

        await restaurant.save();
        await ReservationModel.findByIdAndDelete(reservationId);

        res.json({ success: true });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Remove attempt failed' });
    }
};

export const getAll = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        const reservations = await ReservationModel.find({ restaurant: restaurantId });
        
        res.json(reservations);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve reservations',
        });
    }
};

export const getAllByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const reservations = await ReservationModel.find({ user: userId }).populate('restaurant', 'name');

        res.json(reservations);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve reservations for the user',
        });
    }
};