import { useState } from "react";
import { useUser } from "../context/user";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";

export default function InputMessage() {
  const { user } = useUser();
  const router = useRouter();
  const id = user ? user.id : null;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async (title, body) => {
    try {
      setLoading(true);
      if (title === "" || body === "")
        throw new Error("Titolo e corpo devono essere entrambi compilati!");
      const { error } = await supabase.from("post").insert({
        title: title,
        body: body,
        profile_id: id,
      });
      if (error) throw error;

      setTimeout(() => {
        router.push("/board");
      }, 2000);

      alert(
        "Il tuo messaggio è stato mandato! Ricarica la pagina per visualizzarlo sulla home."
      );
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      setTitle("");
      setBody("");
    }
  };

  return (
    <div className="rounded-l py-2 px-4 font-medium">
      <p>utente: {user ? user.email : "ospite"}</p>
      <div>
        <input
          className="border-b-2"
          type="text"
          placeholder="Oggetto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br></br>
      <div>
        <textarea
          className="border-b-2"
          placeholder="Corpo"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            send(title, body);
          }}
          className="py-4 text-sm font-medium"
          disabled={loading}
        >
          <span>{loading ? "Mandando..." : "Manda il tuo messaggio"}</span>
        </button>
      </div>
    </div>
  );
}