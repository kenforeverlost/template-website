'use client'

import { useState } from 'react'
import { CircularProgress, Stack, Typography } from '@mui/material'

import PageStackBasic from '@components/PageStackBasic'

export default function Blank() {
  const [loading, setLoading] = useState(true)
  return (
    <PageStackBasic>
      <Typography variant="h1" textAlign={'center'}>
        Blank Page
      </Typography>
      {loading && (
        <Stack padding={5} alignItems={'center'}>
          <CircularProgress color="primary" />
        </Stack>
      )}
    </PageStackBasic>
  )
}
