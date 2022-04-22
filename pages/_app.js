import '../styles/dyl.css'
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '../component/navbar'

function MyApp({ Component, pageProps })
{
  return (
    <ChakraProvider>
      <Component {...pageProps} />

    </ChakraProvider>)
}

export default MyApp
