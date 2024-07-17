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
import { useTheme } from '@mui/material/styles';
import { ClockSVG, PlaceSVG } from '../../../../assets/icons';

const EventCard = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => {
  const theme = useTheme();
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
              sx={{ width: '100%', height: '100%', borderRadius: '1.1rem' }}
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
                <Typography
                  component="div"
                  variant="h4"
                  sx={{ fontWeight: '600' }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {description}
                </Typography>
              </CardContent>
              <Box
                sx={{ display: 'flex', alignItems: 'flex-start', pl: 2, pb: 1 }}
              >
                <PlaceSVG />
                <span
                  style={{ marginInline: '0.4rem' }}
                  className="text-reg opacity-80"
                >
                  {' '}
                  AMMAN, JORDAN
                </span>{' '}
                <ClockSVG />{' '}
                <span
                  style={{ marginInline: '0.4rem' }}
                  className="text-reg opacity-80"
                >
                  8:00 am - 5:00 pm
                </span>
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
