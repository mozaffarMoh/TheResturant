import { Container, Stack, Typography, useMediaQuery } from '@mui/material';
import { domain } from '@/base-api/endPoints';
import { DefautImage1 } from '@/constant/images';
import { primaryColor } from '@/constant/color';
import { PlaySVG } from '../../../../assets/icons';
import VideoModal from '@/components/modals/VideoModal';
import { useState } from 'react';
import CustomSkeleton from '@/components/skeleton/CustomSkeleton';

const VideoSection = ({ data, loading }: any) => {
  const [openVideo, setOpenVideo] = useState(false);
  const isScreen1100 = useMediaQuery('(max-width:1100px)');
  let imageURL = data?.media?.[0]?.url
    ? domain + data?.media[0]?.url
    : DefautImage1;
  const words = (data?.value && data?.value?.split(' ')) || [];

  return (
    <Container className="mt-4 max-w-md-65">
      <Stack
        direction={isScreen1100 ? 'column-reverse' : 'row'}
        marginTop={10}
        padding={2}
        bgcolor={primaryColor}
        gap={3}
        borderRadius={4}
      >
        <Stack
          alignItems={'center'}
          width={'100%'}
          height={isScreen1100 ? '300px' : '100%'}
          position={'relative'}
        >
          {loading ? (
            <CustomSkeleton
              variant="rectangular"
              bgcolor="grey.300"
              width="100%"
              height="300px"
            />
          ) : (
            <img
              style={{ borderRadius: 20, width: '100%', height: '100%' }}
              src={imageURL}
              alt="about us Section"
            />
          )}
          {imageURL.includes(domain) && (
            <Stack
              position={'absolute'}
              top={'40%'}
              left={'45%'}
              bgcolor={'white'}
              padding={1}
              borderRadius={2}
              sx={{ cursor: 'pointer' }}
              onClick={() => setOpenVideo(true)}
            >
              <PlaySVG />
            </Stack>
          )}
        </Stack>
        <Stack
          alignItems={'flex-start'}
          justifyContent={'center'}
          gap={2}
        >
          {loading ? (
            <CustomSkeleton
              bgcolor="grey.300"
              width="300px"
              height="40px"
            />
          ) : (
            <Typography
              color={'#eb6b2a'}
              className={`text-xlarge-title-secondary p-0 m-0`}
            >
              {words?.[0]}
            </Typography>
          )}
          {loading ? (
            <CustomSkeleton
              bgcolor="grey.300"
              width="350px"
              height="40px"
            />
          ) : (
            <Typography color={'white'}>
              {words.slice(1, words.length).join(' ')}
            </Typography>
          )}
        </Stack>
      </Stack>
      <VideoModal
        open={openVideo}
        handleClose={() => setOpenVideo(false)}
        videoId={'HQb-FMBfjw4'}
      />
    </Container>
  );
};

export default VideoSection;
