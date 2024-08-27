'use client';
import styles from './footer.module.css';
import {
  Box,
  Typography,
  Paper,
  Container,
  Divider,
  Button,
  MenuItem,
  Menu,
  CircularProgress,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

import { Input } from '@mui/joy';
import JoyButton from '@mui/joy/Button';
import { gray100, gray200 } from '@/constant/color';
import {
  FaceBookSVG,
  InstagramSVG,
  LinkedInSVG,
  TwitterSVG,
} from '../../../assets/icons';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import usePost from '@/custom-hooks/usePost';
import { endPoints } from '@/base-api/endPoints';
import CustomAlert from '../alerts/CustomAlert';

const Footer = () => {
  const t = useTranslations();
  const router = useRouter();
  const token = Cookies.get('token') || '';
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [email, setEmail] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const [, loading, handlePost, success, , errorMessage] = usePost(
    endPoints.subscribe,
    { email },
    token,
  );

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: 'white',
    boxShadow: 'none',
  }));
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const changeLanguage = (locale: string) => {
    // If the current locale is the same as the target locale, do nothing
    if (pathname.startsWith(`/${locale}`)) {
      handleClose();
    }
    const newPathname = `/${locale}${pathname.replace(/^\/(en|ar)/, '')}`;
    Cookies.set('NEXT_LOCALE', locale);
    router.push(newPathname);
    handleClose();
  };

  const handleSubscribe = (e: any) => {
    e.preventDefault();
    handlePost();
  };

  useEffect(() => {
    if (success) {
      setSuccessMessage(t('messages.subscribe'));
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    }
  }, [success]);

  return (
    <Box
      component="footer"
      className={styles.footer}
    >
      {' '}
      <CustomAlert
        openAlert={errorMessage}
        setOpenAlert={() => {}}
        message={errorMessage}
      />
      <CustomAlert
        openAlert={Boolean(successMessage)}
        setOpenAlert={() => setSuccessMessage('')}
        type="success"
        message={successMessage}
      />
      <Container maxWidth="lg">
        <p className="text-large-title text-white-new  mt-2">
          {t('footer.title')}
        </p>
        <p className="text-med-fw400 fc-light-white">{t('footer.subtitle')}</p>
        <form
          onSubmit={handleSubscribe}
          className={styles.subscribeForm}
          dir="ltr"
        >
          <Input
            sx={{
              '--Input-decoratorChildHeight': '3.5rem',
              borderRadius: '2rem',
              width: '32rem',
              marginTop: '2rem',
            }}
            placeholder="mail@mui.com"
            onChange={(e: any) => setEmail(e.target.value)}
            type="email"
            required
            endDecorator={
              <JoyButton
                variant="solid"
                type="submit"
                sx={{
                  width: 'clamp(6rem, 2.4499rem + 9.8613vw, 10rem)',
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderRadius: '2rem',
                  backgroundColor: gray100,
                  '&:hover': {
                    backgroundColor: gray200,
                  },
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={20}
                    color="inherit"
                  />
                ) : (
                  t('footer.subscribe')
                )}
              </JoyButton>
            }
          />
        </form>
        <Divider
          sx={{
            backgroundColor: 'rgb(255,255,255,0.2)',
            borderRadius: '4px',
          }}
        />
        <div className="mt-1">
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={2}
              className={styles.mainContainer}
            >
              <Grid
                container
                xs={12}
                md={12}
                lg={8}
                xl={12}
                // columnGap={{ xs: 0, sm: 0, md: 8, lg: 0 }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid
                  md={5}
                  lg={4}
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ marginTop: '-1rem' }}
                >
                  <Item>
                    <img
                      src="/logo_white.svg"
                      alt="logo"
                      width={140}
                    />
                    <Box aria-labelledby="category-a">
                      <p className="text-wrap">2301 AMMAN . JORDAN, WI 53711</p>
                      <p className="opacity-80 text-wrap">123 456 7890</p>
                      <p className="opacity-80 text-wrap">
                        support@ThePlatform.com
                      </p>
                      {/* Social Media Icons */}

                      <div className="sm-flex-row-row-center-center gap05  w-full">
                        <div className={styles.socialIconContainer}>
                          <FaceBookSVG />
                        </div>
                        <div className={styles.socialIconContainer}>
                          <TwitterSVG />
                        </div>
                        <div className={styles.socialIconContainer}>
                          <InstagramSVG />
                        </div>
                        <div className={styles.socialIconContainer}>
                          <LinkedInSVG />
                        </div>
                      </div>
                    </Box>
                  </Item>
                </Grid>
                <Grid
                  md={4}
                  lg={4}
                  display="flex"
                  justifyContent={{
                    xs: 'flex-start',
                    md: 'flex-start',
                    lg: 'center',
                  }}
                >
                  <Item>
                    <Box aria-labelledby="category-b">
                      <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                        {t('footer.our-company')}
                      </p>
                      <p className="opacity-90">{t('footer.about-us')}</p>
                      <p className="opacity-90">{t('footer.contact-us')}</p>
                      <p className="opacity-90">{t('footer.community')}</p>
                      <p className="opacity-90">{t('footer.student-perks')}</p>
                      <p className="opacity-90">{t('footer.blog')}</p>
                      <p className="opacity-90">
                        {t('footer.affiliate-program')}
                      </p>
                      <p className="opacity-90">{t('footer.careers')}</p>
                    </Box>
                  </Item>
                </Grid>
                <Grid
                  md={3}
                  lg={4}
                  className={styles.lgHeight}
                  sx={{ marginTop: '-1rem' }}
                >
                  <Item>
                    <Box aria-labelledby="category-c">
                      <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                        {t('footer.support')}
                      </p>
                      <p className="opacity-90">{t('footer.documentations')}</p>
                      <p className="opacity-90">{t('footer.forums')}</p>
                      <p className="opacity-90">
                        {t('footer.languages-packs')}
                      </p>
                      <p className="opacity-90">{t('footer.release-status')}</p>
                    </Box>
                  </Item>
                </Grid>
              </Grid>
              {/* Orange box */}
              <Grid
                xs={12}
                md={5}
                lg={4}
                xl={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={0}
              >
                <div className={styles.modeInfo}>
                  <p className="text-white-new fw500 p-0 ">YTJ</p>

                  <p className="text-reg fc-light-white p-0">
                    YTJInfo@modee.gov.jo <br />
                    0776317207
                  </p>
                </div>
              </Grid>
            </Grid>
            <Grid
              xs={12}
              container
              justifyContent="space-between"
              alignItems="center"
              flexDirection={{ xs: 'column', sm: 'row' }}
              sx={{ fontSize: '12px' }}
            >
              <Grid sx={{ order: { xs: 2, sm: 1 } }}>
                <Item className="opacity-70">{t('footer.copyRights')}</Item>
              </Grid>
              <Grid
                container
                columnSpacing={1}
                sx={{ order: { xs: 1, sm: 2 } }}
              >
                <Button
                  id="basic-button"
                  onClick={handleClick}
                  className={styles.langMenuButton}
                  startIcon={<LanguageIcon className={styles.langIcon} />}
                  endIcon={<KeyboardArrowDown />}
                  sx={{
                    textTransform: 'none !Important',
                    color: 'white',
                    opacity: '0.7',
                  }}
                >
                  <p style={{ margin: isArabic ? '0px 10px' : '' }}>
                    {isArabic ? t('lang.ar') : t('lang.en')}
                  </p>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => changeLanguage('en')}>
                    {t('lang.en')}
                  </MenuItem>
                  <MenuItem onClick={() => changeLanguage('ar')}>
                    {t('lang.ar')}
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Container>
    </Box>
  );
};

export default Footer;
