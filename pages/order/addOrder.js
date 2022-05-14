import { useRouter } from 'next/router'
import
    {
        Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, IconButton,
        InputRightElement, Heading, HStack, Radio, Select, SimpleGrid, Text, Textarea, Stack, RadioGroup, VStack,
        NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, 
    } from '@chakra-ui/react'

import { ChevronDownIcon, AddIcon } from '@chakra-ui/icons'
import axios from 'axios'
import Colour from '../../Colour'
import { useState } from 'react'
import url from '../../url'

export default (props) =>
{

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
        padding: '16px',
        bg: Colour.White,
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
        bg: Colour.Green,
        color: Colour.White,
        _hover: { filter: 'brightness(0.9)' },
        transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)',
        width: '100px',
    }

    const [error, setError] = useState(false)
    const [form, setForm] = useState({})

    const onSummitClick = () =>
    {
        console.log('summit clicked!')
        if (form.organization && form.medicine && form.pricemedicine &&form.amountmedicine 
            && form.device && form.pricedevice && form.amountdevice)
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
        <div style={{ backgroundColor: Colour.AlmostWhite }}>
            <Box sx={container} >
                <Heading>
                    Add Order
                </Heading>
                <Box sx={line}></Box>
            </Box>

            <Flex sx={container2}>
                <Flex sx={container3}>
                    <Heading as='h4' size='md'>Medicine Information</Heading>

                    <Box>
                        <VStack spacing={4}>
                            <HStack spacing={4} w='100%'>
                                <FormControl isRequired isInvalid={error && !form.organization} w='50%'>
                                    <FormLabel htmlFor='organization'>Organization</FormLabel>
                                    <Select
                                        icon={<ChevronDownIcon />}
                                        placeholder='Select Organization'
                                        bgColor={Colour.White}
                                        onChange={(e) => setForm({...form,organization:e.target.value})}
                                    >
                                        {props.organization.map((organization, index) => (
                                            <option key={organization.organizationID} value={organization.organizationID}>{organization.organization_name}</option>
                                        ))}

                                    </Select>
                                </FormControl>
                            </HStack>

                            <HStack spacing={4} w='100%'>
                            <FormControl isInvalid={error && !form.medicine} w='50%'>
                                    <FormLabel htmlFor='medicine'>Medicine</FormLabel>
                                    <Select
                                        icon={<ChevronDownIcon />}
                                        placeholder='Select Medicine'
                                        bgColor={Colour.White}
                                        onChange={(e) => setForm({...form,medicine:e.target.value})}
                                    >
                                         {props.medicine.map((medicine, index) => (
                                            <option key={medicine.medicineID} value={medicine.medicineID}>{medicine.medicine_name}</option>
                                        ))}
                                    </Select>
                            </FormControl>
                            <FormControl isInvalid={error && !form.pricemedicine}>
                                    <FormLabel htmlFor='price-medicine'>Price</FormLabel>
                                         <Input id='price-medicine' value={form.pricemedicine}
                                            onChange={(e) => { setForm({ ...form, pricemedicine: e.target.value }) }}
                                />
                            </FormControl>
                            <FormControl isInvalid={error && !form.amountmedicine}>
                                <FormLabel htmlFor='amount-medicine'>Amount</FormLabel>
                                <NumberInput max={1000000} min={1}>
                                    <NumberInputField id='amount-medicine' value={form.amountmedicine} />
                                    <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <IconButton aria-label='Add' icon={<AddIcon />} />
                            </HStack>

                            <HStack spacing={4} w='100%'>
                            <FormControl isInvalid={error && !form.device} w='50%'>
                                    <FormLabel htmlFor='device'>Device</FormLabel>
                                    <Select
                                        icon={<ChevronDownIcon />}
                                        placeholder='Select Device'
                                        bgColor={Colour.White}
                                        onChange={(e) => setForm({...form,device:e.target.value})}
                                    >
                                         {props.device.map((device, index) => (
                                            <option key={device.deviceID} value={device.deviceID}>{device.device_name}</option>
                                        ))}
                                    </Select>
                            </FormControl>
                            <FormControl isInvalid={error && !form.pricedevice}>
                                    <FormLabel htmlFor='price-device'>Price</FormLabel>
                                         <Input id='price-device' value={form.pricemedicine}
                                            onChange={(e) => { setForm({ ...form, pricemedicinee: e.target.value }) }}
                                />
                            </FormControl>
                            <FormControl isInvalid={error && !form.amountdevice}>
                                <FormLabel htmlFor='amount-medicine'>Amount</FormLabel>
                                <NumberInput max={1000000} min={1}>
                                    <NumberInputField id='amount-device' value={form.amountdevice} />
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

                <HStack justify='end'>
                    <Button sx={summitButton} onClick={() => onSummitClick()}>
                        Submit
                    </Button>
                </HStack>
            </Flex>
        </div>
    )
}

export const getStaticProps = async (context) =>
{
    const organization = await axios.get(`${url}/api/getOrganization`)
    const medicine = await axios.get(`${url}/api/getNameMedicine`)
    const device = await axios.get(`${url}/api/getNameDevice`)
    return {
        props: {
            organization: organization.data,
            medicine: medicine.data,
            device: device.data
        },
        revalidate: 60
    }
}