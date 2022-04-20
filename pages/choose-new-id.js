import { withProtected } from "../hooks/route";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "../context/user";
import { supabase } from "../utils/supabase";

const chooseNewId = () => {
  const { user } = useUser();
  const router = useRouter();
  const [Id, setId] = useState("");
  let userId = user ? user.id : "";

  const send = async (newId) => {
    if (newId === "") {
      alert("Il campo non può essere vuoto!");
      return;
    }
    const { data, error } = await supabase
      .from("profile")
      .update({ custom_id: newId })
      .match({ id: user.id });
    if (error) {
      alert("Si è verificato un errore");
    } else {
      router.push("/custom-id-confirm");
    }
  };

  return (
    <div className="rounded-l py-2 px-4 font-medium">
      <div className="text-center">
        <div className="w-90 max-w-3xl mx-auto py-16 flex justify-around">
          <div className="h-auto w-fill rounded text-center shadow px-6 py-4">
            <h2 className="font-semibold text-slate-500 text-2xl">
              Cambia il tuo nome utente:
            </h2>
            <div className="py-4">
              <input
                className="border-b-2 content-center w-fit"
                type="text"
                value={Id}
                placeholder="Nuovo nome utente"
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  send(Id);
                }}
                className="p-4 text-lg font-medium"
              >
                <a>Conferma</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withProtected(chooseNewId);
