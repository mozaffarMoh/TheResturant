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
  ToggleButtonGroup,
  ToggleButton,
  Switch,
} from '@mui/material';
import styles from './header.module.css';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { logoImage } from '@/constant/images';
import Image from 'next/image';
import LanguageToggle from '@/components/LanguageToggle/LanguageToggle';
import { primaryColor } from '@/constant/color';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isScreen991 = useMediaQuery('(max-width:991px)');
  const langCurrent = pathname?.slice(1, 3) || 'en';
  let isArabic = pathname.startsWith('/ar');
  const [activeValue, setActiveValue] = useState('');
  const isActive = (value: string) => value == activeValue;
  const t = useTranslations();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCsr, setIsCsr] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setMenuOpen(newOpen);
  };

  const menu = [
    {
      title: t('header.features'),
      link: '#features',
    },
    {
      title: t('header.download'),
      link: '#download',
    },
    {
      title: t('header.ui-screens'),
      link: '#ui-screens',
    },
    {
      title: t('header.faq'),
      link: '#faq',
    },
    {
      title: t('header.contact-us'),
      link: '#contact-us',
    },
  ];

  const handleNavigation = (path: string, value: string) => {
    router.push(path);
    setActiveValue(value);
    setMenuOpen(false);
  };

  useEffect(() => {
    !isScreen991 && setMenuOpen(false);
    setIsCsr(true);
  }, [isScreen991]);

  return (
    <Container maxWidth="lg">
      <Grid
        container
        className={styles.header}
      >
        <Grid
          item
          xs={3}
          sm={6}
          md={3}
          paddingTop={1}
        >
          <Image
            width={110}
            height={35}
            src={logoImage}
            alt="logo"
          />
        </Grid>
        <Grid
          item
          md={4}
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
          md={3}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingTop: 10,
          }}
          className={styles.gridLang}
        >
          {isCsr && <LanguageToggle />}
        </Grid>
        {/* Menu Responive */}
        <Grid
          item
          xs={8}
          sm={5}
          md={8}
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
                sx={{ width: 250, height: '100%' }}
                role="presentation"
                onClick={() => toggleDrawer(false)}
                bgcolor={primaryColor}
              >
                <div className={styles.drawerDivLogo}>
                  <Image
                    width={110}
                    height={35}
                    src={logoImage}
                    alt="logo"
                  />
                </div>
                <div style={{ marginTop: 30 }}>
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
                  <LanguageToggle />
                </Stack>
              </Box>
            </Drawer>
          </div>
        </Grid>{' '}
      </Grid>
    </Container>
  );
};

export default Header;
