'use client';
import { Button, Container, Stack } from '@mui/material';
import { primaryColor } from '@/constant/color';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import { endPoints } from '@/base-api/endPoints';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import usePost from '@/custom-hooks/usePost';
import CardSkeleton from '@/components/skeleton/cardSkeleton';
import NewsCardV1 from '@/components/cards/home-section/NewsCardV1';
import NewsCardV2 from '@/components/cards/home-section/NewsCardV2';

const NewsSection = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const langCurrent = pathname.slice(1, 3) || 'en';

  const body = {
    modelName: 'Item',
    filters: { 'itemType.slug': 'News' },
    fields: ['slug', 'title', 'subTitle', 'media', 'created_at'],
    add_fields: {
      categories: 'first,name,category',
    },
    'with-pagination': false,
  };

  const [data, loading, getData] = usePost(endPoints.DynamicFilter, body);

  useEffect(() => {
    getData();
  }, []);

  return (
    <section
      style={{
        width: '100%',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        backgroundColor: primaryColor,
      }}
    >
      <Container maxWidth="lg">
        <div className="sm-flex-col-col-center-center  ">
          <div className="mt-2 w-full md-padding-start-1 ">
            <div
              className="sm-flex-colo-col  md-margin-0 "
              style={{ marginLeft: '10px', marginRight: '10px' }}
            >
              <div className="general-title  text-white-new">
                {t('header.news')}
              </div>
              <Stack
                direction={'row'}
                justifyContent={'space-evenly'}
                flexWrap={'wrap-reverse'}
                marginTop={10}
                gap={5}
              >
                {/* cards horizontal cards  section */}
                <Stack
                  justifyContent={'space-between'}
                  gap={3}
                >
                  {loading ? (
                    <Stack gap={2}>
                      <CardSkeleton />
                      <CardSkeleton />
                    </Stack>
                  ) : (
                    data &&
                    data.length > 0 &&
                    data.map(
                      (item: any, i: number) =>
                        i > 1 &&
                        i < 5 && (
                          <NewsCardV1
                            key={i}
                            title={item?.title}
                            subTitle={item?.subTitle}
                            category={item?.category}
                            date={item?.created_at}
                          />
                        ),
                    )
                  )}
                </Stack>

                {/* cards Vertical cards  section */}
                <Stack
                  direction={'row'}
                  justifyContent={'space-evenly'}
                  flexWrap={'wrap'}
                  spacing={2}
                  gap={3}
                >
                  {loading ? (
                    <Stack
                      direction={'row'}
                      justifyContent={'center'}
                      flexWrap={'wrap'}
                      gap={2}
                    >
                      <CardSkeleton />
                      <CardSkeleton />
                    </Stack>
                  ) : (
                    data &&
                    data.length > 0 &&
                    data.map((item: any, i: number) => {
                      if (i < 2) {
                        return (
                          <NewsCardV2
                            key={i}
                            title={item?.title}
                            subTitle={item?.subTitle}
                            media={item?.media}
                            category={item?.category}
                            dateTime={item?.created_at}
                          />
                        );
                      }
                    })
                  )}
                </Stack>
              </Stack>

              <div className="mt-2 sm-flex-row-row-center-end  m-inline-end-2">
                <Button
                  variant="outlined"
                  sx={{
                    border: 'none',
                    paddingInline: '2rem',
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': {
                      border: 'none',
                      textDecoration: 'underline',
                    },
                  }}
                  onClick={() =>
                    router.push(`/${langCurrent}/home/industry/news`)
                  }
                  endIcon={isArabic ? <ArrowLeft /> : <ArrowRight />}
                >
                  {t('buttons.view')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NewsSection;
