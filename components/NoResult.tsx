import React from 'react';
import {MdOutlineVideocamOff} from "react-icons/md";

const NoResult = ({prop}:{prop:string}) => {
    return (
        <div>
            <div>
                No Result
            </div>
            <div>
                {prop}
            </div>
        </div>


    );
};

export default NoResult;