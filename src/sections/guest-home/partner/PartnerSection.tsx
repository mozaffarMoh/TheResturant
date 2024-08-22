import { Container } from '@mui/material';
import { DefautImage1 } from '@/constant/images';
import PartnerSectionCard from '@/components/cards/partner-section/partnerSectionCard';
import { domain } from '@/base-api/endPoints';

const PartnerSection = ({ data }: any) => {
  return (
    <Container
      className="mt-4 bg-primary-color"
      maxWidth="xl"
      id="partners"
    >
      <div className="sm-flex-col-col-center-center">
        <div className="text-align-center mt-2 ">
          <p className="text-xlarge-title-secondary">{data?.key}</p>
          <p className="sub-text-larges text-white-new opacity-75">
            {data?.value}
          </p>
        </div>
        <div className="mt-4 lg-flex-row-col-center-center mb-4 gap3">
          {data &&
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
