import { useRouter } from 'next/router'
import
{
    Image,Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement,
    InputRightElement, Heading, HStack, Radio, Select, SimpleGrid, Text, Textarea, Stack, RadioGroup, VStack
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'
import axios from 'axios'
import Colour from '../../Colour'
import { useState } from 'react'
import emailValidate from 'email-validator'
import phoneFormatter from 'phone-formatter'
import url from '../../url'

export default (props) =>
{

    const router = useRouter()

    let container = {
        width: '100vw',
        paddingLeft: '360px',
        marginTop: '64px',
        bgColor: Colour.AlmostWhite,
    }

    let container2 = {
        flexDirection: 'column',
        gap: '4',
        maxWidth: 'container.lg',
        width: '100%',
        marginLeft: '360px',
        marginTop: '32px',
    }

    let container3 = {
        border: '1px solid',
        borderColor: Colour.LightGrey,
        borderRadius: '12px',
        flexDirection: 'column',
        gap: '4',
        width: '100%',
        padding: '16px',
        bgColor: 'white',
    }

    let line = {
        width: '90%',
        marginRight: '4000px',
        paddingLeft: '360px',
        bgColor: '#000',
        marginTop: ' 12px',
        height: '2px',
        bgColor: Colour.LightGrey
    }

    let fileButton = {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 'md',
        bg: Colour.Orange,
        // color: 'white',
        px: 4,
        h: 8,
        _hover: { filter: 'brightness(0.9)' },
        transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)',
    }

    let summitButton = {
        bg: Colour.Orange,
        _hover: { filter: 'brightness(0.9)' },
        transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)',
        width: '100px',
    }


    const [file, setFile] = useState(['Profile name', null])
    const [allergyForm, setAllergyForm] = useState(true)
    const [error, setError] = useState(false)
    const [form, setForm] = useState({})

    const checkCitizen = (e) =>
    {
        let regExp = /[0-9]/g
        let result = regExp.test(e.target.value)
        let id = e.target.value
        if (result && id.length === 13)
        {
            let check = parseInt(id[0]) * 13 + parseInt(id[1]) * 12 + parseInt(id[2]) * 11 +
                parseInt(id[3]) * 10 + parseInt(id[4]) * 9 + parseInt(id[5]) * 8 +
                parseInt(id[6]) * 7 + parseInt(id[7]) * 6 + parseInt(id[8]) * 5 +
                parseInt(id[9]) * 4 + parseInt(id[10]) * 3 + parseInt(id[11]) * 2
            let checkDigit = check % 11
            if (11 - checkDigit === parseInt(id[12]))
            {
                setForm({ ...form, citizenID: id })
            }
            else
            {
                setForm({ ...form, citizenID: "" })
            }
        }
        else
        {
            setForm({ ...form, citizenID: "" })
        }
    }

    const checkECPhone = (e) =>
    {
        let regExp = /[0-9]/g
        let result = regExp.test(e.target.value)
        let phone = e.target.value
        if (result)
        {
            setForm({ ...form, EC_phone: phone })
        }
        else
        {
            setForm({ ...form, EC_phone: "" })
        }
    }

    const checkPhone = (e) =>
    {
        let regExp = /[0-9]/g
        let result = regExp.test(e.target.value)
        let phone = e.target.value
        if (result)
        {
            setForm({ ...form, phone_number: phone })
        }
        else
        {
            setForm({ ...form, phone_number: "" })
        }
    }

    const checkEmail = (e) =>
    {
        if (emailValidate.validate(e.target.value))
        {
            setForm({ ...form, email: phone })
        }
        else
        {
            setForm({ ...form, email: "" })
        }
    }

    const handleAllergyForm = (e) =>
    {
        console.log(e)
        if (e === 'y')
            setAllergyForm(false)
        else
        {
            setForm({ ...form, allergy: "" })
            setAllergyForm(true)
        }
    }

    const handleFile = (e) =>
    {
        if (e.target.files[0])
        {
            setFile([e.target.files[0].name, e.target.files[0]])
        }
    }

    const onSummitClick = () =>
    {
        console.log('summit clicked!')
        if (form.firstname && form.lastname && form.gender && form.birthDate &&
            form.citizenID && form.phone_number && form.address && form.EC_name &&
            form.EC_Relationship && form.EC_phone && form.bloodGroup)
        {
            setError(false)
            console.log('form is valid')
        }
        else
        {
            setError(true)
            console.log('form is not valid')
        }
    }
    console.log(form)
    return (
        <div style={{ backgroundColor: Colour.AlmostWhite, marginBottom: '80px'}}>
            <Box sx={container} >
                <Heading>
                    {props.staffData.firstname} {props.staffData.lastname}
                </Heading>
                <Box sx={line}></Box>
            </Box>

            <Flex sx={container2}>
                <Flex sx={container3}>
                    <Heading as='h4' size='md'>Personal information</Heading>

                    <HStack>
                        <Image width='96px' borderRadius='100%' src={props.staffData.profile_img}/>
                    </HStack>

                    <Box>
                        <SimpleGrid columns={2} spacing={3}>
                            <FormControl isReadOnly isInvalid={error && !form.firstname}>
                                <FormLabel htmlFor='first-name'>First Name</FormLabel>
                                <Input id='first-name' value={props.staffData.firstname}
                                    onChange={(e) => { setprops.staffData({ ...props.staffData, firstname: e.target.value }) }}
                                />
                                {/* <props.staffDataErrorMessage>First name is required.</props.staffDataErrorMessage> */}
                            </FormControl>
                            <FormControl isReadOnly isInvalid={error && !props.staffData.lastname}>
                                <FormLabel htmlFor='last-name'>Last Name</FormLabel>
                                <Input id='last-name' value={props.staffData.lastname}
                                    onChange={(e) => { setForm({ ...form, lastname: e.target.value }) }}
                                />
                            </FormControl>
                            <FormControl isReadOnly isInvalid={error && !form.gender}>
                                <FormLabel htmlFor='gender'>Citizen ID</FormLabel>
                                <Input id='last-name' value={props.staffData.citizenID}
                                    onChange={(e) => { setForm({ ...form, citizenID: e.target.value }) }}
                                />
                            </FormControl>
                            <FormControl isReadOnly isInvalid={error && !form.birthDate}>
                                <FormLabel htmlFor='birth-date'>Birth Date</FormLabel>
                                <Input id='birth-date'  value={new Date(props.staffData.birthDate).toLocaleDateString('en-GB')}
                                />
                            </FormControl>
                            <FormControl isReadOnly isInvalid={error && !form.phone_number}>
                                <FormLabel htmlFor='phone'>Phone number</FormLabel>
                                <Input id='phone' value={phoneFormatter.format(props.staffData.phone_number,"NNN-NNN-NNNN")}
                                    onChange={(e) => checkPhone(e)}
                                />
                            </FormControl>
                            <FormControl isReadOnly isInvalid={error && !form.email}>
                                <FormLabel htmlFor='citizen-id'>Email Address</FormLabel>
                                <Input id='citizen-id' value={props.staffData.email}
                                    onChange={(e) => checkEmail(e)}
                                />
                            </FormControl>
                        </SimpleGrid>
                    </Box>
                </Flex>

                <Flex sx={container3}>
                    <Heading as='h4' size='md'>Doctor Information</Heading>
                    <Box>
                        <VStack spacing={4}>
                            <HStack spacing={4} w='100%'>
                                <FormControl  isInvalid={error && !form.EC_name} w='50%'>
                                    <FormLabel htmlFor='ec-name'>Department</FormLabel>
                                    <Input
                                        value={props.staffData.department_name}
                                        isReadOnly   
                                    />
                                       
                                </FormControl>
                                <FormControl  isInvalid={error && !form.EC_Relationship} w='50%'>
                                    <FormLabel htmlFor='ec-relationship'>Position</FormLabel>

                                    <Input
                                        value={props.staffData.position_name}
                                        isReadOnly
                                    />
                                </FormControl>

                            </HStack>
                            <FormControl isReadOnly isInvalid={error && !form.licensed_number} w='100%'>
                                <FormLabel htmlFor='licensed_number'>Licensed Number</FormLabel>
                                <Input type='number' id='licensed_number' value={props.staffData.licensed_number}
                                    onChange={(e) => { setForm({ ...form, licensed_number: e.target.value }) }}
                                />
                            </FormControl>
                        </VStack>
                    </Box>
                </Flex>

                <Flex sx={container3}>
                    <Heading as='h4' size='md'>Authentication information</Heading>
                    <HStack spacing={4}>
                        <FormControl isReadOnly isInvalid={error && !form.username} w='50%'>
                            <FormLabel htmlFor='username'>Username</FormLabel>
                            <Input id='username' value={props.staffData.username}
                                onChange={(e) => { setForm({ ...form, username: e.target.value }) }}
                            />
                        </FormControl>
                        <FormControl isReadOnly isInvalid={error && !form.password} w='50%'>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <Input type='password' id='password' value={props.staffData.password}
                                onChange={(e) => { setForm({ ...form, password: e.target.value }) }}
                            />
                        </FormControl>
                    </HStack>

                </Flex>
                {/* <HStack justify='end'>
                    <Button sx={summitButton} onClick={() => onSummitClick()}>
                        Submit
                    </Button>
                </HStack> */}
            </Flex>
        </div>
    )
}

export const getServerSideProps = async (context)=>{
    let staffID = context.params.staffID
    const staffData = await axios.get(`${url}/api/getDoctor/${staffID}`)
    const department = await axios.get(`${url}/api/getDepartment`)
    const position = await axios.get(`${url}/api/getPosition`)
    return {
        props: {
            staffData: staffData.data,
            department: department.data,
            position: position.data
        }
    }
}