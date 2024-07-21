import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  LocalizationProvider,
  DatePicker,
  StaticDateTimePicker,
} from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import './facility-reserve-modal.css';

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
}

// Helper function to get the date one month from now
const getMaxDate = (): Dayjs => {
  return dayjs().add(1, 'month');
};

const FacilityReserveModal: React.FC<ReservationModalProps> = ({
  open,
  onClose,
}) => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [attendees, setAttendees] = useState('');
  const maxDate = getMaxDate();

  const handleReserve = () => {
    console.log({ date, fromTime, toTime, attendees });
    onClose();
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setDate(newDate);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      className='facility-reserve-modal'
    >
      <DialogTitle style={{ textAlign: 'center' }}>Book Facility</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
          sx={{ padding: 3 }}
        >
          <Box
            display={'flex'}
            flexDirection={'column'}
            width="100%"
           
          >
            <Typography variant='body1'>Select Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDateTimePicker
              
                displayStaticWrapperAs="desktop"
                disablePast
                value={date}
                onChange={handleDateChange}
                maxDate={maxDate}
                views={['year', 'month', 'day']} // Shows only date views
                minDate={dayjs().add(1, 'day')} // Minimum date is tomorrow
                disableHighlightToday
              />
            </LocalizationProvider>
          </Box>

          <Box
            display="flex"
            gap={2}
            width="100%"
          >
            <TextField
              label="Start Time"
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }} // 5 min
              fullWidth
            />
            <TextField
              label="End Time"
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }} // 5 min
              fullWidth
            />
          </Box>
          <TextField
            select
            label="Number Of Attendees"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
            fullWidth
          >
            <MenuItem value="2-5">2-5</MenuItem>
            <MenuItem value="5-10">5-10</MenuItem>
            <MenuItem value="10-15">10-15</MenuItem>
          </TextField>
          <Button
            variant="contained"
            color={'primary'}
            onClick={handleReserve}
            sx={{ width: '100%' }}
            className='reserve'
          >
            Reserve
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FacilityReserveModal;
