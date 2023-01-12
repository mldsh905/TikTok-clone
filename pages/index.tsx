import axios from "axios";
import {Video} from "../types";
import NoResult from "../components/NoResult";
import VideoCard from "../components/VideoCard";
import {BASE_URL} from "../utils";

interface IProps {
    videos: Video[]
}

export default function Home({videos}: IProps) {

    return (
        <div className="flex flex-col gap-10 videos h-full">
            {videos.length ?
                videos.map(item => (
                    <VideoCard post={item} key={item._id}/>
                )) :
                <NoResult prop={'No Result'}/>
            }
        </div>
    )
}

export const getServerSideProps = async (
    {query: {topic}}: { query: { topic: string } }
) => {
    let response = null;

    if (topic){
        response = await axios.get(
            `${BASE_URL}/api/discover/${topic}`
        )
    }else{
        response = await axios.get(
            `${BASE_URL}/api/post`
        )
    }
    return {
        props: {
            videos: response.data
        }
    }
}