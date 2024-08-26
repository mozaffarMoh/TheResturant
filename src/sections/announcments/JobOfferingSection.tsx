import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import sortIcon from '../../../assets/icons/sort.png';
import { primaryColor } from '@/constant/color';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import usePost from '@/custom-hooks/usePost';
import { domain, endPoints } from '@/base-api/endPoints';
import { DefautImage1, DefautImage2 } from '@/constant/images';
import { LoadingButton } from '@mui/lab';
import CardSkeletonVertical from '@/components/skeleton/cardSkeletonVertical';
import NoData from '@/components/NoData/NoData';

const JobOfferingSection = () => {
  const t = useTranslations();
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const langCurrent = pathname.slice(1, 3) || 'en';
  const isScreen450 = useMediaQuery('(max-width:450px)');
  const [sortItems, setSortItems] = useState<Number>(0);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filteredData, setFilteredData]: any = useState([]);

  const body = {
    modelName: 'Item',
    filters: {
      'itemType.slug': 'job-offerings',
    },
    fields: ['slug', 'title', 'subTitle', 'media'],
    relations: {
      itemMetaData: {
        relations: {
          itemMetaKey: {
            fields: ['name', 'slug'],
          },
        },
        fields: ['value', 'media'],
      },
    },
    'with-pagination': true,
    limit: 9,
    page: page,
  };

  const [data, loading, getData, success, , , , fullData] = usePost(
    endPoints.DynamicFilter,
    body,
  );

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (success) {
      setFilteredData((prevArray: any) => {
        const newArray = [...prevArray];
        newArray.push(...data);
        return newArray;
      });
    }
  }, [success]);

  useEffect(() => {
    page > 1 && getData();
  }, [page]);

  useEffect(() => {
    if (success) {
      let totalNum = fullData?.meta?.total || 0;
      setTotal(totalNum);
    }
  }, [success]);

  const sortHandleChange = (event: React.ChangeEvent<{ value: Number }>) => {
    setSortItems(event.target.value as Number);
  };
  return (
    <Container
      maxWidth="lg"
      sx={{ padding: '100px 0px' }}
    >
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        marginBottom={5}
        padding={2}
      >
        <Typography
          fontFamily={'Nobile'}
          color={primaryColor}
          fontSize={25}
          fontWeight={600}
        >
          {t('header.jobOffer')}
        </Typography>

        {/*   <Stack
          flexDirection={'row'}
          alignItems={'center'}
        >
          <InputLabel
            id="dropdown-sort"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'visible',
              textOverflow: 'clip',
              width: 'auto',
            }}
          >
            <Image
              src={sortIcon}
              alt={'sortIcon'}
              style={{ marginTop: '5px', margin: '0px 5px' }}
            />
          </InputLabel>
          <FormControl
            variant="outlined"
            style={{ marginLeft: 5, minWidth: 150 }}
          >
            <Select
              labelId="dropdown-sort"
              value={sortItems}
              onChange={sortHandleChange as any}
              sx={{
                borderRadius: '1.5rem',
                height: '40px',
                '& .MuiSelect-select': {
                  padding: '8px 14px',
                },
              }}
            >
              <MenuItem
                value={0}
                selected
              >
                {t('select.all')}
              </MenuItem>
              <MenuItem value={1}>Meeting Room</MenuItem>
              <MenuItem value={2}>Lecture Room</MenuItem>
              <MenuItem value={3}>Team Phone Booth</MenuItem>
              <MenuItem value={4}>Shared Space</MenuItem>
            </Select>
          </FormControl>
        </Stack> */}
      </Stack>
      {loading && filteredData.length == 0 ? (
        <Stack
          direction={'row'}
          justifyContent={'space-evenly'}
          flexWrap={'wrap'}
        >
          {' '}
          <CardSkeletonVertical />
          <CardSkeletonVertical />
          <CardSkeletonVertical />
        </Stack>
      ) : (
        <Stack alignItems={'center'}>
          <Stack
            margin={0}
            direction={'row'}
            flexWrap={'wrap'}
            justifyContent={'center'}
          >
            {filteredData.length > 0 &&
              filteredData.map((item: any, i: any) => {
                let imageURL =
                  item.media && item.media.length > 0 && item.media[0]?.url
                    ? domain + item.media[0]?.url
                    : DefautImage1;
                let imageURLAvatart =
                  item.itemMetaData &&
                  item.itemMetaData.length > 0 &&
                  item?.itemMetaData[0]?.media &&
                  item?.itemMetaData[0]?.media.length > 0
                    ? domain + item?.itemMetaData[0]?.media[0]?.url
                    : DefautImage2;

                return (
                  <Card
                    key={i}
                    sx={{
                      width: isScreen450 ? '250px' : '340px',
                      padding: '10px',
                      margin: '10px',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                    onClick={() =>
                      router.push(
                        `/${langCurrent}/home/industry/announcements/${item?.slug}`,
                      )
                    }
                  >
                    <img
                      src={imageURL}
                      alt={'jobOfferImage'}
                      style={{
                        width: '100%',
                        height: '250px',
                        borderRadius: '20px',
                      }}
                    />

                    <img
                      src={imageURLAvatart}
                      alt={'InstructorImage'}
                      style={{
                        position: 'absolute',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        right: `${!isArabic ? '20px' : ''}`,
                        left: `${isArabic ? '20px' : ''}`,
                        bottom: '100px',
                      }}
                    />

                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {item.itemMetaData.length > 0 &&
                          item?.itemMetaData[0]?.itemMetaKey &&
                          item?.itemMetaData[0]?.itemMetaKey?.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        fontFamily={'Jost'}
                        fontWeight={600}
                        color={'#2F2D51'}
                      >
                        {item?.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {item?.subTitle}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            {filteredData?.length == 0 && success && <NoData />}
          </Stack>
          {filteredData.length < total && (
            <LoadingButton
              onClick={() => setPage((prev) => prev + 1)}
              loading={loading}
              variant="contained"
              color="inherit"
              sx={{
                width: '200px',
                height: '40px',
                background: 'white',
                borderRadius: '50px',
                margin: '20px',
              }}
            >
              {t('buttons.load-more')}
            </LoadingButton>
          )}
        </Stack>
      )}
    </Container>
  );
};

export default JobOfferingSection;
