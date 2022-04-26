import {useRouter} from 'next/router'
import {Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, 
    InputRightElement, Heading, HStack, Radio, Select, SimpleGrid, Text, Textarea, Stack} from '@chakra-ui/react'

import Colour from '../../Colour'

export default ()=>{
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

    let summitButton = {
        bg: Colour.Orange,
        _hover: {filter: 'brightness(0.9)'},
        transition:'all 0.2s cubic-bezier(.08,.52,.52,1)',
        width: '100px',
    }

    return (
        <div style={{backgroundColor: Colour.AlmostWhite}}>
            <Box sx={container} >
                <Heading>
                    Add Patient
                </Heading>
                <Box sx={line}></Box>
            </Box>

            <Flex sx={container2}>
            <Flex sx={container3}>
                <Heading as='h4' size='md'>Personal information</Heading>
            
                <HStack>
                    <Text maxW='1000px' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'>Profile adadadadadaimagdadadadade</Text>
                    <label>
                            <Input type="file"/>
                        <Button>
                            Choose file
                        </Button>
                    </label>
                </HStack>

                <FormControl isRequired>
                    <SimpleGrid columns={2} spacing={4}>
                        <Box>
                            <FormLabel htmlFor='first-name'>First name</FormLabel>
                            <Input id='first-name'/>
                        </Box>
                        <Box>
                            <FormLabel htmlFor='last-name'>Last name</FormLabel>
                            <Input id='last-name'/>
                        </Box>
                        <Box>
                            <FormLabel htmlFor='gender'>Gender</FormLabel>
                            <Select id='gender'>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </Select>
                        </Box>
                        <Box>
                            <FormLabel htmlFor='birth-date'>Birth date</FormLabel>
                            <Input id='birth-date' type='date'/>
                        </Box>
                        <Box>
                            <FormLabel htmlFor='citizen-id'>Citizen ID</FormLabel>
                            <Input id='citizen-id'/>
                        </Box>
                        <Box>
                            <FormLabel htmlFor='phone'>Phone number</FormLabel>
                            <Input id='phone'/>
                        </Box>
                    </SimpleGrid>
                </FormControl>
                <SimpleGrid columns={2} spacing={4}>
                        <FormControl isRequired>
                            <FormLabel htmlFor='address'>Address</FormLabel>
                            <Input id='address'/>
                        </FormControl>
                        <Box>
                            <FormLabel htmlFor='insurance'>Insurance</FormLabel>
                            <Input id='insurance'/>
                        </Box>
                </SimpleGrid>
            </Flex>

            <Flex sx={container3}>
                <Heading as='h4' size='md'>Emergency contact</Heading>
                <FormControl isRequired>
                    <HStack spacing={4}>
                        <Box w='50%'>
                            <FormLabel htmlFor='ec-name'>Name</FormLabel>
                            <Input id='ec-name'/>
                        </Box>
                        <Box w='20%'>
                            <FormLabel htmlFor='ec-relationship'>Relationship</FormLabel>
                            <Input id='ec-relationship'/>
                        </Box>
                        <Box w='30%'>
                            <FormLabel htmlFor='ec-phone'>Phone number</FormLabel>
                            <Input id='ec-phone'/>
                        </Box>
                    </HStack>
                </FormControl>  
            </Flex>

            <Flex sx={container3}>
                <Heading as='h4' size='md'>Medical information</Heading>
                <HStack spacing={8}>
                    <Box>
                        <FormLabel htmlFor='blood'>Blood</FormLabel>
                        <Select id='blood'>
                                <option>O</option>
                                <option>A</option>
                                <option>B</option>
                                <option>AB</option>
                            </Select>
                    </Box>
                    <Box>
                        <FormLabel htmlFor='allergy'>Allergy</FormLabel>
                        <HStack id='allergy'>
                            <Radio value='1'>No</Radio>
                            <Radio value='2'>Yes</Radio>
                        </HStack>
                    </Box>
                </HStack>
                <Box>
                    <FormLabel htmlFor='medical-history'>Medical history</FormLabel>
                    <Textarea
                        size='sm'
                        resize='none'
                    />
                </Box>
            </Flex>
            <HStack justify='end'>
                <Button sx={summitButton}>
                    Summit
                </Button>
            </HStack>
            </Flex>
        </div>
    )
}