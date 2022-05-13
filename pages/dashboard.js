import {
  Box,
  Text,
  Heading,
  Flex,
  Image,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Center,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import Chart from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";
import Colour from "../Colour";
import url from '../url';

export const disease = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
      ],
      hoverOffset: 8,
    },
  ],
  options: {
    responsive: true,
  },
};


export const patientInDepartment = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Number of patients in hospital",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
  ],
};

export default (props) => {
  let container = {
    width: "100vw",
    paddingLeft: "360px",
    marginTop: "64px",
    bgColor: Colour.AlmostWhite,
  };
  let line = {
    width: "90%",
    marginRight: "4000px",
    paddingLeft: "360px",
    bgColor: "#000",
    marginTop: " 12px",
    height: "2px",
    bgColor: Colour.LightGrey,
  };
  let layout = {
    width: "100vw",
    padding: "32px 0 32px 360px",
    bgColor: Colour.AlmostWhite,
  };
  let statStyle = {
    border: "1px solid #d3d3d3",
    borderRadius: "8px",
    bgColor: "white",
    padding: "20px 8px 8px",
  };
  let borderStyle = {
    border: "1px solid #d3d3d3",
    borderRadius: "8px",
    padding: "40px",
  };
  let contentBox = {
    width: "90%",
    maxWidth: "1024px",
    bgColor: "white",
    marginTop: "16px",
    border: "1px solid #d3d3d3",
    borderRadius: "8px",
    padding: "24px",
  };

  return (
    <div>
      <Box sx={container}>
        <Heading>Dashboard</Heading>
        <Box sx={line}></Box>
      </Box>
      <Box sx={layout}>
        <Box sx={contentBox}>
          <Text fontSize="20px" fontWeight="bold" marginBottom="8px">
            Hospitality Status
          </Text>
          <Grid
            templateColumns="repeat(3, 1fr)"
            templateRows="repeat(2, 1fr)"
            gap="16px"
            margin="0px"
          >
            <Stat sx={statStyle}>
              <Flex alignItems="center" columnGap="8px">
                <Image
                  src="/assets/image/appointment.png"
                  filter="opacity(0.5) drop-shadow(0 0 0 red)"
                  boxSize="48px"
                />
                <Flex flexDirection="column">
                  <StatLabel>Today's appointment</StatLabel>
                  <StatNumber>{props.data.todayAppointment}</StatNumber>
                </Flex>
              </Flex>
            </Stat>
            <Stat sx={statStyle}>
              <Flex alignItems="center" columnGap="12px">
                <Image
                  src="/assets/image/patient.png"
                  filter="opacity(0.5) drop-shadow(0 0 0 green)"
                  boxSize="48px"
                  marginLeft="4px"
                />
                <Flex flexDirection="column">
                  <StatLabel>Today's patient</StatLabel>
                  <StatNumber></StatNumber>
                </Flex>
              </Flex>
            </Stat>
            <Stat sx={statStyle}>
              <Flex alignItems="center" columnGap="8px">
                <Image
                  src="/assets/image/prescription.png"
                  filter="opacity(0.5) drop-shadow(0 0 0 blue)"
                  boxSize="48px"
                />
                <Flex flexDirection="column">
                  <StatLabel>Today's prescription</StatLabel>
                  <StatNumber></StatNumber>
                </Flex>
              </Flex>
            </Stat>
            <Stat sx={statStyle}>
              <StatLabel>Total Doctors</StatLabel>
              <StatNumber>{props.data.totalDoctor}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                1.05%
              </StatHelpText>
            </Stat>
            <Stat sx={statStyle}>
              <StatLabel>Total Patients</StatLabel>
              <StatNumber>{props.data.totalPatient}</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                2.05%
              </StatHelpText>
            </Stat>
            <Stat sx={statStyle}>
              <StatLabel>Patients per doctor</StatLabel>
              <StatNumber></StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                1.05%
              </StatHelpText>
            </Stat>
          </Grid>
        </Box>
        <Box sx={contentBox}>
          <Text fontSize="20px" fontWeight="bold" margin="8px 0 16px">
            Patient Statistics
          </Text>
          <Stack width="100%" direction="row" spacing="16px">
            <Box sx={borderStyle} width="90%">
              <Doughnut data={disease} />
              <Center marginTop="16px" textAlign='center'>
                Proportion of disease in last 30 days
              </Center>
            </Box>
            <Box sx={borderStyle} width="90%">
              <Doughnut data={disease} />
              <Center marginTop="16px" textAlign='center'>
                Number of patients in each department
              </Center>
            </Box>
          </Stack>
          <Box sx={borderStyle} marginTop='16px' >
            <Line data={patientInDepartment} />
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export const getServerSideProps = async ()=>{
  const data = await axios.get(`${url}/api/getDashboardStat`)
  return {
      props: {
          data: data.data
      }
  }
}