import { Image, Container, Box, Heading, Button, ButtonGroup, Input, InputRightElement, InputGroup} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, HStack, } from '@chakra-ui/react'
import {SearchIcon} from '@chakra-ui/icons'
import axios from 'axios'
import  {useRouter}  from 'next/router'
import { useEffect, useState } from 'react'
import Navbar from '../../component/navbar'
import Colour from '../../Colour'
import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer} from '@chakra-ui/react'

export default () =>
{
    const router = useRouter()

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
    let line = {
        width: '78vw',
        marginRight: '4000px',
        paddingLeft: '360px',
        bgColor: '#000',
        marginTop: ' 12px',
        height: '2px',
        bgColor: Colour.LightGrey
    }
    const [search, setSearch] = useState('')

    const onSearchChange = (e) =>
    {
        setSearch(e.target.value)
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
                    <Tab onClick={() => router.push('https://youtu.be/dQw4w9WgXcQ?t=43')}>Device</Tab>
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
                                onChange={(e) => onSearchChange(e)}>
                            </Input>
                        </InputGroup>
                        </Box>
                        <Box sx={container1}>
                        <TableContainer >
                            <Table variant='simple'>
                                <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Description</Th>
                                    <Th>Price</Th>
                                    <Th>Note</Th>
                                    <Th isNumeric>Amount</Th>
                                </Tr>
                                </Thead>
                                <Tbody>
                                <Tr>
                                    <Td>1000001</Td>
                                    <Td>Paracetamol</Td>
                                    <Td>Paracetamol</Td>
                                    <Td>2</Td>
                                    <Td></Td>
                                    <Td isNumeric>3000</Td>
                                </Tr>
                                <Tr>
                                    <Td>1000002</Td>
                                    <Td>Ibuprofen</Td>
                                    <Td>Ibuprofen</Td>
                                    <Td>5</Td>
                                    <Td></Td>
                                    <Td isNumeric>1500</Td>
                                </Tr>
                                </Tbody>
                            </Table>
                            </TableContainer>
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
                                onChange={(e) => onSearchChange(e)}>
                            </Input>
                        </InputGroup>
                    </Box>
                    <Box sx={container1}>
                        <TableContainer >
                            <Table variant='simple'>
                                <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Description</Th>
                                    <Th>Price</Th>
                                    <Th>Note</Th>
                                    <Th isNumeric>Amount</Th>
                                </Tr>
                                </Thead>
                                <Tbody>
                                <Tr>
                                    <Td>10001</Td>
                                    <Td>Stethoscope</Td>
                                    <Td>Stethoscope</Td>
                                    <Td>0</Td>
                                    <Td></Td>
                                    <Td isNumeric>200</Td>
                                </Tr>
                                <Tr>
                                <Td>10001</Td>
                                    <Td>Syringe</Td>
                                    <Td>Syringe</Td>
                                    <Td>0</Td>
                                    <Td></Td>
                                    <Td isNumeric>1500</Td>
                                </Tr>
                                </Tbody>
                            </Table>
                            </TableContainer>
                        </Box>
                    </TabPanel>
                </TabPanels>
                </Tabs>
            </Box>
        </div>
    )
}



