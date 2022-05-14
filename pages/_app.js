import '../styles/dyl.css'
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '../component/navbar'
import Account from '../component/account'
import checkToken from '../functions/checkToken'
import { useState, useEffect } from 'react'
function MyApp({ Component, pageProps })
{
  const [token, setToken] = useState(null)
  useEffect(() =>
  {
    if (typeof window !== 'undefined')
    {
      setToken(sessionStorage.getItem('token'))
    }
  }, [pageProps])


  return (
    <ChakraProvider>
      {checkToken(token) === false ? null : 
      <>
      <Navbar />
      <Account />
      </>
      }
      
      <Component {...pageProps} />

    </ChakraProvider>)
}

export default MyApp
