const VideoCard = () => {
  return (
    <div className="relative md:w-[330px] cursor-pointer">
      <img
        src="https://shorturl.at/TxqQf"
        alt="Video Thumbnail"
        className="w-full md:w-fit h-auto object-contain rounded-lg shadow-lg hover:scale-95 transition"
      />
      <div className="absolute text-sm top-48 md:top-40 right-2 bg-black/20 font-semibold text-white p-1 rounded-md shadow-md">
        <p>42:13</p>
      </div>
      <div className="flex gap-x-4 pt-4">
        <img
          src="https://shorturl.at/7kFXp"
          alt="avatar"
          className="h-10 w-fit rounded-full"
        />
        <div className="flex flex-col gap-y-2">
          <h3 className="font-semibold leading-5 text-lg">
            How to use Clerk in Next.js 15 - Step by Step Guide 🔥
          </h3>
          <div className="w-full gap-x-3 gap-y-1 flex md:flex-col flex-row">
            <p className="text-gray-400 w-fit leading-4">codewithharry</p>
            <p className="text-gray-400 w-fit flex items-center gap-x-2 leading-4">
              1.9M views{" "}
              <div className="inline-block h-1 w-1 bg-gray-500 rounded-full"></div>{" "}
              2 weeks ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
