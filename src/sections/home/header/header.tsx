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
  Avatar,
} from '@mui/material';
import styles from './header.module.css';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { useRouter } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { dummyAvatarImage } from '@/constant/images';
import NormalMenuList from './normalMenuList';
import NestedMenuList from './nestedMenuList';

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
  { id: 5, type: 0, title: 'CONTACT US', link: '#', name: 'ContactUs' },
];
const industryLinks = [
  { id: 0, path: 'ind1', value: 'Sub link 1' },
  { id: 1, path: 'ind2', value: 'Sub link 1' },
];
const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [openIndustry, setOpenIndustry] = useState(false);
  const [anchorElIndustry, setAnchorElIndustry] = useState<null | HTMLElement>(
    null,
  );

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

  const handleCloseIndustry = () => {
    setAnchorElIndustry(null);
    setOpenIndustry(false);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setMenuOpen(newOpen);
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
                      href={'/home'}
                      title={'Home'}
                    />
                    <NormalMenuList
                      indexKey={1}
                      href={'/events-workshops'}
                      title={'Events & Workshops'}
                    />
                    <NormalMenuList
                      indexKey={2}
                      href={'/#'}
                      title={'Book Facility'}
                    />
                    <NormalMenuList
                      indexKey={3}
                      href={'/#'}
                      title={'Mentor'}
                    />

                    <NestedMenuList
                      title={'Industry'}
                      anchorEl={anchorElIndustry}
                      open={openIndustry}
                      handleClick={handleClickIndustry}
                      handleClose={handleCloseIndustry}
                      links={industryLinks}
                    />

                    <NormalMenuList
                      indexKey={5}
                      href={'/#'}
                      title={'Contact Us'}
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
                  <Avatar
                    sx={{ marginInline: '0.4rem' }}
                    alt="avatar image"
                    src={dummyAvatarImage}
                  />
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
