'use client';
import { primaryColor } from '@/constant/color';
import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CallMadeIcon from '@mui/icons-material/CallMade';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { dummyAvatarImage } from '@/constant/images';

const Profile = () => {
  const fieldsArray = [
    { title: 'Email Address', placeholder: 'info@adminc.om', type: 'text' },
    { title: 'Email Address', placeholder: 'info@adminc.om', type: 'select' },
    { title: 'Email Address', placeholder: 'info@adminc.om', type: 'text' },
    { title: 'Email Address', placeholder: 'info@adminc.om', type: 'text' },
  ];
  return (
    <Container maxWidth="lg">
      <Stack
        paddingY={5}
        gap={3}
      >
        <Typography
          color={primaryColor}
          variant="h6"
          fontWeight={800}
        >
          Profile Details
        </Typography>

        <Divider sx={{ bgcolor: 'grey.200', width: '100%' }} />

        {/* Avatar section */}
        <Stack
          direction={'row'}
          gap={2}
          alignItems={'center'}
        >
          <img
            width={100}
            height={100}
            style={{ borderRadius: '50%' }}
            src={dummyAvatarImage}
            alt="avatar"
          />
          <IconButton
            sx={{
              background: '#a8d2d7',
              height: 'fit-content',
              borderRadius: '10px',
              color: primaryColor,
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              height: 'fit-content',
              bgcolor: '#a8d2d7',
              color: primaryColor,
              fontWeight: 600,
            }}
          >
            Upload Images
          </Button>
        </Stack>

        {/* Fields */}
        <Grid
          container
          spacing={5}
        >
          {fieldsArray.map((item: any, i: number) => {
            return (
              <Grid
                key={i}
                item
                xs={12}
                md={5.5}
              >
                <Stack gap={2}>
                  <Typography>{item.title}</Typography>
                  {item.type == 'select' ? (
                    <Select
                      fullWidth
                      label={item.placeholder}
                    ></Select>
                  ) : (
                    <TextField
                      fullWidth
                      label={item.placeholder}
                    />
                  )}
                </Stack>
              </Grid>
            );
          })}
        </Grid>

        {/* Save Button */}
        <Stack>
          <Button
            variant="contained"
            sx={{
              width: 200,
              height: 50,
              background: primaryColor,
              '&:hover': { background: primaryColor },
            }}
          >
            Save <CallMadeIcon />
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Profile;
