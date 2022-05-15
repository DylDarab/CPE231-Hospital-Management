import
    {
        Box, ButtonGroup, Button, Center, Flex, Image, Input, InputRightElement, InputGroup,
        HStack, Text, Container, Heading, Stack,
        Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, CloseButton,
    } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon, PlusSquareIcon, SearchIcon } from '@chakra-ui/icons'
import phoneFormatter from 'phone-formatter'

import AppointmentAdd from '../../../component/appointmentAdd'
import AppointmentInfo from '../../../component/appointmentInfo'
import Invoice from '../../../component/invoice'

import axios from 'axios'
import Colour from '../../../Colour'
import Loading from '../../../component/loading'
import { encode, decode } from 'js-base64'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import url from '../../../url'

export default (props) =>
{
    const { patient } = props
    const router = useRouter()
    const patientID = router.query.patientID

    const [selected, setSelected] = useState(false)
    const [selectedInfo, setSelectedInfo] = useState(null)
    const [infoinvoice, setInvoice] = useState(null)
    const [infoActive, setInfoActive] = useState(false)
    const [department, setDepartment] = useState(null)
    const [search, setSearch] = useState('')
    // const [patient, setPatient] = useState([])
    const [page, setPage] = useState(1)
    const [pageAmount, setPageAmount] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [positionID, setPositionID] = useState(null)

    useEffect(() =>
    {
        setPositionID(sessionStorage.getItem('positionID'))
    }, [])


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
        _hover: { filter: 'brightness(0.9)' },
        transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)',
    }

    let pageButton = {
        bg: Colour.Grey,
        _hover: { filter: 'brightness(0.9)' },
        transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)'
    }

    const buttonStyle = (bgColor, textColor = '#000000') =>
    {
        return {
            bg: bgColor,
            color: textColor,
            _hover: { filter: 'brightness(0.9)' },
            transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)',
        }
    }

    return (
        <div style={{ backgroundColor: Colour.AlmostWhite }}>
            <Loading isLoading={isLoading} />
            <Box sx={container}>
                <Heading>
                    Patient's Profile
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
                            onClick={() => router.push(`/patient/${patientID}`)}
                        >
                            Personal information
                        </Button>
                        <Button sx={infoButton}
                            variant={!infoActive ? 'solid' : 'outline'}
                            bg={!infoActive ? Colour.SkyBlue : Colour.White}
                            borderColor={!infoActive ? 'none' : Colour.SkyBlue}
                            onClick={() => router.push(`/patient/${patientID}/history`)}
                        >
                            Appointment history
                        </Button>
                    </ButtonGroup>
                    {positionID == 3 ?
                        <Button leftIcon={<PlusSquareIcon />} sx={buttonStyle(Colour.DarkGreen, Colour.White)} variant='solid'
                            onClick={() => setSelected(true)}
                        >
                            Add appointment
                        </Button>
                        : null}
                    <AppointmentAdd isOpen={selected} onClose={() => setSelected(false)} rooms={props.rooms} doctors={props.doctors} />
                </HStack>

                <TableContainer border={'1px solid' + Colour.LightGrey} borderRadius='12px' bg={Colour.White}>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Date time</Th>
                                <Th>Doctor</Th>
                                <Th>Symptom</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                patient.map((item, index) => 
                                {
                                    let date = new Date(item.end_time).toLocaleString()
                                    return (
                                        <Tr key={index}>
                                            <Td>{date}</Td>
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
                                                        {item.staff_firstname + ' ' + item.staff_lastname}
                                                    </Flex>
                                                </Flex>
                                            </Td>
                                            <Td>{item.symptoms}</Td>
                                            <Td>
                                                <Stack>
                                                    <Button size='xs' sx={buttonStyle(Colour.LightGrey)}
                                                        onClick={() => setSelectedInfo(index)}
                                                    >
                                                        Info</Button>
                                                    <Button size='xs' sx={buttonStyle(Colour.LightGrey)}
                                                        onClick={() => setInvoice(index)}
                                                    >Invoice</Button>
                                                </Stack>
                                                <AppointmentInfo item={item} isOpen={selectedInfo === index ? true : false} onClose={() => setSelectedInfo(null)} />
                                                <Invoice item={item} isOpen={infoinvoice === index ? true : false} onClose={() => setInvoice(null)} />
                                            </Td>
                                        </Tr>
                                    )
                                })
                            }

                        </Tbody>

                    </Table>
                </TableContainer>

                <HStack variant='solid' justify='end'>
                    <Button leftIcon={<ArrowBackIcon />} sx={pageButton} variant='solid'
                        onClick={() =>
                        {
                            if (page > 1)
                                setPage(page - 1)
                        }}
                        isDisabled={page === 1}
                    >
                        Previous
                    </Button>
                    <Center>{page}</Center>
                    <Button rightIcon={<ArrowForwardIcon />} sx={pageButton} variant='solid'
                        onClick={() =>
                        {
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

export const getServerSideProps = async (context) =>
{
    let patientID = context.params.patientID
    const data = await axios.get(`${url}/api/getAppointmentHistory/${patientID}`)
    const rooms = await axios.get(`${url}/api/getRoom`)
    const doctors = await axios.get(`${url}/api/getDoctorList`)
    return {
        props: {
            patient: data.data,
            rooms: rooms.data,
            doctors: doctors.data,
        }
    }
}


