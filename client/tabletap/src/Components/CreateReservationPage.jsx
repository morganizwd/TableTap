import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createReservation } from '../redux/slices/reservations';

function CreateReservationPage() {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const [guestsAmount, setGuestsAmount] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [tableNumber, setTableNumber] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);

  const handleSubmit = () => {
    // Преобразование номера столика в число
    const tableNumberInt = parseInt(tableNumber, 10);

    // Формирование данных для бронирования
    const reservationData = {
      guestsAmount,
      date, // Отправляем дату в формате YYYY-MM-DD
      status,
      tableNumber: tableNumberInt,
      timeSlots,
      restaurantId,
    };

    console.log("Отправка данных бронирования:", reservationData); // Для отладки

    dispatch(createReservation(reservationData));
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Создание бронирования
        </Typography>
        <TextField
          label="Количество гостей"
          variant="outlined"
          value={guestsAmount}
          onChange={(e) => setGuestsAmount(e.target.value)}
          sx={{ mb: 2, mr: 2, width: '30ch' }}
        />
        <TextField
          label="Дата"
          type="date"
          variant="outlined"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ mb: 2, mr: 2, width: '30ch' }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl sx={{ mb: 2, mr: 2, width: '30ch' }}>
          <InputLabel id="status-label">Статус</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            label="Статус"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="pending">Ожидание</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Номер столика"
          variant="outlined"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          sx={{ mb: 2, mr: 2, width: '30ch' }}
          type="number" // Указываем тип number для правильного ввода
        />
        <TextField
          label="Выбранные временные слоты"
          variant="outlined"
          value={timeSlots.join(', ')}
          onChange={(e) => setTimeSlots(e.target.value.split(', '))}
          sx={{ mb: 2, width: '30ch' }}
          helperText="Введите временные слоты через запятую, например: 12:00, 13:00"
        />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Создать бронирование
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateReservationPage;