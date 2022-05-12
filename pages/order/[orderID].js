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
    const [form, setForm] = useState({
        // organization: props.orderData.organization_name,
        // medicine: props.orderData.medicine_name,
        // pricemedicine: props.orderData.price_per_unit,
        // amountmedicine: props.orderData.amount,
        // device: props.orderData.device_name,
        // pricedevice: props.orderData.price_per_unit,
        // amountdevice: props.orderData.amount
    })

    console.log(form)
    return (
        <div style={{ backgroundColor: Colour.AlmostWhite }}>
            <Box sx={container} >
                <Heading>
                    OrderID {props.orderData.orderID}
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
                                    <Input id='organization' value={form.organization}
                                    isDisabled={!isEdit} _disabled={{opacity: 0.8}}
                                    onChange={(e)=>{setForm({...form, organization: e.target.value})}}
                                     />
                                </FormControl>
                            </HStack>

                            <HStack spacing={4} w='100%'>
                            <FormControl isInvalid={error && !form.medicine} w='50%'>
                                    <FormLabel htmlFor='medicine'>Medicine</FormLabel>
                                    <Input id='medicine' value={form.medicine}
                                    isDisabled={!isEdit} _disabled={{opacity: 0.8}}
                                    onChange={(e)=>{setForm({...form, medicine: e.target.value})}}
                                     />
                            </FormControl>
                            <FormControl isInvalid={error && !form.pricemedicine}>
                                    <FormLabel htmlFor='price-medicine'>Price</FormLabel>
                                    <Input id='price-medicine' value={form.pricemedicine}
                                    isDisabled={!isEdit} _disabled={{opacity: 0.8}}
                                    onChange={(e)=>{setForm({...form, pricemedicine: e.target.value})}}
                                     />
                            </FormControl>
                            <FormControl isInvalid={error && !form.amountmedicine}>
                                <FormLabel htmlFor='amount-medicine'>Amount</FormLabel>
                                <NumberInput max={1000000} min={1} 
                                    id='amount-medicine' value={form.amountmedicine} isDisabled={!isEdit} 
                                    onChange={(e)=>{setForm({...form, amountmedicine: e.target.value})}}>
                                    <NumberInputField/>
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
                                    <Input id='device' value={form.device}
                                    isDisabled={!isEdit} _disabled={{opacity: 0.8}}
                                    onChange={(e)=>{setForm({...form, device: e.target.value})}}
                                     />
                            </FormControl>
                            <FormControl isInvalid={error && !form.pricedevice}>
                                    <FormLabel htmlFor='price-device'>Price</FormLabel>
                                    <Input id='price-device' value={form.pricedevice}
                                    isDisabled={!isEdit} _disabled={{opacity: 0.8}}
                                    onChange={(e)=>{setForm({...form, pricedevice: e.target.value})}}
                                     />
                            </FormControl>
                            <FormControl isInvalid={error && !form.amountdevice}>
                                <FormLabel htmlFor='amount-device'>Amount</FormLabel>
                                <NumberInput max={1000000} min={1} 
                                    id='amount-device' value={form.amountdevice} isDisabled={!isEdit} 
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

export const getServerSideProps = async (context)=>{
    let orderID = context.params.orderID
    const orderData = await axios.get(`${url}/api/getOrder/${orderID}`)
    return {
        props: {
            orderData: orderData.data,
        }
    }
}
            