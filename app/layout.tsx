import { Box, Skeleton } from '@mui/material';
import { Suspense } from 'react';
import '../styles/globals.css';

import Providers from 'components/providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>
          <Box sx={{ width: 300 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box></div>}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
