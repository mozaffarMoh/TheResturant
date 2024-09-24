import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import './Footer.css';
import { Input } from '@mui/joy';
import JoyButton from '@mui/joy/Button';
import { useTranslations } from 'next-intl';
import { secondaryColor } from '@/constant/color';
import {
  FacebookIcon,
  footerBG,
  InstagramIcon,
  LinkedInIcon,
  logoLargeImage,
  TwitterIcon,
  YouTubeIcon,
} from '@/constant/images';
import Image from 'next/image';

const Footer = () => {
  const t = useTranslations();
  const isScreen450 = useMediaQuery('(max-width:450px)');
  const isScreen600 = useMediaQuery('(max-width:600px)');
  const socialIcons = [
    { icon: FacebookIcon },
    { icon: TwitterIcon },
    { icon: InstagramIcon },
    { icon: LinkedInIcon },
    { icon: YouTubeIcon },
  ];
  return (
    <Stack
      sx={{
        background: `url(${footerBG})`,
        backgroundSize: 'cover',
      }}
      height={700}
      color={'white'}
      alignItems={'center'}
      justifyContent={'flex-end'}
      paddingBottom={2}
    >
      <Image
        width={isScreen450 ? 200 : 300}
        height={isScreen450 ? 65 : 100}
        src={logoLargeImage}
        alt="logo"
      />
      <form
        className={'subscribeForm'}
        dir="ltr"
      >
        <Input
          sx={{
            '--Input-decoratorChildHeight': '3.5rem',
            borderRadius: '2rem',
            width: isScreen600 ? '90%' : '32rem',
            marginTop: '2rem',
            paddingLeft: '18px',
          }}
          placeholder="Enter Your Email"
          type="email"
          required
          endDecorator={
            <JoyButton
              variant="solid"
              type="submit"
              sx={{
                width: '100px',
                marginY: '5px',
                marginRight: '-5px',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderRadius: '2rem',
                backgroundColor: secondaryColor,
                '&:hover': {
                  backgroundColor: secondaryColor,
                },
              }}
            >
              {t('footer.subscribe')}
            </JoyButton>
          }
        />
      </form>
      <Stack
        direction={'row'}
        gap={2}
        marginY={2}
      >
        {socialIcons.map((item: any, i: number) => {
          return (
            <Box sx={{ cursor: 'pointer' }}>
              <Image
                src={item.icon}
                width={40}
                height={40}
                alt="socail-icon"
              />
            </Box>
          );
        })}
      </Stack>
      <hr style={{ width: '70%',margin:'10px' }} />
      <Typography variant="caption">
      {t('footer.copyrights')}
      </Typography>
    </Stack>
  );
};

export default Footer;
