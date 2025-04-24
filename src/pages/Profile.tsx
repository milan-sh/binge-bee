import { useParams } from "react-router";
import useFetch from "@/hooks/use-Fetch";
import { Button } from "@/components/ui/button";
import { SquarePen, BellRing } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { username } = useParams();
  const { loading, data, error } = useFetch(`/api/v1/users/c/${username}`);
  const [subscribe, setSubscribe] = useState(false);
  const handleSubscribe = () => {
    setSubscribe(!subscribe);
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p className="text-red-600">{error?.message}</p>;
  return (
    <div className="text-white">
      <div className="h-40 bg-black flex items-center justify-center">
        <img
          className="h-40 w-full object-contain rounded-md"
          src={data?.data?.coverImage}
          alt=""
        />
        <button className="absolute bottom-2 right-5 cursor-pointer text-primary hover:text-primary">
          <SquarePen />
        </button>
      </div>
      <div className="flex mt-4 gap-x-4">
        <img
          className="rounded-full md:h-30 md:w-30 h-20 w-20 object-cover"
          src={data?.data?.avatar}
          alt={data?.data?.fullName}
        />
        <div className="w-auto">
          <h1 className="text-3xl md:text-4xl font-medium">
            {data?.data?.fullName}
          </h1>
          <p className="text-sm md:text-lg">@{data?.data?.username}</p>
          <Button
            onClick={handleSubscribe}
            variant="login"
            className="hidden md:block mt-2"
          >
            {subscribe ? (
              <span className="flex justify-between items-center gap-x-2">
                <BellRing size={28} /> Unsubscribe
              </span>
            ) : (
              "Subscribe"
            )}
          </Button>
        </div>
      </div>
      <div>
        <Button
          onClick={handleSubscribe}
          variant="login"
          className="mt-2 py-4 px-6 w-[50%] md:hidden"
        >
          {subscribe ? (
            <span className="flex justify-between items-center gap-x-2">
              <BellRing size={28} /> Unsubscribe
            </span>
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>
      <Tabs defaultValue="account" className="mt-8">
        <TabsList className="bg-black ">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="tweets">Tweets</TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="videos">View your videos here.</TabsContent>
        <TabsContent value="tweets">See your tweets here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
