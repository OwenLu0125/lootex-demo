'use client';

import Wrapper from 'components/Wrapper';
import { useFeeData } from 'wagmi';

import MonoLabel from './MonoLabel';
import { Box, Skeleton } from '@mui/material';

const FeeData = () => {
  const { data, isError, isLoading } = useFeeData();

  if (isError) {
    return (
      <Wrapper title="useFeeData">
        <p>Error getting fee data.</p>
      </Wrapper>
    );
  } else if (isLoading) {
    return (
      <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  } else {
    return (
      <>
        <h2 className="text-lg font-bold">Estimated fee:</h2>
        <p className="text-sm text-gray-500"> Max Fee Per Gas: <MonoLabel label={data?.formatted.maxFeePerGas || ''} /></p>
        <p className="text-sm text-gray-500"> Max Priority Fee Per Gas: <MonoLabel label={data?.formatted.maxPriorityFeePerGas || ''} /></p>
      </>
    );
  }
};

export default FeeData;
