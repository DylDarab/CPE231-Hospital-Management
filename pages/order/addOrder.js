import { useRouter } from 'next/router'
import
    {
        Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, IconButton,
        InputRightElement, Heading, HStack, Radio, Select, SimpleGrid, Text, Textarea, Stack, RadioGroup, VStack,
        NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, 
    } from '@chakra-ui/react'

import { ChevronDownIcon, CopyIcon, DeleteIcon,AddIcon } from '@chakra-ui/icons'
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
    const [form, setForm] = useState ({organization: ""})

    const [form1, setForm1] = useState(
            [{ medicine: "", pricemedicine: "" , amountmedicine: "" }]
            )
    const [form2, setForm2] = useState(
            [{ device: "", pricedevice: "" , amountdevice: "" }]
            )

    const addForm1Fields = () => {
            setForm1([...form1, { medicine: "", pricemedicine: "" , amountmedicine: "" }])
          } 
    const addForm2Fields = () => {
            setForm2([...form2, { device: "", pricedevice: "" , amountdevice: "" }])
          }        

    const Remove1Fields = index => {
            const values  = [...form1];
            values.splice(values.findIndex(value => value.index === index), 1);
            setForm1(values);
          }
    const Remove2Fields = index => {
            const values  = [...form2];
            values.splice(values.findIndex(value => value.index === index), 1);
            setForm2(values);
          }

    const handleChangeInput1 = (index, event) => {
            const newInputFields = form1.map(i => {
              if(index === i.index) {
                i[event.target.name] = event.target.value
              }
              return i;
            })
            setForm1(newInputFields);
          }
     const handleChangeInput2 = (index, event) => {
            const newInputFields = form2.map(i => {
              if(index === i.index) {
                i[event.target.name] = event.target.value
              }
              return i;
            })
            setForm2(newInputFields);
          }

    const onSummitClick = () =>
    {
        console.log('summit clicked!')
        if (form.organization && form1.medicine && form1.pricemedicine &&form1.amountmedicine 
            && form2.device && form2.pricedevice && form2.amountdevice)
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
    console.log(form1)
    console.log(form2)
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

                        { form1.map(form1s => (
                            <HStack spacing={4} w='100%' key={form1s.index}>
                            <FormControl isInvalid={error && !form1s.medicine} w='50%'>
                                    <FormLabel htmlFor='medicine'>Medicine</FormLabel>
                                    <Select
                                        icon={<ChevronDownIcon />}
                                        placeholder='Select Medicine'
                                        bgColor={Colour.White}
                                        onChange={event => handleChangeInput1(form1s.medicine, event)}
                                    >
                                         {props.medicine.map((medicine, index) => (
                                            <option key={medicine.medicineID} value={medicine.medicineID}>{medicine.medicine_name}</option>
                                        ))}
                                    </Select>
                            </FormControl>
                            <FormControl isInvalid={error && !form1s.pricemedicine}>
                                    <FormLabel htmlFor='price-medicine'>Price</FormLabel>
                                         <Input id='price-medicine' 
                                         onChange={event => handleChangeInput1(form1s.index, event)}
                                />
                            </FormControl>
                            <FormControl isInvalid={error && !form1s.amountmedicine}>
                                <FormLabel htmlFor='amount-medicine'>Amount</FormLabel>
                                <NumberInput max={1000000} min={1}>
                                    <NumberInputField id='amount-medicine' 
                                    onChange={event => handleChangeInput1(form1s.index, event)} />
                                    <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <IconButton aria-label='Add' icon={<CopyIcon />} onClick={() => addForm1Fields()}/>
                            <IconButton aria-label='Delete' icon={<DeleteIcon />} disabled={form1.length === 1} onClick={() => Remove1Fields(form1s.index)}/>
                            </HStack>))}

                        { form2.map(form2s => (
                            <HStack spacing={4} w='100%'>
                            <FormControl isInvalid={error && !form2s.device} w='50%'>
                                    <FormLabel htmlFor='device'>Device</FormLabel>
                                    <Select
                                        icon={<ChevronDownIcon />}
                                        placeholder='Select Device'
                                        bgColor={Colour.White}
                                        onChange={event => handleChangeInput2(form2s.device, event)}
                                    >
                                         {props.device.map((device, index) => (
                                            <option key={device.deviceID} value={device.deviceID}>{device.device_name}</option>
                                        ))}
                                    </Select>
                            </FormControl>
                            <FormControl isInvalid={error && !form2s.pricedevice}>
                                    <FormLabel htmlFor='price-device'>Price</FormLabel>
                                         <Input id='price-device' 
                                         onChange={event => handleChangeInput2(form2s.pricedevice, event)}
                                />
                            </FormControl>
                            <FormControl isInvalid={error && !form2s.amountdevice}>
                                <FormLabel htmlFor='amount-medicine'>Amount</FormLabel>
                                <NumberInput max={1000000} min={1}>
                                    <NumberInputField id='amount-device' 
                                    onChange={event => handleChangeInput2(form2s.amountdevice, event)}/>
                                    <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <IconButton aria-label='Add' icon={<CopyIcon />} onClick={() => addForm2Fields()}/>
                            <IconButton aria-label='Delete' icon={<DeleteIcon />} disabled={form2.length === 1} onClick={() => Remove2Fields(form2s.index)}/>
                            </HStack>))}
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