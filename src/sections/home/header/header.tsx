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
  Typography,
  Stack,
  Select,
  useMediaQuery,
} from '@mui/material';
import styles from './header.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import NormalMenuList from './normalMenuList';
import NestedMenuList from './nestedMenuList';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';

const Header = () => {
  const t = useTranslations();
  const router = useRouter();
  const isScreen991 = useMediaQuery('(max-width:991px)');
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const langCurrent = pathname.slice(1, 3) || 'en';

  const menu = [
    {
      title: t('header.home'),
      link: `/${langCurrent}/home`,
    },

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
      title: t('header.industry'),
      link: '#',
      isList: true,
    },
    {
      title: t('header.contact-us'),
      link: `/${langCurrent}/contact-us`,
    },
  ];

  const isActive = (path: string) => pathname == path;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [openIndustry, setOpenIndustry] = useState(false);
  const [anchorElIndustry, setAnchorElIndustry] = useState<null | HTMLElement>(
    null,
  );

  const industryLinks = [
    {
      id: 0,
      path: `/${langCurrent}/home/industry/news`,
      value: t('header.news'),
    },
    {
      id: 1,
      path: `/${langCurrent}/home/industry/announcements`,
      value: t('header.announcements'),
    },
  ];
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClickIndustry = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElIndustry(event.currentTarget);
    setOpenIndustry(true);
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

  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
    setOpen2(true);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
    setOpen2(false);
  };

  const handleCloseIndustry = () => {
    setAnchorElIndustry(null);
    setOpenIndustry(false);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    router.push(`/${langCurrent}/sign-in`);
  };

  useEffect(() => {
    !isScreen991 && setMenuOpen(false);
  }, [isScreen991]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className={styles.headerFullContainer}>
      {/* Top banner Partners */}
      <Container maxWidth="lg">
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
      {/* End of Top Banner Partners */}
      <div className={`${styles.headerContainer}`}>
        <Container
          className="pt-1 "
          maxWidth="lg"
        >
          <div className={styles.headerDiv}>
            <Grid
              container
              className={styles.headerDivContainer}
            >
              {/* Logo Section */}
              <Grid
                item
                xs={8}
                sm={10}
                md={2}
                sx={{ cursor: 'pointer' }}
                onClick={() => router.push(`/${langCurrent}/home`)}
              >
                <img
                  src="/logo_white.svg"
                  alt="logo"
                  className={styles.logoImg}
                />
              </Grid>
              {/* Links section */}
              <Grid
                item
                md={8}
                className={styles.gridMenu}
              >
                <div className={styles.MenuDiv}>
                  <MenuList className={styles.menuListStyle}>
                    <NormalMenuList
                      indexKey={0}
                      href={`/${langCurrent}/home`}
                      title={t('header.home')}
                    />
                    <NormalMenuList
                      indexKey={1}
                      href={`/${langCurrent}/home/events-workshops`}
                      title={t('header.events-workshops')}
                    />
                    <NormalMenuList
                      indexKey={2}
                      href={`/${langCurrent}/home/book-facility`}
                      title={t('header.book-facility')}
                    />
                    <NormalMenuList
                      indexKey={3}
                      href={`/${langCurrent}/home/mentors`}
                      title={t('header.mentors')}
                    />

                    <NestedMenuList
                      title={t('header.industry')}
                      anchorEl={anchorElIndustry}
                      open={openIndustry}
                      handleClick={handleClickIndustry}
                      handleClose={handleCloseIndustry}
                      links={industryLinks}
                    />

                    <NormalMenuList
                      indexKey={5}
                      href={`/${langCurrent}/contact-us`}
                      title={t('header.contact-us')}
                    />
                  </MenuList>
                </div>
              </Grid>
              {/* lang and avatar section */}
              <Grid
                item
                md={2}
                className={styles.gridAuthButton}
              >
                <div className={styles.authDivButton}>
                  <div className={styles.langButton}>
                    <Button
                      id="basic-button"
                      onClick={handleClick}
                      className={styles.langMenuButton}
                      sx={{ textTransform: 'none !Important' }}
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

                  <div className={styles.langButton}>
                    <Button
                      id="basic-button2"
                      onClick={handleClick2}
                      className={styles.langMenuButton}
                      sx={{ textTransform: 'none !Important' }}
                    >
                      {t('header.my-account')}
                    </Button>
                    <Menu
                      id="basic-menu2"
                      anchorEl={anchorEl2}
                      open={open2}
                      onClose={handleClose2}
                    >
                      <MenuItem onClick={handleLogout}>
                        {t('header.logout')}
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </Grid>

              {/* nav mobile responsive */}
              <Grid
                item
                xs={4}
                sm={2}
                md={10}
                className={styles.sideMenu}
              >
                <div>
                  <Button
                    onClick={() => setMenuOpen(true)}
                    className={styles.hamburgerButtonMenu}
                  >
                    <MenuIcon className={styles.hamburgerMenu} />
                  </Button>
                  <Drawer
                    open={menuOpen}
                    onClose={() => setMenuOpen(false)}
                    anchor={isArabic ? 'right' : 'left'}
                  >
                    <Box
                      sx={{ width: 250 }}
                      role="presentation"
                      // Remove onClick handler here to prevent closing on interaction
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
                            menu.map((item: any, idx: number) => {
                              return (
                                <MenuItem
                                  className={`${styles.menuItemDrawer} ${isActive(item.link) && styles.drawerActive}`}
                                  key={idx}
                                >
                                  {item?.isList ? (
                                    <NestedMenuList
                                      title={t('header.industry')}
                                      anchorEl={anchorElIndustry}
                                      open={openIndustry}
                                      handleClick={handleClickIndustry}
                                      handleClose={handleCloseIndustry}
                                      links={industryLinks}
                                    />
                                  ) : (
                                    <NormalMenuList
                                      indexKey={5}
                                      href={item.link}
                                      title={item.title}
                                    />
                                  )}
                                </MenuItem>
                              );
                            })}
                        </MenuList>
                      </div>
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
                          onClick={handleLogout}
                          className={styles.authDrawerButton}
                        >
                          {t('header.logout')}
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

export default Header;
