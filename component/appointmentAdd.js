import
  {
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
  } from "@chakra-ui/react"
import { React, useEffect, useState } from "react"
import Colour from "../Colour"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { useRouter } from "next/router"
import axios from "axios"
import url from "../url"
import Datetime from "react-datetime"
import "react-datetime/css/react-datetime.css"

export default (props) =>
{
  const router = useRouter()
  const { rooms, isOpen, onClose, doctors } = props
  //   console.log(doctors);
  //   const { isOpen, onClose } = props;
  const [error, setError] = useState(false)
  //   const [form, setForm] = useState({
  //     start_time: "",
  //     end_time: "",
  //     room: "",
  //     doctor: "",
  //     symptoms: "",
  //     note: "",
  //   });

  const [availbleRoom, setAvailableRoom] = useState([])
  const [availbleDoctor, setAvailableDoctor] = useState([])
  const [start_time, setStart_time] = useState()
  const [end_time, setEnd_time] = useState()
  const [room, setRoom] = useState("")
  const [doctor, setDoctor] = useState("")
  const [department, setDepartment] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [symptoms, setSymptoms] = useState("")
  const [note, setNote] = useState("")

  let line = {
    width: "100%",
    bgColor: "#000",
    marginTop: " 12px",
    marginRight: "12px",
    height: "2px",
    bgColor: Colour.LightGrey,
  }

  const onSubmitClick = () =>
  {
    console.log("submit clicked!")
    if (
      form.start_time &&
      form.end_time &&
      form.doctor &&
      form.room &&
      form.symptoms
    )
    {
      setError(false)
      console.log("form is valid")
    } else
    {
      setError(true)
      console.log("form is not valid")
    }
  }

  const fetchDoctors = async () =>
  {
    console.log('fetchdoctor')
    let result = await axios.get(`${url}/api/getAvailableDoctor`, {
      headers: {
        start_date: new Date(start_time).toISOString(),
        end_date: new Date(end_time).toISOString(),
        departmentid : selectedDepartment
      }
    })
    console.log(result.data)
    setAvailableDoctor(result.data)
  }

  useEffect(()=>{
    console.log(selectedDepartment)
  }, [selectedDepartment])

  const fetchRooms = async () =>
  {
    let result = await axios.get(`${url}/api/getAvailableRoom`, {
      headers: {
        start_date: new Date(start_time).toISOString(),
        end_date: new Date(end_time).toISOString(),
      }
    })
    setAvailableRoom(result.data)
  }

  useEffect(() =>
  {
    const fetchDepartment = async () =>
    {
      let department = await axios.get(`${url}/api/getDepartment`)
      setDepartment(department.data)
      console.log(department.data)
    }
    fetchDepartment()
  },[])
  useEffect(() =>
  {
    if (start_time && end_time)
    {
      fetchRooms()
    }
    if (start_time && end_time&&selectedDepartment)
    {
      fetchDoctors()
    }
  }, [start_time, end_time, selectedDepartment])



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
            <FormControl isRequired isInvalid={error && !form.start_time}>
              <FormLabel>Start time</FormLabel>
              <Datetime
                // displayTimeZone='Asia/Bangkok'
                value={start_time}
                onChange={(value) =>
                {
                  console.log('start_date', new Date(value).toISOString())
                  setStart_time(value)
                }}
              />
              {/* <Input
                type="datetime-local"
                value={form.start_time}
                onChange={(e) => {
                  setForm({ ...form, start_time: e.target.value });
                }}
              /> */}
            </FormControl>
            <FormControl isRequired isInvalid={error && !form.end_time}>
              <FormLabel>End time</FormLabel>
              <Datetime
                // displayTimeZone='Asia/Bangkok'
                value={end_time}
                onChange={(value) =>
                {
                  console.log('end_date', value)
                  setEnd_time(value)
                }}
              />
              {/* <Input
                type="datetime-local"
                value={form.end_time}
                onChange={(e) => {
                  setForm({ ...form, end_time: e.target.value });
                }}
              /> */}
            </FormControl>
            
            <FormControl isRequired isInvalid={error && !form.room}>
              <FormLabel>Department</FormLabel>
             
              <Select
                icon={<ChevronDownIcon />}
                placeholder="Select Department"
                bgColor={Colour.White}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {department.map((d) => (
                  <option key={d.departmentID} value={d.departmentID}>
                    {d.department_name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired isInvalid={error && !form.room}>
              <FormLabel>Room</FormLabel>
             
              <Select
                icon={<ChevronDownIcon />}
                placeholder="Select Room"
                bgColor={Colour.White}
                onChange={(e) => setRoom(e.target.value)}
              >
                {availbleRoom.map((room) => (
                  <option key={room.roomID} value={room.roomID}>
                    {room.roomName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired isInvalid={error && !form.doctor}>
              <FormLabel>Doctor</FormLabel>
              <Select
                icon={<ChevronDownIcon />}
                placeholder="Select Doctor"
                bgColor={Colour.White}
                onChange={(e) => setDoctor(e.target.value)}
              >
                {availbleDoctor.map((doctors) => (
                  <option key={doctors.staffID} value={doctors.staffID}>
                    {doctors.firstname} {doctors.lastname}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired isInvalid={error && !form.symptoms}>
              <FormLabel>Symptom</FormLabel>
              <Textarea
                resize="none"
                value={symptoms}
                onChange={(e) =>
                {
                  setSymptoms(e.target.value)
                }}
              />
            </FormControl>
            <FormControl /* isInvalid={error && !form.lastname}*/>
              <FormLabel>Note</FormLabel>
              <Textarea
                resize="none"
                value={note}
                onChange={(e) =>
                {
                  setNote(e.target.value)
                }}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter gap={4}>
          <Button colorScheme="teal" onClick={() => onSubmitClick()}>
            Submit
          </Button>
          <Button
            colorScheme="red"
            onClick={() =>
            {
              onClose()
              //   setForm({start_time: item.start_time, end_time: item.end_time, room: "TEST"
              //       , doctor: item.staffID, symptoms: item.symptoms, note: item.note})
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
