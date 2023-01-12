import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import NoResult from "../../components/NoResult";
import {IUser, Video} from "../../types";
import {BASE_URL} from "../../utils";

interface IProps {
    data:{
        user:IUser,
        userVideos:Video[],
        userLikedVideos: Video[]
    }
}

const Profile = ({data}:IProps) => {
    const [showUserVideos, setShowUserVideos] = useState(true);
    const {user, userVideos, userLikedVideos} = data;
    const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
    const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
    const [videosList, setVideosList] = useState<Video[]>([]);

    useEffect(()=>{
        if (showUserVideos){
            setVideosList(userVideos)
        }else{
            setVideosList(userLikedVideos)
        }
    },[showUserVideos, userLikedVideos, userVideos])

    return (
        <div className='w-full'>
            <div className='flex items-center gap-3 p-2 font-semibold'>
                <div className='flex justify-center items-center lg:w-12 lg:h-12'>
                    <Image src={user.image} width={40} height={40} className='rounded-full' alt='user'/>
                </div>
                <p className=''>{user.userName.replaceAll(' ','')}</p>
            </div>

            <div>
                <div className='flex gap-10 mb-10 border-b-2 border-gray-200'>
                    <p onClick={()=>setShowUserVideos(true)} className={`text-lg  cursor-pointer mt-2 ${videos}`}>Videos</p>
                    <p onClick={()=>setShowUserVideos(false)} className={`text-lg  cursor-pointer mt-2 ${liked}`}>Liked</p>
                </div>
            </div>

            <div className='flex gap-6 flex-wrap'>
                {videosList.length>0?(
                    videosList.map((post:Video, index:number)=>(
                        <VideoCard post={post} key={index}/>
                    ))
                ):(
                    <NoResult prop={`No Videos`}/>
                )}
            </div>
        </div>
    );
};

export const getServerSideProps = async ({params: {id}}: { params: { id: string } }) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

    return {
        props:{data:res.data}
    }
}

export default Profile;