import React from 'react';
import {footerList1, footerList3, footerList2} from "../utils/constants";

const Footer = () => {
    const List = ({footerList}:{footerList:string[]}) => (
        <div className='flex flex-wrap gap-2 mt-2'>
            {footerList.map((item)=>(
                <p key={item} className='text-gray-500 hover:underline cursor-pointer text-xs'>{item}</p>
            ))}
        </div>
    )

    return (
        <div className='hidden lg:block mt-2'>
            <List footerList={footerList1}/>
            <List footerList={footerList2}/>
            <List footerList={footerList3}/>
            <p className='mt-4 text-gray-500 text-xs'>2023 TIKTOK ALL RIGHTS RESERVED</p>
        </div>
    );
};

export default Footer;