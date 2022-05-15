import { useRouter } from 'next/router'
import
    {
        Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement,
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
        bg: Colour.LightGrey,
        px: 4,
        h: 8,
        _hover: { filter: 'brightness(0.9)' },
        transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)',
    }

    let summitButton = {
        bg: Colour.Green,
        color: 'white',
        _hover: { filter: 'brightness(0.9)' },
        transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)',
        width: '100px',
    }

    const [file, setFile] = useState(['Profile Image', null])
    const [allergyForm, setAllergyForm] = useState(true)
    const [error, setError] = useState(false)
    const [form, setForm] = useState({})

    const onSummitClick = () =>
    {
        console.log('summit clicked!')
        if (form.devicename && form.description && form.price && form.amount)
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
        <div style={{ backgroundColor: Colour.AlmostWhite, marginBottom: "80px" }}>
            <Box sx={container} >
                <Heading>
                    Add Device
                </Heading>
                <Box sx={line}></Box>
            </Box>

            <Flex sx={container2}>
                <Flex sx={container3}>
                    <Heading as='h4' size='md'>Device Information</Heading>

                    <Box>
                        <SimpleGrid columns={2} spacing={3}>
                            <FormControl isRequired isInvalid={error && !form.devicename}>
                                <FormLabel htmlFor='device-name'>Device Name</FormLabel>
                                <Input id='device-name' value={form.devicename}
                                    onChange={(e) => { setForm({ ...form, devicename: e.target.value }) }}
                                />
                               
                            </FormControl>
                            <FormControl isRequired isInvalid={error && !form.description}>
                                <FormLabel htmlFor='description'>Description</FormLabel>
                                <Input  id='description' value={form.description}
                                    onChange={(e) => { setForm({ ...form, description: e.target.value }) }}
                                />
                            </FormControl>
                            <FormControl isRequired isInvalid={error && !form.price}>
                                <FormLabel htmlFor='price'>Price Per Unit</FormLabel>
                                <Input id='price' value={form.price}
                                    onChange={(e) => { setForm({ ...form, price: e.target.value }) }}
                                />
                            </FormControl>
                            <FormControl isDisabled isInvalid={error && !form.amount}>
                                <FormLabel htmlFor='amount'>Amount</FormLabel>
                                <Input  id='amount' value={0}
                                    onChange={(e) => { setForm({ ...form, amount: e.target.value }) }}
                                />
                            </FormControl>
                        </SimpleGrid>
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