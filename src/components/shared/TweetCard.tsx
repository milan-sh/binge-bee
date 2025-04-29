import {Twitter, Heart, Forward} from "lucide-react"

interface TweetPropType{
    content:string
    owner: {
        username:string
        fullName:string
        avatar:string
    }
}

const TweetCard = ({content, owner}:TweetPropType) => {
    console.log(owner)
  return (
    <div className="md:w-80 border border-gray-800 p-2 rounded-lg">
        <div className="flex items-center justify-between">
            <div className="flex gap-x-2">
                <img src={owner?.avatar} alt={owner?.username} className="w-12 h-12 object-cover rounded-full" />
                <div>
                    <h2 className="font-semibold text-lg">{owner?.fullName}</h2>
                    <p className="text-gray-500 text-sm">{owner?.username}</p>
                </div>
            </div>
            <Twitter />
        </div>
        <p className="mt-1 min-h-10">{content}</p>
        <div className="flex items-center justify-evenly mt-4 bg-gray-900 p-2 rounded-sm">
        <Heart />
        <Forward />
        </div>
    </div>
  )
}

export default TweetCard