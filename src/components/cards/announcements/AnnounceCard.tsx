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
import { useRouter } from 'next/navigation';

const AnnounceCard = ({
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
    <Paper
      className="event-card-paper"
      style={{ padding: '0px' }}
    >
      <Card
        sx={{
          display: 'flex',
          border: 'none',
          boxShadow: 'none',
          backgroundColor: 'whitesmoke',
        }}
      >
        <Grid container>
          {/* Image section */}
          <Grid
            item
            xs={12}
            md={6}
            display={'flex'}
            alignItems={'flex-end'}
          >
            <CardMedia
              component="img"
              sx={{
                width: '90%',
                height: '80%',
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
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: '50px',
                      fontSize: '11px',
                      height: '23px',
                      background: '#EB6B2A',
                    }}
                    color="error"
                  >
                    General
                  </Button>
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

export default AnnounceCard;
