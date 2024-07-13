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
import styles from './page.module.css';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { useRouter } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
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
      title: 'HOME',
      link: '/guest-home',
    },
    {
      title: 'About Us',
      link: '/about-us',
    },
    {
      title: 'Services',
      link: '/services',
    },
    {
      title: 'Partners',
      link: '/partners',
    },
    {
      title: 'Contact Us',
      link: '/contact-us',
    },
  ];

  return (
    <div className={styles.headerMainContainer}>
      <div className={styles.headerTopContainer}>
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
                          href="#"
                          key={idx}
                          className={`${styles.menuListItem} ${isActive(item.link) && styles.active}`}
                        >
                          <ListItemText>{item.title}</ListItemText>
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
                    <LanguageIcon className={styles.langIcon} /> English
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Arabic</MenuItem>
                    <MenuItem onClick={handleClose}>English</MenuItem>
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
                    onClick={() => router.push('/register')}
                    className={styles.authButton}
                  >
                    Register
                  </Button>
                  <Button
                    onClick={() => router.push('/sign-in')}
                    className={styles.authButton}
                  >
                    Log In
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
                          onClick={() => router.push('/register')}
                          className={styles.authDrawerButton}
                        >
                          Register
                        </Button>
                        <Button
                          onClick={() => router.push('/sign-in')}
                          className={styles.authDrawerButton}
                        >
                          Log In
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
