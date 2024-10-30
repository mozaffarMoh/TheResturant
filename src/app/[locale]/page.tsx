'use client';
import { Bill, MenuList } from '@/components';
import { Stack } from '@mui/material';
import type { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <Stack direction={"row"} flexWrap={"wrap"}>
      <MenuList />
      <Bill />
    </Stack>
  );
};

export default HomePage;
