import { useParams } from "react-router";
import useFetch from "@/hooks/use-Fetch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { username } = useParams();
  const { loading, data, error } = useFetch(`/api/v1/users/c/${username}`);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p className="text-red-600">{error?.message}</p>;
  return (
    <div className="text-white mx-auto md:max-w-[80%]">
      <div className="bg-black flex rounded-lg overflow-hidden shadow-md">
        <div className="relative h-auto md:h-52 w-full">
          <img
            className="w-full h-full object-cover"
            src={data?.data?.coverImage}
            alt=""
          />
        </div>
      </div>
      <div className="flex mt-4 gap-x-4">
        <img
          className="rounded-full md:h-30 md:w-30 h-14 w-14 object-cover"
          src={data?.data?.avatar}
          alt={data?.data?.fullName}
        />
        <div className="w-auto flex flex-col justify-center">
          <h1 className="text-2xl md:text-4xl font-medium">
            {data?.data?.fullName}
          </h1>
          <p className="text-xs md:text-lg">@{data?.data?.username}</p>
          <Button
            variant="login"
            className="hidden w-fit md:flex justify-center items-center mt-2 "
          >Customize channel</Button>
        </div>
      </div>
      <div>
        <Button
          variant="login"
          className="mt-5 w-[50%] md:hidden flex justify-center items-center"
        >Customize channel</Button>
      </div>
      <Tabs defaultValue="account" className="mt-8">
        <TabsList className="bg-black ">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="tweets">Tweets</TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          Your videos here.
        </TabsContent>
        <TabsContent value="playlists">View your playlists here.</TabsContent>
        <TabsContent value="tweets">See your tweets here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
