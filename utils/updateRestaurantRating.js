import Review from '../models/review.js'; 
import Restaurant from '../models/restaraunt.js'; 

// Функция для обновления рейтинга ресторана
const updateRestaurantRating = async (restaurantId) => {
    try {
        // Найти все отзывы для данного ресторана
        const reviews = await Review.find({ restaurant: restaurantId });

        if (reviews.length === 0) {
            throw new Error('No reviews found for this restaurant');
        }

        // Вычислить средний рейтинг
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        // Обновить рейтинг ресторана
        await Restaurant.updateOne(
            { _id: restaurantId },
            { rating: averageRating }
        );
    } catch (err) {
        console.error(err);
        throw new Error('Failed to update restaurant rating');
    }
};

export default updateRestaurantRating;
