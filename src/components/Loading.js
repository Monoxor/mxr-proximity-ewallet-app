import React from 'react'
import { CircularProgress, Box } from '@material-ui/core'

const Loading = () => {
  return (
    <Box display='flex' justifyContent='center' p={5}>
      <CircularProgress />
    </Box>
  )
}

export default Loading
