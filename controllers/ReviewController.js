import ReviewModel from '../models/review.js';
import updateRestaurantRating from '../utils/updateRestaurantRating.js'

export const create = async (req, res) => {
    try{
        const doc = new ReviewModel({
            user: req.userId,
            restaurant: req.params.id,
            text: req.body.text,
            rating: req.body.rating,
        });

        const review = await doc.save();

        await updateRestaurantRating(req.params.id);

        res.json(review);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Create attempt failed',
        });
    }
};

export const remove = async (req, res) => {
    try{
        const reviewId = req.params.id;

        const doc = await ReviewModel.findByIdAndDelete(reviewId);

        if (!doc) {
            return res.status(404).json({
                message: 'Review doesn\'t exist',
            });
        }

        await updateRestaurantRating(req.params.id);

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
        const reviewId = req.params.id;

        await ReviewModel.updateOne(
            {
                _id: reviewId,
            },
            {
                user: req.userId,
                restaurant: req.restaurantId,
                text: req.body.text,
                rating: req.body.rating,
            },
        );
        
        await updateRestaurantRating(req.params.id);
        
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
        const reviews = await ReviewModel.find();
        
        res.json(reviews);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve reviews',
        });
    }
};