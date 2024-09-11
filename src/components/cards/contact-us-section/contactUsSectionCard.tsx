'use client';
import { domain } from '@/base-api/endPoints';
import { DefautIcon } from '@/constant/images';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { usePathname } from 'next/navigation';

interface IProps {
  title: string;
  content: any;
  media: any;
}
const ContactUsSectionCard = ({ title, content, media }: IProps) => {
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');

  let imageURL =
    media && media?.icon?.[0]?.url
      ? domain + media?.icon?.[0]?.url
      : DefautIcon;

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
          width={35}
          height={35}
          style={{ borderRadius: '10px' }}
        />
      </Grid>
      <Grid
        item
        xs
      >
        <p className="text-med-low  ">{title}</p>
        <Typography className="fc-light-black-new">
          <bdi>{content && content?.[0]?.value}</bdi>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ContactUsSectionCard;
