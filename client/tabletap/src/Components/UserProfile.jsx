import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider, 
} from '@mui/material';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, updateUser } from '../redux/slices/auth';
import { fetchReviewsByUser } from '../redux/slices/reviews';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.auth.userData);
  const { reviews } = useSelector(state => state.reviews);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      dispatch(fetchReviewsByUser(id));
      setFullName(user.fullName); // Инициализация начального значения fullName
    }
  }, [dispatch, user, id]);

  const handleAvatarChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedAvatar(e.target.files[0]);
    }
  };

  const handleNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    if (selectedAvatar) {
      formData.append('avatar', selectedAvatar);
    }
    formData.append('fullName', fullName);

    // Обновление данных пользователя
    dispatch(updateUser({ userId: id, formData }));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Avatar
              alt={user.fullName}
              src={user.avatarUrl || "https://via.placeholder.com/150"}
              sx={{ width: 150, height: 150 }}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <Typography variant="h5">{user.fullName}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {user.email}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Роль: {user.role}
            </Typography>
          </Grid>
        </Grid>

        
        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Отзывы
        </Typography>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {reviews.items.map((review, index) => (
                <React.Fragment key={review._id}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                        primary={
                          <Link to={`/restaurants/profile/${review.restaurant._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {review.restaurant.name}
                          </Link>
                          + ` ${new Date(review.createdAt).toLocaleDateString()}`
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

        <List>
          <ListItem>
            <ListItemText primary="Дата создания аккаунта" secondary={new Date(user.createdAt).toLocaleDateString()} />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
}

export default UserProfile;