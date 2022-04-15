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
        "Il tuo messaggio è stato mandato! La pagina verrà aggiornata automaticamente."
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
    <div className="h-auto w-fill text-center px-6 py-4">
      <h2 className="text-lg font-bold">Scrivi un messaggio:</h2>
      <p className="text-sm">
        Stai postando come: utente anonimo
        {/* {user.custom_id !== null ? user.custom_id : "utente anonimo"} */}
      </p>
      <div className="py-4">
        <input
          className="border-b-2 content-center w-fit"
          type="text"
          placeholder="Oggetto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          className="border-b-2 content-center w-fit"
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
          className="p-4 font-medium"
          disabled={loading}
        >
          <span>{loading ? "Mandando..." : "Manda il tuo messaggio"}</span>
        </button>
      </div>
    </div>
  );
}
