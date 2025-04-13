import { Header, VideoCard } from "./components"
import Layout from "./Layout"
import useFetch from "./hooks/use-Fetch"

const App = () => {
  const {data, pending, error} = useFetch("/api/v1/healthcheck")
  console.log(data)
  return (
    <div className="bg-black min-h-screen w-full">
      <Header/>
      <Layout>
        <div className="text-white flex gap-6 flex-wrap justify-start">
          <VideoCard/>
          <VideoCard/>
          <VideoCard/>
          <VideoCard/>
          <VideoCard/>
          <VideoCard/>
          <VideoCard/>
        </div>
      </Layout>
    </div>
  )
}

export default App
