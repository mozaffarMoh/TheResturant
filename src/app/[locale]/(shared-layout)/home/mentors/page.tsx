'use client';
import type { NextPage } from 'next';
import Link from '@mui/material/Link';
import GridFlex from '@mui/material/Unstable_Grid2';
import {
  Breadcrumbs,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { textSecondaryColor } from '@/constant/color';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';
import { domain, endPoints } from '@/base-api/endPoints';
import usePost from '@/custom-hooks/usePost';
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from '@mui/icons-material';
import { DefautImage2 } from '@/constant/images';
import CardSkeletonVertical from '@/components/skeleton/cardSkeletonVertical';
import NoData from '@/components/NoData/NoData';

const MentorsPage: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const langCurrent = pathname.slice(1, 3) || 'en';
  const isScreen600 = useMediaQuery('(max-width:600px)');
  const [profession, setProfession] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const filters: any = {
    'user.roles.name': 'Mentor',
    'form.slug': 'TPF-Register-Form',
    ...(profession !== 'all' && { 'user.groups.slug': profession }),
  };
  const bodyProfession = {
    modelName: 'Group',
    filters: {
      'types.slug': 'user-groups',
    },

    fields: ['id', 'name', 'slug'],
  };
  const bodyMentors = {
    modelName: 'FormSubmit',
    fields: ['slug'],
    relations: {
      user: {
        relations: {
          groups: {
            fields: ['name', 'slug'],
          },
        },
        fields: ['name', 'media'],
      },
    },
    'with-pagination': true,
    limit: 8,
    page: page,
    filters,
  };
  const [
    professionList,
    loadingProfessionList,
    getProfessionList,
    successProfessionList,
  ] = usePost(endPoints.DynamicFilter, bodyProfession);
  const [
    mentorsItems,
    loadingMentorsItems,
    getMentorsItems,
    successMentorsItems,
    ,
    ,
    ,
    facilityItemsFullData,
  ] = usePost(endPoints.DynamicFilter, bodyMentors);

  useEffect(() => {
    getProfessionList();
  }, []);

  useEffect(() => {
    if (successProfessionList) {
      setProfession('all');
    }
  }, [successProfessionList]);

  useEffect(() => {
    if (profession) {
      page == 0 ? setPage(1) : getMentorsItems();
    }
  }, [profession]);

  useEffect(() => {
    page > 0 && getMentorsItems();
  }, [page]);

  useEffect(() => {
    if (successMentorsItems) {
      let totalNum = facilityItemsFullData?.meta?.total || 0;
      const paginationCount = Math.ceil(totalNum / 8);
      setTotal(paginationCount);
    }
  }, [successMentorsItems]);

  return (
    <Stack
      direction={'column'}
      alignItems={'center'}
    >
      <Container maxWidth="lg">
        <GridFlex
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="mt-4"
          flexDirection="column"
        >
          <p className="general-title primary-color">{t('header.mentors')}</p>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href={`/${langCurrent}/home`}
            >
              {t('header.home')}
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="#"
            >
              <Typography color={textSecondaryColor}>
                {t('header.mentors')}
              </Typography>
            </Link>
          </Breadcrumbs>
        </GridFlex>
      </Container>

      <Container maxWidth="xl">
        <Stack spacing={5}>
          <Stack
            alignItems={isScreen600 ? 'center' : 'flex-end'}
            width={'94%'}
          >
            <Stack
              flexDirection={'row'}
              alignItems={'center'}
              marginTop={7}
            >
              <InputLabel
                id="dropdown-profession"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'visible',
                  textOverflow: 'clip',
                  width: 'auto',
                }}
              >
                {t('select.profession')}:&nbsp;&nbsp;
              </InputLabel>
              {loadingProfessionList && (
                <CircularProgress
                  size={20}
                  color="primary"
                  sx={{ marginX: 1 }}
                />
              )}
              <FormControl
                variant="outlined"
                style={{ marginLeft: 5, minWidth: 150 }}
              >
                <Select
                  labelId="dropdown-profession"
                  value={profession}
                  onChange={(e: any) => setProfession(e.target.value)}
                  sx={{
                    borderRadius: '1.5rem',
                    height: '40px',
                    '& .MuiSelect-select': {
                      padding: '8px 14px',
                    },
                  }}
                >
                  <MenuItem value={'all'}>{t('select.all')}</MenuItem>
                  {professionList &&
                    professionList.map((item: any) => {
                      return (
                        <MenuItem
                          key={item.id}
                          value={item.slug}
                        >
                          {item.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          {loadingMentorsItems || loadingProfessionList ? (
            <Stack
              gap={2}
              paddingY={10}
              direction={'row'}
              flexWrap={'wrap'}
              justifyContent={'center'}
            >
              <CardSkeletonVertical />
              <CardSkeletonVertical />
              <CardSkeletonVertical />
            </Stack>
          ) : (
            <Stack
              margin={0}
              direction={'row'}
              flexWrap={'wrap'}
              justifyContent={'center'}
            >
              {mentorsItems?.length == 0 && successMentorsItems && <NoData />}
              {mentorsItems &&
                mentorsItems.map((item: any, i: number) => {
                  let imageURL =
                    item?.user?.media.length > 0 && item?.user?.media[0]?.url
                      ? domain + item?.user?.media[0]?.url
                      : DefautImage2;
                  let professions =
                    item?.user?.groups &&
                    item?.user?.groups.map((item: any, i: number) => {
                      let comma = i > 0 ? ', ' : '';
                      return comma + item?.name;
                    });

                  return (
                    <Card
                      key={i}
                      sx={{
                        padding: '10px',
                        margin: '10px',
                        cursor: 'pointer',
                        width: '250px',
                      }}
                      onClick={() =>
                        router.push(`/${langCurrent}/home/mentors/${item.slug}`)
                      }
                    >
                      <img
                        src={imageURL}
                        style={{
                          width: '100%',
                          height: 250,
                          borderRadius: '10px',
                        }}
                        alt={'mentor-image'}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          fontFamily={'Jost'}
                          fontWeight={600}
                          color={'#2F2D51'}
                        >
                          {item?.user?.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {professions}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
            </Stack>
          )}
          {mentorsItems.length > 0 && (
            <Stack
              alignItems={'center'}
              paddingBottom={10}
            >
              <Pagination
                onChange={(event, value) => setPage(value)}
                page={page}
                count={total}
                siblingCount={2} // Number of siblings to show around the current page
                renderItem={(item) => (
                  <PaginationItem
                    {...item}
                    sx={{
                      color: '#3F485E',
                      '&.Mui-selected': {
                        backgroundColor: '#3F485E',
                        color: '#fff',
                        '&:hover': { backgroundColor: '#3F485EDD' },
                      },
                    }}
                    slots={{
                      previous: isArabic
                        ? ArrowForwardIosRounded
                        : ArrowBackIosNewRounded,
                      next: isArabic
                        ? ArrowBackIosNewRounded
                        : ArrowForwardIosRounded,
                    }}
                  />
                )}
              />
            </Stack>
          )}
        </Stack>
      </Container>
    </Stack>
  );
};

export default MentorsPage;
