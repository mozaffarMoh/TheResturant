'use client';
import { domain } from '@/base-api/endPoints';
import { greyBackground } from '@/constant/images';
import { Grid, Typography } from '@mui/material';
import Cookies from 'js-cookie';

interface IProps {
  title: string;
  content: any;
  media: any;
}
const ContactUsSectionCard = ({ title, content, media }: IProps) => {
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const isRTL = langCookie == 'ar';

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
          sx={{ textAlign: isRTL ? 'right' : 'left' }}
          className="fc-light-black-new"
        >
          {content && content[0] && content[0]?.value}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ContactUsSectionCard;
