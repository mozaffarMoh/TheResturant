'use client';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { DefautImage1 } from '@/constant/images';
import { Box, CircularProgress, DialogActions, Grid, Stack, useMediaQuery } from '@mui/material';
import { gray100, primaryColor } from '@/constant/color';
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
    width: '700px',
    maxWidth: '700px',
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
  const isScreen600 = useMediaQuery('(max-width:600px)');
  const pathname = usePathname();
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState(0);
  let isArabic = pathname.startsWith('/ar');
  const [data, loading, getData] = useGet(
    endPoints.showSingleItem + slug,
    true,
  );

  let body = {
    order_type: 'workshop',
    items: [{ item_id: itemId }],
  };

  const [
    ,
    loadingReserve,
    handleReserve,
    successReserve,
    ,
    errorMessageReserve,
  ] = usePost(endPoints.createOrder, body, token);

  let imageURL =
    data?.media && data.media.length > 0 && data?.media[0]?.url
      ? domain + data?.media[0]?.url
      : DefautImage1;

  useEffect(() => {
    if (data) {
      setItemId(data?.id);
      setQuantity(data?.quantity);
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

  console.log('quantity is : ', quantity);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      {' '}
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
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
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
          >
            <Box
              className=" position-relative  "
              width={'90%'}
              height={isScreen600 ? 200 : 320}
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
              width={'90%'}
              height={!isScreen600 ? 250 : ''}
              bgcolor={'white'}
              borderRadius={3}
              display={'flex'}
              alignItems={'flex-start'}
              justifyContent={'flex-start'}
              paddingY={2}
              sx={{ direction: isArabic ? 'rtl' : 'ltr' }}
            >
              {data?.metadata &&
                data?.metadata.map((item: any, i: number) => {
                  let SvgIcon = metadataIcons(item.slug);
                  return (
                    <Grid
                      item
                      key={i}
                      xs={12}
                      sm={6}
                      display={'flex'}
                      justifyContent={'flex-start'}
                      alignItems={'center'}
                      height={50}
                      gap={2}
                      paddingX={1.5}
                      paddingY={3}
                    >
                      <Stack
                        direction={'row'}
                        justifyContent={'flex-start'}
                        alignItems={'center'}
                        gap={2}
                        width={'60%'}
                      >
                        <Stack
                          sx={{ width: '10px', height: '50px' }}
                          justifyContent={'center'}
                        >
                          {SvgIcon && <SvgIcon />}
                        </Stack>

                        <Typography
                          fontWeight={600}
                          fontSize={13}
                          color={primaryColor}
                        >
                          {item.name}
                        </Typography>
                      </Stack>
                      <Stack
                        width={'40%'}
                        height={70}
                        justifyContent={'center'}
                      >
                        <Typography
                          fontSize={13}
                          color={gray100}
                        >
                          {item.value}
                        </Typography>
                      </Stack>
                    </Grid>
                  );
                })}
              <Grid
                item
                xs={12}
                sm={6}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                height={50}
                paddingX={1.5}
                paddingY={3}
              >
                <Stack
                  direction={'row'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                  gap={1}
                  width={'100%'}
                >
                  <Stack justifyContent={'center'}>
                    <PlaceSVG />
                  </Stack>
                  <Typography
                    fontWeight={600}
                    fontSize={13}
                    color={primaryColor}
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
                    fontSize={13}
                    color={gray100}
                  >
                    {data?.place && data?.place?.name}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        )}
        <Stack
          width={'90%'}
          marginTop={3}
        >
          <div dangerouslySetInnerHTML={{ __html: data?.description }} />
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LoadingButton
          autoFocus
          loading={loadingReserve}
          className={`${quantity ? '' : 'general-button-secondary'} mt-1 w-90`}
          disabled={quantity ? false : true}
          onClick={quantity ? handleReserve : () => {}}
          sx={{
            borderRadius: '15px',
            color: 'white',
            background: '#3f485e',
            '&:hover': {
              backgroundColor: '#ffffff',
              color: '#3f485e',
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
      </DialogActions>
    </BootstrapDialog>
  );
};

export default EventDetailsModal;
