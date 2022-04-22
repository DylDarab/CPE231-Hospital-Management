import { Image, InputRightAddon,InputGroup,InputLeftAddon, Box, Button, FormControl, Heading,Container, Input } from '@chakra-ui/react'
import axios from 'axios'

export default ()=>{
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
          <Input placeholder='Username' marginBottom='24px' color='#fff' focusBorderColor='#fff'/>
        </InputGroup>


        <InputGroup>
          <Input placeholder='Password' type='password' marginBottom='48px' color='#fff' focusBorderColor='#fff'/>
          <InputRightAddon>
            <Image src='/assets/image/password.png' />
          </InputRightAddon>
        </InputGroup>
        <Button width='320px' >
          Login
        </Button>
      </FormControl>
    </Container>
  )
}


