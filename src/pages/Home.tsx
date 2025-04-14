import useFetch from "@/hooks/use-Fetch";
import { VideoCard, VideoSkeleton } from "../components/index";

const Home = () => {
  const { data, loading, error } = useFetch("/api/v1/video/videos");
  const sekeltonCount = 8;

  return (
    <div className="text-white flex gap-6 flex-wrap justify-start">
      {error && (
        <p className="text-lg mx-auto absolute top-[50%] left-[50%] -translate-x-[30%] -translate-y-[50%] text-red-700">
          Something went wrong while showing videos !
        </p>
      )}
      {loading && (
        <>
          {Array.from({ length: sekeltonCount }).map((_, i) => (
            <VideoSkeleton key={i} />
          ))}
        </>
      )}
      {!loading &&
        data &&
        data?.data?.map((video) => (
          <VideoCard
            key={video?._id}
            thumbnail={video?.thumbnail}
            duration={video?.duration}
            avatar={video?.owner?.avatar}
            title={video?.title}
            username={video?.owner?.username}
            views={video?.views}
            createdAt={video?.createdAt}
          />
        ))}

      {!loading && data && data?.data?.length === 0 && (
        <p className="text-lg mx-auto text-gray-400">No videos found</p>
      )}
    </div>
  );
};

export default Home;
