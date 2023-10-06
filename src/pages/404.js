import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'


const NotFound = () => {
    // const router = useRouter();

    //push to home page after 3 seconds
    // useEffect(() => {
    //     setTimeout(() => { router.push('/') }, 3000) 
    // })

    //actual page
    return (
        <>
            <Head>
                <title>Error</title>
            </Head>

            <div className="not-found">
                <h1>That page does not exist...</h1>
                <p>Go back to the <Link href="/">Homepage</Link></p>
            </div>
        </>
    )
}
 
export default NotFound;