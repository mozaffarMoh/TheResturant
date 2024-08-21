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
  const [data, loading, getData] = usePost(endPoints.DynamicFilter, body);
  let imageURL =
    data[0] &&
    data[0]?.media &&
    data[0].media.length > 0 &&
    data[0].media[0]?.url
      ? domain + data[0].media[0]?.url
      : DefautImage1Large;

  const handleClose = () => {
    onClose(false);
    setSlug('');
  };

  useEffect(() => {
    slug && getData();
  }, [slug]);

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
            width: isScreen640 ? '300px' : '550px',
            height: '400px',
          }}
        >
          {' '}
          <CircularProgress />
        </Stack>
      ) : (
        <Stack
          padding={5}
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
              >
                {data?.subTitle}
                <br /> {data[0] && data[0]?.created_at} <br />
                <span style={{ color: 'red' }}>
                  {' '}
                  {data[0] && data[0]?.category}
                </span>
              </Typography>
            </DialogContentText>
          </DialogContent>
          <img
            style={{ width: '100%', height: '300px', borderRadius: '13px' }}
            src={imageURL}
            alt="newsImage"
          />
          <br />
          <br />

          <DialogContent>
            <DialogContentText>
              <Typography
                variant="body2"
                fontFamily={'Jost'}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: data[0] && data[0]?.description,
                  }}
                />
                <span style={{ color: 'red' }}>
                  {' '}
                  {data[0] && data[0]?.category}
                </span>
              </Typography>
            </DialogContentText>
          </DialogContent>
        </Stack>
      )}
    </Dialog>
  );
};

export default IndustryNewsModal;
