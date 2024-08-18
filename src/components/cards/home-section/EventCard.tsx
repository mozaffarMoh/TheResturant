import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
} from '@mui/material';
import { ClockSVG, PlaceSVG } from '../../../../assets/icons';
import { useTranslations } from 'next-intl';
import { domain } from '@/base-api/endPoints';
import { DefautImage1 } from '@/constant/images';

const EventCard = ({
  title,
  subTitle,
  media,
  place,
  metadata,
  handleModal,
}: {
  title: string;
  subTitle: string;
  place: any;
  media: any;
  metadata: any;
  handleModal: any;
}) => {
  const t = useTranslations();
  let imageURL =
    media && media.length > 0 && media[0]?.url
      ? domain + media[0]?.url
      : DefautImage1;
  return (
    <Paper className="event-card-paper">
      <Card sx={{ display: 'flex', border: 'none', boxShadow: 'none' }}>
        <Grid
          container
          spacing={2}
        >
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
              image={imageURL}
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
                <p className="text-med-fw400 ">{subTitle}</p>
              </CardContent>
              <Box className="xs-flex-row-col-375 ml-1 gap1">
                <div>
                  <PlaceSVG />
                  <span
                    style={{ marginInline: '0.4rem' }}
                    className="text-med-fw400  opacity-80"
                  >
                    {' '}
                    {place && place?.name}
                  </span>{' '}
                </div>
                <div>
                  <ClockSVG />{' '}
                  <span
                    style={{ marginInline: '0.4rem' }}
                    className="text-med-fw400  opacity-80"
                  >
                    {metadata &&
                      metadata.map((item: any) => {
                        return item.slug == 'time' && item.value;
                      })}
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
                  {t('buttons.view')}
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
