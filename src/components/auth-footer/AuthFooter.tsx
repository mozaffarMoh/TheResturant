'use client';
import styles from './auth-footer.module.css';
import { Box, CircularProgress } from '@mui/material';
import { Input } from '@mui/joy';
import JoyButton from '@mui/joy/Button';
import { gray100, gray200 } from '@/constant/color';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import usePost from '@/custom-hooks/usePost';
import { endPoints } from '@/base-api/endPoints';
import CustomAlert from '../alerts/CustomAlert';
import Link from 'next/link';
import useGet from '@/custom-hooks/useGet';
import { getSocialSVG } from '@/constant/getSocialSVG';

const AuthFooter = () => {
  const t = useTranslations();
  const [email, setEmail] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const [, loading, handlePost, success, , errorMessage] = usePost(
    endPoints.subscribe,
    { email },
  );
  const [socialMediaData, , getSocial] = useGet(endPoints.socialMedia);

  useEffect(() => {
    getSocial();
  }, []);

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
          onChange={(e: any) => setEmail(e.target.value)}
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
      {/* Social Media Icons */}
      <div className="sm-flex-row-row-center-center">
        <div className="sm-flex-row-row-center-center gap05  w-50">
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
                      margin: item?.slug == 'x' ? '5px 0px 0px 4px' : '',
                    }}
                  >
                    {SvgIcon && <SvgIcon />}
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      {/* Orange box */}
      <div className="sm-flex-row-row-center-center">
        <div className={styles.modeInfo}>
          <p className="text-med-fw600 text-white-new">YTJ</p>
          <div>
            <div>
              <p className="text-reg fc-light-white">
                YTJInfo@modee.gov.jo <br />
                0776317207
              </p>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default AuthFooter;
