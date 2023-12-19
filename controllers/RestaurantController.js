import RestarauntModel from "../models/restaraunt.js";

export const create = async (req, res) => {
    try{
        const doc = new RestarauntModel({
            name: req.body.name,
            address: req.body.address,
            description: req.body.description,
            tables: req.body.tables,
            cuisine: req.body.cuisine,
            rating: 0,
            menuUrl: req.body.menuUrl,
            imageUrl: req.body.imageUrl,
            images: req.body.images,
        });

        const restaraunt = await doc.save();

        res.json(restaraunt);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Create attempt failed',
        });
    }
};

export const remove = async (req, res) => {
    try{
        const restarauntId = req.params.id;

        const doc = await RestarauntModel.findByIdAndDelete(restarauntId);

        if (!doc) {
            return res.status(404).json({
                message: 'Restaurant doesn\'t exist',
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
    try {
        const restarauntId = req.params.id;

        await RestarauntModel.updateOne(
            {
                _id: restarauntId,
            },
            {
                name: req.body.name,
                address: req.body.address,
                description: req.body.description,
                tables: req.body.tables,
                cuisine: req.body.cuisine,
                menuUrl: req.body.menuUrl,
                imageUrl: req.body.imageUrl,
                images: req.body.images,
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

export const getOne = async (req, res) => {
    try{
        const restarauntId = req.params.id;

        const doc = await RestarauntModel.findById(restarauntId);

        if (doc) {
            res.json(doc);
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Search attempt failed',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const restaurants = await RestarauntModel.find();
        
        res.json(restaurants);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve restaurants',
        });
    }
};