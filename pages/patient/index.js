import {useRouter} from 'next/router'
import { Box, ButtonGroup, Button, Center, Flex, Image, Input, InputRightElement, InputGroup,
    HStack, Text,Container, Heading,
    Table, Thead, Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer,} from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon, PlusSquareIcon, SearchIcon } from '@chakra-ui/icons'
import axios from 'axios'
import Colour from '../../Colour'


export default function Home(props)
{
    const router = useRouter()

    let container = {
        width: '100vw',
        paddingLeft: '360px',
        marginTop: '64px',
        bgColor: Colour.AlmostWhite,
    }

    let container2 = {
        flexDirection: 'column',
        maxWidth: 'container.lg',
        gap: '4',
        width: '100%',
        marginLeft: '360px',
        marginTop: '50px',
        bgColor: Colour.AlmostWhite,
    }

    let line = {
        width: '78vw',
        paddingLeft: '360px',
        bgColor: '#000',
        marginTop: ' 12px',
        height: '2px',
        bgColor: Colour.LightGrey
    }

    let addButton = {
        bg: Colour.DarkGreen,
        color: Colour.White,
        _hover: {filter: 'brightness(0.9)'},
        transition:'all 0.2s cubic-bezier(.08,.52,.52,1)'

    }

    let pageButton = {
        bg: Colour.Grey,
        _hover: {filter: 'brightness(0.9)'},
        transition:'all 0.2s cubic-bezier(.08,.52,.52,1)'
    }

    return (
        <div style={{backgroundColor: Colour.AlmostWhite}}>
            <Box sx={container}>
                <Heading>
                    Patient
                </Heading>
                <Box sx={line}></Box>
            </Box>
            <Flex sx={container2}>
                <HStack spacing='24px' justify='space-between'>
                    <InputGroup maxWidth='400px'>
                        <InputRightElement
                            pointerEvents='none'
                            children={<SearchIcon />}
                        />
                        <Input type='text' placeholder='Search' />
                    </InputGroup>
                    <Button leftIcon={<PlusSquareIcon />} sx={addButton} variant='solid'
                        onClick={()=>{router.push('/patient/addPatient')}}
                    >
                        Add patient
                    </Button>
                </HStack>

                <TableContainer border={'1px solid' + Colour.LightGrey} borderRadius='12px'>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Patient's name</Th>
                                <Th isNumeric>Phone number</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>123456</Td>
                                <Td>
                                    <Flex align='center' gap='8px'>
                                        <Image
                                            display='inline-block'
                                            float='left'
                                            borderRadius='full'
                                            boxSize='40px'
                                            src='https://bit.ly/dan-abramov'
                                            alt='Dan Abramov'
                                        />
                                        <Flex h='40px' align='center'>โทนี่ อาระยี่หว่า</Flex>
                                    </Flex>
                                </Td>
                                <Td isNumeric>0988765432</Td>
                            </Tr>
                            <Tr>
                                <Td>123456</Td>
                                <Td>
                                    <Flex align='center' gap='8px'>
                                        <Image
                                            display='inline-block'
                                            float='left'
                                            borderRadius='full'
                                            boxSize='40px'
                                            src='https://bit.ly/dan-abramov'
                                            alt='Dan Abramov'
                                        />
                                        <Flex h='40px' align='center'>โทนี่ อาระยี่หว่า</Flex>
                                    </Flex>
                                </Td>
                                <Td isNumeric>0988765432</Td>
                            </Tr>
                        </Tbody>

                    </Table>
                </TableContainer>

                <HStack variant='solid' justify='end'>
                    <Button leftIcon={<ArrowBackIcon />} sx={pageButton} variant='solid'>
                        Previous
                    </Button>
                    <Center>1</Center>
                    <Button rightIcon={<ArrowForwardIcon />} sx={pageButton} variant='solid'>
                        Next
                    </Button>
                </HStack>
            </Flex>
        </div>
    )
}



