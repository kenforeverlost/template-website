import { Stack, Typography } from '@mui/material'
import PageStackBasic from '@components/PageStackBasic'

export default function Main() {
  return (
    <PageStackBasic>
      <Stack flexDirection={'column'} gap={2}>
        <Typography
          variant="h3"
          fontWeight={'bold'}
          sx={{ textAlign: 'center' }}
        >
          Hello World
        </Typography>
        <Typography sx={{ textAlign: 'center' }}>
          We are under construction :)
        </Typography>
      </Stack>
    </PageStackBasic>
  )
}
