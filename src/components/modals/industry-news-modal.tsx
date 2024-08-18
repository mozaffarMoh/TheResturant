import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { primaryColor } from '@/constant/color';
import Image from 'next/image';
import CloseSVG from '../../../assets/icons/close';
import { DefautImage1Large } from '@/constant/images';
import { domain } from '@/base-api/endPoints';

interface IndustryNewsModalProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  data: any;
}

const IndustryNewsModal: React.FC<IndustryNewsModalProps> = ({
  open,
  onClose,
  data,
}) => {
  let imageURL =
    data && data?.media && data.media.length > 0 && data.media[0]?.url
      ? domain + data.media[0]?.url
      : DefautImage1Large;

  return (
    <Dialog
      open={open}
      sx={{ borderRadius: '50px' }}
    >
      <Stack
        direction={'row'}
        justifyContent={'flex-end'}
        width={'100%'}
      >
        <div
          onClick={() => onClose(false)}
          style={{ margin: '10px', cursor: 'pointer' }}
        >
          <CloseSVG />
        </div>
      </Stack>
      <Stack
        padding={5}
        alignItems={'flex-start'}
      >
        <DialogTitle>
          <Typography
            variant="h6"
            fontFamily={'Nobile'}
            color={primaryColor}
            textTransform={'capitalize'}
            fontWeight={600}
          >
            {data?.title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography
              variant="body2"
              fontFamily={'Jost'}
            >
              {data?.subTitle}
              <br /> {data?.created_at} <br />
              <span style={{ color: 'red' }}>{data.category}</span>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <img
          style={{ width: '100%', height: '250px', borderRadius: '20px' }}
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
              <div dangerouslySetInnerHTML={{ __html: data?.description }} />
              <span style={{ color: 'red' }}>{data?.category}</span>
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Stack>
    </Dialog>
  );
};

export default IndustryNewsModal;
