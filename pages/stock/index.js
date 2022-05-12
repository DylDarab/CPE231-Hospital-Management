import { Image, Container, Center, Box, Heading, Button, ButtonGroup, Input, InputRightElement, InputGroup} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, HStack, } from '@chakra-ui/react'
import {SearchIcon, ArrowBackIcon, ArrowForwardIcon} from '@chakra-ui/icons'
import axios from 'axios'
import { encode, decode } from 'js-base64'
import  {useRouter}  from 'next/router'
import { useEffect, useState } from 'react'
import Navbar from '../../component/navbar'
import Colour from '../../Colour'
import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer} from '@chakra-ui/react'
import url from '../../url'

export default () =>
{
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [medicine, setMedicine] = useState([])
    const [device, setDevice] = useState([])
    const [page, setPage] = useState(1)
    const [pageAmount, setPageAmount] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const fetchMedicineData = async () =>
    {
        setIsLoading(true)
        let result = await axios.get(`${url}/api/getMedicine`, {
            headers: {
                page: page,
                search: encode(search),
            }
        })
        setMedicine(result.data)
        setIsLoading(false)
        //if result.data[0].page_amount is not null, set pageAmount to result.data[0].page_amount else set to 1
        if (result.data.length !== 0)
        {
            setPageAmount(result.data[0].page_amount)
        }      
    }

    const fetchDeviceData = async () =>
    {
        setIsLoading(true)
        let result = await axios.get(`${url}/api/getDevice`, {
            headers: {
                page: page,
                search: encode(search),
            }
        })
        setDevice(result.data)
        setIsLoading(false)
        //if result.data[0].page_amount is not null, set pageAmount to result.data[0].page_amount else set to 1
        if (result.data.length !== 0)
        {
            setPageAmount(result.data[0].page_amount)
        }      
    }

    useEffect(() =>
    {
        fetchMedicineData()
    }, [search,page])

    useEffect(() =>
    {
        fetchDeviceData()
    }, [search,page])

    let container = {
        width: '100vw',
        paddingLeft: '360px',
        marginTop: '64px',
        bgColor: Colour.AlmostWhite,
    }
    let container1 = {
        width: '80%',
        marginTop: '24px',
        bgColor: Colour.AlmostWhite,
        border: "1px solid #d3d3d3",
        borderRadius: "8px",
    }
    let searchbox = {
        marginTop: '24px',
        bgColor: Colour.AlmostWhite,
    }
    let pagebox = {
        width: '80%',
        marginTop: '24px',
        bgColor: Colour.AlmostWhite,
    }
    let line = {
        width: '78vw',
        marginRight: '4000px',
        paddingLeft: '360px',
        bgColor: '#000',
        marginTop: ' 12px',
        height: '2px',
        bgColor: Colour.LightGrey
    }
    let pageButton = {
        bg: Colour.Grey,
        _hover: {filter: 'brightness(0.9)'},
        transition:'all 0.2s cubic-bezier(.08,.52,.52,1)'
    }

    return (
        <div>
            <Navbar />
            <Box sx={container} >
                <Heading>
                    Stock
                </Heading>
                <Box sx={line}></Box>

                <Tabs variant='soft-rounded' colorScheme='telegram'>
                <TabList>
                    <Tab>Medicine</Tab>
                    <Tab>Device</Tab>
                </TabList>
                <TabPanels>

                    <TabPanel>
                        <Box sx={searchbox}>
                        <InputGroup maxWidth='250px' >
                            <InputRightElement
                                pointerEvents='none'
                                children={<SearchIcon />}
                            />
                            <Input
                                type='text'
                                placeholder='Search Medicine'
                                bgColor={Colour.White}
                                onChange={(e) => {setSearch(e.target.value); setPage(1)}}></Input>
                        </InputGroup>
                        </Box>

                        <Box sx={container1}>
                        <TableContainer border={'1px solid' + Colour.LightGrey} borderRadius='12px' bgColor={Colour.White}>
                            <Table variant='simple'>
                                <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Description</Th>
                                    <Th>Price</Th>
                                    <Th>Amount</Th>
                                </Tr>
                                </Thead>
                                <Tbody>
                                {
                                medicine.map((item, index) => 
                                {
                                    return (
                                        <Tr key={index}>
                                            <Td>{item.medicineID}</Td>
                                            <Td>{item.medicine_name}</Td>
                                            <Td>{item.description}</Td>
                                            <Td>{item.price_per_unit}</Td>
                                            <Td>{item.amount}</Td>
                                        </Tr>
                                    )
                                })
                            }   
                                </Tbody>
                            </Table>
                            </TableContainer>
                            </Box>
                            <Box sx = {pagebox}>
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
                            </Box>
                    </TabPanel>

                    <TabPanel>
                    <Box sx={searchbox}>
                        <InputGroup maxWidth='250px' >
                            <InputRightElement
                                pointerEvents='none'
                                children={<SearchIcon />}
                            />
                            <Input
                                type='text'
                                placeholder='Search Device'
                                bgColor={Colour.White}
                                onChange={(e) => {setSearch(e.target.value); setPage(1)}}>
                            </Input>
                        </InputGroup>
                    </Box>
                    <Box sx={container1}>
                        <TableContainer border={'1px solid' + Colour.LightGrey} borderRadius='12px' bgColor={Colour.White} >
                            <Table variant='simple'>
                                <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Description</Th>
                                    <Th>Price</Th>
                                    <Th>Amount</Th>
                                </Tr>
                                </Thead>
                                <Tbody>
                                {
                                device.map((item, index) => 
                                {
                                    return (
                                        <Tr key={index}>
                                            <Td>{item.deviceID}</Td>
                                            <Td>{item.device_name}</Td>
                                            <Td>{item.description}</Td>
                                            <Td>{item.price_per_unit}</Td>
                                            <Td>{item.amount}</Td>
                                        </Tr>
                                    )
                                })
                            }   
                                </Tbody>
                            </Table>
                            </TableContainer>
                        </Box>
                        <Box sx = {pagebox}>
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
                            </Box>
                    </TabPanel>
                </TabPanels>
                </Tabs>
            </Box>
        </div>
    )
}



