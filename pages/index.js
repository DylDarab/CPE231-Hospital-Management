import { Image, InputRightAddon, InputGroup, InputLeftAddon, Box, Button, FormControl, Heading, Container, Input } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import  {useRouter}  from 'next/router'
import checkToken from '../functions/checkToken'
export default () =>
{
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async () =>
  {
    let result = await axios.post(`/api/login`, {
      username: username,
      password: password
    })
    if(result.data.username!=null)
    {
      sessionStorage.setItem('token', result.data.token)
      console.table(result.data)
      router.push('/dashboard')
    }
    else
    {
        //   setTimeout(() => {
        //     router.push('https://youtu.be/dQw4w9WgXcQ?t=43')
        // }, 1000);
        alert('Wrong username or password')
        router.push('https://youtu.be/dQw4w9WgXcQ?t=43')
    }
  }

  console.log('test', checkToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjIiLCJpYXQiOjE2NTA4OTg5MTQsImV4cCI6MTY1MDkyMDUxNH0.6iZoyvSKb4E_VbxORhGxmAB57Cs9DLZJu_IlNycJYGA"))

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
          <Input 
            placeholder='Username' 
            marginBottom='24px' 
            color='#fff' 
            focusBorderColor='#fff' 
            onChange={(e) => setUsername(e.target.value)} 
            textAlign='center'

          />
        </InputGroup>


        <InputGroup>
          <Input 
            placeholder='Password' 
            type='password' 
            marginBottom='48px' 
            color='#fff' 
            focusBorderColor='#fff' 
            onChange={(e) => setPassword(e.target.value)} 
            textAlign='center'
          />
          <InputRightAddon>
            <Image src='/assets/image/password.png' />
          </InputRightAddon>
        </InputGroup>
        <Button type="submit" width='320px' onClick={() => { onLogin() }}>
          Login
        </Button>
      </FormControl>
    </Container>
  )
}


