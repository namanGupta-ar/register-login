import { Container } from '@mui/material'

const CustomContainer = ({children}) => {
  return (
    <Container sx={{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
    }}>
        {children}
    </Container>
  )
}

export default CustomContainer