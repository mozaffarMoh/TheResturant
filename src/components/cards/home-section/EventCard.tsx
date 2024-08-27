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
import { primaryColor } from '@/constant/color';

const EventCard = ({
  title,
  subTitle,
  media,
  place,
  itemMetaData,
  handleModal,
}: {
  title: string;
  subTitle: string;
  place: any;
  media: any;
  itemMetaData: any;
  handleModal: any;
}) => {
  const t = useTranslations();
  let imageURL =
    media && media?.main_image?.[0]?.url
      ? domain + media?.main_image?.[0]?.url
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
                    {itemMetaData &&
                      itemMetaData.map((item: any) => {
                        return item?.itemMetaKey?.slug == 'time' && item.value;
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
                  style={{
                    borderRadius: '50px',
                    paddingInline: '2rem',
                    color: primaryColor,
                    borderColor: primaryColor,
                  }}
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
