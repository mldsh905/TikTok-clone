import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {topics} from '../utils/constants';

const Discover = () => {
    const router = useRouter();
    const {topic} = router.query;
    const activeClass = 'text-blue-600 flex gap-2 hover:bg-blue-100 lg:border-2 py-1 border-blue-300 px-3 rounded-full justify-center items-center';
    const nonActiveClass = 'text-gray-500 flex gap-2 hover:bg-blue-100 lg:border-2 py-1 border-gray-200 px-3 rounded-full justify-center items-center';

    return (
        <div className='lg:border-b-2 lg:border-gray-100 pb-6'>
            <p className='text-gray-500 font-semibold mt-3 mt-4 mb-4 hidden lg:block'>
                Popular Topics
            </p>
            <div className='grid gap-2 grid-flow-row lg:grid-cols-2'>
                {topics.map(item=>
                    (<Link href={`/?topic=${item.name}`} key={item.name}>
                        <div className={item.name === topic?activeClass:nonActiveClass}>
                            <div>{item.icon}</div>
                            <div className='hidden lg:block'>{item.name}</div>
                        </div>
                    </Link>)
                )}
            </div>
        </div>
    );
};

export default Discover;