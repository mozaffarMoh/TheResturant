import { Container, useMediaQuery } from '@mui/material';
import { DefautImage1 } from '@/constant/images';
import PartnerSectionCard from '@/components/cards/partner-section/partnerSectionCard';
import { domain } from '@/base-api/endPoints';
import CustomSkeleton from '@/components/skeleton/CustomSkeleton';

const PartnerSection = ({ data, loading }: any) => {
  const isScreen450 = useMediaQuery('(max-width:450px)');
  return (
    <Container
      className="mt-4 bg-primary-color"
      maxWidth="xl"
      id="partners"
      style={{ scrollMarginTop: '120px' }}
    >
      <div className="sm-flex-col-col-center-center">
        {loading ? (
          <div className="text-align-center mt-2 ">
            <CustomSkeleton
              bgcolor="grey.300"
              width="150px"
              height="40px"
            />
            <CustomSkeleton
              bgcolor="grey.300"
              width="300px"
              height="40px"
            />
          </div>
        ) : (
          <div className="text-align-center mt-2 ">
            <p className="text-xlarge-title-secondary">{data?.key}</p>
            <p className="sub-text-larges text-white-new opacity-75">
              {data?.value}
            </p>
          </div>
        )}
        <div className="mt-4 lg-flex-row-col-center-center mb-4 gap3">
          {loading
            ? Array(3) // Adjust the number of skeletons based on expected content
                .fill(0)
                .map((_, index) => (
                  <div key={index}>
                    <CustomSkeleton
                      bgcolor="white"
                      width={isScreen450 ? '280px' : '350px'}
                      height={isScreen450 ? '300px' : '400px'}
                      borderRadius={4}
                      variant="rectangular"
                    />
                  </div>
                ))
            : data &&
              data?.children &&
              data?.children.map((item: any) => {
                let imageURL = item?.media?.[0]?.url
                  ? domain + item?.media[0]?.url
                  : DefautImage1;
                return (
                  <PartnerSectionCard
                    key={item.id}
                    content={item.key}
                    image={imageURL}
                  />
                );
              })}
        </div>
      </div>
    </Container>
  );
};

export default PartnerSection;
