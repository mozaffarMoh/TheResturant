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
      spacing={2}
    >
      <Grid
        item
        className="mt-1"
      > 
        {icon}
      </Grid>
      <Grid
        item
        xs={9}
      >
        <p className="text-med-low ">{title}</p>
        <p className="text-wrap sub-text-larges opacity-75  ">{content}</p>
      </Grid>
    </Grid>
  );
};

export default AboutUsSectionCard;
