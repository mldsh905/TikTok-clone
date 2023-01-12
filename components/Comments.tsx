import React, {Dispatch, SetStateAction} from 'react';
import Image from "next/image";
import Link from 'next/link';
import useAuthStore from "../store/authStore";
import NoResult from "./NoResult";
import {IUser} from "../types";

interface IProps {
    isPostingComment: Boolean;
    comment: string;
    setComment: Dispatch<SetStateAction<string>>;
    addComment: (e: React.FormEvent) => void;
    comments: IComment[]
}

interface IComment {
    comment: string;
    length?: number;
    _key: string;
    postedBy: { _ref: string; _id?: string }
}

const Comments = ({comment, setComment, addComment, comments, isPostingComment}: IProps) => {
    const {userProfile, allUsers} = useAuthStore();

    return (
        <div
            className='w-[80vw] md:w-[45vw] lg:w-[35vw] mt-4 border-t-2 border-gray-200 px-2 bg-gray-100 border-b-2 flex '>
            <div className='grid overflow-auto '>
                {comments?.length ?
                    (
                        comments.map((e, index) => (
                            <>
                                {allUsers.map((user: IUser) => (
                                    user._id === (e.postedBy._id || e.postedBy._ref)
                                    && (
                                        <div className='p-2 items-center' key={index}>
                                            <Link href={`/profile/${user._id}`}>
                                                <div className='flex items-center gap-3 hover:bg-primary cursor-pointer font-semibold'>
                                                    <div className='lg:w-6 lg:h-6'>
                                                        <Image src={user.image} width={30} height={30}
                                                               className='rounded-full' alt='user'/>
                                                    </div>
                                                    <p className='hidden lg:block'>{user.userName.replaceAll(' ', '')}</p>
                                                </div>
                                            </Link>
                                            <div>
                                                <p className='text-sm mt-2 font-medium ml-4'>{e.comment}</p>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </>
                        ))
                    ) : (
                        <NoResult prop={'No comments yet!'}/>
                    )
                }
            </div>
            {userProfile && (
                <div className='absolute bottom-[-30px] left-0 px-2'>
                    <form className='flex gap-4' onSubmit={addComment}>
                        <input className='bg-primary px-4 text-md font-medium border-2 w-[250px]' type="text"
                               value={comment} placeholder='add comment' onChange={e => setComment(e.target.value)}/>
                        <button className='text-md text-gray-400 border-2 px-2 hover:bg-gray-500 hover:text-white' onClick={addComment}>
                            {isPostingComment ? 'Commenting...' : 'Comment'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Comments;