import { Stack } from '@mui/material'

import Content from '@features/Content'
import Header from '@features/Header'
import Footer from '@features/Footer'

export default function PageStackBasic({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <Stack
      flexDirection={'column'}
      justifyContent={'space-between'}
      sx={{ minHeight: '100vh', width: '100%' }}
    >
      <Stack>
        <Header />
        <Content>{children}</Content>
      </Stack>
      <Footer />
    </Stack>
  )
}
