import { Button, Box, Flex, Stack, HStack, Input, Text, FormControl, FormLabel,
    Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, Textarea,
  } from '@chakra-ui/react'
import Colour from '../Colour'

export default ({isOpen,onClose,isEdit=false,data}) => {
    let line = {
        width: '100%',
        bgColor: '#000',
        marginTop: ' 12px',
        marginRight: '12px',
        height: '2px',
        bgColor: Colour.LightGrey
    }

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Appointment ID: 1234
                    <Box sx={line}></Box>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody mb='16px'>
                    <Stack>
                        <HStack>
                            <Text w='200px'>Patient's name</Text>
                            <Input id='name'  /*value={form.lastname}*/ isDisabled={!isEdit} _disabled={{opacity: 0.8}}
                                // onChange={(e)=>{setForm({...form, lastname: e.target.value})}}
                            />
                        </HStack>
                        <HStack>
                            <Text w='200px'>Date</Text>
                            <Input id='date'  /*value={form.lastname} */isDisabled={!isEdit} _disabled={{opacity: 0.8}}
                                // onChange={(e)=>{setForm({...form, lastname: e.target.value})}}
                            />
                        </HStack>
                        <HStack>
                            <Text w='200px'>Doctor</Text>
                            <Input id='date'  /*value={form.lastname} */isDisabled={!isEdit} _disabled={{opacity: 0.8}}
                                // onChange={(e)=>{setForm({...form, lastname: e.target.value})}}
                            />
                        </HStack>
                        <HStack>
                            <Text w='200px'>Symptom</Text>
                            <Textarea id='symptom' resize='none' /*value={form.lastname}*/ isDisabled={!isEdit} _disabled={{opacity: 0.8}}
                                // onChange={(e)=>{setForm({...form, lastname: e.target.value})}}
                            />
                        </HStack>
                        <HStack>
                            <Text w='200px'>Summary</Text>
                            <Textarea id='summary' resize='none' /*value={form.lastname}*/ isDisabled={!isEdit} _disabled={{opacity: 0.8}}
                                // onChange={(e)=>{setForm({...form, lastname: e.target.value})}}
                            />
                        </HStack>
                        <HStack>
                            <Text w='200px'>Note</Text>
                            <Textarea id='note' resize='none' /*value={form.lastname}*/ isDisabled={!isEdit} _disabled={{opacity: 0.8}}
                                // onChange={(e)=>{setForm({...form, lastname: e.target.value})}}
                            />
                        </HStack>
                    </Stack>
                </ModalBody>
                {
                    isEdit &&
                    <ModalFooter gap={4}>
                        <Button variantColor='green' onClick={onClose}>Summit</Button>
                        <Button variantColor='green' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                }
            </ModalContent>
        </Modal>
    )
}
