import Carousel from 'react-material-ui-carousel';

import { ReactNode } from 'react';

export default function CarouselElement({
  children,
}: {
  children: ReactNode[];
}) {
  return (
    <Carousel
      sx={{overflowY:'auto'}}
     navButtonsProps={{
        // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
        style: {
          backgroundColor: 'cornflowerblue',
          borderRadius: 0,
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: '#EB6B2A', // Color of active indicator
        },
      }}
      navButtonsAlwaysInvisible={true}
      navButtonsWrapperProps={{
        // Move the buttons to the bottom. Unsetting top here to override default style.
        style: {
          bottom: '0',
          top: 'unset',
        },
      }}
      indicators={children?.length > 1}
    >
      {children}
    </Carousel>
  );
}
