'use client';
import { Grid, Typography } from '@mui/material';

interface IProps {
  title: string;
  content: string;
  icon: any;
}
const AboutUsSectionCard = ({ title, content, icon }: IProps) => {
  return (
    <Grid
      container
      wrap="nowrap"
      spacing={2}
    >
      <Grid item>{icon}</Grid>
      <Grid
        item
        xs
      >
        <p className="text-med-low ">{title}</p>
        <Typography sx={{ textAlign: 'left' }}>{content}</Typography>
      </Grid>
    </Grid>
  );
};

export default AboutUsSectionCard;
