import { useRouter } from 'next/router'
import
    {
        Avatar, Box, Button, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputLeftElement, 
    Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,MenuDivider,
    NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper,
    InputRightElement, Heading, HStack, VStack, Radio, Select, SimpleGrid, Text, Textarea, Stack, RadioGroup, ButtonGroup,
    useToast 
    } from '@chakra-ui/react'
import {
        AutoComplete,
        AutoCompleteInput,
        AutoCompleteItem,
        AutoCompleteList,
      } from "@choc-ui/chakra-autocomplete";
import { ChevronDownIcon, AddIcon, CloseIcon } from '@chakra-ui/icons'
import axios from 'axios'
import Colour from '../../Colour'
import { useState } from 'react'
import url from '../../url'

export default (props) =>
{
    const { organizationData, medicineData, deviceData } = props
    const router = useRouter()
    const toast = useToast()

    const orderID = router.query.orderID

    console.log(props)

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
        padding: '16px'
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

    const [error, setError] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isConfirm, setIsConfirm] = useState(false)
    const [dateInStock, setDateInStock] = useState('')
    const [organization, setOrganization] = useState([{"organizationID": "",
                                                        "organizationName": "",
                                                    }])

    const [medicineList, setMedicineList] = useState([{"medicineID": "",
                                                "name": "",
                                                "price": "",
                                                "amount": "",
                                            }])
    const [deviceList, setDeviceList] = useState([{"deviceID": "",
                                            "name": "",
                                            "price": "",
                                            "amount": "",
                                        }])

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

    const setPrice = (type, price, i) => {
        if (type) {
            let temp = [...deviceList]
            temp[i].price = price
            setDeviceList(temp)
        }
        else {
            let temp = [...medicineList]
            temp[i].price = price
            setMedicineList(temp)
        }
    }

    const setAmount = (type, num, i) => {
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

    const onConfirmClick = () => {
        setIsConfirm(true)
    }
    console.log(organization)
    console.log(dateInStock)
    console.log(medicineList)
    console.log(deviceList)
    // console.log(new Date().toLocaleDateString("sv-SE"))
    return (
        <div style={{ backgroundColor: Colour.AlmostWhite }}>
            <Box sx={container} >
                <Heading>
                    Order ID: {orderID} 
                </Heading>
                <Box sx={line}></Box>
            </Box>
            <Flex sx={container2}>
                <Flex sx={container3}>
                    {/* <Box> */}
                        <VStack spacing={4} align='flex-start'>
                            <FormControl>
                                <FormLabel>Organization</FormLabel>
                                <Text>TESTTEST</Text>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Date in stock</FormLabel>
                                <Text>TESTTEST</Text>

                            </FormControl>

                            <HStack>
                                <Heading as='h4' size='sm'>Medicine</Heading>
                                
                            </HStack>

                            {/* {
                                medicineList.map((item, index) => {
                                    return (
                                        <HStack spacing={4} w='100%' align='flex-end'>
                                            <FormControl>
                                                <FormLabel>Medicine</FormLabel>
                                                <AutoComplete openOnFocus>
                                                    <AutoCompleteInput variant="outline"
                                                        value={item.name || ''}
                                                        onChange={(e) => setName(0, e.target.value, index)}
                                                        isDisabled={isConfirm} _disabled={{opacity: 0.8}}
                                                    />
                                                    <AutoCompleteList>
                                                        { props ?
                                                            medicineData.map((med, i) => (
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
                                            </FormControl>
                                            <FormControl w='50%'>
                                                <FormLabel>Price per unit</FormLabel>
                                                <NumberInput min={1} 
                                                    isDisabled={isConfirm}
                                                    value={item.price || ''} 
                                                    onChange={(e)=>{setPrice(0, e, index)}}
                                                >
                                                    <NumberInputField/>
                                                    <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </FormControl>
                                            <FormControl w='50%'>
                                                <FormLabel>Amount</FormLabel>
                                                <NumberInput min={1} 
                                                    isDisabled={isConfirm} 
                                                    value={item.amount || ''}
                                                    onChange={(e)=>{setAmount(0, e, index)}}
                                                >
                                                    <NumberInputField/>
                                                    <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </FormControl>
                                            { index !== 0 ?
                                                <IconButton sx={buttonStyle(Colour.Red, Colour.White)} size='sm' icon={<CloseIcon />} 
                                                    onClick={() => del(0, index)}
                                                /> :
                                                <IconButton sx={buttonStyle(Colour.Red, Colour.White)} size='sm' icon={<CloseIcon />} 
                                                    visibility='hidden'
                                                />
                                            }
                                        </HStack>
                                    );
                                })
                            } */}

                            <HStack>
                                <Heading as='h4' size='sm'>Device</Heading>
                                
                            </HStack>

                            {/* {
                                deviceList.map((item, index) => {
                                    return (
                                        <HStack spacing={4} w='100%' align='flex-end'>
                                            <FormControl>
                                                <FormLabel>Device</FormLabel>
                                                <AutoComplete openOnFocus>
                                                    <AutoCompleteInput variant="outline"
                                                        value={item.name || ''}
                                                        onChange={(e) => setName(1, e.target.value, index)}
                                                        isDisabled={isConfirm} _disabled={{opacity: 0.8}}
                                                    />
                                                    <AutoCompleteList>
                                                        { props ?
                                                            deviceData.map((dev, i) => (
                                                                <AutoCompleteItem
                                                                    key={i}
                                                                    value={dev.device_name}
                                                                    textTransform="capitalize"
                                                                    align="center"
                                                                    onClick={() => setName(1, dev.device_name, index, dev.deviceID)}
                                                                >
                                                                    <Text ml="4">{dev.device_name}</Text>
                                                                </AutoCompleteItem>
                                                            )) : null 
                                                        }
                                                    </AutoCompleteList>
                                                </AutoComplete>
                                            </FormControl>
                                            <FormControl w='50%'>
                                                <FormLabel>Price per unit</FormLabel>
                                                <NumberInput min={1} 
                                                    isDisabled={isConfirm}
                                                    value={item.price || ''} 
                                                    onChange={(e)=>{setPrice(1, e, index)}}
                                                >
                                                    <NumberInputField/>
                                                    <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </FormControl>
                                            <FormControl w='50%'>
                                                <FormLabel>Amount</FormLabel>
                                                <NumberInput min={1} 
                                                    isDisabled={isConfirm} 
                                                    value={item.amount || ''}
                                                    onChange={(e)=>{setAmount(1, e, index)}}
                                                >
                                                    <NumberInputField/>
                                                    <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </FormControl>
                                            { index !== 0 ?
                                                <IconButton sx={buttonStyle(Colour.Red, Colour.White)} size='sm' icon={<CloseIcon />} 
                                                    onClick={() => del(1, index)}
                                                /> :
                                                <IconButton sx={buttonStyle(Colour.Red, Colour.White)} size='sm' icon={<CloseIcon />} 
                                                    visibility='hidden'
                                                />
                                            }
                                        </HStack>
                                    );
                                })
                            } */}
                        </VStack>
                    {/* </Box> */}
                </Flex>

                {/* <HStack justify='end'>
                    { !isConfirm ?
                        <ButtonGroup>
                            <Button sx={buttonStyle(Colour.Green, Colour.White)} 
                                onClick={() => onConfirmClick()}
                            >
                                Confirm
                            </Button>
                            <Button sx={buttonStyle(Colour.Red, Colour.White)} 
                                onClick={() => router.push('/order')}
                            >
                                Cancel
                            </Button>
                        </ButtonGroup> :
                        <>
                            <Text>Confirm?</Text>
                            <ButtonGroup>
                                <Button sx={buttonStyle(Colour.Green, Colour.White)} 
                                    onClick={() => onYesClick()}
                                >
                                    Yes
                                </Button>
                                <Button sx={buttonStyle(Colour.Red, Colour.White)} 
                                    onClick={() => setIsConfirm(false)}
                                >
                                    No
                                </Button>
                            </ButtonGroup>
                        </>

                    }
                </HStack> */}
            </Flex>
        </div>
    )
}

export const getStaticPaths = async () => {
    const res = await axios.get(`${url}/api/getOrder/path`);
    const paths = res.data.map((item) => ({
        params: {
            orderID: item.orderID
        }
    }));
    return { paths, fallback: false };
}

export const getStaticProps = async (context)=>{
    const id = context.params.orderID;
    const organization = await axios.get(`${url}/api/getOrganization`);
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
            data: JSON.parse(JSON.stringify(organization.data)),
            // data: data.data[0],
            // medicine: medicine.data,
            // device: device.data
        }
    }
}

// export const getStaticProps = async (context) =>
// {
//     const organization = await axios.get(`${url}/api/getOrganization`)
//     const medicine = await axios.get(`${url}/api/getNameMedicine`)
//     const device = await axios.get(`${url}/api/getNameDevice`)
//     return {
//         props: {
//             organization: organization.data,
//             medicine: medicine.data,
//             device: device.data
//         },
//         revalidate: 60
//     }
// }