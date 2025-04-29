import { formatDate, formattedDuration, formatViews, trimLength } from "../../utils/index";

interface PropType {
  thumbnail: string;
  duration: number | string;
  title: string;
  avatar: string;
  username: string;
  views: number;
  createdAt: string | Date;
}

const VideoCard = ({
  thumbnail,
  duration,
  title,
  avatar,
  username,
  views,
  createdAt,
}: PropType) => {
  return (
    <div className="w-full md:w-[330px] cursor-pointer">
      <div className="relative broder border-rose-600">
        <img
          src={thumbnail}
          alt="Video Thumbnail"
          className="w-full md:w-full h-60 object-cover rounded-lg shadow-lg hover:scale-95 transition-discrete duration-200 ease-in-out"
        />
        <div className="absolute text-sm bottom-2 h-fit md:bottom-2 right-2 bg-black/50 font-semibold text-white px-2 py-1 rounded-sm shadow-md">
          <p>{formattedDuration(duration)}</p>
        </div>
      </div>
      <div className="flex gap-x-4 pt-4">
        <img
          src={avatar}
          alt="avatar"
          className="h-10 shrink-0 w-10 object-cover object-top rounded-full"
        />
        <div className="flex flex-col gap-y-2">
          <h3 className="min-h-10 font-semibold leading-5 text-sm md:text-lg">
            {trimLength(title)}
          </h3>
          <div className="w-full gap-x-3 gap-y-1 flex md:flex-col flex-row text-sm md:text-base">
            <p className="text-gray-400 w-fit leading-4">{username}</p>
            <p className="text-gray-400 w-fit flex items-center gap-x-2 leading-4">
              <span>{formatViews(views)} views </span> • {formatDate(createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
