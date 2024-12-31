import { Box, Typography } from '@mui/material';
import React, { useState } from 'react'
import LoginSignupForm from '../components/login-signup-form/LoginSignupForm.component';

export default function LoginSignupPage() {
  return (
    <Box sx={{ width: '100%', minHeight: '90dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '90px', paddingBottom: '30px' }}>
      <LoginSignupForm />
    </Box>

  )
}
