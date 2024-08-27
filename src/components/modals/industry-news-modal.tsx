import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { primaryColor } from '@/constant/color';
import CloseSVG from '../../../assets/icons/close';
import { DefautImage1Large } from '@/constant/images';
import { domain, endPoints } from '@/base-api/endPoints';
import usePost from '@/custom-hooks/usePost';
import { usePathname } from 'next/navigation';
import CardSkeletonVertical from '../skeleton/cardSkeletonVertical';
import dayjs from 'dayjs';

interface IndustryNewsModalProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  slug: string;
  setSlug: any;
}

const IndustryNewsModal: React.FC<IndustryNewsModalProps> = ({
  open,
  onClose,
  slug,
  setSlug,
}) => {
  const body = {
    modelName: 'Item',
    filters: { slug: slug },
    fields: ['slug', 'title', 'subTitle', 'description', 'created_at', 'media'],
    add_fields: {
      categories: 'first,name,category',
    },
  };
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const isScreen640 = useMediaQuery('(max-width:640px)');
  const isScreen450 = useMediaQuery('(max-width:450px)');
  const [data, loading, getData] = usePost(endPoints.DynamicFilter, body);
  let imageURL =
    data && data?.[0]?.media?.main_image?.[0]?.url
      ? domain + data?.[0]?.media?.main_image?.[0]?.url
      : DefautImage1Large;

  const handleClose = () => {
    onClose(false);
    setSlug('');
  };

  useEffect(() => {
    slug && getData();
  }, [slug]);

  const dateTime = (data && data?.[0]?.created_at) || '';
  const date = dateTime
    ? dayjs(dateTime?.split(' ')?.[0]).format('MMMM DD, YYYY')
    : '';
  const time = dateTime?.split(' ')?.[1];

  return (
    <Dialog
      open={open}
      sx={{ borderRadius: '50px', direction: 'ltr' }}
    >
      <Stack
        direction={'row'}
        justifyContent={'flex-end'}
        width={'100%'}
      >
        <div
          onClick={handleClose}
          style={{ margin: '10px', cursor: 'pointer' }}
        >
          <CloseSVG />
        </div>
      </Stack>
      {loading ? (
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          sx={{
            width: isScreen640 ? '100%' : '550px',
            height: '400px',
            overflowX: 'hidden',
          }}
        >
          <Stack margin={2}>
            <CardSkeletonVertical fullFlex="center" />
          </Stack>
        </Stack>
      ) : (
        <Stack
          paddingX={5}
          alignItems={'flex-start'}
          sx={{ direction: isArabic ? 'rtl' : 'ltr' }}
        >
          <DialogTitle>
            <Typography
              variant="h6"
              fontFamily={'Nobile'}
              color={primaryColor}
              textTransform={'capitalize'}
              fontWeight={600}
            >
              {data[0] && data[0]?.title}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography
                variant="body2"
                fontFamily={'Jost'}
                marginBottom={2}
              >
                {data && data?.[0]?.subTitle}
              </Typography>{' '}
              <Typography
                variant="caption"
                fontSize={12}
                className=" opacity-80"
              >
                {date}
              </Typography>
              <br />
              <span style={{ color: '#EB6B2A' }}>
                {' '}
                {data[0] && data[0]?.category}
              </span>
            </DialogContentText>
          </DialogContent>
          <img
            style={{
              width: '100%',
              height: isScreen450 ? '170px' : '300px',
              borderRadius: '13px',
            }}
            src={imageURL}
            alt="newsImage"
          />
          <br />
          <br />

          <DialogContent>
            <Typography
              variant="body2"
              fontFamily={'Jost'}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: data[0] && data[0]?.description,
                }}
              />{' '}
            </Typography>
          </DialogContent>
        </Stack>
      )}
    </Dialog>
  );
};

export default IndustryNewsModal;
