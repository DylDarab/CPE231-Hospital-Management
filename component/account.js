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
import {useState,useEffect}  from 'react'
import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  const [name,setName] = useState('')
  const [profileimg,setProfileimg] = useState('')
  const [isShow,setIsShow] = useState(false)

  useEffect(()=>{
    if(sessionStorage.getItem('token') !== null)
    {
      setIsShow(true)
      setName(sessionStorage.getItem('name'))
      setProfileimg(sessionStorage.getItem('profileimg'))
    }
  },[])

  const onLogout = () => {
    sessionStorage.clear();
    router.push('/')
  }
  
  if (isShow)
  return (
  <Menu>
      <MenuButton position="absolute" right="16px" top="-40px">
        <HStack spacing="16px" padding="8px">
          <Box textAlign="right">
            <Text fontWeight='bold'>{name}</Text>
            <Text fontSize='14px'>Admin</Text>
          </Box>
          <Avatar src={profileimg}/>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={()=>onLogout()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};
