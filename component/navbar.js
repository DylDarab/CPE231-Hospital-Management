import { Text, Box, Stack, Image, VStack, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import checkToken from '../functions/checkToken'
export default () =>
{
    const router = useRouter()
    const linknow = router.asPath
    useEffect(()=>{
      if(checkToken(sessionStorage.getItem('token'))===false)
      {
          router.push('/')
          alert('Please login first')
      }
    },[])
    const createMenu = (text) =>
    {
        let cut = linknow.substring(1)
        const firstLetter = text.charAt(0).toUpperCase()
        const restOfText = text.slice(1)
        if (text == cut)
        {
            return (
                <Link href={`/${text}`}>
                    <Box position='relative'
                        zIndex='2'
                        width='inherit'
                        padding='16px 54px'
                        bgColor= 'rgb(131,159,171)'
                        cursor='pointer'
                    >
                        <Flex gap='36px' alignItems='center'>
                            <Image src='assets/image/home.png' />
                            <Text color='#fff' paddingTop='6px'>
                                {`${firstLetter}${restOfText}`}
                            </Text>
                        </Flex>
                    </Box>
                </Link>
            )
        }
        else
        {
            return (
                <Link href={`/${text}`}>
                    <Box position='relative'
                        zIndex='2'
                        width='inherit'
                        padding='16px 54px'
                        transition='all 0.2s ease-in-out'
                        _hover={{ bgColor: 'rgb(131,159,171)' }}
                        cursor='pointer'
                    >
                        <Flex gap='36px' alignItems='center'>
                            <Image src='assets/image/home.png' />
                            <Text color='#fff' paddingTop='6px'>
                                {`${firstLetter}${restOfText}`}
                            </Text>
                        </Flex>
                    </Box>
                </Link>
            )
        }
    }
    return (
        <nav >
            <VStack position='fixed' top='0' left='0' width='320px' height='100vh' bgColor='#305F72' fontFamily='YaroStBold'>
                <Image src='/assets/image/logo.png' position='absolute' marginTop='-64px' />
                <Stack paddingTop='200px' width='100%' flexDirection='column'>
                    {createMenu("dashboard")}
                    {createMenu("doctor",)}
                    {createMenu("patient")}
                    {createMenu("appointment")}
                    {createMenu("schedule")}
                    {createMenu("prescription")}
                    {createMenu("branch")}
                    {createMenu("analytics")}
                </Stack>
            </VStack>
        </nav>
    )
}
