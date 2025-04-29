import { formattedDuration, formatDate, formatViews, trimLength } from "../../utils/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { EllipsisVertical, Bookmark, ArrowDownToLine, Forward  } from "lucide-react";


interface Video {
  _id: string;
  title: string;
  thumbnail: string;
  duration: number;
  views: number;
  createdAt: string;
}

interface VideoGridProps {
  videos: {
    data: Video[];
  };
}

const VideoGrid = ({ videos }: VideoGridProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-x-6 gap-y-4">
      {videos?.data?.map((video:Video) => (
        <div
          key={video?._id}
          className="w-fit flex flex-col items-start justify-between py-3"
        >
          <div className="relative">
            <img
              src={video?.thumbnail}
              alt={video?.title}
              className="rounded-lg md:h-46 md:min-w-60 object-cover"
            />
            <div className="absolute text-sm bottom-2 h-fit md:bottom-2 right-2 bg-black/50 font-semibold text-white px-2 py-1 rounded-sm shadow-md">
              {formattedDuration(video?.duration)}
            </div>
          </div>
          <div className="mt-2 w-full flex items-center justify-between">
            <div>
              <h3 className="font-medium text-base md:min-h-12">{trimLength(video?.title)}</h3>
              <p className="text-gray-400 w-fit flex items-center gap-x-2 leading-4 mt-2
              ">
                <span>{formatViews(video?.views)} views </span> •{" "}
                {formatDate(video?.createdAt)}
              </p>
            </div>
            <div className="self-start p-2">              
              <DropdownMenu>
                <DropdownMenuTrigger><EllipsisVertical className="cursor-pointer" strokeWidth="2px"/></DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-black text-white font-semibold" align="start" side="top">
                  <DropdownMenuItem>
                    <Bookmark/>
                    <span>Save to Playlist</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                  <ArrowDownToLine />
                    <span>Download</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                  <Forward strokeWidth={1.75} />
                    <span>Share</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>

              </DropdownMenu>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
