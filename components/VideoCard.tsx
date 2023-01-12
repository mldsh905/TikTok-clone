import React from 'react';
import {Video} from "../types";
import {useState, useEffect, useRef} from "react";
import Image from "next/image";
import Link from 'next/link';
import {HiVolumeUp, HiVolumeOff} from "react-icons/hi";
import {BsFillPlayFill, BsPlay, BsFillPauseFill} from "react-icons/bs";
import {GoVerified} from "react-icons/go";

interface IProps {
    post:Video
}

const VideoCard = ({post}:IProps) => {
    return (
        <div className='flex flex-col border-b-2 border-gray-200 pb-4'>
            <div>
                <div className='flex gap-3 px-2 cursor-pointer font-semibold rounded'>
                    <div className='md:w-16 md:h-16 w-10 h-10'>
                        <Link href={`/profile/${post.postedBy._id}`}>
                            <>
                                <Image
                                    width={40}
                                    height={40}
                                    className='rounded-full'
                                    src={post.postedBy.image}
                                    alt='image'
                                />
                            </>
                        </Link>
                    </div>
                    <div>
                        <Link href={`/profile/${post.postedBy._id}`}>
                            <div>
                                <p>{post.postedBy.userName}</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className=' flex gap-4 relative justify-center'>
                    <div className='rounded-3xl'>
                        <Link href={`/detail/${post._id}`}>
                            <video
                                loop
                                className='w-[70vw] lg:w-[60vw] h-[40vh]'
                                autoPlay
                                muted
                                controls
                                src={post.video.asset.url}>
                            </video>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;