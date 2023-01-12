import React, {useEffect} from 'react';
import Image from "next/image";
import Link from 'next/link';
import useAuthStore from "../store/authStore";


const SuggestedAccounts = () => {
    const {fetchAllUsers, allUsers} = useAuthStore();
    useEffect(()=>{
        fetchAllUsers()
    },[fetchAllUsers])

    return (
        <div className='hidden lg:block lg:border-b-2 border-gray-200 pb-4'>
            <p className='text-gray-500 font-semibold  m-2'>
                SuggestedAccounts
            </p>
            <div>
                {allUsers.slice(0,5).map((user:any)=>(
                    <Link href={`/profile/${user._id}`} key={user._id}>
                        <div className='flex items-center gap-3 hover:bg-primary p-2 cursor-pointer font-semibold'>
                            <div className='lg:w-8 lg:h-8'>
                                <Image src={user.image} width={30} height={30} className='rounded-full' alt='user'/>
                            </div>
                            <p className='hidden lg:block'>{user.userName.replaceAll(' ','')}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SuggestedAccounts;