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
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsByRestaurant } from '../../redux/slices/reviews';
import { fetchReservationsByRestaurant } from '../../redux/slices/reservations';
import { fetchUserById } from '../../redux/slices/auth';
import { useParams } from 'react-router-dom';
import axios from '../../redux/axios';

const RestaurantProfile = () => {
    const dispatch = useDispatch();
    const { reviews } = useSelector(state => state.reviews);
    const { reservations } = useSelector(state => state.reservations);
    const [ data, setData ] = React.useState(null);
    const { id } = useParams();
    const [usersData, setUsersData] = React.useState({});

    React.useEffect(() => {
        axios.get(`/restaurant/${id}`).then(res => {
            setData(res.data);
        }).catch(err => {
            console.warn(err);
            alert('Ошибка при получении данных о ресторане');
            setData({}); // Set an empty object or a predefined error state
        });
    }, [id]); // Include id in dependency array

    React.useEffect(() => {
        if (id) {
            dispatch(fetchReviewsByRestaurant(id));
        }
    }, [dispatch, id]);

    React.useEffect(() => {
        if (id) {
            dispatch(fetchReservationsByRestaurant(id));
        }
    }, [dispatch, id]);

    React.useEffect(() => {
        // Загрузка данных пользователей для каждого отзыва
        reviews.items.forEach(review => {
            dispatch(fetchUserById(review.user._id)).then(res => {
                setUsersData(prev => ({ ...prev, [review.user._id]: res.payload }));
            });
        });
    }, [dispatch, reviews.items]);

    if (!reservations) {
        return <div>Loading reservations...</div>;
    }

    if (!data) { // Check if data is not available
        return <div>Loading...</div>; // Render loading state or similar
    }

    return (
        <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
            <Typography variant="h3" gutterBottom>
            {data.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
            {data.address}
            </Typography>
            <Typography variant="body1" paragraph>
            {data.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
            Кухня: {data.cuisine}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
            Рейтинг: {data.rating}
            </Typography>

            <Grid container spacing={3}>
            {data.images.map((image, index) => (
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
            sx={{ mt: 2 }}
            >
            Забронировать столик
        </Button>

        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Активные бронирования
            </Typography>
            <List>
                {reservations.items.map((reservation) => (
                    <ListItem key={reservation._id} divider>
                        <ListItemText
                            primary={`Столик №${reservation.tableNumber}, ${new Date(reservation.date).toLocaleString()} (${reservation.timeSlots.join(', ')})`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
        
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Отзывы
        </Typography>
        
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {reviews.items.map((review, index) => (
                 <React.Fragment key={review._id}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={
                                <Typography component="span">
                                    Отзыв от {usersData[review.user._id] 
                                        ? <Link to={`/user/${review.user._id}`}>{usersData[review.user._id].fullName}</Link> 
                                        : 'Пользователь'
                                    } {new Date(review.createdAt).toLocaleDateString()}
                                </Typography>
                            }
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