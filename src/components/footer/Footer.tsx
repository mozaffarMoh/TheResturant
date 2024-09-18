'use client';
import styles from './footer.module.css';
import {
  Box,
  Paper,
  Container,
  Divider,
  Button,
  MenuItem,
  Menu,
  CircularProgress,
  Skeleton,
  Stack,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { Input } from '@mui/joy';
import JoyButton from '@mui/joy/Button';
import { gray100, gray200 } from '@/constant/color';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { KeyboardArrowDown, X } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import usePost from '@/custom-hooks/usePost';
import { endPoints } from '@/base-api/endPoints';
import CustomAlert from '../alerts/CustomAlert';
import useGet from '@/custom-hooks/useGet';
import Link from 'next/link';
import { getSocialSVG } from '@/constant/getSocialSVG';
import Image from 'next/image';

const Footer = () => {
  const t = useTranslations();
  const router = useRouter();
  const token = Cookies.get('token') || '';
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const langCurrent = pathname?.slice(1, 3) || 'en';
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [email, setEmail] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const [, loading, handlePost, success, , errorMessage] = usePost(
    endPoints.subscribe,
    { email },
    token,
  );

  const [socialMediaData, , getSocial] = useGet(endPoints.socialMedia);
  const [contactUSData, , getContact] = useGet(endPoints.contactUsFooter);
  const [ytjData, ytjLoading, getYtjData] = useGet(endPoints.getYTJ);

  useEffect(() => {
    getSocial();
    getContact();
    getYtjData();
  }, []);

  const menuArray = [
    {
      title: t('header.events-workshops'),
      link: `/${langCurrent}/home/events-workshops`,
    },
    {
      title: t('header.book-facility'),
      link: `/${langCurrent}/home/book-facility`,
    },
    {
      title: t('header.mentors'),
      link: `/${langCurrent}/home/mentors`,
    },
    {
      title: t('header.news'),
      link: `/${langCurrent}/home/industry/news`,
    },
    {
      title: t('header.announcements'),
      link: `/${langCurrent}/home/industry/announcements`,
    },
    {
      title: t('header.contact-us'),
      link: `/${langCurrent}/contact-us`,
    },
  ];
  const linksArray = [
    {
      title: t('footer.about-us'),
      link: `/${langCurrent}/links/tpf-about-us`,
    },
    {
      title: t('footer.terms-of-use'),
      link: `/${langCurrent}/links/tpf-terms-of-use`,
    },
    {
      title: t('footer.privacy-policy'),
      link: `/${langCurrent}/links/tpf-privacy-policy`,
    },
  ];

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
      setEmail('');
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
            value={email}
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
                  md={4}
                  lg={4}
                  display="flex"
                  sx={{ marginTop: '-1rem' }}
                >
                  <Item
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Stack
                      width={'100%'}
                      paddingRight={isArabic ? '50px' : ''}
                      paddingLeft={!isArabic ? '50px' : ''}
                    >
                      <Image
                        src="/logo_white.svg"
                        alt="logo"
                        width={140}
                        height={80}
                      />
                    </Stack>
                    <Stack
                      aria-labelledby="category-a"
                      lineHeight={0.5}
                      alignItems={'flex-start'}
                      marginTop={2}
                    >
                      {contactUSData?.children &&
                        contactUSData?.children.map((item: any) => {
                          return (
                            <p
                              key={item?.id}
                              className={`${item?.slug !== 'address-1' ? 'opacity-80' : ''} text-wrap `}
                            >
                              {item?.value}
                            </p>
                          );
                        })}
                    </Stack>

                    {/* Social Media Icons */}
                    <div className="sm-flex-row-row-center-center gap05  w-full">
                      {socialMediaData?.children &&
                        socialMediaData?.children.map((item: any) => {
                          const SvgIcon = getSocialSVG(item?.slug);
                          return (
                            <Link
                              key={item?.id}
                              href={item?.value}
                              target="_blank"
                              className={styles.socialIconContainer}
                            >
                              <div
                                style={{
                                  margin:
                                    item?.slug == 'x' ? '5px 0px 0px 4px' : '',
                                }}
                              >
                                {SvgIcon && <SvgIcon />}
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                  </Item>
                </Grid>
                <Grid
                  md={4}
                  lg={4}
                  display="flex"
                  justifyContent={{
                    xs: 'center',
                    md: 'center',
                    lg: 'flex-end',
                  }}
                  sx={{ textAlign: 'start' }}
                >
                  <Box aria-labelledby="category-b">
                    <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                      {t('footer.menu')}
                    </p>
                    {menuArray.map((item: any, i: number) => {
                      return (
                        <p
                          key={i}
                          className={styles.navigationLink}
                          onClick={() => router.push(item.link)}
                        >
                          {item.title}
                        </p>
                      );
                    })}
                  </Box>
                </Grid>
                <Grid
                  md={4}
                  lg={4}
                  height={'20rem'}
                  display="flex"
                  justifyContent={{
                    xs: 'center',
                    md: 'center',
                    lg: 'flex-end',
                  }}
                  alignItems={'flex-start'}
                  sx={{ textAlign: 'start' }}
                >
                  <Box aria-labelledby="category-b">
                    <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                      {t('footer.links')}
                    </p>
                    {linksArray.map((item: any, i: number) => {
                      return (
                        <p
                          key={i}
                          className={styles.navigationLink}
                          onClick={() => router.push(item.link)}
                        >
                          {item.title}
                        </p>
                      );
                    })}
                  </Box>
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
                {ytjLoading ? (
                  <div className={styles.modeInfo}>
                    <Skeleton
                      variant="text"
                      width="100px"
                    />
                    <Skeleton
                      variant="text"
                      width="150px"
                    />
                    <Skeleton
                      variant="text"
                      width="120px"
                    />
                  </div>
                ) : (
                  <div className={styles.modeInfo}>
                    <p className="text-white-new fw500 p-0 ">
                      {ytjData?.value}
                    </p>

                    <p className="text-reg fc-light-white p-0">
                      {ytjData?.children &&
                        ytjData?.children.map((item: any,i:number) => {
                          return (
                            <div key={i}>
                              {item?.value}
                              <br />
                            </div>
                          );
                        })}
                    </p>
                  </div>
                )}
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
                <Item
                  className="opacity-70"
                  style={{ direction: 'ltr' }}
                >
                  {isArabic && <bdi> 2024© </bdi>}
                  {t('footer.copyRights')}
                  {!isArabic && <bdi> ©2024</bdi>}
                </Item>
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
