import { Box, ButtonGroup, Button, Center, Flex, Image, Input, InputRightElement, InputGroup,
    HStack, Text,Container, Heading,
    Table, Thead, Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer, CloseButton,} from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon, PlusSquareIcon, SearchIcon } from '@chakra-ui/icons'

import axios from 'axios'
import Colour from '../../Colour'
import Loading from '../../component/loading'
import { encode, decode } from 'js-base64'
import { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import url from '../../url'

export default (props) =>
{
    const router = useRouter()

    const [department, setDepartment] = useState(null)
    const [search, setSearch] = useState('')
    const [patient, setPatient] = useState([])
    const [page, setPage] = useState(1)
    const [pageAmount, setPageAmount] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const fetchPatientData = async () =>
    {
        setIsLoading(true)
        let result = await axios.get(`${url}/api/getPatient/${page}`, {
            headers: {
                page: page,
                search: encode(search),
                department: department,
            }
        })
        setPatient(result.data)
        setIsLoading(false)
        //if result.data[0].page_amount is not null, set pageAmount to result.data[0].page_amount else set to 1
        if (result.data.length !== 0)
        {
            setPageAmount(result.data[0].page_amount)
        }      
        console.log(result.data)
        console.log(search)
    }

    useEffect(() =>
    {
        fetchPatientData()
    }, [search,page])

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
            <Loading isLoading={isLoading}/>
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
                        <Input type='text' placeholder='Search' 
                            onChange={(e) => {setSearch(e.target.value); setPage(1)}}
                        />
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
                            {
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
                                            <Td isNumeric>{item.phone_number}</Td>
                                        </Tr>
                                    )
                                })
                            }
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


