import EventCard from '@/components/cards/home-section/EventCard';
import Carousel from 'react-material-ui-carousel';
import {
  eventBgImage,
  mentorImage1,
  mentorImage2,
  mentorImage3,
  mentorImage4,
  mentorImage5,
  mentorImage6,
} from '@/constant/images';
import { Avatar, Container, Grid, Paper } from '@mui/material';
import MentorListItem from './mentorListItem';
import { generalBgColor } from '@/constant/color';

const MentorsSection = () => {
  const items = [
    [
      { id: 0, name: 'Avatar 1', image: mentorImage1, position: 'Developer' },
      { id: 1, name: 'Avatar 2', image: mentorImage2, position: 'Developer' },
      { id: 2, name: 'Avatar 2', image: mentorImage6, position: 'Developer' },
      { id: 3, name: 'Avatar 6', image: mentorImage3, position: 'Developer' },
      { id: 4, name: 'Avatar 7', image: mentorImage4, position: 'Developer' },
    ],
    [
      { id: 3, name: 'Avatar 6', image: mentorImage3, position: 'Developer' },
      { id: 4, name: 'Avatar 7', image: mentorImage4, position: 'Developer' },
      { id: 5, name: 'Avatar 8', image: mentorImage5, position: 'Developer' },
      { id: 1, name: 'Avatar 2', image: mentorImage2, position: 'Developer' },
      { id: 2, name: 'Avatar 2', image: mentorImage6, position: 'Developer' },
    ],
    [
      { id: 0, name: 'Avatar 1', image: mentorImage1, position: 'Developer' },
      { id: 1, name: 'Avatar 2', image: mentorImage2, position: 'Developer' },
      { id: 2, name: 'Avatar 2', image: mentorImage6, position: 'Developer' },
      { id: 3, name: 'Avatar 6', image: mentorImage3, position: 'Developer' },
      { id: 4, name: 'Avatar 7', image: mentorImage4, position: 'Developer' },
    ],
  ];
  return (
    <Container className="mt-4 max-w-80 bg-white ">
      <div className="sm-flex-col-col-center-center">
        <p className="text-xlarge-title align-self-start ">Mentors</p>

        <div className=" w-full mb-4">
          <Carousel
            animation="slide"
            interval={6000}
            // indicators={true}
            sx={{ backgroundColor: generalBgColor }}
          >
            {items.map((items, i) => (
              <MentorListItem
                key={i}
                items={items}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </Container>
  );
};

export default MentorsSection;
