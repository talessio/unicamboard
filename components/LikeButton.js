import { BsSuitHeart, BsFillSuitHeartFill } from "react-icons/bs";
import { useState } from "react";
import { useUser } from "../context/user";
import { supabase } from "../utils/supabase";

const LikeButton = ({ message }) => {
    const { user } = useUser();
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(message.n_likes) 
    const [loading, setLoading] = useState(false)
    //TODO fix console error: invalid input syntax for type uuid: "null"

    const initializeCount = async () => {
        const postId = message ? message.id : null;
        try {
            const { error, count } = await supabase
                .from("like")
                .select("id", { count: "exact" })
                .eq("post_id", postId)
            if (error) throw error
            setLikeCount(count)
        } catch (error) {
            console.error(error.message)
        }
    }

    const initializeButton = async () => {
        const id = user ? user.id : null;
        const postId = message ? message.id : null;
        try {
            const { error, count } = await supabase
                .from("like")
                .select("profile_id", { count: "exact" })
                .eq("profile_id", id)
                .eq("post_id", postId)
            if (error) throw error
            if (count > 0) {
                setLiked(true)
            }
        } catch (error) {
            console.error(error.message)
        }
        initializeCount()
    }

    initializeButton()

    const handleLike = async () => {
        const id = user ? user.id : null;
        const postId = message ? message.id : null;
        if (!liked) {
            try {
                setLoading(true)
                const { error } = await supabase
                    .from("like")
                    .insert({
                        profile_id: id,
                        post_id: postId
                    })
                if (error) throw error
            } catch (error) {
                console.error(error.message)
            } finally {
                setLikeCount(likeCount + 1)
                setLoading(false)
                setLiked(true)
            }
        } else {
            try {
                setLoading(true)
                const { error } = await supabase
                    .from("like")
                    .delete()
                    .match({
                        profile_id: id,
                        post_id: postId
                    })
                if (error) throw error
                setLikeCount(likeCount - 1)
            } catch (error) {
                console.error(error.message)
            } finally {
                setLoading(false)
                setLiked(false)
            }
        }
    }

    return (
        <div>
            <button onClick={(e) => {
                e.preventDefault()
                handleLike()
            }}
                disabled={loading}
            >
                <span>{liked ? <BsFillSuitHeartFill color="red" /> : <BsSuitHeart />}</span>
            </button>
            <p>Likes: {likeCount}</p>
        </div>
    )
}

export default LikeButton;