import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Button,
  Container,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { secondaryColor } from '@/constant/color';

const faqsData = [
  {
    question: "What is 'App'?",
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    question: "What is 'App'?",
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const FAQsSection = () => {
  const [expanded, setExpanded] = useState(false);
  const isScreen500 = useMediaQuery('(max-width:500px)');
  const handleChange = (panel: any) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container>
      <Stack
        alignItems={'center'}
        marginTop={25}
        gap={3}
      >
        <Typography
          variant={isScreen500 ? 'h5' : 'h4'}
          fontWeight={700}
          width={300}
          textAlign={'center'}
        >
          Frequently Asked Questions
        </Typography>
        <Stack width={'100%'}>
          {faqsData.map((faq, index) => (
            <Accordion
              defaultExpanded={false}
              sx={{ width: '100%' }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                key={index}
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
        <Button
          variant="contained"
          sx={{
            background: secondaryColor,
            color: 'white',
            borderRadius: 50,
            padding: '10px 20px',
            textTransform: 'capitalize',
            '&:hover': { background: secondaryColor },
          }}
        >
          View all FAQs
        </Button>
      </Stack>
    </Container>
  );
};

export default FAQsSection;
