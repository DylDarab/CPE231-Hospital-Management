import { Box, ButtonGroup, Button, Center, Flex, Image, Input, InputRightElement, InputGroup,
    HStack, Text,Container, Heading, Stack,
    Table, Thead, Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer, CloseButton,} from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon, PlusSquareIcon, SearchIcon } from '@chakra-ui/icons'
import phoneFormatter from 'phone-formatter'


import axios from 'axios'
import Colour from '../../../Colour'
import Loading from '../../../component/loading'
import { encode, decode } from 'js-base64'
import { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import url from '../../../url'

export default (props) =>
{
    const router = useRouter()

    const [infoActive, setInfoActive] = useState(false)
    const [department, setDepartment] = useState(null)
    const [search, setSearch] = useState('')
    const [patient, setPatient] = useState([])
    const [page, setPage] = useState(1)
    const [pageAmount, setPageAmount] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    
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
        marginTop: '32px',
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

    let infoButton = {
        _hover: {filter: 'brightness(0.9)'},
        transition:'all 0.2s cubic-bezier(.08,.52,.52,1)',
    }

    let pageButton = {
        bg: Colour.Grey,
        _hover: {filter: 'brightness(0.9)'},
        transition:'all 0.2s cubic-bezier(.08,.52,.52,1)'
    }

    const buttonStyle = (bgColor, textColor='#000000') => {
        return {
            bg: bgColor,
            color: textColor,
            _hover: {filter: 'brightness(0.9)'},
            transition:'all 0.2s cubic-bezier(.08,.52,.52,1)',
        }
    }

    return (
        <div style={{backgroundColor: Colour.AlmostWhite}}>
            <Loading isLoading={isLoading}/>
            <Box sx={container}>
                <Heading>
                    Patient
                </Heading>
                <Box sx={line}></Box>
            </Box>
            <Flex sx={container2}>
                <HStack justify='space-between'>
                    <ButtonGroup>
                        <Button sx={infoButton}
                            variant={infoActive ? 'solid' : 'outline'}
                            bg={infoActive ? Colour.SkyBlue : Colour.White}
                            borderColor={infoActive ? 'none' : Colour.SkyBlue}
                            // onClick={() => router.push(`/patient/${props.patientID}/info`)}
                            onClick={() => router.push(`/patient/212`)}
                        >
                            Personal information
                        </Button>
                        <Button sx={infoButton}
                            variant={!infoActive ? 'solid' : 'outline'}
                            bg={!infoActive ? Colour.SkyBlue : Colour.White}
                            borderColor={!infoActive ? 'none' : Colour.SkyBlue}
                            onClick={() => router.push(`/patient/212/history`)}
                        >
                            Appointment history
                        </Button>
                    </ButtonGroup>
                    <Button leftIcon={<PlusSquareIcon />} sx={buttonStyle(Colour.DarkGreen, Colour.White)} variant='solid'
                        onClick={()=>{router.push('/patient/addPatient')}}
                    >
                        Add appointment
                    </Button>
                </HStack>

                <TableContainer border={'1px solid' + Colour.LightGrey} borderRadius='12px'>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Date time</Th>
                                <Th>Doctor</Th>
                                <Th>Symptom</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {/* {
                                patient.map((item, index) => 
                                {
                                    return (
                                        <Tr key={index}>
                                            <Td>{item.patientID}</Td>
                                            <Td>
                                                <Flex align='center' gap='8px'>
                                                    <Image
                                                        display='inline-block'
                                                        float='left'
                                                        borderRadius='full'
                                                        boxSize='40px'
                                                        src={'https://robohash.org/'+item.patientID+'?set=set4'}
                                                        alt={item.lastname}
                                                    />
                                                    <Flex h='40px' align='center'>
                                                        {item.firstname + ' ' + item.lastname}
                                                    </Flex>
                                                </Flex>
                                            </Td>
                                            <Td isNumeric>{phoneFormatter.format(item.phone_number,'NNN-NNN-NNNN')}</Td>
                                        </Tr>
                                    )
                                })
                            } */}
                            <Tr key='TEST'>
                                <Td>123</Td>
                                <Td>
                                    <Flex align='center' gap='8px'>
                                        <Image
                                            display='inline-block'
                                            float='left'
                                            borderRadius='full'
                                            boxSize='40px'
                                            src={'https://robohash.org/123?set=set4'}
                                            alt='test'
                                        />
                                        <Flex h='40px' align='center'>
                                            Test Tester
                                        </Flex>
                                    </Flex>
                                </Td>
                                <Td>TESTTESTTEST</Td>
                                <Td>
                                    <Stack>
                                        <Button size='xs' sx={buttonStyle(Colour.SkyBlue)}>Info</Button>
                                        <Button size='xs' sx={buttonStyle(Colour.SkyBlue)}>Invoice</Button>
                                    </Stack>
                                </Td>
                            </Tr>
                            <Tr key='TEST'>
                                <Td>123</Td>
                                <Td>
                                    <Flex align='center' gap='8px'>
                                        <Image
                                            display='inline-block'
                                            float='left'
                                            borderRadius='full'
                                            boxSize='40px'
                                            src={'https://robohash.org/123?set=set4'}
                                            alt='test'
                                        />
                                        <Flex h='40px' align='center'>
                                            Test Tester
                                        </Flex>
                                    </Flex>
                                </Td>
                                <Td>TESTTESTTEST</Td>
                                <Td>
                                    <Stack>
                                        <Button size='xs' sx={buttonStyle(Colour.SkyBlue)}>Info</Button>
                                        <Button size='xs' sx={buttonStyle(Colour.SkyBlue)}>Invoice</Button>
                                    </Stack>
                                </Td>
                            </Tr>
                        </Tbody>

                    </Table>
                </TableContainer>

                <HStack variant='solid' justify='end'>
                    <Button leftIcon={<ArrowBackIcon />} sx={pageButton} variant='solid'
                        onClick={()=>{
                            if (page > 1)
                                setPage(page - 1)
                        }}
                        isDisabled={page === 1}
                    >
                        Previous
                    </Button>
                    <Center>{page}</Center>
                    <Button rightIcon={<ArrowForwardIcon />} sx={pageButton} variant='solid'
                        onClick={()=>{
                            if (page < pageAmount)
                                setPage(page + 1)
                        }}
                        isDisabled={page === parseInt(pageAmount)}
                    >
                        Next
                    </Button>
                </HStack>
            </Flex>
        </div>
    )
}



