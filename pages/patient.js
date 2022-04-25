import
    {
        ButtonGroup, Button, Center, Image, Input, InputRightElement, InputGroup,
        HStack, Text, Container, Heading,
        Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer,
    } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon, PlusSquareIcon, SearchIcon } from '@chakra-ui/icons'
import axios from 'axios'
import Navbar from '../component/navbar'

export default function Home(props)
{

    let container1 = {
        width: '100%',
        marginLeft: '360px',
        marginTop: '50px',
    }

    return (
        <div>
            <Container sx={container1}>
                <Heading>
                    Patient
                </Heading>

                <HStack spacing='24px'>
                    <InputGroup>
                        <InputRightElement
                            pointerEvents='none'
                            children={<SearchIcon />}
                        />
                        <Input type='text' placeholder='Search' />
                    </InputGroup>
                    <Button leftIcon={<PlusSquareIcon />} colorScheme='teal' variant='solid'>
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
            </Container>
        </div>
    )
}



