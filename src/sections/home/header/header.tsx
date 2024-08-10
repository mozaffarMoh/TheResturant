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
} from '@mui/material';
import styles from './header.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import NormalMenuList from './normalMenuList';
import NestedMenuList from './nestedMenuList';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';

// type 0 means normal link , type 1 means menu link (dropdown link)
const menu = [
  {
    id: 0,
    type: 0,
    title: 'HOME',
    link: '/home',
    name: 'Home',
  },

  { id: 1, type: 0, title: 'EVENTS & WORKSHOPS', link: '#', name: 'Events' },
  { id: 2, type: 0, title: 'BOOK FACULTY', link: '#', name: 'BokFaculty' },
  { id: 3, type: 0, title: 'MENTORS', link: '#', name: 'Mentors' },
  {
    id: 4,
    type: 1,
    title: 'THE INDUSTRY',
    link: '#',
    links: [
      { id: 0, path: 'ind1', value: 'ind1' },
      { id: 1, path: 'ind2', value: 'ind2' },
    ],
    name: 'Industry',
  },
  { id: 5, type: 0, title: 'CONTACT US', link: '/', name: 'ContactUs' },
];

const Header = () => {
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');

  const isActive = (path: string) => pathname === path;

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [open2, setOpen2] = useState(false);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [menuOpen2, setMenuOpen2] = useState(false);

  const [openIndustry, setOpenIndustry] = useState(false);
  const [anchorElIndustry, setAnchorElIndustry] = useState<null | HTMLElement>(
    null,
  );

  const industryLinks = [
    {
      id: 0,
      path: `/${langCookie}/home/industry/news`,
      value: t('header.news'),
    },
    {
      id: 1,
      path: `/${langCookie}/home/industry/announcements`,
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

  const toggleDrawer = (newOpen: boolean) => () => {
    setMenuOpen(newOpen);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    router.push(`/${langCookie}/sign-in`);
  };

  return (
    <div>
      {/* Top banner Partners */}
      <Container maxWidth="lg">
        <Grid
          container
          className={styles.headerTopDivContainer}
        >
          <div>
            <img
              src="/bank.png"
              alt="bank"
            />
          </div>
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
                      href={`/${langCookie}/home`}
                      title={t('header.home')}
                    />
                    <NormalMenuList
                      indexKey={1}
                      href={`/${langCookie}/home/events-workshops`}
                      title={t('header.events-workshops')}
                    />
                    <NormalMenuList
                      indexKey={2}
                      href={`/${langCookie}/home/book-facility`}
                      title={t('header.book-facility')}
                    />
                    <NormalMenuList
                      indexKey={3}
                      href={`/${langCookie}/home/mentors`}
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
                      href={`/${langCookie}/contact-us`}
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
                    onClick={toggleDrawer(true)}
                    className={styles.hamburgerButtonMenu}
                  >
                    <MenuIcon className={styles.hamburgerMenu} />
                  </Button>
                  <Drawer
                    open={menuOpen}
                    onClose={toggleDrawer(false)}
                  >
                    <Box
                      sx={{ width: 250 }}
                      role="presentation"
                      onClick={toggleDrawer(false)}
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
                            menu.map((item: any, idx: number) => (
                              <MenuItem
                                href={`/${langCookie}/${item.link}`}
                                key={idx}
                                className={`${styles.menuItemDrawer} ${isActive(item.link) && styles.drawerActive}`}
                              >
                                <ListItemText>{item.title}</ListItemText>
                              </MenuItem>
                            ))}
                        </MenuList>
                      </div>
                      <div className={styles.authDrawerDivButton}>
                        <Button
                          onClick={() => router.push(`/${langCookie}/sign-up`)}
                          className={styles.authDrawerButton}
                        >
                          {t('auth.signup-title')}
                        </Button>
                        <Button
                          onClick={() => router.push(`/${langCookie}/sign-in`)}
                          className={styles.authDrawerButton}
                        >
                          {t('auth.signin-title')}
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
