import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetch from "@/hooks/use-Fetch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoGrid, TweetCard, PlaylistCard } from "@/components";

interface TweetType {
  _id:string
  content:string
  owner:{
    _id:string
    username:string
    fullName:string
    avatar:string
  }
}

interface PlayListType {
  _id:string
  name:string
  videos:string[]

}

const Profile = () => {
  const { username } = useParams();
  const {
    loading: profileLoading,
    data: profileData,
    error: profileError,
  } = useFetch(`/api/v1/users/c/${username}`);

  const [activeTab, setActiveTab] = useState<"video" | "playlists" | "tweet">(
    "video"
  );

  const {
    data: videos,
    loading: videosLoading,
    error: videoError,
    refetch: refetchVideos,
  } = useFetch(`/api/v1/${activeTab}`);

  const {
    data: playlists,
    loading: playlistsLoading,
    error: playlistsError,
    refetch: refetchPlaylists,
  } = useFetch(`/api/v1/${activeTab}/user/${profileData?.data?._id}`);

  const {
    data: tweets,
    loading: tweetsLoading,
    error: tweetsError,
    refetch: refetchTweets,
  } = useFetch(`/api/v1/${activeTab}/user/${profileData?.data?._id}`);

  useEffect(() => {
    switch (activeTab) {
      case "video":
        refetchVideos();
        break;
      case "playlists":
        refetchPlaylists();
        break;
      case "tweet":
        refetchTweets();
        break;
    }
  }, [activeTab]);


  if (profileLoading) return <h1>Loading...</h1>;
  if (profileError)
    return <p className="text-red-600">{profileError?.message}</p>;
  return (
    <div className="text-white mx-auto md:max-w-[85%] pb-20">
      <div className="bg-black flex rounded-lg overflow-hidden shadow-md">
        <div className="relative h-auto md:h-52 w-full">
          <img
            className="w-full h-full object-cover"
            src={profileData?.data?.coverImage}
            alt=""
          />
        </div>
      </div>
      <div className="flex mt-4 gap-x-4">
        <img
          className="rounded-full md:h-30 md:w-30 h-14 w-14 object-cover"
          src={profileData?.data?.avatar}
          alt={profileData?.data?.fullName}
        />
        <div className="w-auto flex flex-col justify-center">
          <h1 className="text-2xl md:text-4xl font-medium">
            {profileData?.data?.fullName}
          </h1>
          <p className="text-xs md:text-lg">@{profileData?.data?.username}</p>
          <Button
            variant="login"
            className="hidden w-fit md:flex justify-center items-center mt-2 "
          >
            Customize channel
          </Button>
        </div>
      </div>
      <div>
        <Button
          variant="login"
          className="mt-5 w-[50%] md:hidden flex justify-center items-center"
        >
          Customize channel
        </Button>
      </div>
      <Tabs
        className="mt-8"
        value={activeTab}
        onValueChange={(tab) =>
          setActiveTab(tab as "video" | "playlists" | "tweet")
        }
      >
        <TabsList className="bg-black ">
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="tweet">Tweets</TabsTrigger>
        </TabsList>
        {activeTab === "video" && (
        <TabsContent value="video">
          {videosLoading ? <p>Loading...</p> :
          videoError ? <p>No  Video Found.</p>:
          <VideoGrid videos={videos}/>
          }
        </TabsContent>
        )}
        <TabsContent value="playlists">
          {playlistsLoading? <p>Loading..</p>:
          playlistsError ? <p>No playlist Found</p>:
          <div className="flex flex-wrap gap-x-2 md:gap-x-6">
            {playlists && playlists?.data?.map((playlist:PlayListType)=>(
              <PlaylistCard
              key={playlist?._id}
              name={playlist?.name}
              videos={playlist?.videos}
              />
            ))}
          </div>
          }          
        </TabsContent>
        <TabsContent value="tweet">
          {tweetsLoading ? <p>Loading...</p> :
          tweetsError ? <p>No Tweets Found.</p>:
          <div className="grid  gap-6">
            {tweets && tweets?.data?.map((tweetItem:TweetType)=>(
              <TweetCard
              key={tweetItem?._id}
              content={tweetItem?.content}
              owner={tweetItem?.owner}
              />
            ))}
          </div>
          }
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
