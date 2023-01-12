import React, {useState, useEffect} from 'react';
import {MdFavorite} from "react-icons/md";
import useAuthStore from "../store/authStore";

interface IProps {
    handleLike:()=>void,
    handleDislike:()=> void,
    likes:any[]
}

const LikeButton = ({likes,handleLike, handleDislike}:IProps) => {
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const {userProfile}:any = useAuthStore();
    // const handleLike = () =>{setAlreadyLiked(prev=>!prev)}
    const filterLikes = likes?.filter(item=>item._ref===userProfile?._id)
    useEffect(()=>{
        if (filterLikes?.length > 0) {
            setAlreadyLiked(true)
        }else{
            setAlreadyLiked(false)
        }
    },[filterLikes,likes])

    return (
        <div className='gap-6'>
            <div className='mt-4 flex flex-col justify-center items-center'>
                {alreadyLiked ? (
                    <div className='bg-blue-200 p-2 rounded-full' onClick={handleDislike}>
                        <MdFavorite className='text-lg text-blue-500'/>
                    </div>
                ):(
                    <div className='bg-gray-200 p-2 rounded-full' onClick={handleLike}>
                        <MdFavorite className='text-lg text-gray-500'/>
                    </div>
                )}
                <p className='text-md text-gray-500 font-medium'>{likes?.length || 0}</p>
            </div>
        </div>
    );
};

export default LikeButton;