import {
  HStack,
  Box,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Colour from "../Colour";

export default () => {
  return (
    <Menu>
      <MenuButton position="absolute" right="16px" top="-40px">
        <HStack spacing="16px" padding="8px">
          <Box textAlign="right">
            <Text>Tony Arayeewa</Text>
            <Text>Admin</Text>
          </Box>
          <Avatar />
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};