import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Rating, Box, Button, CircularProgress  } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../../redux/slices/restaurants';

  const RestaurantsPage = () => {
    const dispatch = useDispatch();
    const { restaurants } = useSelector(state => state.restaurants);

    const isRestaurantsLoading = restaurants.status === 'loading';

    React.useEffect(() => {
      dispatch(fetchRestaurants());
    }, [dispatch]);

    return (
      <Grid container spacing={2}>
        {isRestaurantsLoading ?
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <CircularProgress />
          </Grid>
        :
          restaurants.items.map((restaurant) => (
            <Grid item key={restaurant._id} xs={12} sm={6} md={4}>
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
                <Link to={`/restaurants/profile/${restaurant._id}`}>
                  <Button size="small">Подробнее</Button>
                </Link> 
                  <Link to='/restaurants/restaurant/reservation'>
                    <Button size="small">Забронировать</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    );
  };
  
  export default RestaurantsPage;
