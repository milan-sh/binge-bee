import { Header } from "./components"
import Layout from "./Layout"

const App = () => {
  return (
    <div className="bg-black min-h-screen w-full">
      <Header/>
      <Layout>
        <div className="text-white">
          <h1>App</h1>
        </div>
      </Layout>
    </div>
  )
}

export default App
