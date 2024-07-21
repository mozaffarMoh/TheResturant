import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { ClockSVG, PlaceSVG } from '../../../../assets/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const EventCard = ({
  title,
  description,
  image,
  handleModal,
}: {
  title: string;
  description: string;
  image: string;
  handleModal: any;
}) => {
  const { push } = useRouter();
  return (
    <Paper className="event-card-paper">
      <Card sx={{ display: 'flex', border: 'none', boxShadow: 'none' }}>
        <Grid container>
          {/* Image section */}
          <Grid
            item
            xs={12}
            md={6}
          >
            <CardMedia
              component="img"
              sx={{
                width: '100%',
                height: '100%',
                minHeight: '12rem',
                borderRadius: '1.1rem',
              }}
              image={image}
              alt="Live from space album cover"
            />
          </Grid>
          {/* title,subtitle,buttons section */}
          <Grid
            item
            xs={12}
            md={6}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <p className="general-title-v2  primary-color  fw600">
                  {title}
                </p>
                <p className="text-med-fw400 ">{description}</p>
              </CardContent>
              <Box className="xs-flex-row-col-375 ml-1 gap1">
                <div>
                  <PlaceSVG />
                  <span
                    style={{ marginInline: '0.4rem' }}
                    className="text-med-fw400  opacity-80"
                  >
                    {' '}
                    AMMAN, JORDAN
                  </span>{' '}
                </div>
                <div>
                  <ClockSVG />{' '}
                  <span
                    style={{ marginInline: '0.4rem' }}
                    className="text-med-fw400  opacity-80"
                  >
                    8:00 am - 5:00 pm
                  </span>
                </div>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  pl: 2,
                  pb: 1,
                  mt: 1,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{ borderRadius: '50px', paddingInline: '2rem' }}
                  onClick={handleModal}
                >
                  View
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Paper>
  );
};

export default EventCard;
