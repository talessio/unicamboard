import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import { useState } from "react";

export const DeletePostButton = ({ message }) => {
  const [deleted, setDeleted] = useState(false);
  const [user] = useState(supabase.auth.user());
  const router = useRouter();
  if (!user) {
    return null;
  }
  if (!message) {
    return null;
  }

  console.log(message.id, user.id);

  const postIsActuallyUsersOwn = async () => {
    try {
      const { error, count } = await supabase
        .from("post")
        .select("id", { count: "exact" })
        .eq("id", message.id)
        .eq("profile_id", user.id);
      if (error) throw error;
      if (count < 1) {
        document.getElementById("tastoElimina").style.display = "none";
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  postIsActuallyUsersOwn();

  async function purgePostRepliesFirst() {
    try {
      const { error } = await supabase
        .from("replies")
        .delete()
        .match({
          post_id: message.id
        })
        if (error) throw error;
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleClick() {
    purgePostRepliesFirst();
    try {
      setDeleted(true);
      const { error } = await supabase
        .from("post")
        .delete()
        .match({
          id: message.id,
          profile_id: user.id
        })
      if (error) throw error;
    } catch (error) {
      console.error(error.message);
    } finally {
      setTimeout(() => {
        router.push("/board");
      }, 2000);
    }
  }

  return (
    <button
      id="tastoElimina"
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      disabled={deleted}
    >
      <span>
        {deleted ? "Eliminato" : "Elimina questo post"}
      </span>
    </button>
  );
}