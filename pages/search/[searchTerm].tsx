import React, {useState} from 'react';
import axios from "axios";
import {BASE_URL} from "../../utils";
import Link from 'next/link';
import useAuthStore from "../../store/authStore";
import {IUser, Video} from "../../types";
import NoResult from "../../components/NoResult";
import VideoCard from "../../components/VideoCard";
import {useRouter} from "next/router";
import Image from "next/image";

const Search = ({videos}: { videos: Video[] }) => {
    const [isAccounts, setIsAccounts] = useState(false);
    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const router = useRouter();
    const {searchTerm}: any = router.query;
    const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const {allUsers} = useAuthStore();
    const searchedAccount = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className='w-full '>
            <div>

                <div>
                    <div className='flex gap-10 mb-10 border-b-2 border-gray-200'>
                        <p onClick={() => setIsAccounts(true)}
                           className={`text-lg  cursor-pointer mt-2 ${accounts}`}>Accounts</p>
                        <p onClick={() => setIsAccounts(false)}
                           className={`text-lg  cursor-pointer mt-2 ${isVideos}`}>Videos</p>
                    </div>
                    {isAccounts ? (
                        <div className='md:mt-8 grid gap-4'>
                            {searchedAccount.length > 0 ? (
                                searchedAccount.map((user: IUser, index:number) => (

                                    <Link href={`/profile/${user._id}`} key={index}>
                                        <div
                                            className='flex items-center gap-3 hover:bg-primary cursor-pointer font-semibold'>
                                            <div className=''>
                                                <Image src={user.image} width={40} height={40}
                                                       className='rounded-full' alt='user'/>
                                            </div>
                                            <p className=''>{user.userName.replaceAll(' ', '')}</p>
                                        </div>
                                    </Link>


                                ))
                            ) : (
                                <NoResult prop='No Account'/>
                            )}
                        </div>
                    ) : (
                        <div className='md:mt-10 flex flex-wrap gap-6 md:justify-start'>
                            {videos.length ? (
                                videos.map((video, index) => (
                                    <VideoCard post={video} key={index}/>
                                ))
                            ) : (
                                <NoResult prop={'No Videos'}/>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export const getServerSideProps = async ({params: {searchTerm}}: { params: { searchTerm: string } }) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

    return {
        props: {videos: res.data}
    }
}

export default Search;