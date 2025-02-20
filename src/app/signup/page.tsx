import Stack from '@mui/material/Stack'

import CustomMuiCard from '@components/CustomMuiCard'
import PageStackBasic from '@components/PageStackBasic'
import SignupForm from '@features/SignupForm'

export default function Signup() {
  return (
    <PageStackBasic>
      <CustomMuiCard>
        <SignupForm />
      </CustomMuiCard>
    </PageStackBasic>
  )
}
