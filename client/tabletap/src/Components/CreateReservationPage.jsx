import React, { useState } from 'react';
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

function CreateReservationPage() {
  const [guestsAmount, setGuestsAmount] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [tableNumber, setTableNumber] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);

  // Функция для отправки данных формы (пока что пустая)
  const handleSubmit = () => {
    const reservationData = { guestsAmount, date, status, tableNumber, timeSlots };
    console.log("Отправка данных бронирования:", reservationData);
    // Здесь можно добавить логику для отправки данных на сервер
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
          label="Дата и время"
          type="datetime-local"
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
            <MenuItem value="confirmed">Подтверждено</MenuItem>
            <MenuItem value="cancelled">Отменено</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Номер столика"
          variant="outlined"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          sx={{ mb: 2, mr: 2, width: '30ch' }}
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