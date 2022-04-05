import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useState } from "react";
import { supabase } from "../utils/supabase"; //to be used

export default function LikeButton() {
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)

    function like() {
        if (!liked) {
            setLiked(true)
            setLikeCount(likeCount + 1)
        } else {
            setLiked(false)
            setLikeCount(likeCount - 1)
        }
    }

    return (
        <div>
            <button onClick={like}>
                <span>{liked ? <BsSuitHeartFill /> : <BsSuitHeart />}</span>
            </button>
            <p>
                Likes: {likeCount}
            </p>
        </div>
    )
}