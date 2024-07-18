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
import { useState } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
  return (
    <Box
      component="footer"
      className={styles.footer}
    >
      <Container maxWidth="lg">
        <p className="text-large-title text-white-new  mt-2">
          Subscribe Our Newsletter
        </p>
        <p className="text-med-fw400 fc-light-white">
          Your Download Should Start Automatically, If Not Click Here. Should I
          Give Up, Huh?
        </p>
        <div className={styles.subscribeForm}>
          <Input
            sx={{
              '--Input-decoratorChildHeight': '3.5rem',
              borderRadius: '2rem',
              width: '32rem',
              marginTop: '2rem',
            }}
            placeholder="mail@mui.com"
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
                Subscribe
              </JoyButton>
            }
          />
        </div>
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
                // columnGap={{ xs: 0, sm: 0, md: 8, lg: 0 }}
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  xs={12}
                  sm={5.5}
                  md={4}
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
                  xs={12}
                  sm={5.5}
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
                        Our Company
                      </p>
                      <p className="opacity-90">About Us</p>
                      <p className="opacity-90">Contact Us</p>
                      <p className="opacity-90">Community</p>
                      <p className="opacity-90">Student Perks</p>
                      <p className="opacity-90">Blog</p>
                      <p className="opacity-90">Affiliate Program</p>
                      <p className="opacity-90">Careers</p>
                    </Box>
                  </Item>
                </Grid>
                <Grid
                  xs={12}
                  sm={5.5}
                  md={4}
                  lg={4}
                  className={styles.lgHeight}
                  sx={{ marginTop: '-1rem' }}
                >
                  <Item>
                    <Box aria-labelledby="category-c">
                      <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                        Support
                      </p>
                      <p className="opacity-90">Documentations</p>
                      <p className="opacity-90">Forums</p>
                      <p className="opacity-90">Languages Packs</p>
                      <p className="opacity-90">Release Status</p>
                    </Box>
                  </Item>
                </Grid>
              </Grid>
              {/* Orange box */}
              <Grid
                xs={12}
                md={5}
                lg={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={0}
              >
                <div className={styles.modeInfo}>
                  <p className="text-white-new fw500 p-0 "> Modee</p>

                  <p className="text-reg fc-light-white p-0">
                    MinisterOffice@modee.gov.jo <br />
                    0096265805700
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
                <Item className="opacity-70">
                  Copyright © 2024ThePlatform. All Right Reserved.
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
                  English
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
              </Grid>
            </Grid>
          </Box>
        </div>
      </Container>
    </Box>
  );
};

export default Footer;
