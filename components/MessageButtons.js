import {
  FaRegHeart,
  FaHeart,
  FaArrowDown,
  FaArrowCircleDown,
} from "react-icons/fa";
import { useState } from "react";
import { useUser } from "../context/user";
import { supabase } from "../utils/supabase";

export const MessageButtons = ({ message }) => {
  const { user } = useUser();
  if (!user) {
    return null;
  }
  const id = user.id;
  if (!message) {
    return null;
  }
  const postId = message.id;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(message.n_likes);
  const [likeLoading, setLikeLoading] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [downvoteCount, setDownvoteCount] = useState(message.n_downvotes);
  const [downvoteLoading, setDownvoteLoading] = useState(false);

  const LikeButton = () => {
    const initializeLikeCount = async () => {
      try {
        const { error, count } = await supabase
          .from("like")
          .select("id", { count: "exact" })
          .eq("post_id", postId);
        if (error) throw error;
        setLikeCount(count);
      } catch (error) {
        console.error(error.message);
      }
    };

    const initializeLikeButton = async () => {
      try {
        const { error, count } = await supabase
          .from("like")
          .select("profile_id", { count: "exact" })
          .eq("profile_id", id)
          .eq("post_id", postId);
        if (error) throw error;
        if (count > 0) {
          setLiked(true);
        }
      } catch (error) {
        console.error(error.message);
      }
      initializeLikeCount();
    };

    initializeLikeButton();

    const insertLike = async () => {
      try {
        setLikeLoading(true);
        const { error } = await supabase.from("like").insert({
          profile_id: id,
          post_id: postId,
        });
        if (error) throw error;
      } catch (error) {
        console.error(error.message);
      } finally {
        setLikeLoading(false);
      }
    };

    const deleteLike = async () => {
      try {
        setLikeLoading(true);
        const { error } = await supabase.from("like").delete().match({
          profile_id: id,
          post_id: postId,
        });
        if (error) throw error;
      } catch (error) {
        console.error(error.message);
      } finally {
        setLikeLoading(false);
      }
    };

    const handleLike = async () => {
      if (!liked) {
        setLiked(true);
        setLikeCount(likeCount + 1);
        insertLike();
      } else {
        setLiked(false);
        setLikeCount(likeCount - 1);
        deleteLike();
      }
    };

    return (
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLike();
          }}
          disabled={likeLoading}
        >
          <span className="text-pink-400">
            {liked ? <FaHeart /> : <FaRegHeart />}
          </span>
        </button>
        {likeCount}
      </div>
    );
  };

  const DownvoteButton = () => {
    const initializeDownvoteCount = async () => {
      try {
        const { error, count } = await supabase
          .from("downvote")
          .select("id", { count: "exact" })
          .eq("post_id", postId);
        if (error) throw error;
        setDownvoteCount(count);
      } catch (error) {
        console.error(error.message);
      }
    };

    const initializeDownvoteButton = async () => {
      try {
        const { error, count } = await supabase
          .from("downvote")
          .select("profile_id", { count: "exact" })
          .eq("profile_id", id)
          .eq("post_id", postId);
        if (error) throw error;
        if (count > 0) {
          setDownvoted(true);
        }
      } catch (error) {
        console.error(error.message);
      }
      initializeDownvoteCount();
    };

    initializeDownvoteButton();

    const insertDownvote = async () => {
      try {
        setDownvoteLoading(true);
        const { error } = await supabase.from("downvote").insert({
          profile_id: id,
          post_id: postId,
        });
        if (error) throw error;
      } catch (error) {
        console.error(error.message);
      } finally {
        setDownvoteLoading(false);
      }
    };

    const deleteDownvote = async () => {
      try {
        setDownvoteLoading(true);
        const { error } = await supabase.from("downvote").delete().match({
          profile_id: id,
          post_id: postId,
        });
        if (error) throw error;
      } catch (error) {
        console.error(error.message);
      } finally {
        setDownvoteLoading(false);
      }
    };

    const handleDownvote = async () => {
      if (!downvoted) {
        setDownvoted(true);
        setDownvoteCount(downvoteCount + 1);
        insertDownvote();
      } else {
        setDownvoted(false);
        setDownvoteCount(downvoteCount - 1);
        deleteDownvote();
      }
    };

    return (
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleDownvote();
          }}
          disabled={downvoteLoading}
        >
          <span className="text-red-400">
            {downvoted ? <FaArrowCircleDown /> : <FaArrowDown />}
          </span>
        </button>
        {downvoteCount}
      </div>
    );
  };

  return (
    <div>
      <LikeButton />
      <DownvoteButton />
    </div>
  );
};
