import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import { primaryColor } from '@/constant/color';
import newsImage from '../../../public/industry/news/dialog.png';
import Image from 'next/image';
import CloseSVG from '../../../assets/icons/close';

interface IndustryNewsModalProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

const IndustryNewsModal: React.FC<IndustryNewsModalProps> = ({
  open,
  onClose,
}) => {
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
        alignItems={'center'}
      >
        <DialogTitle>
          <Typography
            variant="h6"
            fontFamily={'Nobile'}
            color={primaryColor}
            textTransform={'capitalize'}
            fontWeight={600}
          >
            Keep your face always toward the sunshine - and shadows will fall
            behind you.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography
              variant="body2"
              fontFamily={'Jost'}
            >
              Master Figma app to get a job in UI Design, User Interface, User
              Experience design, Web Design & UX design.
              <br /> April 06, 2020 <br />
              <span style={{ color: 'red' }}>Art</span>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <Image
          style={{ width: '100%', height: '150px', borderRadius: '20px' }}
          src={newsImage}
          alt="newsImage"
        />
        <br />
        <br />
        <DialogTitle alignSelf={'flex-start'}>
          <Typography
            variant="body2"
            fontFamily={'Nobile'}
            color={primaryColor}
            fontWeight={600}
          >
            Course Description
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography
              variant="body2"
              fontFamily={'Jost'}
            >
              Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec.
              Quisque bibendum orci ac nibh facilisis, at malesuada orci congue.
              Nullam tempus sollicitudin cursus. Ut et adipiscing erat.
              Curabitur this is a text link libero tempus congue.
              <br />
              <br />
              <br />
              Duis mattis laoreet neque, et ornare neque sollicitudin at. Proin
              sagittis dolor sed mi elementum pretium. Donec et justo ante.
              Vivamus egestas sodales est, eu rhoncus urna semper eu. Cum sociis
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Integer tristique elit lobortis purus bibendum,
              quis dictum metus mattis. Phasellus posuere felis sed eros
              porttitor mattis. Curabitur massa magna, tempor in blandit id,
              porta in ligula. Aliquam laoreet nisl massa, at interdum mauris
              sollicitudin et.
              <span style={{ color: 'red' }}>Art</span>
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Stack>
    </Dialog>
  );
};

export default IndustryNewsModal;
