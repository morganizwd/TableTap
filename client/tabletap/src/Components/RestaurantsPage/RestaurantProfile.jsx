import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Paper,
  Button, 
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

// Условные данные ресторана
const restaurantData = {
  _id: "6581e8579e318f53f911d61f",
  name: "La Bella Italia",
  address: "123 Pizza Street, Rome",
  description: "Authentic Italian cuisine with a modern twist. Perfect for romantic dinners and family gatherings.",
  cuisine: "Итальянская",
  rating: 3,
  menuUrl: "http://example.com/menu",
  imageUrl: "http://example.com/image.jpg",
  images: [
    "http://example.com/image1.jpg",
    "http://example.com/image2.jpg"
  ],
};

const reviews = [
    {
      _id: "65829a257d198d9be75b7b3e",
      user: "6580c0932c38caf892d4e6de",
      restaurant: "6581e8579e318f53f911d61f",
      text: "Отлично поел!",
      rating: 5,
      createdAt: "2023-12-20T07:39:17.775Z",
    },
    {
      _id: "65829a387d198d9be75b7b42",
      user: "6580c0932c38caf892d4e6de",
      restaurant: "6581e8579e318f53f911d61f",
      text: "Не понравилось.",
      rating: 1,
      createdAt: "2023-12-20T07:39:36.011Z",
    },
  ]
  

const RestaurantProfile = () => {
    const handleReservationClick = () => {
        // Демонстрационное действие
        alert("Бронирование (демонстрационно)");
    };

    return (
        <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
            <Typography variant="h3" gutterBottom>
            {restaurantData.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
            {restaurantData.address}
            </Typography>
            <Typography variant="body1" paragraph>
            {restaurantData.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
            Кухня: {restaurantData.cuisine}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
            Рейтинг: {restaurantData.rating}
            </Typography>

            <Grid container spacing={3}>
            {restaurantData.images.map((image, index) => (
                <Grid item xs={12} sm={6} key={index}>
                <Card>
                    <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={`restaurant image ${index}`}
                    />
                </Card>
                </Grid>
            ))}
            </Grid>
        </Box>

        <Button
            variant="contained"
            color="primary"
            onClick={handleReservationClick}
            sx={{ mt: 2 }}
            >
            Забронировать столик
        </Button>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Отзывы
        </Typography>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {reviews.map((review, index) => (
                <React.Fragment key={review._id}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                        primary={`Отзыв от ${new Date(review.createdAt).toLocaleDateString()}`}
                        secondary={
                            <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Рейтинг: {review.rating}
                            </Typography>
                            {" — " + review.text}
                            </>
                        }
                        />
                    </ListItem>
                    {index < reviews.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
            ))}
        </List>

        </Container>
    );
};

export default RestaurantProfile;