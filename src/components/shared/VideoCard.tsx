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


  const formattedDuration = typeof duration === 'number' 
    ? `${Math.floor(duration / 60)}:${(duration % 60).toFixed(0).toString().padStart(2, '0')}`
    : duration;

    const formatViews = (views: number): string => {
      if (views >= 1_000_000) {
        return `${(views / 1_000_000).toFixed(1)}M`;
      } else if (views >= 1_000) {
        return `${(views / 1_000).toFixed(1)}K`;
      } else if (views === 0) {
        return "No";
      } else {
        return views.toString();
      }
    };

    const formatDate = (inputDate: string | Date): string => {
      const date = new Date(inputDate);
      const now = new Date();
      const diff = (now.getTime() - date.getTime()) / 1000; // in seconds
    
      if (diff < 60) return `${Math.floor(diff)} seconds ago`;
      if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
      if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
      if (diff < 31104000) return `${Math.floor(diff / 2592000)} months ago`;
    
      return `${Math.floor(diff / 31104000)} years ago`;
    };
    
    

  return (
    <div className="w-full md:w-[330px] cursor-pointer">
      <div className="relative broder border-rose-600">
        <img
          src={thumbnail}
          alt="Video Thumbnail"
          className="w-full md:w-full h-60 object-cover rounded-lg shadow-lg hover:scale-95 transition"
        />
        <div className="absolute text-sm bottom-2 h-fit md:bottom-2 right-2 bg-black/50 font-semibold text-white px-2 py-1 rounded-sm shadow-md">
          <p>{formattedDuration}</p>
        </div>
      </div>
      <div className="flex gap-x-4 pt-4">
        <img
          src={avatar}
          alt="avatar"
          className="h-10 w-10 object-cover object-top rounded-full"
        />
        <div className="flex flex-col gap-y-2">
          <h3 className="font-semibold leading-5 text-sm md:text-lg">
            {title}
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
