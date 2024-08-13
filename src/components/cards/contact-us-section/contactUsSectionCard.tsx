'use client';
import { domain } from '@/base-api/endPoints';
import { greyBackground } from '@/constant/images';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import styles from '../../../sections/guest-home/contact-us/contact-us.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface IProps {
  title: string;
  content: any;
  media: any;
}
const ContactUsSectionCard = ({ title, content, media }: IProps) => {
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const isScreen500 = useMediaQuery('(max-width:500px)');

  let imageURL =
    media && media.length > 0 && media[0]?.url
      ? domain + media[0]?.url
      : greyBackground;

  return (
    <Grid
      container
      wrap="nowrap"
      spacing={2}
    >
      <Grid
        item
        sx={{ marginTop: '1rem' }}
      >
        <img
          src={imageURL}
          width={40}
          height={40}
          style={{ borderRadius: '10px' }}
        />
      </Grid>
      <Grid
        item
        xs
      >
        <p className="text-med-low  ">{title}</p>
        <Typography
          sx={{ textAlign: isArabic ? 'right' : 'left' }}
          className="fc-light-black-new"
        >
          {content && content.length == 1 && content[0]?.value}
        </Typography>

        {content && content.length > 1 && (
          <Grid
            container
            wrap="nowrap"
            spacing={2}
            sx={{ marginLeft: '', marginTop: '1rem' }}
          >
            <Stack
              direction={'row'}
              position={'relative'}
              spacing={isScreen500 ? 1 : 2}
              gap={1}
              style={{ marginRight: isArabic ? '-10px' : '' }}
            >
              {content.map((item: any) => {
                const imageURL =
                  item?.media && item?.media.length == 1
                    ? domain + item?.media[0]?.url
                    : '';
                return (
                  <Stack
                    key={item.id}
                    className={styles.socialIconContainer}
                    padding={isScreen500 ? 0 : 0.5}
                  >
                    <Link
                      href={item.value}
                      target="_blank"
                    >
                      <Image
                        src={imageURL}
                        alt="social-icon"
                        width={25}
                        height={25}
                      />
                    </Link>
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ContactUsSectionCard;
