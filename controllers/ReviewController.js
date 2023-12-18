import ReviewModel from '../models/review.js';

export const create = async (req, res) => {
    try{
        const doc = new ReviewModel({
            user: req.userId,
            restaurant: req.restaurantId,
            text: req.body.text,
            rate: req.body.rate,
        });

        const review = await doc.save();

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
                rate: req.body.rate,
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
        const reviews = await ReviewModel.find();
        
        res.json(reviews);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve reviews',
        });
    }
};