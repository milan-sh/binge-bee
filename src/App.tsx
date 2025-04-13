import { Header, VideoCard } from "./components"
import Layout from "./Layout"

const App = () => {
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
