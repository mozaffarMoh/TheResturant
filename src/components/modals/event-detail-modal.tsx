'use client';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { DefautImage1, DefautImage1Large } from '@/constant/images';
import {
  Box,
  CircularProgress,
  DialogActions,
  Grid,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { gray100, primaryColor, secondaryColor } from '@/constant/color';
import { PlaceSVG } from '../../../assets/icons';
import { useTranslations } from 'next-intl';
import { domain, endPoints } from '@/base-api/endPoints';
import useGet from '@/custom-hooks/useGet';
import { useEffect, useState } from 'react';
import { metadataIcons } from '@/constant/metadataIcons';
import { usePathname } from 'next/navigation';
import CustomSkeleton from '../skeleton/CustomSkeleton';
import usePost from '@/custom-hooks/usePost';
import Cookies from 'js-cookie';
import { LoadingButton } from '@mui/lab';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: primaryColor, // Set the background color to red
    color: 'white',
    width: '900px',
    maxWidth: '900px',
    borderRadius: '12px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface TermsModalProps {
  open: boolean;
  handleClose: () => void;
  slug: string;
  setSuccessMessageReserve: any;
  setErrorMessageReserve: any;
}
const EventDetailsModal = ({
  open = false,
  handleClose,
  slug,
  setSuccessMessageReserve,
  setErrorMessageReserve,
}: TermsModalProps) => {
  const t = useTranslations();
  const token = Cookies.get('token') || '';
  const isScreen510 = useMediaQuery('(max-width:510px)');
  const isScreen600 = useMediaQuery('(max-width:600px)');
  const isScreen900 = useMediaQuery('(max-width:900px)');
  const pathname = usePathname();
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState(0);
  let isArabic = pathname.startsWith('/ar');

  const body = {
    modelName: 'Item',
    filters: {
      slug: slug,
    },
    fields: ['id', 'slug', 'description', 'quantity', 'media'],
    relations: {
      place: {
        fields: ['name', 'slug'],
      },
      itemMetaData: {
        fields: ['value'],
        relations: {
          itemMetaKey: {
            fields: ['name', 'slug'],
          },
        },
      },
    },
  };
  const [data, loading, getData, success] = usePost(
    endPoints.DynamicFilter,
    body,
    token,
  );

  let bodyReserve = {
    order_type: 'event',
    items: [{ item_id: itemId }],
  };

  const shrinkValue = (val: string) => {
    if (val && val.length > 13 && isScreen510) {
      return val?.slice(0, 10) + '...';
    } else {
      return val;
    }
  };
  const [
    ,
    loadingReserve,
    handleReserve,
    successReserve,
    successStatus,
    errorMessageReserve,
  ] = usePost(endPoints.createOrder, bodyReserve, token);

  let imageURL =
    data && data?.[0]?.media?.main_image?.[0]?.url
      ? domain + data?.[0]?.media?.main_image?.[0]?.url
      : DefautImage1Large;

  useEffect(() => {
    slug && getData();
  }, []);

  useEffect(() => {
    if (data) {
      setItemId(data?.[0]?.id);
      setQuantity(data?.[0]?.quantity);
    }
  }, [data]);

  useEffect(() => {
    slug && getData();
  }, [slug]);

  useEffect(() => {
    if (successReserve) {
      setSuccessMessageReserve(t('messages.success-reserve-facility'));
      setTimeout(() => {
        setSuccessMessageReserve('');
        handleClose();
      }, 2000);
    }
  }, [successReserve]);

  useEffect(() => {
    setErrorMessageReserve(errorMessageReserve);
  }, [errorMessageReserve]);

  const submitReserve = () => {
    if (quantity > 0) {
      handleReserve();
    } else {
      setErrorMessageReserve(t('messages.quantity'));
    }
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        sx={{ m: 0 }}
        className="sm-flex-col-col-center-center"
        id="customized-dialog-title"
      >
        <p className="m-0">{t('header.events-details')}</p>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        style={{
          direction: 'ltr',
        }}
      >
        {loading ? (
          <Stack
            gap={2}
            alignItems={'center'}
            width={'100%'}
          >
            {' '}
            <Stack>
              <CustomSkeleton
                variant="rectangle"
                width={isScreen600 ? '200px' : '500px'}
                height={isScreen600 ? '180px' : '250px'}
                bgcolor="grey.400"
                borderRadius="20px"
              />{' '}
            </Stack>
            {Array(3)
              .fill(0)
              .map((_, i: number) => {
                return (
                  <Stack
                    key={i}
                    direction={'row'}
                    justifyContent={'space-evenly'}
                    width={'100%'}
                  >
                    <CustomSkeleton
                      width={isScreen600 ? '100px' : '200px'}
                      bgcolor="grey.400"
                    />
                    <CustomSkeleton
                      width={isScreen600 ? '100px' : '200px'}
                      bgcolor="grey.400"
                    />
                  </Stack>
                );
              })}
          </Stack>
        ) : (
          <Stack
            width={'100%'}
            alignItems={'center'}
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <Box
              className=" position-relative  "
              width={isScreen510 ? '100%' : '90%'}
              height={isScreen600 ? 200 : 360}
              marginBottom={2}
            >
              <img
                src={imageURL}
                width={'100%'}
                height={'100%'}
                style={{ borderRadius: '10px' }}
                alt="event details page"
              />
            </Box>
            <Grid
              container
              width={isScreen510 ? '100%' : '90%'}
              height={isScreen900 ? 'auto' : 250}
              bgcolor={'white'}
              borderRadius={3}
              display={'flex'}
              alignItems={'flex-start'}
              justifyContent={'flex-start'}
              paddingY={2}
              sx={{ direction: isArabic ? 'rtl' : 'ltr' }}
            >
              {data?.[0]?.itemMetaData &&
                data[0].itemMetaData.map((item: any, i: number) => {
                  let SvgIcon = metadataIcons(item?.itemMetaKey?.slug);
                  return (
                    <Grid
                      item
                      key={i}
                      xs={12}
                      sm={12}
                      md={6}
                      display={'flex'}
                      justifyContent={'flex-start'}
                      alignItems={'center'}
                      height={50}
                      paddingX={1.5}
                      paddingY={3}
                      gap={1}
                      sx={{ overflow: 'hidden' }}
                    >
                      <Stack
                        direction={'row'}
                        justifyContent={'flex-start'}
                        alignItems={'center'}
                        gap={2}
                        width={'85%'}
                      >
                        <Stack
                          sx={{ width: '10px', height: '50px' }}
                          justifyContent={'center'}
                        >
                          {SvgIcon && <SvgIcon />}
                        </Stack>

                        <Typography
                          fontWeight={600}
                          fontSize={isScreen510 ? 11 : 13}
                          color={primaryColor}
                          noWrap
                        >
                          {item?.itemMetaKey?.name}
                        </Typography>
                      </Stack>
                      <Stack
                        width={'60%'}
                        height={70}
                        justifyContent={'center'}
                      >
                        <Typography
                          fontSize={isScreen510 ? 11 : 13}
                          color={gray100}
                          noWrap
                        >
                          {shrinkValue(item.value)}
                        </Typography>
                      </Stack>
                    </Grid>
                  );
                })}
              {data && data?.[0]?.place?.name && (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  height={50}
                  paddingX={1.5}
                  paddingY={3}
                  gap={1}
                  sx={{ overflow: 'hidden' }}
                >
                  <Stack
                    direction={'row'}
                    justifyContent={'flex-start'}
                    alignItems={'center'}
                    gap={1}
                    width={'85%'}
                  >
                    <Stack justifyContent={'center'}>
                      <PlaceSVG />
                    </Stack>
                    <Typography
                      fontWeight={600}
                      fontSize={isScreen510 ? 11 : 13}
                      color={primaryColor}
                      noWrap
                    >
                      {t('dialog.location')}
                    </Typography>
                  </Stack>
                  <Stack
                    width={'60%'}
                    height={70}
                    justifyContent={'center'}
                    alignItems={'flex-start'}
                  >
                    <Typography
                      fontSize={isScreen510 ? 11 : 13}
                      color={gray100}
                      noWrap
                    >
                      {shrinkValue(data?.[0]?.place?.name)}
                    </Typography>
                  </Stack>
                </Grid>
              )}
            </Grid>
            <Stack
              width={'90%'}
              marginTop={3}
            >
              {data?.description && (
                <div dangerouslySetInnerHTML={{ __html: data?.description }} />
              )}
            </Stack>
          </Stack>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {success && (
          <LoadingButton
            autoFocus
            loading={loadingReserve}
            className="mt-1 w-90"
            onClick={submitReserve}
            sx={{
              borderRadius: '15px',
              color: 'white',
              background: '#3f485e',
              '&:hover': {
                backgroundColor: secondaryColor,
              },
            }}
            loadingIndicator={
              <CircularProgress
                color="warning"
                size={18}
              />
            }
          >
            {t('buttons.book-now')}
          </LoadingButton>
        )}
      </DialogActions>
    </BootstrapDialog>
  );
};

export default EventDetailsModal;
