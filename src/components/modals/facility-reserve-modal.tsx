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
  FormControl,
  InputLabel,
  Stack,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  LocalizationProvider,
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
import { z } from 'zod';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [successMessage, setSuccessMessage]: any = useState('');
  const [minAttendees, setMinAttendees] = useState(0);
  const [maxAttendees, setMaxAttendees] = useState(0);
  const [attendees, setAttendees] = useState(0);
  const [itemId, setItemId] = useState('');
  const maxDate = getMaxDate();
  const [errors, setErrors] = useState({
    fromTime: '',
    toTime: '',
    attendees: '',
  });
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

  let dataReview = {
    fromTime,
    toTime,
    attendees,
  };
  const schema = z.object({
    fromTime: z.string().min(1, {
      message: t('validation.required'),
    }),
    toTime: z.string().min(1, {
      message: t('validation.required'),
    }),
    attendees: z.number().min(1, { message: t('validation.required') }),
  });

  const handleReserve = (e: any) => {
    e.preventDefault();
    setErrors({
      fromTime: '',
      toTime: '',
      attendees: '',
    });
    try {
      schema.parse(dataReview);

      handlePost();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce((acc: any, err: any) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(fieldErrors);
      }
    }
  };

  const handleDateChange = (newDate: any) => {
    setDate(newDate);
  };

  // Reset form when the resetForm prop changes
  useEffect(() => {
    if (success) {
      setDate(getFirstDate());
      setFromTime('');
      setToTime('');
      setAttendees(0);
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
        <form
          style={{ width: '100%' }}
          onSubmit={handleReserve}
          noValidate
        >
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
                  sx={{ direction: 'ltr' }}
                />
              </LocalizationProvider>
            </Box>

            <Box
              display="flex"
              gap={2}
              width="100%"
            >
              <Stack
                width={'100%'}
                sx={{
                  '& .MuiFormLabel-root': {
                    right: isArabic ? 25 : '',
                    left: isArabic ? 'auto' : '',
                    transformOrigin: isArabic ? 'top right' : '',
                    textAlign: isArabic ? 'right' : 'left',
                  },

                  '& .MuiOutlinedInput-notchedOutline legend': {
                    textAlign: isArabic ? 'right' : 'left',
                  },
                  '& .MuiSvgIcon-root': {
                    position: 'absolute',
                    right: isArabic ? 'auto' : '0.5rem', // Position to the left if not Arabic
                    left: isArabic ? '0.5rem' : 'auto', // Position to the right if Arabic
                  },
                }}
              >
                <TextField
                  label={t('dialog.start-time')}
                  type="time"
                  value={fromTime}
                  onChange={(e) => setFromTime(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                  fullWidth
                />
                {errors.fromTime && (
                  <Typography
                    variant="caption"
                    color={'red'}
                  >
                    {errors.fromTime}
                  </Typography>
                )}
              </Stack>

              <Stack
                width={'100%'}
                sx={{
                  '& .MuiFormLabel-root': {
                    right: isArabic ? 25 : '',
                    left: isArabic ? 'auto' : '',
                    transformOrigin: isArabic ? 'top right' : '',
                    textAlign: isArabic ? 'right' : 'left',
                  },

                  '& .MuiOutlinedInput-notchedOutline legend': {
                    textAlign: isArabic ? 'right' : 'left',
                  },
                  '& .MuiSvgIcon-root': {
                    position: 'absolute',
                    right: isArabic ? 'auto' : '0.5rem', // Position to the left if not Arabic
                    left: isArabic ? '0.5rem' : 'auto', // Position to the right if Arabic
                  },
                }}
              >
                <TextField
                  label={t('dialog.end-time')}
                  type="time"
                  value={toTime}
                  onChange={(e) => setToTime(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                  fullWidth
                />
                {errors.toTime && (
                  <Typography
                    variant="caption"
                    color={'red'}
                  >
                    {errors.toTime}
                  </Typography>
                )}
              </Stack>
            </Box>
            <FormControl
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  paddingLeft: '0.8rem',
                },
                '& .MuiFormLabel-root': {
                  right: isArabic ? 25 : '',
                  left: isArabic ? 'auto' : '',
                  transformOrigin: isArabic ? 'top right' : '',
                  textAlign: isArabic ? 'right' : 'left',
                },
                '& .MuiFormHelperText-root': {
                  textAlign: isArabic ? 'right' : 'left', // Align helper text to the right
                },
                '& .MuiOutlinedInput-notchedOutline legend': {
                  textAlign: isArabic ? 'right' : 'left',
                },
                '& .MuiSvgIcon-root': {
                  position: 'absolute',
                  right: isArabic ? 'auto' : '0.5rem', // Position to the left if not Arabic
                  left: isArabic ? '0.5rem' : 'auto', // Position to the right if Arabic
                },
              }}
            >
              <InputLabel id="attendees-label">
                {t('dialog.number-of-attendees')}
              </InputLabel>

              <Select
                label={t('dialog.number-of-attendees')}
                value={attendees ? attendees : ''}
                onChange={(e) => setAttendees(Number(e.target.value))}
                fullWidth
              >
                {maxAttendees > 0 &&
                  minAttendees >= 0 &&
                  [...Array(maxAttendees - minAttendees + 1)].map(
                    (_, index) => (
                      <MenuItem
                        key={index}
                        value={minAttendees + index}
                      >
                        {minAttendees + index}
                      </MenuItem>
                    ),
                  )}
              </Select>
              {errors.attendees && (
                <Typography
                  variant="caption"
                  color={'red'}
                >
                  {errors.attendees}
                </Typography>
              )}
            </FormControl>
            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
              color={'primary'}
              sx={{ width: '100%' }}
              className="reserve"
            >
              {t('buttons.reserve')}
            </LoadingButton>
          </Box>{' '}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FacilityReserveModal;
