import useFetch from "../hooks/use-Fetch";
import { api } from "@/api/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

interface StatsType {
  data: {
    toatalViews: string;
    totalCommentLike: string;
    totalSubscribers: string;
    totalTweetLike: string;
    totalVideoLikes: string;
    totalVideos: string;
  };
}

interface FormInputType {
  title: string;
  description: string;
  thumbnail: FileList | null;
  videoFile: FileList | null;
}

const Dashboard = () => {
  const {
    data: stats,
    loading,
    error,
  } = useFetch<StatsType>("/api/v1/dashboard/stats");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputType>();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [tweetContent, setTweetContent] = useState<string | undefined>(undefined)
  const [tweetError, setTweetError] = useState<string | null>(null)
  const [posting, setPosting] = useState<boolean>(false)

  if (loading) return <h1 className="text-white">Loading....</h1>;
  if (error) return <h1 className="text-red-600">Something went wrong</h1>;

  const onSubmit: SubmitHandler<FormInputType> = async (data) => {
    try {
      setUploading(true);
      setUploadError("");
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);

      if (data.thumbnail && data.thumbnail[0]) {
        formData.append("thumbnail", data.thumbnail[0]);
      }

      if (data.videoFile && data.videoFile[0]) {
        formData.append("videoFile", data.videoFile[0]);
      }

      const response = await api.post("/api/v1/video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response) {
        navigate("/");
      }
    } catch (error: any) {
      setUploading(false);
      console.error("Video upload failed:", error.response?.data);
      // Extract the error message from the backend response
      if (error.response?.data?.message) {
        setUploadError(error.response.data.message);
      } else {
        setUploadError(
          "An error occurred during uploading file. Please try again."
        );
      }
    } finally {
      setUploading(false);
    }
  };
  const handleTweet = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
        setPosting(true)
        setTweetError("")
        const response = await api.post("/api/v1/tweet", {content:tweetContent})
        if(response){
            navigate("/")
        }
        setTweetContent("")
    } catch (error:any) {
        setPosting(false);
      console.error("Tweet post failed:", error.response?.data);
      // Extract the error message from the backend response
      if (error.response?.data?.message) {
        setTweetError(error.response.data.message);
      } else {
        setTweetError(
          "An error occurred during posting a tweet. Please try again."
        );
      }
    } finally{
        setPosting(false)
    }
  }

  return (
    <div className="text-white mx-auto">
      <h1 className="text-lg md:text-2xl font-medium">Channel Dashbaord</h1>
      <div className="grid md:grid-cols-3 gap-x-4 mt-6">
        <div className="rounded-lg p-3 border border-gray-700">
          <div className="rounded-sm p-2 border border-dashed border-gray-700 flex flex-col items-center justify-center gap-y-4 min-h-60">
            <p className="w-[90%] text-center">
              Upload a video to get started.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-gray-100 rounded-full px-4 py-1.5 font-medium text-black cursor-pointer hover:bg-primary hover:text-white">
                  Upload video
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-black text-white border-2 border-primary shadow-2xl">
                <DialogHeader>
                  <DialogTitle>Upload video</DialogTitle>
                  <DialogDescription>
                    Fill all the details carefully.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-y-7"
                >
                  <div>
                    <Input
                      type="text"
                      placeholder="Title"
                      {...register("title", { required: "Title is required" })}
                    />
                    {errors?.title?.type === "required" && (
                      <p className="text-red-600">Title is required</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Description"
                      {...register("description", {
                        required: "Description is required",
                      })}
                    />
                    {errors?.description?.type === "required" && (
                      <p className="text-red-600">Description is required</p>
                    )}
                  </div>
                  <div>
                    <div className="flex gap-x-4">
                      <label htmlFor="" className="min-w-20">
                        Video
                      </label>
                      <Input
                        type="file"
                        accept="video/*"
                        placeholder="Description"
                        {...register("videoFile", {
                          required: "Vidoe file is required",
                        })}
                      />
                    </div>
                    {errors?.videoFile?.type === "required" && (
                      <p className="text-red-600">Video file is required</p>
                    )}
                  </div>
                  <div>
                    <div className="flex gap-x-4">
                      <label htmlFor="">Thumbnail</label>
                      <Input
                        type="file"
                        accept="image/*"
                        placeholder="Description"
                        {...register("thumbnail", {
                          required: "Thumbnail is required",
                        })}
                      />
                    </div>
                    {errors?.videoFile?.type === "required" && (
                      <p className="text-red-600">Thumbnail File is required</p>
                    )}
                  </div>
                  <Input
                    className="hover:bg-primary cursor-pointer font-semibold"
                    type="submit"
                    value={uploading ? "Uploading video..." : "Upload Video"}
                    disabled={uploading}
                  />
                </form>
                {uploadError && <p className="text-red-600">{uploadError}</p>}
              </DialogContent>
            </Dialog>
          </div>
          <div className="rounded-sm p-2 mt-6 md:mt-4 border border-dashed border-gray-700 flex flex-col items-center justify-center gap-y-4 min-h-60">
            <p className="w-[90%] text-center">Post a tweet to get started.</p>
            <Dialog>
              <DialogTrigger>
                <button className="bg-gray-100 rounded-full px-4 py-1.5 font-medium text-black cursor-pointer hover:bg-primary hover:text-white">
                  Post a tweet
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Post a tweet</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleTweet}>
                  <div className="grid w-full gap-6 min-h-[20vh] md:min-h-[25vh]">
                    <Textarea name="content" onChange={(e)=>setTweetContent(e.target.value)} value={tweetContent} required placeholder="Type your tweet here." />
                    <Input type="submit" className="bg-primary font-medium text-white cursor-pointer" disabled={posting} value={posting? "Posting..." : "Post your Tweet"}/>
                    {tweetError && (<p className="text-red-600">{tweetError}</p>)}
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="md:col-span-2 rounded-lg p-3 border border-gray-700">
          <h3 className="text-xl font-medium">Channel analytics</h3>
          <div className="grid grid-cols-2 p-2 mt-2">
            <div className="text-left">
              <p>Current subscribers</p>
              <h2 className="font-medium text-4xl">
                {stats?.data?.totalSubscribers}
              </h2>
            </div>
            <div className="text-left">
              <p>Total views</p>
              <h2 className="font-medium text-4xl">0</h2>
            </div>
          </div>
          <div className="w-[98%] mx-auto h-[1px] my-2 bg-gray-800"></div>
          <div className="grid grid-cols-2 gap-y-4 mt-2">
            <div className="text-left w-fit">
              <p>Total Video likes</p>
              <h2 className="font-medium text-4xl">
                {stats?.data?.totalVideoLikes}
              </h2>
            </div>
            <div className="text-left w-fit">
              <p>Total videos</p>
              <h2 className="font-medium text-4xl">
                {stats?.data?.totalVideos}
              </h2>
            </div>
            <div className="text-left w-fit col-span-2">
              <p>Total Tweet likes</p>
              <h2 className="font-medium text-4xl">
                {stats?.data?.totalTweetLike}
              </h2>
            </div>
            <div className="text-left w-fit col-span-2">
              <p>Total Comment likes</p>
              <h2 className="font-medium text-4xl">
                {stats?.data?.totalCommentLike}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
