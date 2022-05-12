import { Box, ButtonGroup, Button, Center, Flex, Image, Input, InputRightElement, InputGroup,
    HStack, Text,Container, Heading, Lorem, Stack, useDisclosure,
    Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,
    Table, Thead, Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer, CloseButton,} from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon, EditIcon, PlusSquareIcon, SearchIcon } from '@chakra-ui/icons'

import phoneFormatter from 'phone-formatter'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import Colour from '../../Colour'
import AppointmentInfo from '../../component/appointmentInfo'

export default () =>
{

    const [page, setPage] = useState(1)
    const [pageAmount, setPageAmount] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState('')

    const { isOpen, onOpen, onClose } = useDisclosure()
    // const finalRef = useRef()

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
            <Box sx={container} >
                <Heading>
                    Appointment
                </Heading>
                <Box sx={line}></Box>
            </Box>

            <Flex sx={container2}>
                <HStack justify='space-between'>
                    <Heading as='h4' size='md'>Upcoming appointments</Heading>
                    <InputGroup maxWidth='400px'>
                        <InputRightElement
                            pointerEvents='none'
                            children={<SearchIcon />}
                        />
                        <Input type='text' placeholder='Search' 
                            onChange={(e) => {setSearch(e.target.value); setPage(1)}}
                        />
                    </InputGroup>
                </HStack>

                <TableContainer border={'1px solid' + Colour.LightGrey} borderRadius='12px'>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Patient ID</Th>
                                <Th>Patient's name</Th>
                                <Th>Doctor</Th>
                                <Th>Department</Th>
                                <Th>Date time</Th>
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
                                <Td>
                                    TESTTEST
                                </Td>
                                <Td>
                                    00/00/2000 12:00
                                </Td>
                                <Td>
                                    <Button leftIcon={<EditIcon />} sx={buttonStyle(Colour.Red)}
                                        onClick={onOpen}
                                    >
                                        Edit
                                    </Button>                       
                                    
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
            <AppointmentInfo isOpen={isOpen} onClose={onClose} />
        </div>
        
    )
}



