import { Image, Container, Heading } from '@chakra-ui/react'
import axios from 'axios'
import Navbar from '../component/navbar'

export default function Home(props)
{
    

    let container = {
        width: '100%',
        marginLeft: '360px',
        marginTop: '50px',
    }

    return (
        <div>
            <Container sx={container}>
                <Heading>
                    Schedule
                </Heading>
            </Container>
        </div>
    )
}

