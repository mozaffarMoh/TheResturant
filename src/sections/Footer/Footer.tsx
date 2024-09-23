import { Box, Button, TextField, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <TextField
          label="Enter your email"
          variant="outlined"
          color="primary"
          size="small"
        />
        <Button variant="contained" color="secondary">
          Subscribe
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
{/*         <SocialIcon url="https://twitter.com/" target="_blank" style={{ marginRight: '0.5rem' }} />
        <SocialIcon url="https://facebook.com/" target="_blank" style={{ marginRight: '0.5rem' }} />
        <SocialIcon url="https://instagram.com/" target="_blank" style={{ marginRight: '0.5rem' }} />
        <SocialIcon url="https://linkedin.com/" target="_blank" style={{ marginRight: '0.5rem' }} />
        <SocialIcon url="https://youtube.com/" target="_blank" /> */}
      </Box>
      <Typography variant="caption">
        Copyright © 2023 Hostin | All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;