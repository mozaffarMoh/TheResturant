import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Stack,
  useMediaQuery,
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
  const isScreen450 = useMediaQuery('(max-width:450px)');
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
            <img
              style={{
                width: '95%',
                height: isScreen450 ? '200px' : '300px',
                minHeight: '12rem',
                borderRadius: '1.1rem',
              }}
              src={imageURL}
              alt="Live from space album cover"
            />
          </Grid>

          {/* title,subtitle,buttons section */}
          <Grid
            item
            xs={12}
            md={6}
          >
            <Stack>
              <p className="general-title-v2  primary-color  fw600">{title}</p>
              <p className="text-med-fw400 ">{subTitle}</p>
            </Stack>
            <Stack
              direction={'row'}
              gap={1}
            >
              {place && place?.name && (
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                >
                  <PlaceSVG />
                  <span
                    style={{ marginInline: '0.4rem' }}
                    className="text-med-fw400  opacity-80"
                  >
                    {' '}
                    {place && place?.name}
                  </span>{' '}
                </Stack>
              )}

              {itemMetaData &&
                itemMetaData.map((item: any) => {
                  return (
                    item?.itemMetaKey?.slug == 'time' && (
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                      >
                        <ClockSVG />{' '}
                        <span
                          style={{ marginInline: '0.4rem' }}
                          className="text-med-fw400  opacity-80"
                        >
                          {item.value}{' '}
                        </span>
                      </Stack>
                    )
                  );
                })}
            </Stack>

            <Button
              variant="outlined"
              style={{
                borderRadius: '50px',
                paddingInline: '2rem',
                marginTop: 10,
                color: primaryColor,
                borderColor: primaryColor,
              }}
              onClick={handleModal}
            >
              {t('buttons.view')}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Paper>
  );
};

export default EventCard;
