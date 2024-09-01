import { Box, Container, Grid, Stack, useMediaQuery } from '@mui/material';
import styles from './contact-us.module.css';
import ContactUsSectionCard from '@/components/cards/contact-us-section/contactUsSectionCard';
import ContactUsForm from './contact-us-form/contactUsForm';
import { useTranslations } from 'next-intl';
import useGet from '@/custom-hooks/useGet';
import { endPoints } from '@/base-api/endPoints';
import { useEffect } from 'react';
import CustomSkeleton from '@/components/skeleton/CustomSkeleton';
import { getSocialSVG } from '@/constant/getSocialSVG';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShareSVG } from '../../../../assets/icons';

const ContactUsSection = () => {
  const isScreen700 = useMediaQuery('(max-width:700px)');
  const isScreen500 = useMediaQuery('(max-width:500px)');
  const t = useTranslations();
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const [data, loading, getData] = useGet(endPoints.contactUsDetials);
  const [socialMediaData, , getSocial] = useGet(endPoints.socialMedia);

  useEffect(() => {
    getData();
    getSocial();
  }, []);

  console.log(data);

  const social = [
    { slug: 'facebook', id: 1, value: 'https://www.google.com' },
    { slug: 'instagram', id: 2, value: 'https://www.google.com' },
    { slug: 'linkedin', id: 3, value: 'https://www.google.com' },
    { slug: 'twitter', id: 4, value: 'https://www.google.com' },
    { slug: 'website', id: 5, value: 'https://www.google.com' },
  ];

  return (
    <Container
      className="mt-4 max-w-90 mb-2 "
      id="contact"
      style={{ scrollMarginTop: '120px' }}
    >
      <div className="sm-flex-col-col-center-center">
        <div className="text-align-center">
          <p
            className="text-xlarge-title"
            style={{ letterSpacing: '1px' }}
          >
            {t('contact-us.title')}
          </p>
          <p className="sub-text-larges opacity-75">
            {t('contact-us.contact-desc')}
          </p>
          <p className="text-large-title fw700">
            {' '}
            {t('contact-us.get-in-touch')}
          </p>
        </div>
        <div className="mt-4 w-full">
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              md={6}
              className={styles.rightContainer}
            >
              <p className="text-large-title fw700">
                {t('contact-us.have-a-question')}
              </p>
              <ContactUsForm />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              className={styles.leftContainer}
            >
              <p className="text-large-title fw700">
                {t('contact-us.details')}
              </p>
              <Grid
                container
                rowSpacing={5}
              >
                {loading ? (
                  Array(4)
                    .fill(0)
                    .map((_, index: number) => (
                      <Grid
                        key={index}
                        direction={'row'}
                        item
                        xs={12}
                        sm={12}
                        md={6}
                      >
                        <CustomSkeleton
                          width={'200px'}
                          height={'150px'}
                        />
                      </Grid>
                    ))
                ) : (
                  <Stack
                    marginTop={5}
                    direction={'row'}
                    flexWrap={'wrap'}
                  >
                    {/* Contact details */}
                    {data &&
                      data?.children &&
                      data.children.map((item: any) => (
                        <Grid
                          key={item.id}
                          item
                          xs={12}
                          md={5.5}
                        >
                          <ContactUsSectionCard
                            title={item?.value}
                            content={item?.children}
                            media={item?.media}
                          />
                        </Grid>
                      ))}

                    {/* Social Media Icons */}
                    {socialMediaData?.children && (
                      <Grid
                        container
                        wrap="nowrap"
                        spacing={2}
                        direction={'column'}
                      >
                        <Grid
                          item
                          sx={{ marginTop: '1rem' }}
                          display={'flex'}
                          gap={3}
                          alignItems={'flex-start'}
                        >
                          <Box marginTop={2}>
                            <ShareSVG />
                          </Box>
                          <p className="text-med-low">
                            {t('contact-us.follow-us')}
                          </p>
                        </Grid>
                        <Grid item>
                          <Stack
                            direction={'row'}
                            position={'relative'}
                            flexWrap={'wrap'}
                            spacing={isScreen500 ? 1 : 2}
                            gap={1}
                            marginX={5}
                          >
                            {socialMediaData?.children.map((item: any) => {
                              const SvgIcon = getSocialSVG(item?.slug, true);
                              return (
                                <Stack
                                  key={item?.id}
                                  className={styles.socialIconContainer}
                                  padding={isScreen500 ? 0 : 0.5}
                                >
                                  <Link
                                    key={item?.id}
                                    href={item?.value}
                                    target="_blank"
                                  >
                                    <div
                                      style={{
                                        margin:
                                          item?.slug == 'x'
                                            ? '5px 0px 0px 4px'
                                            : '',
                                      }}
                                    >
                                      {SvgIcon && <SvgIcon />}
                                    </div>
                                  </Link>
                                </Stack>
                              );
                            })}{' '}
                          </Stack>
                        </Grid>
                      </Grid>
                    )}
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Container>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3386110.948587354!2d35.8183518570429!3d31.953949159351097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b5f8346c73f03%3A0xfbcf14eb1fe6b4fe!2sAmman%2C%20Jordan!5e0!3m2!1sen!2sjo!4v1722500622223!5m2!1sen!2sjo"
            width="100%"
            height={isScreen700 ? '300' : '450'}
            style={{ border: 0, marginTop: isScreen700 ? '30px' : '50px' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Container>
      </div>
    </Container>
  );
};

export default ContactUsSection;
