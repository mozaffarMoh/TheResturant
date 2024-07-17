import Carousel from 'react-material-ui-carousel';

import { ReactNode } from 'react';

export default function CarouselElement({
  children,
}: {
  children: ReactNode[];
}) {
  return (
    <Carousel
      fullHeightHover={false} // We want the nav buttons wrapper to only be as big as the button element is
      navButtonsProps={{
        // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
        style: {
          backgroundColor: 'cornflowerblue',
          borderRadius: 0,
        },
      }}
      navButtonsWrapperProps={{
        // Move the buttons to the bottom. Unsetting top here to override default style.
        style: {
          bottom: '0',
          top: 'unset',
        },
      }}
    >
      {children}
    </Carousel>
  );
}
