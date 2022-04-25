import {useRouter} from 'next/router'

export default ()=>{
    const router = useRouter()
    let id = router.query.id
    return (
        <div>
            <h1>Doctor {id}</h1>
        </div>
    )
}