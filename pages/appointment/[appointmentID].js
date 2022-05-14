import {Avatar, Box, Button, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, 
    Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,MenuDivider,
    NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper,
    InputRightElement, Heading, HStack, VStack, Radio, Select, SimpleGrid, Text, Textarea, Stack, RadioGroup, ButtonGroup} from '@chakra-ui/react'
import { AddIcon, ArrowBackIcon, ArrowForwardIcon, ChevronDownIcon, PlusSquareIcon, SearchIcon, SmallCloseIcon } from '@chakra-ui/icons'

import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
  } from "@choc-ui/chakra-autocomplete";

import axios from 'axios'
import Colour from '../../Colour'
import Loading from '../../component/loading'
import { encode, decode } from 'js-base64'
import { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import url from '../../url'

export default (props) => {

    const router = useRouter()

    const appointmentID = router.query.appointmentID
    console.log(appointmentID)

    const [selected, setSelected] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [infoActive, setInfoActive] = useState(true)
    const [file, setFile] = useState(['Profile name', null])
    const [error, setError] = useState(false)
    
    const [symptom, setSymptom] = useState('')
    const [summary, setSummary] = useState('')
    const [medicine, setMedicine] = useState([{a: '', b: ''}])
    const [device, setDevice] = useState([{a: '', b: ''}])

    let container = {
        width: '100vw',
        paddingLeft: '360px',
        marginTop: '64px',
        bgColor: Colour.AlmostWhite,
    }

    let container2 = {
        flexDirection: 'column',
        gap: '4',
        maxWidth: 'container.md',
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
        bgColor: Colour.White,
    }

    let line = {
        width: '40px',
        bgColor: Colour.LightGrey
    }

    let fileButton = {
        cursor: 'pointer',
        display: 'flex', 
        alignItems: 'center',
        borderRadius: 'md', 
        bg: Colour.LightGrey, 
        // color: 'white',
        px: 4, 
        h: 8,
        _hover: {filter: 'brightness(0.9)'},
        transition:'all 0.2s cubic-bezier(.08,.52,.52,1)',
    }
    
    let infoButton = {
        _hover: {filter: 'brightness(0.9)'},
        transition:'all 0.2s cubic-bezier(.08,.52,.52,1)',
    }

    const buttonStyle = (bgColor, textColor) => {
        return {
            bg: bgColor,
            color: textColor,
            _hover: {filter: 'brightness(0.9)'},
            transition:'all 0.2s cubic-bezier(.08,.52,.52,1)',
        }
    }

    const delMedicine = (i) => {
        let temp = [...medicine]
        temp.splice(i, 1)
        setMedicine(temp)
    }

    // const onSummitClick = () => {
    //     console.log('summit clicked!')
    //     if (form.firstname && form.lastname && form.gender && form.birthDate &&
    //         form.citizenID && form.phone_number && form.address && form.EC_name &&
    //         form.EC_Relationship && form.EC_phone && form.bloodGroup)
    //     {
    //         setError(false)
    //         console.log('form is valid')
    //     }
    //     else
    //     {
    //         setError(true)
    //         console.log('form is not valid')
    //     }
    // }

    const people = [
        { name: "Dan Abramov", image: "https://bit.ly/dan-abramov" },
        { name: "Kent Dodds", image: "https://bit.ly/kent-c-dodds" },
        { name: "Segun Adebayo", image: "https://bit.ly/sage-adebayo" },
        { name: "Prosper Otemuyiwa", image: "https://bit.ly/prosper-baba" },
        { name: "Ryan Florence", image: "https://bit.ly/ryan-florence" },
        
      ];

    console.log('path: ' + router.asPath)
    return (
        <div style={{backgroundColor: Colour.AlmostWhite, marginBottom: '80px'}}>
            <Loading isLoading={isLoading}/>
            <Box sx={container} >
                <Heading>
                    Appointment
                </Heading>
                <Box sx={line}></Box>
            </Box>

            <Flex sx={container2}>
                <Flex sx={container3}>
                    <Heading as='h4' size='md'>Appointment ID: {appointmentID}</Heading>
                        <HStack spacing={4}>
                            {/* <FormControl isRequired isInvalid={error && !form.EC_name} w='50%'>
                                <FormLabel>First name</FormLabel>
                                <Input 
                                    isDisabled={!isEdit} _disabled={{opacity: 0.8}}
                                    // onChange={(e)=>{setForm({...form, EC_name: e.target.value})}}
                                />
                            </FormControl> */}
                            <FormControl>
                                <FormLabel>First name</FormLabel>
                                <Input 
                                        isDisabled _disabled={{opacity: 0.8}}
                                        value={props.firstname}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Last name</FormLabel>
                                <Input 
                                        isDisabled _disabled={{opacity: 0.8}}
                                        value={props.lastname}
                                />
                            </FormControl>
                        </HStack>
                        <FormControl>
                            <FormLabel>Symptom</FormLabel>
                            <Textarea resize='none' isDisabled /* value={props.lastname}*//>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Summary</FormLabel>
                            <Textarea resize='none' /*value={props.lastname}*//>
                        </FormControl> 

                        <HStack align='flex-start'>
                            <VStack align='flex-start'>
                                <HStack>
                                    <Heading as='h4' size='sm'>Medicine</Heading>
                                    <Button sx={buttonStyle(Colour.Green, Colour.White)} size='xs' rightIcon={<AddIcon />}
                                        onClick={()=>{setMedicine([...medicine, {a: '', b: ''}])}}
                                    >
                                        Add
                                    </Button>
                                </HStack>
                                {
                                    medicine.map((item, index) => {
                                        return (
                                            <Flex sx={container3} spacing={2} key={index}>
                                                <HStack justify='space-between'>
                                                    <Checkbox>Take me home</Checkbox>
                                                    <Button id={index} sx={buttonStyle(Colour.Red, Colour.White)} size='xs' rightIcon={<SmallCloseIcon />}
                                                        onClick={() => delMedicine(index)}
                                                    >
                                                        Remove {index}
                                                    </Button>
                                                </HStack>
                                                <HStack>
                                                    <AutoComplete openOnFocus>
                                                        <AutoCompleteInput variant="outline" />
                                                        <AutoCompleteList>
                                                            {people.map((person, oid) => (
                                                            <AutoCompleteItem
                                                                key={`option-${oid}`}
                                                                value={person.name}
                                                                textTransform="capitalize"
                                                                align="center"
                                                            >
                                                                <Text ml="4">{person.name}</Text>
                                                            </AutoCompleteItem>
                                                            ))}
                                                        </AutoCompleteList>
                                                    </AutoComplete>
                                                    <NumberInput min={1}>
                                                        <NumberInputField />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                </HStack>
                                                <Input placeholder='Note...' /*value={props.lastname}*//>
                                            </Flex>
                                        );
                                    })
                                }
                                
                            </VStack>
                            <VStack align='flex-start'>
                                <HStack>
                                    <Heading as='h4' size='sm'>Device</Heading>
                                    <Button size='xs' colorScheme='teal' variant='solid' rightIcon={<AddIcon />}>
                                        Add
                                    </Button>
                                </HStack>
                                <HStack>
                                    <AutoComplete openOnFocus>
                                        <AutoCompleteInput variant="outline" />
                                        <AutoCompleteList>
                                            {people.map((person, oid) => (
                                            <AutoCompleteItem
                                                key={`option-${oid}`}
                                                value={person.name}
                                                textTransform="capitalize"
                                                align="center"
                                            >
            
                                                <Text ml="4">{person.name}</Text>
                                            </AutoCompleteItem>
                                            ))}
                                        </AutoCompleteList>
                                    </AutoComplete>
                                    <NumberInput min={1}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </HStack>
                                <HStack>
                                    <Input placeholder='Note...' /*value={props.lastname}*//>
                                    <Checkbox>Take me home</Checkbox>
                                </HStack>
                            </VStack>
                        </HStack>   
                </Flex>

                <HStack justify='end'>
                    <ButtonGroup>
                        <Button sx={buttonStyle(Colour.Green, Colour.White)} 
                            // onClick={() => onSummitClick()}
                        >
                            Submit
                        </Button>
                        <Button sx={buttonStyle(Colour.Red, Colour.White)} 
                            onClick={() => router.push('/appointment')}
                        >
                            Cancel
                        </Button>
                    </ButtonGroup>
                </HStack>
            </Flex>
        </div>
    )
}

// export const getServerSideProps = async (context)=>{
//     let appointmentID = context.params.appointmentID
//     const data = await axios.get(`${url}/api/getAppointment/${appointmentID}`)
//     return {
//         props: {
//             data: data.data
//         }
//     }
// }