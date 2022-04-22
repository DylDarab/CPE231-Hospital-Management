import { Image, InputRightAddon, InputGroup, InputLeftAddon, Box, Button, FormControl, Heading, Container, Input } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import  {useRouter}  from 'next/router'

export default () =>
{
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async () =>
  {
    let result = await axios.post('http://localhost:3000/api/login', {
      username: username,
      password: password
    })
    if(result.data.username!=null)
    {
      router.push('/dashboard')
    }
    else
    {
      router.push('https://www.google.com/search?q=%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A2&oq=%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A2&aqs=edge..69i57.3145j0j1&sourceid=chrome&ie=UTF-8')
    }
  }


  return (
    <Container
      margin='0'
      maxWidth='480px'
      width='480px'
      height='360px'
      bgColor='#305F72'
      overflow='hidden'
      position='absolute'
      left='50%'
      top='50%'
      transform='translate(-50%,50%)'
      paddingBottom='16px'
      borderRadius='16px'
    >
      <FormControl
        textAlign='center'
        maxWidth='320px'
        position='absolute'
        left='50%'
        top='50%'
        transform={`translate(-50%, -50%)`}
      >

        <Heading as='h1' marginBottom='32px' fontFamily='YaroStBold' color='#fff'>USER LOGIN</Heading>

        <InputGroup>
          <InputLeftAddon>
            <Image src='/assets/image/user.png' />
          </InputLeftAddon>
          <Input placeholder='Username' marginBottom='24px' color='#fff' focusBorderColor='#fff' onChange={(e) => setUsername(e.target.value)} />
        </InputGroup>


        <InputGroup>
          <Input placeholder='Password' type='password' marginBottom='48px' color='#fff' focusBorderColor='#fff' onChange={(e) => setPassword(e.target.value)} />
          <InputRightAddon>
            <Image src='/assets/image/password.png' />
          </InputRightAddon>
        </InputGroup>
        <Button width='320px' onClick={() => { onLogin() }}>
          Login
        </Button>
      </FormControl>
    </Container>
  )
}


