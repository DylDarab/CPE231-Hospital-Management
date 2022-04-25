import { Image, Container,Box, Heading } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import Navbar from '../../component/navbar'
import Colour from '../../Colour'

export default function Home(props)
{
    let container = {
        width: '100vw',
        paddingLeft: '360px',
        marginTop: '64px',
        bgColor: Colour.AlmostWhite,
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

    return (
        <div>
            <Navbar />
            <Box sx={container} >
                <Heading>
                    Doctor
                </Heading>
                <Box sx={line}></Box>
            </Box>
        </div>
    )
}



