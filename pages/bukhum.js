import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'

export default function Home(props)
{
    return (
        <div className={styles.container}>
            {props.nameList.map((name, index) => (
                <h1 key={index}>{name.name}</h1>
            ))}
        </div>
    )
}

export const getStaticProps = async () =>
{
    const nameList = await axios.get('http://localhost:3000/api/test')
    return {
        props: {
            nameList: nameList.data
        }
    }
}

