import {
  Button,
  Box,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Colour from "../Colour";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import axios from "axios";
import url from "../url";

export default ({ rooms, isOpen, onClose, doctors }) => {
  const router = useRouter();
  //   console.log(doctors);
  //   const { isOpen, onClose } = props;
  const [form, setForm] = useState({
      start_time: "",
      end_time: "",
      room: "",
      doctor: "",
      symptoms: "",
      note: "",
  });

  let line = {
    width: "100%",
    bgColor: "#000",
    marginTop: " 12px",
    marginRight: "12px",
    height: "2px",
    bgColor: Colour.LightGrey,
  };

  //   useEffect(() => {
  //     console.log(props);
  //   }, []);

  console.log(form);
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Add appointment
          <Box sx={line}></Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="16px">
          <VStack>
            <FormControl isRequired /* isInvalid={error && !form.lastname}*/>
              <FormLabel>Start time</FormLabel>
              <Input
                type="datetime-local"
                value={form.start_time}
                onChange={(e) => {
                  setForm({ ...form, start_time: e.target.value });
                }}
              />
            </FormControl>
            <FormControl isRequired /* isInvalid={error && !form.lastname}*/>
              <FormLabel>End time</FormLabel>
              <Input
                type="datetime-local"
                value={form.end_time}
                onChange={(e) => {
                  setForm({ ...form, end_time: e.target.value });
                }}
              />
            </FormControl>
            <FormControl isRequired /* isInvalid={error && !form.lastname}*/>
              <FormLabel>Doctor</FormLabel>
              <Select
                icon={<ChevronDownIcon />}
                placeholder="Select Doctor"
                bgColor={Colour.White}
                onChange={(e) =>
                  setForm({ ...form, doctor: e.target.value })
                }
              >
                {doctors.map((doctors) => (
                  <option
                    key={doctors.staffID}
                    value={doctors.staffID}
                  >
                    {doctors.firstname} {doctors.lastname}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired /* isInvalid={error && !form.lastname}*/>
              <FormLabel>Room</FormLabel>
              <Select
                icon={<ChevronDownIcon />}
                placeholder="Select Room"
                bgColor={Colour.White}
                onChange={(e) =>
                  setForm({ ...form, room: e.target.value })
                }
              >
                {rooms.map((room) => (
                  <option
                    key={room.roomID}
                    value={room.roomID}
                  >
                    {room.roomName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired /* isInvalid={error && !form.lastname}*/>
              <FormLabel>Symptom</FormLabel>
              <Textarea
                resize="none"
                value={form.symptoms}
                onChange={(e)=>{setForm({...form, symptoms: e.target.value})}}
              />
            </FormControl>
            <FormControl /* isInvalid={error && !form.lastname}*/>
              <FormLabel>Note</FormLabel>
              <Textarea
                resize="none"
                value={form.note}
                onChange={(e)=>{setForm({...form, note: e.target.value})}}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter gap={4}>
          <Button colorScheme='teal' onClick={onClose}>Submit</Button>
          <Button
            colorScheme='red'
            onClick={() => {
              onClose();
              setForm({start_time: item.start_time, end_time: item.end_time, room: "TEST"
                  , doctor: item.staffID, symptoms: item.symptoms, note: item.note})
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
