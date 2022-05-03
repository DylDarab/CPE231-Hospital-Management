import { Image, Container, Box, Heading, Button, ButtonGroup, Input, InputRightElement, InputGroup} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, HStack, } from '@chakra-ui/react'
import {SearchIcon,PlusSquareIcon} from '@chakra-ui/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Navbar from '../../component/navbar'
import Colour from '../../Colour'
import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer} from '@chakra-ui/react'

export default () =>
{
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
        width: '80%',
        marginTop: '48px',
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
    let addButton = {
        bg: Colour.DarkGreen,
        color: Colour.White,
        _hover: { filter: 'brightness(0.9)' },
        transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)'
    }

    return (
        <div>
            <Navbar />
            <Box sx={container} >
                <Heading>
                    Order
                </Heading>
                <Box sx={line}></Box>
                <Box sx={searchbox}>
                <HStack spacing='24px' justify='space-between'>
                    <HStack gap='24px'>
                        <InputGroup maxWidth='250px' >
                            <InputRightElement
                                pointerEvents='none'
                                children={<SearchIcon />}
                            />
                            <Input
                                type='text'
                                placeholder='Search Order'
                                bgColor={Colour.White}
                                onChange={(e) => onSearchChange(e)}>
                            </Input>
                        </InputGroup>
                    </HStack>
                        <Button leftIcon={<PlusSquareIcon/>} sx={addButton} variant='solid' onClick={()=>onAddDoctor()}>
                            Add Order
                        </Button>
                </HStack>
                </Box>
                        <Box sx={container1}>
                        <TableContainer >
                            <Table variant='simple'>
                                <Thead>
                                <Tr>
                                    <Th>OrderID</Th>
                                    <Th>Date Order</Th>
                                    <Th>Organization</Th>
                                    <Th>Date in stock</Th>
                                </Tr>
                                </Thead>
                                <Tbody>
                                <Tr>
                                    <Td>100001</Td>
                                    <Td>2022-04-10 10:46:51</Td>
                                    <Td>1005</Td>
                                    <Td>2022-04-12 10:11:34</Td>
                                </Tr>
                                <Tr>
                                    <Td>100002</Td>
                                    <Td>2022-04-12 17:12:34</Td>
                                    <Td>1003</Td>
                                    <Td>2022-04-12 10:11:34</Td>
                                </Tr>
                                </Tbody>
                            </Table>
                            </TableContainer>
                        </Box>
            </Box>
        </div>
    )
}



