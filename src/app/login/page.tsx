import Stack from '@mui/material/Stack'

import CustomMuiCard from '@components/CustomMuiCard'
import PageStackBasic from '@components/PageStackBasic'
import LoginForm from '@features/LoginForm'

export default function Login() {
  return (
    <PageStackBasic>
      <CustomMuiCard>
        <LoginForm />
      </CustomMuiCard>
    </PageStackBasic>
  )
}
