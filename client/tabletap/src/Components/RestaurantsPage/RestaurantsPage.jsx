import React, { useState } from 'react';
import { Grid, Box, Card, CardMedia, CardContent, Typography, CardActions, Button, CircularProgress, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants, createRestaurant } from '../../redux/slices/restaurants';
import axios from '../../redux/axios';

const RestaurantsPage = () => {
  const dispatch = useDispatch();
  const { restaurants } = useSelector(state => state.restaurants);
  const user = useSelector(state => state.auth.data);
  const [openDialog, setOpenDialog] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    address: '',
    description: '',
    cuisine: '',
    workingHours: { open: '', close: '' }
  });
  const [tables, setTables] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedMenuImage, setSelectedMenuImage] = useState(null);

  const isRestaurantsLoading = restaurants.status === 'loading';

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewRestaurant({
      name: '',
      address: '',
      description: '',
      cuisine: '',
      workingHours: { open: '', close: '' }
    });
    setTables([]);
    setSelectedImages([]);
    setSelectedMenuImage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRestaurant({ ...newRestaurant, [name]: value });
  };

  const handleAddTable = () => setTables([...tables, { number: tables.length + 1, seats: 4, bookings: [] }]);
  const handleRemoveTable = (index) => setTables(tables.filter((_, i) => i !== index));

  const uploadImages = async (images) => {
    return Promise.all(images.map(async (image) => {
      const formData = new FormData();
      formData.append('image', image);
  
      try {
        const response = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // Предполагаем, что сервер возвращает относительный путь к файлу
        const relativePath = response.data.url;
        // Создаем полный URL
        const fullUrl = `http://localhost:4444${relativePath}`;
        return fullUrl;
      } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
        return null;
      }
    }));
  };

  const handleSubmit = async () => {
    const imagesUrls = await uploadImages(selectedImages);
    let menuImageUrl = '';

    if (selectedMenuImage) {
      const menuImages = await uploadImages([selectedMenuImage]);
      menuImageUrl = menuImages[0];
    }

    const restaurantData = {
      ...newRestaurant,
      images: imagesUrls,
      menuUrl: menuImageUrl,
      tables,
    };

    dispatch(createRestaurant(restaurantData));
    handleCloseDialog();
  };

  const cuisines = [
    'Японская', 'Китайская', 'Русская', 'Беларуская', 'Грузинская',
    'Итальянская', 'Французская', 'Смешанная', 'Кавказская', 'Индийская'
  ];

  React.useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      {user && user.role === 'superAdmin' && (
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Добавить ресторан
        </Button>
      )}
      {isRestaurantsLoading ? (
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <CircularProgress />
        </Grid>
      ) : (
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
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Добавить ресторан</DialogTitle>
        <DialogContent>
          <TextField margin="dense" id="name" label="Название" name="name" type="text" fullWidth value={newRestaurant.name} onChange={handleChange} />
          <TextField margin="dense" id="address" label="Адрес" name="address" type="text" fullWidth value={newRestaurant.address} onChange={handleChange} />
          <TextField margin="dense" id="description" label="Описание" name="description" type="text" fullWidth multiline rows={4} value={newRestaurant.description} onChange={handleChange} />
          <FormControl fullWidth margin="dense">
            <InputLabel>Кухня</InputLabel>
            <Select
              label="Кухня"
              name="cuisine"
              value={newRestaurant.cuisine || ''}
              onChange={handleChange}
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
              value={newRestaurant.workingHours?.open || ''}
              onChange={(e) => setNewRestaurant({
                ...newRestaurant,
                workingHours: { ...newRestaurant.workingHours, open: e.target.value }
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
              value={newRestaurant.workingHours?.close || ''}
              onChange={(e) => setNewRestaurant({
                ...newRestaurant,
                workingHours: { ...newRestaurant.workingHours, close: e.target.value }
              })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <input
            accept="image/*"
            type="file"
            multiple
            onChange={(e) => setSelectedImages([...e.target.files])}
          />
          <input
            accept="image/*"
            type="file"
            onChange={(e) => setSelectedMenuImage(e.target.files[0])}
          />
          {tables.map((table, index) => (
            <div key={index}>
              <TextField label={`Столик №${index + 1} (мест)`} type="number" value={table.seats} onChange={(e) => {
                const updatedTables = [...tables];
                updatedTables[index].seats = e.target.value;
                setTables(updatedTables);
              }} />
              <Button onClick={() => handleRemoveTable(index)}>Удалить столик</Button>
            </div>
          ))}
          <Button onClick={handleAddTable}>Добавить столик</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button onClick={handleSubmit}>Создать</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default RestaurantsPage;
