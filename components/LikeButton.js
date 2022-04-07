import { BsSuitHeart, BsFillSuitHeartFill } from "react-icons/bs";
import { useState } from "react";
import { useUser } from "../context/user";
import { supabase } from "../utils/supabase";

export default function LikeButton({ message }) {
    const { user } = useUser();
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(message.n_likes) //n_likes ancora non funziona
    const [loading, setLoading] = useState(false)

    const initializeCount = async () => {
        const postId = message ? message.id : null;
        const { data, error, count } = await supabase
            .from("like")
            .select("id", { count: "exact" })
            .eq("post_id", postId)
        setLikeCount(count)
    }

    const initializeButton = async () => {
        const id = user ? user.id : null;
        const postId = message ? message.id : null;
        const { data, error, count } = await supabase
            .from("like")
            .select("profile_id", { count: "exact" })
            .eq("profile_id", id)
            .eq("post_id", postId)
        if (count > 0) {
            setLiked(true)
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
                setLikeCount(likeCount + 1)
            } catch (error) {
                alert(error)
            } finally {
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
                alert(error)
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