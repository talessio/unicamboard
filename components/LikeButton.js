import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useState } from "react";
import { useUser } from "../context/user";
import { supabase } from "../utils/supabase";

export default function LikeButton({ postId }) {
    const { user } = useUser();
    const id = user ? user.id : null;
    console.log(postId);
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const [loading, setLoading] = useState(false)

    const handleLike = async () => {
        if (!liked) {
            try {
                setLoading(true)
                const { error } = await supabase
                    .from("like")
                    .insert({
                        profile_id: id,
                        post_id: postId //rivadsf
                    })
                if (error) throw error
                setLikeCount(likeCount + 1)
            } catch (error) {
                alert(error)
            } finally {
                setLoading(false)
            }
        } else {
            try {
                setLoading(true)
                const { error } = await supabase
                    .from("like")
                    .delete()
                    .match({
                        profile_id: id,
                        post_id: postId //jdnjdfad
                    })
                if (error) throw error
                setLikeCount(likeCount + 1)
            } catch (error) {
                alert(error)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div>
            <button onClick={(e) => {
                e.preventDefault()
                handleLike
            }}>
                <span>{liked ? <BsSuitHeartFill /> : <BsSuitHeart />}</span>
            </button>
            <p>
                Likes: {likeCount}
            </p>
        </div>
    )
}