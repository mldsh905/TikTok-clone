import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {useEffect, useState} from "react";
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { GoogleOAuthProvider } from '@react-oauth/google';


const App = ({Component, pageProps}: AppProps) => {
    const [isSSR, setIsSSR] = useState(true);
    useEffect(() => {
        setIsSSR(false)
    }, [])

    if (isSSR) return null;
    return (
        <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
            <div className='m-auto overflow-hidden h-[100vh]'>
                <Navbar/>
                <div className="grid grid-flow-col grid-cols-[auto_1fr] gap-6 md:gap-10">
                    <div className="h-[92vh] max-w-xs  overflow-scroll overflow-hidden">
                        <Sidebar/>
                    </div>
                    <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos">
                        <Component {...pageProps} />
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    )
}

export default App