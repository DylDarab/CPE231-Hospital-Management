import
{
    Box, ButtonGroup, Button, Center, Flex, Image, Input, InputRightElement, InputGroup,
    HStack, Text, Container, Heading, Select,
    Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer,
} from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon, PlusSquareIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import axios from 'axios'
import Navbar from '../../component/navbar'
import Colour from '../../Colour'
import { useRouter } from 'next/router'
import url from '../../url'
import { useState, useEffect } from 'react'
import { encode, decode } from 'js-base64'
import Loading from '../../component/loading'

export default (props) =>
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
        _hover: { filter: 'brightness(0.9)' },
        transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)'

    }

    let pageButton = {
        bg: Colour.Grey,
        _hover: { filter: 'brightness(0.9)' },
        transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)'
    }

    const [department, setDepartment] = useState(null)
    const [search, setSearch] = useState('')
    const [doctor, setDoctor] = useState([])
    const [page, setPage] = useState(1)
    const [pageAmount, setPageAmount] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() =>
    {
        const fetchDoctorData = async () =>
        {
            setIsLoading(true)
            let result = await axios.get(`${url}/api/getDoctor`, {
                headers: {
                    page: page,
                    search: encode(search),
                    department: department,
                }
            })
            setDoctor(result.data)
            setIsLoading(false)
            //if result.data[0].page_amount is not null, set pageAmount to result.data[0].page_amount else set to 1
            if (result.data.length!==0)
            {
                setPageAmount(result.data[0].page_amount)
            }
            else
            {
                setPageAmount(1)
            }        
            console.log(result.data)
        }
        fetchDoctorData()

    }, [department,search,page])


    const onDepartmentChange = (e) =>
    {
        setDepartment(e.target.value)
        setPage(1)
    }
    
    const onSearchChange = (e) =>
    {
        setSearch(e.target.value)
        setPage(1)
    }

    return (
        <Box bgColor={Colour.AlmostWhite}>
            <Loading isLoading={isLoading}/>
            <Navbar />
            <Box sx={container}>
                <Heading>
                    Doctor
                </Heading>
                <Box sx={line}></Box>
            </Box>
            <Flex sx={container2}>
                <HStack spacing='24px' justify='space-between'>
                    <HStack gap='24px'>

                        <Select
                            icon={<ChevronDownIcon />}
                            placeholder='All Department'
                            bgColor={Colour.White}
                            onChange={(e) => onDepartmentChange(e)}
                        >
                            {props.department.map((department, index) => (
                                <option key={department.departmentID} value={department.department_id}>{department.department_name}</option>
                            ))}

                        </Select>

                        <InputGroup maxWidth='250px' >
                            <InputRightElement
                                pointerEvents='none'
                                children={<SearchIcon />}
                            />
                            <Input
                                type='text'
                                placeholder='Search Doctor'
                                bgColor={Colour.White}
                                onChange={(e) => onSearchChange(e)} />
                        </InputGroup>

                    </HStack>
                    <Button leftIcon={<PlusSquareIcon />} sx={addButton} variant='solid'>
                        Add Doctor
                    </Button>
                </HStack>

                <TableContainer border={'1px solid' + Colour.LightGrey} borderRadius='12px' bgColor={Colour.White}>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Doctor's name</Th>
                                <Th>Department</Th>
                                <Th>Position</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {doctor.map((d,index) => (
                                <Tr key={index}>
                                    <Td>{d.staffID}</Td>
                                    <Td>
                                        <Flex align='center' gap='8px'>
                                            <Image
                                                display='inline-block'
                                                float='left'
                                                borderRadius='full'
                                                boxSize='40px'
                                                src={d.profile_img}
                                            />
                                            <Flex h='40px' align='center'>{`${d.firstname} ${d.lastname}`}</Flex>
                                        </Flex>
                                    </Td>
                                    <Td>{d.department_name}</Td>
                                    <Td>{d.position_name}</Td>
                                </Tr>
                            ))}
                        </Tbody>

                    </Table>
                </TableContainer>

                <HStack variant='solid' justify='end'>
                    <Button 
                        leftIcon={<ArrowBackIcon />} 
                        sx={pageButton} 
                        variant='solid'
                        onClick={() =>
                        {
                            if (page !=1)
                                setPage(page => page - 1)
                        }}
                    >
                        Previous
                    </Button>
                    <Center>{page}</Center>
                    <Button 
                        rightIcon={<ArrowForwardIcon />} 
                        sx={pageButton} 
                        variant='solid' 
                        onClick={()=>{
                            console.log(pageAmount, page != pageAmount)
                            if(page!=pageAmount)
                            {
                                setPage(page+1)
                            }
                        }}
                    >
                        Next
                    </Button>
                </HStack>
            </Flex>
        </Box>
    )
}


export const getServerSideProps = async () =>
{
    const result = await axios.get(`${url}/api/getDepartment`)
    return {
        props: {
            department: result.data
        }
    }
}
