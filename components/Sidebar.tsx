import React, {useState} from 'react';
import {NextPage} from "next";
import {useRouter} from "next/router";
import Link from 'next/link';
import {GoogleLogin} from "react-google-login";
import {AiFillHome, AiOutlineMenu} from "react-icons/ai";
import {ImCancelCircle} from "react-icons/im";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const normalLink = 'flex item-center gap-3 hover:bg-primary p-3 justify-center lg:justify-start lg:w-[150px] cursor-pointer font-semibold';
    const userProfile = false;

    return (
        <div className='grid grid-flow-row justify-center items-center'>
            <div
                className='block m-4 mb-2 text-xl'
                onClick={()=>{setShowSidebar((prev)=>!prev)}}
            >
                {showSidebar? <ImCancelCircle/> : <AiOutlineMenu/>}
            </div>
            {!showSidebar && <span className='grid justify-center'>Menu</span>}
            {showSidebar &&
            <div className='flex flex-col justify-start mb-10 border-b-2 border-gray-100 p-3'>
                <div className=''>
                    <Link href='/'>
                        <div className={normalLink}>
                            <p className='text-2xl'>
                                <AiFillHome/>
                            </p>
                            <span className='hidden lg:block text-base'>
                                For you
                            </span>
                        </div>
                    </Link>
                </div>
                <Discover/>
                <SuggestedAccounts/>
                <Footer/>
            </div>}
        </div>
    );
};

export default Sidebar;