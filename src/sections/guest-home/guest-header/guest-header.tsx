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
import styles from './guest-header.module.css';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { useRouter } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const GuestHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const changeLanguage = (lang: string) => {
    setAnchorEl(null);
    setOpen(false);
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
      link: '/guest-home',
    },
    {
      title: t('guest-home.about-us'),
      link: '#',
    },
    {
      title: t('guest-home.services'),
      link: '#',
    },
    {
      title: t('guest-home.partners'),
      link: '#',
    },
    {
      title: t('guest-home.contact-us'),
      link: '#',
    },
  ];

  return (
    <div>
      <div>
        <Container>
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
      </div>
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
                          className={`${styles.menuListItem} ${isActive(item.link) && styles.active}`}
                        >
                          <Link
                            href={item.link}
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
                    <LanguageIcon className={styles.langIcon} /> {t('lang.en')}
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
                    onClick={() => router.push('/sign-up')}
                    className={styles.authButton}
                  >
                    {t('auth.signup-title')}
                  </Button>
                  <Button
                    onClick={() => router.push('/sign-in')}
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
                            menu.map((item, idx) => (
                              <MenuItem
                                href="#"
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
                          onClick={() => router.push('/sign-up')}
                          className={styles.authDrawerButton}
                        >
                           {t('auth.signup-button')}
                        </Button>
                        <Button
                          onClick={() => router.push('/sign-in')}
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
