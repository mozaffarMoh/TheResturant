import React, { useState, useEffect } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Typography,
  Select,
  FormControl,
  InputLabel,
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
import { baseApi } from '@/base-api/baseApi';

interface ReservationModalProps {
  open: boolean;
  onClose: any;
  facility: any;
}

// Helper function to get the date one month from now
const getMaxDate = (): Dayjs => {
  return dayjs()?.add(1, 'month');
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
  const [date, setDate]: any = useState(null);
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const [fromTime, setFromTime] = useState(0);
  const [toTime, setToTime] = useState(0);
  const [timeBooked, setTimeBooked] = useState([
    { from: fromTime, to: toTime },
  ]);
  const [successMessage, setSuccessMessage]: any = useState('');
  const [errorMessageReserve, setErrorMessageReserve]: any = useState('');
  const [minAttendees, setMinAttendees] = useState(0);
  const [maxAttendees, setMaxAttendees] = useState(0);
  const [attendees, setAttendees] = useState(0);
  const [minHours, setMinHours] = useState(0);
  const [maxHours, setMaxHours] = useState(0);
  const [hours, setHours] = useState(0);
  const [time, setTime] = useState(0);
  const [itemId, setItemId] = useState('');
  const [slotId, setSlotId] = useState('');
  const maxDate = getMaxDate();
  const [errors, setErrors] = useState({
    time: '',
    hours: '',
    attendees: '',
  });
  let bodyDays = {
    modelName: 'Day',
    fields: ['id', 'name', 'slug'],
  };
  let body = {
    order_type: 'booking',
    items: [
      {
        item_id: itemId,
        children: [
          {
            item_id: slotId,
            start_timeslot_date: date ? getFormatDate(date) : '',
            end_timeslot_date: date ? getFormatDate(date) : '',
            start_timeslot_time: `${time < 10 ? '0' : ''}${time}:00`,
            end_timeslot_time: `${time + hours < 10 ? '0' : ''}${time + hours}:00`,
            meta: {
              'number-of-attendees': attendees,
            },
          },
        ],
      },
    ],
  };

  const [, loading, handlePost, success, , errorMessage] = usePost(
    endPoints.createOrder,
    body,
    token,
  );
  const [apiDays, , handleGetDays] = usePost(
    endPoints.DynamicFilter,
    bodyDays,
    token,
  );

  let dataReview = {
    time,
    hours,
    attendees,
  };
  const schema = z.object({
    time: z.number().min(1, { message: t('validation.required') }),
    hours: z.number().min(1, { message: t('validation.required') }),
    attendees: z.number().min(1, { message: t('validation.required') }),
  });

  const handleReserve = (e: any) => {
    e.preventDefault();
    setErrors({
      time: '',
      hours: '',
      attendees: '',
    });

    try {
      schema.parse(dataReview);

      const timeReserved = time + hours - 1;
      if (timeReserved > 17) {
        setErrorMessageReserve(t('messages.facility-exceed-hours'));
      } else {
        const isBooked = timeBooked.some(
          ({ from, to }) => time <= to && timeReserved >= from,
        );

        isBooked
          ? setErrorMessageReserve(
              t('messages.facility-between-reserved-hours'),
            )
          : handlePost();
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: any = error.flatten()?.fieldErrors;
        setErrors(fieldErrors);
      }
    }
  };

  /* This is for disable friday and saturday from picker */
  const disableFridaysAndSaturdays = (date: any) => {
    const day = date.day();
    return day === 5 || day === 6;
  };

  const handleDateChange = (newDate: any) => {
    setDate(newDate);
    const dayOfWeek = dayjs(newDate).format('dddd').toLocaleLowerCase();
    let dayId = 0;
    apiDays.forEach((item: any) => {
      if (item.slug === dayOfWeek) {
        dayId = item.id;
      }
    });

    let bodyCheck = {
      item_id: itemId,
      day_id: dayId,
      start_timeslot_date: getFormatDate(newDate),
      end_timeslot_date: getFormatDate(newDate),
    };
    let headers = {
      Accept: 'application/json',
      Language: 'en',
      Token: 'z9abe71334aea8236dwell811077c7cb768f7e816290f1',
      Authorization: `Bearer ${token}`,
    };

    setTimeBooked([{ from: fromTime, to: toTime }]);
    baseApi
      .post(endPoints.checkAvailability, bodyCheck, {
        headers: headers,
      })
      .then((res: any) => {
        let booked = res.data?.data?.booked;
        if (booked && booked.length > 0) {
          const newArray: any = [];
          booked[0].times.forEach((item: any) => {
            let from = item?.start_timeslot_time;
            let to = item?.end_timeslot_time;
            newArray.push({
              from: parseInt(from.split(':')[0], 10),
              to: parseInt(to.split(':')[0], 10) - 1,
            });
          });
          setTimeBooked(newArray);
        } else {
          setTimeBooked([
            {
              from: 0,
              to: 0,
            },
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetDays();
  }, []);

  const handleReset = () => {
    setDate(null);
    setTime(0);
    setHours(0);
    setTimeBooked([{ from: fromTime, to: toTime }]);
    setAttendees(0);
    setErrors({
      time: '',
      hours: '',
      attendees: '',
    });
  };
  const handleClose = () => {
    handleReset();
    onClose();
  };

  // Reset form when the resetForm prop changes
  useEffect(() => {
    if (success) {
      handleReset();
      setSuccessMessage(t('messages.success-reserve-facility'));
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 2000);
    }
  }, [success]);

  useEffect(() => {
    if (facility && facility?.itemMetaData) {
      setItemId(facility?.id);
      facility.itemMetaData.forEach((item: any) => {
        if (item?.itemMetaKey?.slug == 'minimum-number-of-people') {
          setMinAttendees(Number(item.value));
        }
        if (item?.itemMetaKey?.slug == 'maximum-number-of-people') {
          setMaxAttendees(Number(item.value));
        }
        if (item?.itemMetaKey?.slug == 'minimum-number-of-hours') {
          setMinHours(Number(item.value));
        }
        if (item?.itemMetaKey?.slug == 'maximum-number-of-hours') {
          setMaxHours(Number(item.value));
        }
      });
    }

    if (
      facility &&
      facility?.children &&
      Array.isArray(facility?.children) &&
      facility?.children.length > 0
    ) {
      setSlotId(facility?.children[0]?.id);
      let from = facility?.children[0]?.itemTimes[0]?.from_time;
      let to = facility?.children[0]?.itemTimes[0]?.to_time;

      setFromTime(parseInt(from.split(':')[0], 10));
      setToTime(parseInt(to.split(':')[0], 10));
    }
  }, [facility]);
  useEffect(() => {
    setTimeBooked([{ from: fromTime, to: toTime }]);
  }, [fromTime, toTime]);

  const selectProps = {
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
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      className="facility-reserve-modal"
      sx={{ direction: 'ltr' }}
    >
      {' '}
      {/* This alert when some fields are error from the server */}
      <CustomAlert
        openAlert={errorMessage || errorMessageReserve}
        setOpenAlert={() => setErrorMessageReserve('')}
        message={errorMessage || errorMessageReserve}
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
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
            sx={{ padding: 3, direction: isArabic ? 'rtl' : 'ltr' }}
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
                  shouldDisableDate={disableFridaysAndSaturdays}
                  sx={{ direction: 'ltr' }}
                />
              </LocalizationProvider>
            </Box>

            <Box
              display="flex"
              gap={2}
              width="100%"
            >
              <FormControl
                fullWidth
                sx={{ ...selectProps }}
              >
                <InputLabel id="attendees-label">
                  {t('dialog.start-time')}
                </InputLabel>

                <Select
                  label={t('dialog.start-time')}
                  value={time ? time : ''}
                  onChange={(e) => setTime(Number(e.target.value))}
                >
                  {toTime > 0 &&
                    fromTime >= 0 &&
                    [...Array(Math.abs(toTime - fromTime))].map((_, index) => {
                      const currentHour = fromTime + index;
                      const isBooked = timeBooked.some((item) => {
                        return (
                          currentHour >= item.from && currentHour <= item.to
                        );
                      });
                      return (
                        !isBooked && (
                          <MenuItem
                            key={currentHour}
                            value={currentHour}
                          >
                            {`${currentHour < 10 ? '0' : ''}${currentHour}:00`}
                          </MenuItem>
                        )
                      );
                    })}
                </Select>

                {errors.time && (
                  <Typography
                    variant="caption"
                    color={'red'}
                  >
                    {errors.time}
                  </Typography>
                )}
              </FormControl>

              <FormControl
                fullWidth
                sx={{ ...selectProps }}
              >
                <InputLabel id="attendees-label">
                  {t('dialog.number-of-hours')}
                </InputLabel>

                <Select
                  label={t('dialog.number-of-hours')}
                  value={hours ? hours : ''}
                  onChange={(e) => setHours(Number(e.target.value))}
                >
                  {maxHours > 0 &&
                    minHours >= 0 &&
                    [...Array(Math.abs(maxHours - minHours + 1))].map(
                      (_, index) => (
                        <MenuItem
                          key={index}
                          value={minHours + index}
                        >
                          {minHours + index}
                        </MenuItem>
                      ),
                    )}
                </Select>
                {errors.hours && (
                  <Typography
                    variant="caption"
                    color={'red'}
                  >
                    {errors.hours}
                  </Typography>
                )}
              </FormControl>
            </Box>
            <FormControl
              fullWidth
              sx={{ ...selectProps }}
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
                  [...Array(Math.abs(maxAttendees - minAttendees + 1))].map(
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
