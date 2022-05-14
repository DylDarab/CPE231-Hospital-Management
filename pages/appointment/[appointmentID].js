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
    const { data, medicine, device } = props
    
    const router = useRouter()
    const appointmentID = router.query.appointmentID
    console.log(appointmentID)
    console.log(props)

    const [refresh, setRefresh] = useState(false)
    const [selected, setSelected] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [infoActive, setInfoActive] = useState(true)
    const [file, setFile] = useState(['Profile name', null])
    const [error, setError] = useState(false)
    
    const [symptom, setSymptom] = useState('')
    const [summary, setSummary] = useState('')
    const [medicineList, setMedicineList] = useState([{"medicineID": "",
                                                "name": "",
                                                "price": "",
                                                "amount": "",
                                                "type": "used",//takehome,used
                                                "note": ""
                                            }])
    const [deviceList, setDeviceList] = useState([{"deviceID": "",
                                            "name": "",
                                            "price": "",
                                            "amount": "",
                                            "type": "used",//takehome,used
                                            "note": ""
                                        }])

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

    useEffect(() => {
        console.log('refresh')
    }, [refresh])

    const buttonStyle = (bgColor, textColor) => {
        return {
            bg: bgColor,
            color: textColor,
            _hover: {filter: 'brightness(0.9)'},
            transition:'all 0.2s cubic-bezier(.08,.52,.52,1)',
        }
    }

    const del = (type, i) => {
        if (type) {
            let temp = [...deviceList]
            temp.splice(i, 1)
            setDeviceList(temp)
        }
        else {
            let temp = [...medicineList]
            temp.splice(i, 1)
            setMedicineList(temp)
        }
    }

    const setCheck = (type, check, i) => {
        if (type) {
            let temp = [...deviceList]
            if (check)
                temp[i].type = 'takehome'
            else
                temp[i].type = 'used'
            setDeviceList(temp)
        }
        else {
            let temp = [...medicineList]
            if (check)
                temp[i].type = 'takehome'
            else
                temp[i].type = 'used'
            setMedicineList(temp)
        }
        // console.log(check, i)
    }

    const setName = (type, name, i, id = '') => {
        // console.log(id, name)
        if (type) {
            let temp = [...deviceList]
            temp[i].name = name
            temp[i].deviceID = id
            setDeviceList(temp)
        }
        else {
            let temp = [...medicineList]
            temp[i].medicineID = id
            temp[i].name = name
            setMedicineList(temp)
        }
    }
    
    const setNum = (type, num, i) => {
        if (type) {
            let temp = [...deviceList]
            temp[i].amount = num
            setDeviceList(temp)
        }
        else {
            let temp = [...medicineList]
            temp[i].amount = num
            setMedicineList(temp)
        }
    }

    const setNote = (type, note, i) => {
        if (type) {
            let temp = [...deviceList]
            temp[i].note = note
            setDeviceList(temp)
        }
        else {
            let temp = [...medicineList]
            temp[i].note = note
            setMedicineList(temp)
        }
    }

    const onSummitClick = () => {
        let first_check = medicineList[0].medicineID === '' && medicineList[0].name === '' 
                    && medicineList[0].price === '' && medicineList[0].amount === '' 
                    && medicineList[0].type === 'used' && medicineList[0].note === ''
        console.log(first_check)
        if (first_check && medicineList.length === 1) {
            setMedicineList([])
        }
        // เดี๋ยวมาทำต่อ
    }

    console.log(data)
    console.log(medicineList)
    console.log(deviceList)

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
                            <FormControl>
                                <FormLabel>First name</FormLabel>
                                <Input 
                                        isDisabled _disabled={{opacity: 0.8}}
                                        value={data.patient_firstname}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Last name</FormLabel>
                                <Input 
                                        isDisabled _disabled={{opacity: 0.8}}
                                        value={data.patient_lastname}
                                />
                            </FormControl>
                        </HStack>
                        <FormControl>
                            <FormLabel>Symptom</FormLabel>
                            <Textarea resize='none' isDisabled _disabled={{opacity: 0.8}}
                                value={data.symptoms}
                            />
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
                                        onClick={()=>{setMedicineList([...medicineList, 
                                            {"medicineID": "", "name": "", "price": "", "amount": "", "type": "used", "note": ""}])}}
                                    >
                                        Add
                                    </Button>
                                </HStack>
                                {
                                    medicineList.map((item, index) => {
                                        return (
                                            <Flex sx={container3} spacing={2} key={index}>
                                                <HStack justify='space-between'>
                                                    <Checkbox onChange={(e) => setCheck(0, e.target.checked, index)}
                                                        isChecked={item.type === 'takehome'}
                                                    >
                                                        Take me home
                                                    </Checkbox>
                                                    { index !== 0 ?
                                                        <Button id={index} sx={buttonStyle(Colour.Red, Colour.White)} 
                                                            size='xs' rightIcon={<SmallCloseIcon />}
                                                            onClick={() => del(0, index)}
                                                        >
                                                            Remove
                                                        </Button> : null
                                                    }
                                                </HStack>
                                                <HStack>
                                                    <AutoComplete openOnFocus>
                                                        <AutoCompleteInput variant="outline"
                                                            value={item.name || ''}
                                                            onChange={(e) => setName(0, e.target.value, index)}
                                                        />
                                                        <AutoCompleteList>
                                                            { props ?
                                                                medicine.map((med, i) => (
                                                                    <AutoCompleteItem
                                                                        key={i}
                                                                        value={med.medicine_name}
                                                                        textTransform="capitalize"
                                                                        align="center"
                                                                        onClick={() => setName(0, med.medicine_name, index, med.medicineID)}
                                                                    >
                                                                        <Text ml="4">{med.medicine_name}</Text>
                                                                    </AutoCompleteItem>
                                                                )) : null 
                                                            }
                                                        </AutoCompleteList>
                                                    </AutoComplete>
                                                    <NumberInput min={1} onChange={(e) => setNum(0, e, index)}>
                                                        <NumberInputField />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                </HStack>
                                                <Input placeholder='Note...' value={item.note}
                                                    onChange={(e) => setNote(0, e.target.value, index)}
                                                />
                                            </Flex>
                                        );
                                    })
                                }                      
                            </VStack>

                            <VStack align='flex-start'>
                                <HStack>
                                    <Heading as='h4' size='sm'>Device</Heading>
                                    <Button sx={buttonStyle(Colour.Green, Colour.White)} size='xs' rightIcon={<AddIcon />}
                                        onClick={()=>{setDeviceList([...deviceList, 
                                            {"deviceID": "", "name": "", "price": "", "amount": "", "type": "used", "note": ""}])}}
                                    >
                                        Add
                                    </Button>
                                </HStack>
                                {
                                    deviceList.map((item, index) => {
                                        return (
                                            <Flex sx={container3} spacing={2} key={index}>
                                                <HStack justify='space-between'>
                                                    <Checkbox onChange={(e) => setCheck(1, e.target.checked, index)}
                                                        isChecked={item.type === 'takehome'}
                                                    >
                                                        Take me home
                                                    </Checkbox>
                                                    { index !== 0 ?
                                                        <Button id={index} sx={buttonStyle(Colour.Red, Colour.White)} 
                                                            size='xs' rightIcon={<SmallCloseIcon />}
                                                            onClick={() => del(1, index)}
                                                        >
                                                            Remove
                                                        </Button> : null
                                                    }
                                                </HStack>
                                                <HStack>
                                                    <AutoComplete openOnFocus>
                                                        <AutoCompleteInput variant="outline"
                                                            value={item.name || ''}
                                                            onChange={(e) => setName(1, e.target.value, index)}
                                                        />
                                                        <AutoCompleteList>
                                                            { props ?
                                                                device.map((dev, i) => (
                                                                    <AutoCompleteItem
                                                                        key={i}
                                                                        value={dev.device_name}
                                                                        textTransform="capitalize"
                                                                        align="center"
                                                                        onClick={() => setName(1, dev.device_name, index, med.medicineID)}
                                                                    >
                                                                        <Text ml="4">{dev.device_name}</Text>
                                                                    </AutoCompleteItem>
                                                                )) : null 
                                                            }
                                                        </AutoCompleteList>
                                                    </AutoComplete>
                                                    <NumberInput min={1} onChange={(e) => setNum(1, e, index)}>
                                                        <NumberInputField />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                </HStack>
                                                <Input placeholder='Note...' value={item.note}
                                                    onChange={(e) => setNote(1, e.target.value, index)}
                                                />
                                            </Flex>
                                        );
                                    })
                                }                      
                            </VStack>                   
                        </HStack>   
                </Flex>

                <HStack justify='end'>
                    <ButtonGroup>
                        <Button sx={buttonStyle(Colour.Green, Colour.White)} 
                            onClick={() => onSummitClick()}
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

export const getServerSideProps = async (context)=>{
    const id = context.params.appointmentID;
    const data = await axios.get(`${url}/api/getAppointment/${id}`);
    const medicine = await axios.get(`${url}/api/getMedicine`, {
        headers: {
            "page": 0,       
        }})
    const device = await axios.get(`${url}/api/getDevice`, {
        headers: {
            "page": 0,       
        }})
    return {
        props: {
            data: data.data[0],
            medicine: medicine.data,
            device: device.data
        }
    }
}