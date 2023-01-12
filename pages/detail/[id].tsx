import React, {useState, useEffect, useRef} from 'react';
import {useRouter} from "next/router";
import Image from 'next/image';
import Link from 'next/link';
import {GoVerified} from "react-icons/go";
import {MdOutlineCancel} from "react-icons/md";
import {BsFillPlayFill} from "react-icons/bs";
import {HiVolumeOff, HiVolumeUp} from "react-icons/hi";
import axios from "axios";
import {BASE_URL} from "../../utils";
import post from "../../sanity-backend/schemas/post";
import {Video} from "../../types";
import useAuthStore from "../../store/authStore";
import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";

interface Iprops {
    postDetails: Video
}

const Detail = ({postDetails}: Iprops) => {
    const [post, setPost] = useState(postDetails);
    const videoRef = useRef(null);
    const {userProfile}:any =useAuthStore();
    const handleLike = async (like:boolean)=>{
        if (userProfile) {
            const {data} = await axios.put(`${BASE_URL}/api/like`, {
                userId: userProfile._id,
                postId:post._id,
                like
            })

            setPost({...post, likes: data.likes})
        }
    }

    const [comment, setComment] = useState('');
    const [isPostingComment, setIsPostingComment] = useState(false);
    const addComment = async (e:any) => {
        e.preventDefault();
        if (userProfile && comment){
            setIsPostingComment(true);
            const {data} = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
                userId:userProfile._id,
                comment
            })
            setPost({...post, comments:data.comments});
            setComment('');
            setIsPostingComment(false);
        }
    }

    return (
        <div className='flex w-full left-0 top-0 bg-white justify-start items-center'>
            <div className='grid w-full h-[80vh] gap-4 md:grid-flow-col md:grid-cols-[auto_1fr] justify-start items-start bg-black-500'>
                <div className='relative w-full'>
                    <div className=' h-[80vh] flex justify-center items-center w-full'>
                        <div className='absolute top-6 left-2 gap-6 lg:left-6 flex z-50'>
                            <p>
                                <MdOutlineCancel className='text-gray-200 text-[35px]'/>
                            </p>
                        </div>
                        <video
                            src={post.video.asset.url}
                            ref={videoRef}
                            loop
                            muted
                            controls
                            autoPlay
                            className='h-full cursor-pointer'
                        >
                        </video>
                    </div>
                </div>
                <div className='flex w-full justify-start'>
                    <div className='grid relative w-full justify-start items-center gap-2 md:px-2 cursor-pointer font-semibold rounded'>
                        <div className='flex  w-full gap-2'>
                            <Link href='/'>
                                <>
                                    <Image
                                        width={25}
                                        height={25}
                                        className='rounded-full'
                                        src={post.postedBy.image}
                                        alt='image'
                                    />
                                </>
                            </Link>
                            <div>
                                <Link href='/'>
                                    <div>
                                        <p>{post.postedBy.userName}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='flex gap-6'>
                                <p className='text-xl text-gray-500 mt-4'>
                                    {post.caption}
                                </p>
                                <div>
                                    {userProfile &&
                                        <LikeButton
                                            likes={post.likes}
                                            handleLike={()=>handleLike(true)}
                                            handleDislike={()=>handleLike(false)}
                                        />}
                                </div>
                            </div>
                            <div className='w-full'>
                                <Comments comment={comment} setComment={setComment} addComment={addComment} isPostingComment={isPostingComment} comments={post.comments}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async ({params: {id}}: { params: { id: string } }) => {
    const {data} = await axios.get(`${BASE_URL}/api/post/${id}`);
    return {
        props: {postDetails: data}
    }
}

export default Detail;