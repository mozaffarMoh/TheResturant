import { Container } from '@mui/material';
import ServicesListItem from './services-list-item';
import { DefautImage1 } from '@/constant/images';
import { domain } from '@/base-api/endPoints';

const ServicesSection = ({ data }: any) => {
  return (
    <Container
      className="mt-4 max-w-90 "
      id="services"
    >
      <div className="sm-flex-col-col-center-center ">
        <div className="text-align-center">
          <p className="text-xlarge-title">{data?.key}</p>
          <p className="sub-text-larges opacity-75">{data?.value}</p>
        </div>
        {data?.children &&
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
          })}
      </div>
    </Container>
  );
};

export default ServicesSection;
