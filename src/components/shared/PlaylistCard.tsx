import { Link } from "react-router"
import {EllipsisVertical, ListVideo} from "lucide-react"

interface ChildPropTypes{
    name:string
    videos:string[]
}


const PlaylistCard = ({name, videos}:ChildPropTypes) => {
  return (
    <div className="w-fit p-2">
        <div className="relative h-40 w-44 md:w-60 rounded-lg bg-gray-700">

            <div className="absolute -top-2 w-[80%] left-4 md:left-6 h-1  bg-gray-500 rounded-t-md "></div>
            <div className="absolute -top-1 w-[90%] left-2 md:left-3 h-1  bg-gray-600 rounded-t-md"></div>
            <div className="absolute bottom-2 right-1 flex items-center gap-x-2 rounded-sm px-2 py-1 bg-gray-800 text-sm font-medium"><ListVideo size={18} /> {videos?.length} Videos</div>
        </div>
        <div className="flex items-center w-full">
            <div className="mt-2 w-full">
                <h2 className="font-semibold">{name}</h2>
                <Link to=""><p className="text-gray-400 text-sm font-medium">View full playlist</p></Link>
            </div>
            <EllipsisVertical />
        </div>

    </div>
  )
}

export default PlaylistCard