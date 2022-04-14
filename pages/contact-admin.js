import { useState } from "react";
import { useUser } from "../context/user";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";

export default function contactAdmin() {
  const router = useRouter();
  const { user } = useUser(); // to be used to properly insert profile_id field into db
  const id = user ? user.id : null;
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const send = async (title, body) => {
    // user
    try {
      setLoading(true);
      if (title === "" || body === "")
        throw new Error(
          "Oggetto e corpo del messaggio devono essere entrambi compilati!"
        );
      const { error } = await supabase
        .from("admin_requests") // tabella con messaggi diretti all'amministrazione
        .insert({
          profile_id: id,
          body: body,
          title: title,
        });
      if (error) throw error;
      router.push("/admin-message-confirm");
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
      <div className="text-center">
        <div className="w-90 max-w-3xl mx-auto py-16 flex justify-around">
          <div className="h-auto w-fill rounded text-center shadow px-6 py-4">
            <h2 className="font-semibold text-slate-500 text-2xl">
              Inserisci qui un messaggio da inviare all'Aministrazione
            </h2>
            <div className="text-md">
              L'Amministrazione provvederà al più presto a risolvere il tuo
              problema.
            </div>
            <div className="py-2">
              <input
                className="border-b-2 content-center w-fit"
                type="text"
                placeholder="Oggetto"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="py-2">
              <input
                className="border-b-2 content-center w-fit"
                type="text"
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
                className="p-4 text-lg font-medium"
                disabled={loading}
              >
                <a>
                  {loading ? "Mandando..." : "Manda il tuo messaggio"}
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
