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
    const [isSubmit, setIsSubmit] = useState(false)

    const buttonStyle = (bgColor, textColor) => {
        return {
            bg: bgColor,
            color: textColor,
            _hover: {filter: 'brightness(0.9)'},
            transition:'all 0.2s cubic-bezier(.08,.52,.52,1)',
        }
    }

    return (
        <div style={{ backgroundColor: Colour.AlmostWhite }}>
            <Box sx={container} >
                <Heading>
                    Add order
                </Heading>
                <Box sx={line}></Box>
            </Box>
            <Flex sx={container2}>
                <Flex sx={container3}>
                    <Heading as='h4' size='md'>Order ID: </Heading>

                    <Box>
                        <VStack spacing={4} align='flex-start'>
                            {/* <HStack spacing={4} w='100%'> */}
                                <FormControl>
                                    <FormLabel htmlFor='organization'>Organization</FormLabel>
                                    <Input id='organization' 
                                    isDisabled={isSubmit} _disabled={{opacity: 0.8}}
                                    // onChange={(e)=>{setForm({...form, organization: e.target.value})}}
                                     />
                                </FormControl>
                            {/* </HStack> */}

                            <HStack>
                                <Heading as='h4' size='sm'>Medicine</Heading>
                                <Button sx={buttonStyle(Colour.Green, Colour.White)} size='xs' rightIcon={<AddIcon />}
                                    isDisabled={isSubmit} _disabled={{opacity: 0.8}}
                                    onClick={()=>{setMedicineList([...medicineList, 
                                        {"medicineID": "", "name": "", "price": "", "amount": "", "type": "used", "note": ""}])}}
                                >
                                    Add
                                </Button>
                            </HStack>

                            <HStack spacing={4} w='100%' justify='center'>
                                <FormControl>
                                        <FormLabel>Medicine</FormLabel>
                                        <Input
                                            isDisabled={isSubmit} _disabled={{opacity: 0.8}}
                                            // onChange={(e)=>{setForm({...form, medicine: e.target.value})}}
                                        />
                                </FormControl>
                                <FormControl w='50%'>
                                    <FormLabel>Price</FormLabel>
                                    <NumberInput min={1} 
                                        isDisabled={isSubmit} 
                                        // onChange={(e)=>{setForm({...form, amountmedicine: e.target.value})}}
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
                                        isDisabled={isSubmit} 
                                        // onChange={(e)=>{setForm({...form, amountmedicine: e.target.value})}}
                                    >
                                        <NumberInputField/>
                                        <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                                <IconButton sx={buttonStyle(Colour.Red, Colour.White)} size='sm' icon={<CloseIcon />} />
                            </HStack>

                            <HStack spacing={4} w='100%'>
                            <FormControl w='50%'>
                                    <FormLabel htmlFor='device'>Device</FormLabel>
                                    <Input id='device' 
                                    isDisabled={!isEdit} _disabled={{opacity: 0.8}}
                                    // onChange={(e)=>{setForm({...form, device: e.target.value})}}
                                     />
                            </FormControl>
                            <FormControl>
                                    <FormLabel htmlFor='price-device'>Price</FormLabel>
                                    <Input id='price-device' 
                                    isDisabled={!isEdit} _disabled={{opacity: 0.8}}
                                    onChange={(e)=>{setForm({...form, pricedevice: e.target.value})}}
                                     />
                            </FormControl>
                            <FormControl isInvalid={error && !form.amountdevice}>
                                <FormLabel htmlFor='amount-device'>Amount</FormLabel>
                                <NumberInput max={1000000} min={1} 
                                    id='amount-device'  isDisabled={!isEdit} 
                                    onChange={(e)=>{setForm({...form, amountdevice: e.target.value})}}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <IconButton aria-label='Add' icon={<AddIcon />} />
                            </HStack>
                        </VStack>
                    </Box>
                </Flex>
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
            organizationData: JSON.parse(JSON.stringify(organization.data)),
            medicineData: JSON.parse(JSON.stringify(medicine.data)),
            deviceData: JSON.parse(JSON.stringify(device.data))
            // data: data.data[0],
            // medicine: medicine.data,
            // device: device.data
        }
    }
}
            