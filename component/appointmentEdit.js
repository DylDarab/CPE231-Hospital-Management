import { Button, Box, Flex, Stack, HStack, VStack, Input, Text, FormControl, FormLabel,
    Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, Textarea,
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Colour from '../Colour'

export default (props) => {
    const { item, isEdit, isOpen, onClose } = props
    const [form, setForm] = useState(
        { date: item.start_time.split('T')[0], time: item.start_time.split('T')[1].replace('Z',''), department: "TEST", 
            doctor: item.staffID, reason: item.summary, note: item.note }
    )

    let line = {
        width: '100%',
        bgColor: '#000',
        marginTop: ' 12px',
        marginRight: '12px',
        height: '2px',
        bgColor: Colour.LightGrey
    }

    useEffect(()=>{
        console.log(props)
    },[])

    return(
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Appointment ID: {item.appointmentID}
                    <Box sx={line}></Box>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody mb='16px'>
                    <HStack>
                        <VStack>
                            <FormControl isRequired /* isInvalid={error && !form.lastname}*/>
                                <FormLabel>Date</FormLabel>
                                <Input type='date' value={form.date}
                                    onChange={(e)=>{setForm({...form, date: e.target.value})}}
                                />
                            </FormControl>
                            <FormControl isRequired /* isInvalid={error && !form.lastname}*/>
                                <FormLabel>Department</FormLabel>
                                <Input value={form.department}
                                    // onChange={(e)=>{setForm({...form, department: e.target.value})}}
                                />
                            </FormControl>
                            <FormControl isRequired /* isInvalid={error && !form.lastname}*/>
                                <FormLabel>Reason</FormLabel>
                                <Textarea resize='none' value={form.reason}
                                    // onChange={(e)=>{setForm({...form, lastname: e.target.value})}}
                                />
                            </FormControl>
                        </VStack>
                        <VStack>
                            <FormControl isRequired /* isInvalid={error && !form.lastname}*/>
                                <FormLabel>Time</FormLabel>
                                <Input  type='time' value={form.time}
                                    // onChange={(e)=>{setForm({...form, lastname: e.target.value})}}
                                />
                            </FormControl>
                            <FormControl isRequired /* isInvalid={error && !form.lastname}*/>
                                <FormLabel>Doctor</FormLabel>
                                <Input value={form.doctor}
                                    // onChange={(e)=>{setForm({...form, lastname: e.target.value})}}
                                />
                            </FormControl>
                            <FormControl isRequired /* isInvalid={error && !form.lastname}*/>
                                <FormLabel>Note</FormLabel>
                                <Textarea resize='none' value={form.note}
                                    // onChange={(e)=>{setForm({...form, lastname: e.target.value})}}
                                />
                            </FormControl>
                        </VStack>
                    </HStack>
                </ModalBody>
                <ModalFooter gap={4}>
                    <Button onClick={onClose}>Summit</Button>
                    <Button onClick={() => {
                        onClose();
                        setForm({date: item.start_time.split('T')[0], time: item.start_time.split('T')[1].replace('Z',''), department: "TEST"
                            , doctor: item.staffID, reason: item.summary, note: item.note})
                    }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
