import {Image} from '@chakra-ui/react'
import axios from 'axios'
import Navbar from '../component/navbar'

export default function Home(props) {
  return (
    <>
    </>
  )
}

export const getStaticProps = async () => {
  const nameList = await axios.get('http://localhost:3000/api/test')
  return{
    props:{
      nameList: nameList.data
    }
  }
}

