import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Rating, Box, Button } from '@mui/material';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={restaurant.imageUrl}
        alt={restaurant.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {restaurant.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Кухня: {restaurant.cuisine}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Адрес: {restaurant.address}
        </Typography>
      </CardContent>
      <CardActions>
        <Box display="flex" alignItems="center">
          <Rating value={restaurant.rating} readOnly />
          <Typography ml={1}>{restaurant.rating}</Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

// Условные данные для демонстрации
const restaurants = [
    {
      id: 1,
      name: 'Ресторан 1',
      cuisine: 'Итальянская кухня',
      address: 'Адрес 1',
      rating: 4.5,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Ресторан 2',
      cuisine: 'Японская кухня',
      address: 'Адрес 2',
      rating: 4.7,
      imageUrl: 'https://via.placeholder.com/150',
    },
    // Добавьте больше ресторанов для демонстрации
  ];

  const RestaurantsPage = () => {
    return (
      <Grid container spacing={2}>
        {restaurants.map((restaurant) => (
          <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={restaurant.imageUrl}
                alt={restaurant.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {restaurant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {restaurant.cuisine}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {restaurant.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Рейтинг: {restaurant.rating}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Подробнее</Button>
                <Button size="small">Забронировать</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };
  
  export default RestaurantsPage;
