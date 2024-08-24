'use client';
import {
  Button,
  Container,
  Grid,
  ListItemText,
  MenuItem,
  MenuList,
  Menu,
  Drawer,
  Box,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import styles from './guest-header.module.css';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { useRouter } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';

const GuestHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isScreen991 = useMediaQuery('(max-width:991px)');
  const langCurrent = pathname.slice(1, 3) || 'en';
  let isArabic = pathname.startsWith('/ar');
  const [activeValue, setActiveValue] = useState('');
  const isActive = (value: string) => value == activeValue;
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
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

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setMenuOpen(newOpen);
  };

  const menu = [
    {
      title: t('guest-home.home'),
      link: '#home',
    },
    {
      title: t('guest-home.about-us'),
      link: '#about',
    },
    {
      title: t('guest-home.services'),
      link: '#services',
    },
    {
      title: t('guest-home.partners'),
      link: '#partners',
    },
    {
      title: t('guest-home.contact-us'),
      link: '#contact',
    },
  ];

  const handleNavigation = (path: string, value: string) => {
    router.push(path);
    setActiveValue(value);
    setMenuOpen(false);
  };

  useEffect(() => {
    !isScreen991 && setMenuOpen(false);
  }, [isScreen991]);
  
  return (
    <div className={styles.headerGuestContainer}>
      <Box
        width={'100%'}
        bgcolor={'white'}
      >
        <Container>
          <Grid
            container
            className={styles.headerTopDivContainer}
          >
            <div>
              <img
                src="/entrepreneurship.png"
                alt="entrepreneurship"
              />
            </div>
            <div>
              <img
                src="/youth.png"
                alt="youth"
              />
            </div>
          </Grid>
        </Container>
      </Box>
      <div className={styles.headerContainer}>
        <Container>
          <div className={styles.headerDiv}>
            <Grid
              container
              className={styles.headerDivContainer}
            >
              <Grid
                item
                xs={8}
                sm={10}
                md={2}
                lg={2}
                xl={2}
              >
                <img
                  src="/logo_white.svg"
                  alt="logo"
                  className={styles.logoImg}
                />
              </Grid>
              <Grid
                item
                md={5}
                lg={5}
                xl={6}
                className={styles.gridMenu}
              >
                <div className={styles.MenuDiv}>
                  <MenuList className={styles.menuListStyle}>
                    {menu &&
                      menu.map((item, idx) => (
                        <MenuItem
                          key={idx}
                          className={`${styles.menuListItem} ${isActive(item.title) && styles.active}`}
                        >
                          <Link
                            href={`/${langCurrent}/${item.link}`}
                            onClick={() => setActiveValue(item.title)}
                            style={{ all: 'inherit' }}
                          >
                            <ListItemText>{item.title}</ListItemText>
                          </Link>
                        </MenuItem>
                      ))}
                  </MenuList>
                </div>
              </Grid>
              <Grid
                item
                md={2}
                lg={2}
                xl={2}
                className={styles.gridLang}
              >
                <div className={styles.langButton}>
                  <Button
                    id="basic-button"
                    onClick={handleClick}
                    className={styles.langMenuButton}
                  >
                    <LanguageIcon className={styles.langIcon} />{' '}
                    {isArabic ? t('lang.ar') : t('lang.en')}
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => changeLanguage('ar')}>
                      {t('lang.ar')}
                    </MenuItem>
                    <MenuItem onClick={() => changeLanguage('en')}>
                      {t('lang.en')}
                    </MenuItem>
                  </Menu>
                </div>
              </Grid>
              <Grid
                item
                md={3}
                lg={3}
                xl={2}
                className={styles.gridAuthButton}
              >
                <div className={styles.authDivButton}>
                  <Button
                    onClick={() => router.push(`/${langCurrent}/sign-up`)}
                    className={styles.authButton}
                  >
                    {t('auth.signup-title')}
                  </Button>
                  <Button
                    onClick={() => router.push(`/${langCurrent}/sign-in`)}
                    className={styles.authButton}
                  >
                    {t('auth.signin-title')}
                  </Button>
                </div>
              </Grid>
              <Grid
                item
                xs={4}
                sm={2}
                md={10}
                className={styles.sideMenu}
              >
                <div>
                  <Button
                    onClick={toggleDrawer(true)}
                    className={styles.hamburgerButtonMenu}
                  >
                    <MenuIcon className={styles.hamburgerMenu} />
                  </Button>
                  <Drawer
                    open={menuOpen}
                    onClose={toggleDrawer(false)}
                    anchor={isArabic ? 'right' : 'left'}
                  >
                    <Box
                      sx={{ width: 250 }}
                      role="presentation"
                      onClick={() => toggleDrawer(false)}
                    >
                      <div className={styles.drawerDivLogo}>
                        <img
                          src="/logo.svg"
                          alt="logo"
                          className={styles.drawerLogo}
                        />
                      </div>
                      <div>
                        <MenuList className={styles.menuListDrawer}>
                          {menu &&
                            menu.map((item, idx) => (
                              <MenuItem
                                href="#"
                                key={idx}
                                className={`${styles.menuItemDrawer} ${isActive(item.title) && styles.drawerActive}`}
                                onClick={() =>
                                  handleNavigation(item.link, item.title)
                                }
                              >
                                <ListItemText>{item.title}</ListItemText>
                              </MenuItem>
                            ))}
                        </MenuList>
                      </div>{' '}
                      <Stack
                        className={styles.langButton}
                        alignItems={'flex-start'}
                        paddingX={2}
                        paddingBottom={3}
                      >
                        <Button
                          id="basic-button"
                          onClick={handleClick}
                          className={styles.langMenuButton}
                          sx={{ textTransform: 'none !Important' }}
                        >
                          <LanguageIcon
                            className={styles.langIcon}
                            color="action"
                          />{' '}
                          <Typography color={'black'}>
                            {isArabic ? t('lang.ar') : t('lang.en')}
                          </Typography>{' '}
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={() => changeLanguage('ar')}>
                            {t('lang.ar')}
                          </MenuItem>
                          <MenuItem onClick={() => changeLanguage('en')}>
                            {t('lang.en')}
                          </MenuItem>
                        </Menu>
                      </Stack>
                      <div className={styles.authDrawerDivButton}>
                        <Button
                          onClick={() => router.push(`/${langCurrent}/sign-up`)}
                          className={styles.authDrawerButton}
                        >
                          {t('auth.signup-button')}
                        </Button>
                        <Button
                          onClick={() => router.push(`/${langCurrent}/sign-in`)}
                          className={styles.authDrawerButton}
                        >
                          {t('auth.signin-button')}
                        </Button>
                      </div>
                    </Box>
                  </Drawer>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default GuestHeader;
