

const Dashboard = () => {
  return (
    <div className="text-white mx-auto">
        <h1 className="text-lg md:text-2xl font-medium">Channel Dashbaord</h1>
        <div className="grid md:grid-cols-3 gap-x-4 mt-6">
            <div className="rounded-lg p-3 border border-gray-700">
                <div className="rounded-sm p-2 border border-dashed border-gray-700 flex flex-col items-center justify-center gap-y-4 min-h-60">
                    <p className="w-[90%] text-center">Upload a video to get started.</p>
                    <button className="bg-gray-100 rounded-full px-4 py-1.5 font-medium text-black cursor-pointer hover:bg-primary hover:text-white">Upload video</button>
                </div>
                <div className="rounded-sm p-2 mt-6 md:mt-4 border border-dashed border-gray-700 flex flex-col items-center justify-center gap-y-4 min-h-60">
                    <p className="w-[90%] text-center">Post a tweet to get started.</p>
                    <button className="bg-gray-100 rounded-full px-4 py-1.5 font-medium text-black cursor-pointer hover:bg-primary hover:text-white">Post a tweet</button>
                </div>
            </div>
            <div className="md:col-span-2 rounded-lg p-3 border border-gray-700">
                <h3 className="text-xl font-medium">Channel analytics</h3>
                <div className="grid grid-cols-2 p-2 mt-2">
                    <div className="text-left">
                        <p>Current subscribers</p>
                        <h2 className="font-medium text-4xl">0</h2>
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
                        <h2 className="font-medium text-4xl">0</h2>
                    </div>
                    <div className="text-left w-fit">
                        <p>Total videos</p>
                        <h2 className="font-medium text-4xl">0</h2>
                    </div>
                    <div className="text-left w-fit col-span-2">
                        <p>Total Tweet likes</p>
                        <h2 className="font-medium text-4xl">0</h2>
                    </div>
                    <div className="text-left w-fit col-span-2">
                        <p>Total Comment likes</p>
                        <h2 className="font-medium text-4xl">0</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard