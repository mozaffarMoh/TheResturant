import { Container } from '@mui/material';
import ServicesListItem from './services-list-item';
import { DefautImage1 } from '@/constant/images';
import { domain } from '@/base-api/endPoints';
import CustomSkeleton from '@/components/skeleton/CustomSkeleton';

const ServicesSection = ({ data, loading }: any) => {
  return (
    <Container
      className="mt-4 max-w-90 "
      id="services"
      style={{ scrollMarginTop: '120px' }}
    >
      <div className="sm-flex-col-col-center-center ">
        {loading ? (
          <div className="text-align-center">
            <CustomSkeleton
              width="150px"
              height="40px"
            />
            <CustomSkeleton
              width="300px"
              height="40px"
            />
          </div>
        ) : (
          <div className="text-align-center">
            <p className="text-xlarge-title">{data?.key}</p>
            <p className="sub-text-larges opacity-75">{data?.value}</p>
          </div>
        )}

        {loading ? (
          <CustomSkeleton
            width={'80%'}
            height={'400px'} // Adjust the height based on card content
            borderRadius={4}
            variant="rectangular"
          />
        ) : (
          data?.children &&
          data?.children.map((item: any, i: number) => {
            let imageURL = item?.media?.[0]?.url
              ? domain + item?.media[0]?.url
              : DefautImage1;
            return (
              <ServicesListItem
                key={item.id}
                title={item.key}
                content={item.value}
                index={i + 1}
                imageURL={imageURL}
              />
            );
          })
        )}
      </div>
    </Container>
  );
};

export default ServicesSection;
