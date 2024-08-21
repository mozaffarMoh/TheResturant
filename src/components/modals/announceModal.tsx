'use client';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import {
  CircularProgress,
  DialogContentText,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { primaryColor } from '@/constant/color';
import CloseSVG from '../../../assets/icons/close';
import { domain, endPoints } from '@/base-api/endPoints';
import { DefautImage1Large } from '@/constant/images';
import { useEffect } from 'react';
import usePost from '@/custom-hooks/usePost';
import { usePathname } from 'next/navigation';

interface TermsModalProps {
  open: boolean;
  handleClose: () => void;
  slug: string;
  setSlug: any;
}
const AnnounceModal = ({
  open = false,
  handleClose,
  slug,
  setSlug,
}: TermsModalProps) => {
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const isScreen640 = useMediaQuery('(max-width:640px)');
  const body = {
    modelName: 'Item',
    filters: {
      slug: slug,
    },
    fields: ['slug', 'title', 'subTitle', 'description', 'media'],
    relations: {
      place: {
        fields: ['name', 'slug'],
      },
      itemMetaData: {
        relations: {
          itemMetaKey: {
            fields: ['name', 'slug'],
          },
        },
        fields: ['value'],
      },
    },
    add_fields: {
      categories: 'first,name,category',
    },
  };
  const [data, loading, getData] = usePost(endPoints.DynamicFilter, body);

  useEffect(() => {
    slug && getData();
  }, [slug]);

  let imageURL =
    data[0] &&
    data[0].media &&
    data[0].media.length > 0 &&
    data[0].media[0]?.url
      ? domain + data[0].media[0]?.url
      : DefautImage1Large;

  const handleCloseModal = () => {
    setSlug('');
    handleClose();
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{ direction: 'ltr', overflowX: 'hidden' }}
    >
      <Stack
        direction={'row'}
        justifyContent={'flex-end'}
        width={'100%'}
      >
        <div
          onClick={handleCloseModal}
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
          padding={2}
          alignItems={'flex-start'}
          sx={{ direction: isArabic ? 'rtl' : 'ltr' }}
        >
          <img
            style={{
              width: isScreen640 ? '100%' : '550px',
              height: isScreen640 ? '200px' : '250px',
              borderRadius: '20px',
            }}
            src={imageURL}
            alt="newsImage"
          />
          <br />
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
                {data[0] && data[0]?.subTitle}
                <br />{' '}
                {data[0] &&
                  data[0]?.itemMetaData &&
                  data[0]?.itemMetaData.length > 0 &&
                  data[0]?.itemMetaData?.map((val: any) => {
                    if (val?.itemMetaKey?.slug == 'date') {
                      return val?.value;
                    }
                  })}
                <br />
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

export default AnnounceModal;
