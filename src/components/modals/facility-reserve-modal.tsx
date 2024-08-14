import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
  Select,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  LocalizationProvider,
  DatePicker,
  StaticDateTimePicker,
} from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import './facility-reserve-modal.css';
import { useTranslations } from 'next-intl';
import { endPoints } from '@/base-api/endPoints';
import usePost from '@/custom-hooks/usePost';
import Cookies from 'js-cookie';
import { LoadingButton } from '@mui/lab';
import CustomAlert from '../alerts/CustomAlert';

interface ReservationModalProps {
  open: boolean;
  onClose: any;
  facility: any;
}

// Helper function to get the date one month from now
const getMaxDate = (): Dayjs => {
  return dayjs()?.add(1, 'month');
};

const getFirstDate = (): Dayjs => {
  return dayjs().add(1, 'day');
};

const getFormatDate = (date: any) => {
  return dayjs(date).format('YYYY-MM-DD');
};

const FacilityReserveModal: React.FC<ReservationModalProps> = ({
  open,
  onClose,
  facility,
}) => {
  const t = useTranslations();
  const token = Cookies.get('token') || '';
  const [date, setDate]: any = useState(getFirstDate());
  const [fromTime, setFromTime] = useState('00:00');
  const [toTime, setToTime] = useState('00:00');
  const [successMessage, setSuccessMessage]: any = useState('');
  const [minAttendees, setMinAttendees] = useState(0);
  const [maxAttendees, setMaxAttendees] = useState(0);
  const [attendees, setAttendees] = useState(0);
  const [itemId, setItemId] = useState('');
  const maxDate = getMaxDate();
  let body = {
    order_type: 'booking',
    items: [
      {
        item_id: itemId,
        start_timeslot_date: date ? getFormatDate(date) : '',
        end_timeslot_date: date ? getFormatDate(date) : '',
        start_timeslot_time: fromTime,
        end_timeslot_time: toTime,
        meta: {
          'number-of-attendees': attendees,
        },
      },
    ],
  };
  const [, loading, handlePost, success, , errorMessage] = usePost(
    endPoints.createOrder,
    body,
    token,
  );

  const handleReserve = () => {
    handlePost();
  };

  const handleDateChange = (newDate: any) => {
    setDate(newDate);
  };

  // Reset form when the resetForm prop changes
  useEffect(() => {
    if (success) {
      setDate(getFirstDate());
      setFromTime('00:00');
      setToTime('00:00');
      setSuccessMessage(t('messages.success-reserve-facility'));
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 2000);
    }
  }, [success]);

  useEffect(() => {
    if (facility && facility?.metadata) {
      setItemId(facility?.id);
      facility.metadata.forEach((item: any) => {
        if (item.slug == 'minimum-number-of-people') {
          setMinAttendees(Number(item.value));
        }
        if (item.slug == 'maximum-number-of-people') {
          setMaxAttendees(Number(item.value));
        }
      });
    }
  }, [facility]);

  useEffect(() => {
    setAttendees(minAttendees);
  }, [minAttendees]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      className="facility-reserve-modal"
    >
      {' '}
      {/* This alert when some fields are error from the server */}
      <CustomAlert
        openAlert={errorMessage}
        setOpenAlert={() => {}}
        message={errorMessage}
      />
      <CustomAlert
        openAlert={successMessage}
        setOpenAlert={() => {}}
        type="success"
        message={successMessage}
      />
      <DialogTitle style={{ textAlign: 'center' }}>
        {t('dialog.book-facility')}
      </DialogTitle>
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
            <Typography variant="body1">{t('dialog.select-date')}</Typography>
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
              label={t('dialog.start-time')}
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }} // 5 min
              fullWidth
            />
            <TextField
              label={t('dialog.end-time')}
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }} // 5 min
              fullWidth
            />
          </Box>

          <Select
            label="Number Of Attendees"
            value={attendees}
            onChange={(e) => setAttendees(Number(e.target.value))}
            fullWidth
          >
            {maxAttendees > 0 &&
              minAttendees >= 0 &&
              [...Array(maxAttendees - minAttendees + 1)].map((_, index) => (
                <MenuItem
                  key={index}
                  value={minAttendees + index}
                >
                  {minAttendees + index}
                </MenuItem>
              ))}
          </Select>
          <LoadingButton
            loading={loading}
            variant="contained"
            color={'primary'}
            onClick={handleReserve}
            sx={{ width: '100%' }}
            className="reserve"
          >
            {t('buttons.reserve')}
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FacilityReserveModal;
