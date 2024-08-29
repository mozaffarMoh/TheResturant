'use client';
import { primaryColor, secondaryColor } from '@/constant/color';
import {
  Container,
  Pagination,
  PaginationItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { endPoints } from '@/base-api/endPoints';
import Cookies from 'js-cookie';
import useGet from '@/custom-hooks/useGet';
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import usePost from '@/custom-hooks/usePost';

const MyActivity = () => {
  const t = useTranslations();
  const token = Cookies.get('token') || '';
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [isClientSide, setIsClientSide] = useState(false);
  const filters: any = {
    'itemType.slug': 'facility',
  };
  const body = {
    modelName: 'Item',
    fields: ['id', 'title', 'slug', 'description', 'price_start_from', 'media'],
    relations: {
      itemMetaData: {
        fields: ['id', 'value'],
        relations: {
          itemMetaKey: {
            fields: ['id', 'name', 'slug', 'media'],
          },
          time: {},
        },
      },
      categories: {
        fields: ['name'],
      },
      place: {
        fields: ['name', 'slug'],
        relations: {
          parent: {
            fields: ['name', 'slug'],
          },
        },
      },
    },
    'with-pagination': true,
    limit: 9,
    page: page,
    filters,
  };
  const [date, loading, getData, success, , , , fullData] = usePost(
    endPoints.DynamicFilter,
    body,
    token,
  );

  useEffect(() => {
    getData();
    setIsClientSide(true);
  }, []);

  useEffect(() => {
    if (success) {
      let totalNum = fullData?.meta?.total || 0;
      const paginationCount = Math.ceil(totalNum / 9);
      setTotal(paginationCount);
    }
  }, [success]);

  const labels = [
    t('my-activity.id'),
    t('my-activity.description'),
    t('my-activity.date'),
    t('my-activity.time'),
  ];
  const [activities, setActivities] = useState([
    { id: 1, description: 'Logged in', date: '2023-08-28', time: '10:30 AM' },
    {
      id: 2,
      description: 'Updated Profile',
      date: '2023-08-29',
      time: '02:45 PM',
    },
    { id: 3, description: 'Logged out', date: '2023-08-29', time: '05:00 PM' },
  ]);

  return (
    <Container maxWidth="lg">
      {' '}
      {isClientSide && (
        <head>
          <title>{t('metadata.my_activity')}</title>
          <meta
            name="description"
            content="Welcome to the My-Activity page of The Platform Website"
          />
        </head>
      )}{' '}
      <Stack
        paddingY={5}
        gap={7}
      >
        <Stack textAlign={'center'}>
          <Typography
            color={primaryColor}
            variant="h4"
            fontWeight={600}
          >
            {t('header.my-activity')}
          </Typography>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {labels.map((label: string, i: number) => (
                  <TableCell
                    key={i}
                    align="center"
                    sx={{ backgroundColor: primaryColor, color: 'white' }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell align="center">{activity.id}</TableCell>
                  <TableCell align="center">{activity.description}</TableCell>
                  <TableCell align="center">{activity.date}</TableCell>
                  <TableCell align="center">{activity.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack
          alignItems={'center'}
          paddingBottom={10}
        >
          <Pagination
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
      </Stack>
    </Container>
  );
};

export default MyActivity;
