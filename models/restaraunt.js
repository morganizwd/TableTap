const RestaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        tables: [{
            number: Number, 
            seats: Number, 
            isAvailable: Boolean, 
        }],
        rating: Number,
        menuUrl: String,
        imageUrl: String,
        images: [String], // Массив URL-адресов изображений
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Restaurant', RestaurantSchema);