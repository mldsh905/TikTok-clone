import React, {useState} from 'react';
import Image from "next/image";
import Link from 'next/link';
import {useRouter} from "next/router";
import {AiOutlineLogout} from "react-icons/ai";
import {BiSearch} from "react-icons/bi";
import {IoMdAdd} from "react-icons/io";
import Logo from '../utils/tiktok-logo.png';
import {GoogleLogin, googleLogout} from "@react-oauth/google";
import {createOrGetUser} from "../utils";
import useAuthStore from "../store/authStore";
import {router} from "next/client";

const Navbar = () => {
    const user = false;
    const {userProfile, addUser, removeUser}: { userProfile: any, addUser: any, removeUser: any } = useAuthStore();
    const router = useRouter();
    const handleSearch = (e:{preventDefault:()=>void}) => {
        e.preventDefault();
        if (searchValue){
            router.push(`/search/${searchValue}`)
        }
    }
    const[searchValue, setSearchValue]=useState('')

    return (
        <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
            <Link href="/">
                <div className='w-[100px] md:w-[140px]'>
                    <Image
                        className="cursor-pointer"
                        src='/tiktok-logo.png'
                        alt='TIKTOK'
                        height='200'
                        width='500'
                    >
                    </Image>
                </div>
            </Link>

            <div className='relative hidden md:block'>
                <form
                    className='absolute md:static top-10'
                    onSubmit={handleSearch}
                >
                    <input
                        className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 w-[200px] md:w-[300px] lg:w-[400px] rounded-full'
                        value={searchValue}
                        onChange={(e)=>{setSearchValue(e.target.value)}}
                        placeholder='Search accounts or videos'
                        type="text"/>
                    <button
                        onClick={handleSearch}
                        className='absolute border-gray-300 right-5 border-l-2 p-2 pl-4 top-2 text-gray-500 text-lg'
                    >
                        <BiSearch/>
                    </button>
                </form>
            </div>

            <div>
                {userProfile ?
                    (<div className='flex gap-4 justify-center items-center'>
                        <Link href='/upload'>
                            <button className='border-2 px-2 lg:px-4 flex items-center gap-2 rounded-2xl'>
                                <IoMdAdd className='text-xl'/>{' '}
                                <span className='hidden md:block'>Upload</span>
                            </button>
                        </Link>
                        {userProfile.image &&
                            <Link href='/'>
                                <>
                                    <Image
                                        width={30}
                                        height={30}
                                        className='rounded-full'
                                        src={userProfile.image}
                                        alt='image'
                                    />
                                </>
                            </Link>}
                        <button type='button' className='px-2'
                                onClick={() => {
                                    googleLogout();
                                    removeUser();
                                }}
                        >
                            <AiOutlineLogout color='blue' fontSize='20'/>
                        </button>
                    </div>)
                    :
                    <GoogleLogin
                        onSuccess={res => createOrGetUser(res, addUser)}
                        onError={() => console.log('err')}
                    />
                }
            </div>
        </div>
    );
};

export default Navbar;