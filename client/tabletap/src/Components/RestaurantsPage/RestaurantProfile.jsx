import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Card, CardMedia, Grid, Button,
  List, ListItem, TextField, Dialog, DialogActions, DialogContent,
  DialogTitle, Divider, ListItemText, MenuItem, Select, InputLabel, FormControl, Rating
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsByRestaurant } from '../../redux/slices/reviews';
import { fetchReservationsByRestaurant } from '../../redux/slices/reservations';
import { fetchUserById } from '../../redux/slices/auth';
import axios from '../../redux/axios';
import { updateRestaurant, deleteRestaurant } from '../../redux/slices/restaurants';
import { createReview, deleteReview } from '../../redux/slices/reviews';

const RestaurantProfile = () => {
  const dispatch = useDispatch();
  const { reviews } = useSelector(state => state.reviews);
  const { reservations } = useSelector(state => state.reservations);
  const [data, setData] = useState(null);
  const { id: restaurantIdFromURL } = useParams();  // Используем id из URL
  const [usersData, setUsersData] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const user = useSelector((state) => state.auth.data);
  const showManagementButton = user && user.role === 'restaurantAdmin' && user.restaurantId === restaurantIdFromURL;

  useEffect(() => {
    axios.get(`/restaurant/${restaurantIdFromURL}`).then(res => {
      setData(res.data);
      setEditData(res.data); // Copy data for editing
    }).catch(err => {
      alert('Ошибка при получении данных о ресторане');
    });
  }, [restaurantIdFromURL]);

  useEffect(() => {
    if (restaurantIdFromURL) {
      dispatch(fetchReviewsByRestaurant(restaurantIdFromURL));
      dispatch(fetchReservationsByRestaurant(restaurantIdFromURL));
    }
  }, [dispatch, restaurantIdFromURL]);

  useEffect(() => {
    reviews.items.forEach(review => {
      dispatch(fetchUserById(review.user._id)).then(res => {
        setUsersData(prev => ({ ...prev, [review.user._id]: res.payload }));
      });
    });
  }, [dispatch, reviews.items]);

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditDialogOpen = () => {
    setEditData({
      ...data, // Загружаем все текущие данные о ресторане
      workingHours: data.workingHours || { open: '11:00', close: '23:00' } // Устанавливаем рабочие часы, если они есть, или значения по умолчанию
    });
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleTablesChange = (index, value) => {
    const updatedTables = [...editData.tables];
    updatedTables[index].seats = value;
    setEditData({ ...editData, tables: updatedTables });
  };

  // Удаление столика
  const handleRemoveTable = (index) => {
    const updatedTables = editData.tables.filter((_, i) => i !== index);
    setEditData({ ...editData, tables: updatedTables });
  };

  // Добавление столика
  const handleAddTable = () => {
    setEditData({ ...editData, tables: [...editData.tables, { number: editData.tables.length + 1, seats: 4, bookings: [] }] });
  };

  // Обновление изображений
  const handleImagesChange = (index, value) => {
    const updatedImages = [...editData.images];
    updatedImages[index] = value;
    setEditData({ ...editData, images: updatedImages });
  };

  // Удаление изображения
  const handleRemoveImage = (index) => {
    const updatedImages = editData.images.filter((_, i) => i !== index);
    setEditData({ ...editData, images: updatedImages });
  };

  // Добавление изображения
  const handleAddImage = () => {
    setEditData({ ...editData, images: [...editData.images, ''] });
  };

  const handleDeleteRestaurant = () => {
    if (window.confirm("Вы уверены, что хотите удалить этот ресторан? Это действие необратимо.")) {
      dispatch(deleteRestaurant(restaurantIdFromURL));
    }
  };

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = async () => {
    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post('/upload-multiple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.urls; // Предполагается, что сервер возвращает массив URL
    } catch (error) {
      console.error('Ошибка при загрузке изображений:', error);
      return [];
    }
  };

  const handleUpdateRestaurant = async () => {
    const imageUrls = await handleImageUpload();

    const updatedData = {
      ...editData,
      images: imageUrls.length > 0 ? imageUrls : editData.images,
    };

    dispatch(updateRestaurant({ id: restaurantIdFromURL, updatedData }));
    setEditDialogOpen(false);
  };

  const [reviewData, setReviewData] = useState({
    text: '',
    rating: 0,
  });

  const handleCreateReview = () => {
    dispatch(createReview({
      restaurantId: restaurantIdFromURL,
      reviewData: { ...reviewData, user: user._id }
    }));
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm("Вы уверены, что хотите удалить этот отзыв?")) {
      dispatch(deleteReview(reviewId));
    }
  };

  const canEdit = user && (user.role === 'superAdmin' || (user.role === 'restaurantAdmin' && user.restaurantId === restaurantIdFromURL));

  const cuisines = [
    'Японская', 'Китайская', 'Русская', 'Беларуская', 'Грузинская',
    'Итальянская', 'Французская', 'Смешанная', 'Кавказская', 'Индийская'
  ];

  if (!data) {
    return <div>Loading...</div>;
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

      {showManagementButton && (
        <MenuItem>
          <Link to={`/restaurant-admin-page/${restaurantIdFromURL}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            Управление
          </Link>
        </MenuItem>
      )}

      {canEdit && (
        <>
          <Button variant="outlined" color="primary" onClick={handleEditDialogOpen}>
            Редактировать информацию
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleDeleteRestaurant} sx={{ ml: 2 }}>
            Удалить ресторан
          </Button>
        </>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose} fullWidth>
        <DialogTitle>Редактировать информацию о ресторане</DialogTitle>
        <DialogContent>
          <TextField
            label="Название"
            name="name"
            fullWidth
            margin="dense"
            value={editData.name || ''}
            onChange={handleEditChange}
          />
          <TextField
            label="Адрес"
            name="address"
            fullWidth
            margin="dense"
            value={editData.address || ''}
            onChange={handleEditChange}
          />
          <TextField
            label="Описание"
            name="description"
            fullWidth
            margin="dense"
            multiline
            rows={4}
            value={editData.description || ''}
            onChange={handleEditChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Кухня</InputLabel>
            <Select
              label="Кухня"
              name="cuisine"
              value={editData.cuisine || ''}
              onChange={handleEditChange}
            >
              {cuisines.map((cuisine, index) => (
                <MenuItem key={index} value={cuisine}>{cuisine}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="h6" sx={{ mt: 2 }}>Рабочие часы</Typography>
          <Box display="flex" gap={2}>
            <TextField
              margin="dense"
              id="openTime"
              label="Время открытия"
              name="openTime"
              type="time"
              value={editData.workingHours?.open || ''}
              onChange={(e) => setEditData({
                ...editData,
                workingHours: { ...editData.workingHours, open: e.target.value }
              })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              id="closeTime"
              label="Время закрытия"
              name="closeTime"
              type="time"
              value={editData.workingHours?.close || ''}
              onChange={(e) => setEditData({
                ...editData,
                workingHours: { ...editData.workingHours, close: e.target.value }
              })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          {editData.tables.map((table, index) => (
            <div key={index}>
              <TextField
                label={`Столик №${index + 1} (мест)`}
                type="number"
                value={table.seats}
                onChange={(e) => handleTablesChange(index, e.target.value)}
              />
              <Button onClick={() => handleRemoveTable(index)}>Удалить столик</Button>
            </div>
          ))}
          <Button onClick={handleAddTable}>Добавить столик</Button>
          {editData.images.map((image, index) => (
            <div key={index}>
              <TextField
                label={`URL изображения ${index + 1}`}
                type="text"
                value={image}
                onChange={(e) => handleImagesChange(index, e.target.value)}
              />
              <Button onClick={() => handleRemoveImage(index)}>Удалить изображение</Button>
            </div>
          ))}
          <Button onClick={handleAddImage}>Добавить изображение</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">Отмена</Button>
          <Button onClick={handleUpdateRestaurant} color="primary">Сохранить</Button>
        </DialogActions>
      </Dialog>

      <Link to={`/restaurant/${restaurantIdFromURL}/reservation-create`}>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Забронировать столик
        </Button>
      </Link>

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
      <TextField
        label="Ваш отзыв"
        multiline
        rows={4}
        value={reviewData.text}
        onChange={(e) => setReviewData({ ...reviewData, text: e.target.value })}
      />
      <Rating
        name="simple-controlled"
        value={reviewData.rating}
        onChange={(e, newValue) => {
          setReviewData({ ...reviewData, rating: newValue });
        }}
      />
      <Button onClick={handleCreateReview}>Оставить отзыв</Button>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {reviews.items.map((review, index) => (
          <React.Fragment key={review._id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography component="span">
                    Отзыв от {review.user && usersData[review.user._id]
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
              {user && user._id === review.user._id && (
                <Button onClick={() => handleDeleteReview(review._id)}>
                  Удалить
                </Button>
              )}
            </ListItem>
            {index < reviews.items.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>

    </Container>
  );
};

export default RestaurantProfile;