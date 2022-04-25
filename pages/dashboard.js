import {
  Box,
  Text,
  Heading,
  Flex,
  Image,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Colour from "../Colour";

export default () => {
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
    paddingLeft: "360px",
    paddingTop: "32px",
    bgColor: Colour.AlmostWhite,
  };

  return (
    <div>
      <Box sx={container}>
        <Heading>Dashboard</Heading>
        <Box sx={line}></Box>
      </Box>
      <Box sx={layout}>
        <Grid
          templateColumns="repeat(3, 1fr)"
          templateRows="repeat(3, 1fr)"
          gap="16px"
          margin='8px'
          width='90%'
        >
          <Stat border="1px solid #d3d3d3" bgColor='white' padding="8px">
            <StatLabel>Today's appointment</StatLabel>
            <StatNumber>100</StatNumber>
          </Stat>
          <Stat border="1px solid #d3d3d3" bgColor='white' padding="8px">
            <StatLabel>Today's patients</StatLabel>
            <StatNumber>100</StatNumber>
          </Stat>
          <Stat border="1px solid #d3d3d3" bgColor='white' padding="8px">
            <StatLabel>Today's prescriptions</StatLabel>
            <StatNumber>100</StatNumber>
          </Stat>
          <Stat border="1px solid #d3d3d3" bgColor='white' padding="8px">
            <StatLabel>Total Doctors</StatLabel>
            <StatNumber>200</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              1.05%
            </StatHelpText>
          </Stat>
          <Stat border="1px solid #d3d3d3" bgColor='white' padding="8px">
            <StatLabel>Total Patients</StatLabel>
            <StatNumber>2345</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              2.05%
            </StatHelpText>
          </Stat>
          <Stat border="1px solid #d3d3d3" bgColor='white' padding="8px">
            <StatLabel>Patients per doctor</StatLabel>
            <StatNumber>16</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              1.05%
            </StatHelpText>
          </Stat>
        </Grid>
      </Box>
    </div>
  );
};
