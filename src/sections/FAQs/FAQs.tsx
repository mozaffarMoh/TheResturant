import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqsData = [
  {
    question: "What is 'App'?",
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  // Add more FAQ items here
];

const FAQsSection = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel: any) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      <Typography variant="h4">Frequently Asked Questions</Typography>
      {faqsData.map((faq, index) => (
        <Accordion defaultExpanded={false}>
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
      <Typography
        variant="body2"
        align="center"
      >
        <a href="#">View all FAQs</a>
      </Typography>
    </Box>
  );
};

export default FAQsSection;
