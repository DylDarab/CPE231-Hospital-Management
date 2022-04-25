import { Box, ButtonGroup, Button, Center, Flex, Image, Input, InputRightElement, InputGroup,
    HStack, Text,Container, Heading,
    Table, Thead, Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer,} from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon, PlusSquareIcon, SearchIcon } from '@chakra-ui/icons'
import axios from 'axios'
import Navbar from '../component/navbar'
import Colour from '../Colour'


export default function Home(props)
{

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
        _hover: {filter: 'saturate(2)'},
    }

    return (
        <div>
            <Navbar />
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
                    <Button leftIcon={<PlusSquareIcon />} sx={addButton} variant='solid'>
                        Add patient
                    </Button>
                </HStack>

                <TableContainer>
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
                                <Td>inches</Td>
                                <Td>millimetres (mm)</Td>
                                <Td isNumeric>25.4</Td>
                            </Tr>
                            <Tr>
                                <Td>feet</Td>
                                <Td>centimetres (cm)</Td>
                                <Td isNumeric>30.48</Td>
                            </Tr>
                            <Tr>
                                <Td>yards</Td>
                                <Td>metres (m)</Td>
                                <Td isNumeric>0.91444</Td>
                            </Tr>
                        </Tbody>

                    </Table>
                </TableContainer>

                <HStack variant='solid' justify='end'>
                    <Button leftIcon={<ArrowBackIcon />} colorScheme='teal' variant='solid'>
                        Previous
                    </Button>
                    <Center w='auto'>
                        <Text>1</Text>
                    </Center>
                    <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='solid'>
                        Next
                    </Button>
                </HStack>
            </Flex>
        </div>
    )
}



