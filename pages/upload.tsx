import React from 'react';
import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import {FaCloudUploadAlt} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import axios from "axios";
import useAuthStore from "../store/authStore";
import {client} from "../utils/client";
import {SanityAssetDocument} from "@sanity/client";
import {topics} from "../utils/constants";
import {BASE_URL} from "../utils";

const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [video, setVideo] = useState<SanityAssetDocument | undefined>();
    const [wrongType, setWrongType] = useState(false);
    const [caption, setCaption] = useState('');
    const [category, setCategory] = useState(topics[0].name);
    const [savingPost, setSavingPost] = useState(false);
    const {userProfile}:{userProfile:any} = useAuthStore();
    const router = useRouter();

    const uploadVideo = async (e: any) => {
        const file = e.target.files[0];
        if (file.type === 'video/mp4') {
            client.assets.upload('file', file, {
                contentType: file.type,
                filename: file.name
            }).then(data => {
                setVideo(data);
                setIsLoading(false)
            })
        } else {
            setIsLoading(false);
            setWrongType(true);
        }
    }

    const handlePost = async ()=>{
        if (caption && video?._id && category){
            setSavingPost(true);
            const doc = {
                _type:'post',
                caption,
                video:{
                    _type:'file',
                    asset:{
                        _type:'reference',
                        _ref:video._id
                    }
                },
                userId: userProfile?._id,
                postedBy:{
                    _type:'postedBy',
                    _ref:userProfile?._id
                },
                topic:category
            }
            await axios.post(`${BASE_URL}/api/post`,doc);
            router.push('/')
        }
    }

    return (
        <div className='flex overflow-scroll w-full h-full justify-center items-center'>
            <div className='grid md:flex  bg-white rounded-lg gap-10'>
                <div>
                    <div>
                        <p className='text-2xl font-bold'>Upload Video</p>
                        <p className='text-md text-gray-500'>Post a video to your account</p>
                    </div>
                    <div
                        className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer '>
                        {isLoading ? (
                            <p>Uploading</p>
                        ) : (
                            <div>
                                {video ? (
                                    <div>
                                        <video src={video.url}
                                               controls
                                               loop
                                               className='h-[400px] mt-10'
                                        ></video>
                                    </div>
                                ) : (
                                    <label className='cursor-pointer'>
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <div className='flex flex-col items-center justify-center'>
                                                <p>
                                                    <FaCloudUploadAlt className='text-6xl text-gray-500'/>
                                                </p>
                                                <p className='text-md font-semibold'>
                                                    Select video to upload
                                                </p>
                                            </div>
                                            <p className='text-gray-500 text-center text-sm mt-6'>
                                                Accept MP4 format
                                            </p>
                                        </div>
                                        <input type="file"
                                               name='upload-video'
                                               className='w-0 h-0'
                                               onChange={uploadVideo}
                                        />
                                    </label>
                                )}
                            </div>
                        )
                        }
                        {wrongType && (
                            <p className='text-blue-500 font-semibold'>Please check the file type</p>
                        )}
                    </div>
                </div>
                <div className='flex flex-col gap-3 pb-10 md:mt-40'>
                    <label htmlFor="">
                        Caption
                    </label>
                    <input type="text"
                           value={caption}
                           onChange={(e) => {
                               setCaption(e.target.value)
                           }}
                           className='outline-none
                           border-gray-200 h-7
                           border-2 rounded-xl'
                    />
                    <label htmlFor="">
                        Category
                    </label>
                    <select
                        className='h-7 outline-none border-2 border-gray-200 rounded-xl'
                        name=""
                        id=""
                        onChange={(e) => {
                            setCategory(e.target.value)
                        }}
                    >
                        {topics.map((topic) => (
                            <option key={topic.name}>{topic.name}</option>
                        ))}
                    </select>
                    <div className='mt-10 flex justify-center gap-2'>
                        <button
                            onClick={()=>{router.push('/')}}
                            type='button'
                            className='border-gray-300 w-28 border-2 text-md font-medium p-2 rounded '
                        >
                            Discard
                        </button>
                        <button
                            onClick={handlePost}
                            type='button'
                            className='text-white bg-blue-500 w-28 text-md font-medium p-2 rounded '
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;